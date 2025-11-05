"""
Consolidated utilities for framed-listening notebooks.

Purpose
-------
This module centralises repeated functions used across the TF-IDF, Word2Vec,
and BERT notebooks:
 - cosine similarity matrix creation
 - extracting pairwise similarity values and condition labels
 - a set of comparison / analysis helpers (binary and condition comparisons)
 - summary statistics for consistency, context- and genre-specific analyses
 - plotting helpers for the comparison figures and heatmaps

Usage
-----
Import the module at the top of each notebook:
    import analysis_utils as utils
    
    # Or import specific functions:
    from analysis_utils import (
        extract_similarity_by_condition,
        run_factor_analysis,
        create_comparative_music_vs_context_figure,
        ...
    )

Notes
-----
- Functions are written to be generic and to accept inputs used in the project
- All analysis functions now support a 'verbose' parameter for cleaner output
- High-level wrapper functions automate entire analysis pipelines
- Division by zero is protected throughout
"""

from typing import Optional, Tuple, Dict, List, Any
import numpy as np
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from scipy import stats
from scipy.stats import levene
import matplotlib.pyplot as plt
import seaborn as sns


# ==============================================================================
# HELPER FUNCTIONS
# ==============================================================================

def get_factor_key(factor_column: str) -> str:
    """Extract factor key from column name (e.g., 'context_word' -> 'context')."""
    return factor_column.split('_')[0]


def get_significance_marker(p_val: float) -> str:
    """Return significance marker based on p-value."""
    if p_val < 0.001:
        return "***"
    elif p_val < 0.01:
        return "**"
    elif p_val < 0.05:
        return "*"
    else:
        return "n.s."


def compute_cohens_d(group1: pd.Series, group2: pd.Series) -> float:
    """Compute Cohen's d effect size with protection for zero variance."""
    pooled_std = np.sqrt((group1.std()**2 + group2.std()**2) / 2)
    if pooled_std == 0:
        return np.nan
    return (group1.mean() - group2.mean()) / pooled_std


def safe_cv(std: float, mean: float) -> float:
    """Safely compute coefficient of variation with division by zero protection."""
    if mean == 0 or np.isnan(mean):
        return np.nan
    return std / mean


# ==============================================================================
# DATA EXTRACTION
# ==============================================================================

def extract_similarity_by_condition(
    cosine_matrix: np.ndarray,
    METdocs: pd.DataFrame,
    clip_col: str = "clip_name",
    context_col: str = "context_word",
    genre_col: str = "genre_code",
    verbose: bool = True
) -> pd.DataFrame:
    """
    From a cosine matrix and METdocs metadata, extract the upper-triangle
    pairs (unique pairs) annotated with boolean indicators and a categorical
    'condition' label.

    Parameters
    ----------
    cosine_matrix : np.ndarray
        Square (n_docs, n_docs) similarity matrix
    METdocs : pd.DataFrame
        Metadata DataFrame aligned with the rows/cols of the cosine_matrix.
        Must contain clip_col, context_col, genre_col.
    clip_col, context_col, genre_col : str
        Column names in METdocs
    verbose : bool
        Whether to print progress messages

    Returns
    -------
    sim_df_docs : pd.DataFrame
        Columns: doc_i, doc_j, similarity, same_clip, same_context,
        same_genre, condition
    """
    n_docs = cosine_matrix.shape[0]
    clips = METdocs[clip_col].values
    contexts = METdocs[context_col].values
    genres = METdocs[genre_col].values

    records = {
        "doc_i": [],
        "doc_j": [],
        "similarity": [],
        "same_clip": [],
        "same_context": [],
        "same_genre": [],
        "condition": [],
    }

    if verbose:
        print(f"Extracting similarity by condition from {n_docs} documents...")
        print(f"Total unique pairs to process: {(n_docs * (n_docs - 1)) // 2}")

    for i in range(n_docs):
        if verbose and (i + 1) % 10 == 0:
            print(f"  Processed {i + 1}/{n_docs} documents...")

        for j in range(i + 1, n_docs):
            sim = float(cosine_matrix[i, j])

            same_clip = clips[i] == clips[j]
            same_context = contexts[i] == contexts[j]
            same_genre = genres[i] == genres[j]

            # Determine condition
            if same_clip and same_context:
                condition = "same_clip_same_context"
            elif same_clip and not same_context:
                condition = "same_clip_diff_context"  # isolated MUSIC influence
            elif not same_clip and same_context:
                condition = "diff_clip_same_context"  # isolated CONTEXT influence
            else:
                condition = (
                    "diff_clip_diff_context_same_genre"
                    if same_genre
                    else "diff_clip_diff_context_diff_genre"
                )

            records["doc_i"].append(i)
            records["doc_j"].append(j)
            records["similarity"].append(sim)
            records["same_clip"].append(same_clip)
            records["same_context"].append(same_context)
            records["same_genre"].append(same_genre)
            records["condition"].append(condition)

    sim_df_docs = pd.DataFrame(records)
    
    if verbose:
        print(f"\n✓ Extracted {len(sim_df_docs)} unique pairs")
        print("\nCondition distribution:")
        print(sim_df_docs['condition'].value_counts().sort_index())
    
    return sim_df_docs


# ==============================================================================
# STATISTICAL COMPARISONS
# ==============================================================================

def compare_conditions(
    sim_df: pd.DataFrame,
    cond1: str,
    cond2: str,
    label1: str,
    label2: str,
    verbose: bool = False
) -> Optional[Dict[str, Any]]:
    """
    Compare two named conditions from sim_df['condition'] with 
    an independent t-test and Cohen's d.

    Parameters
    ----------
    sim_df : pd.DataFrame
        Similarity dataframe with 'condition' and 'similarity' columns
    cond1, cond2 : str
        Condition keys present in sim_df['condition']
    label1, label2 : str
        Human readable labels for the two conditions
    verbose : bool
        Whether to print warning messages

    Returns
    -------
    dict or None
        Dictionary with comparison results or None if insufficient data
    """
    data1 = sim_df[sim_df["condition"] == cond1]["similarity"]
    data2 = sim_df[sim_df["condition"] == cond2]["similarity"]

    if len(data1) < 2 or len(data2) < 2:
        if verbose:
            print(f"WARNING: Insufficient data for {label1} vs {label2}")
        return None

    t_stat, p_value = stats.ttest_ind(data1, data2)
    effect_size = compute_cohens_d(data1, data2)
    sig_str = get_significance_marker(p_value)

    return {
        "comparison": f"{label1} vs {label2}",
        "mean1": float(data1.mean()),
        "mean2": float(data2.mean()),
        "diff": float(data1.mean() - data2.mean()),
        "t": float(t_stat),
        "p": float(p_value),
        "sig": sig_str,
        "d": float(effect_size),
        "n1": len(data1),
        "n2": len(data2),
    }


def compare_binary(
    sim_df: pd.DataFrame,
    column: str,
    label: str,
    verbose: bool = False
) -> Dict[str, Any]:
    """
    Compare pairs that share a binary factor vs those that differ.

    Parameters
    ----------
    sim_df : pd.DataFrame
        DataFrame with binary column and 'similarity' column
    column : str
        Boolean column name in sim_df (e.g., 'same_clip')
    label : str
        Pretty label for reporting (e.g., 'Clip', 'Context')
    verbose : bool
        Whether to print results

    Returns
    -------
    dict
        Summary statistics, t-test results, Cohen's d
    """
    same_data = sim_df[sim_df[column] == True]["similarity"]
    diff_data = sim_df[sim_df[column] == False]["similarity"]

    t_stat, p_value = stats.ttest_ind(same_data, diff_data)
    effect_size = compute_cohens_d(same_data, diff_data)
    sig_str = get_significance_marker(p_value)

    result = {
        "comparison": f"Same {label} vs Different {label}",
        "mean_same": float(same_data.mean()),
        "mean_diff": float(diff_data.mean()),
        "diff": float(same_data.mean() - diff_data.mean()),
        "t": float(t_stat),
        "p": float(p_value),
        "sig": sig_str,
        "d": float(effect_size),
        "n_same": len(same_data),
        "n_diff": len(diff_data),
    }

    if verbose:
        print(f"\n{result['comparison']}:")
        print(f"  Same: M={result['mean_same']:.4f} (N={result['n_same']})")
        print(f"  Diff: M={result['mean_diff']:.4f} (N={result['n_diff']})")
        print(f"  t={result['t']:.3f}, p={result['p']:.4f} {result['sig']}, d={result['d']:.3f}")

    return result


def binary_comparisons(sim_df: pd.DataFrame, verbose: bool = True) -> List[Dict[str, Any]]:
    """
    Run all three standard binary comparisons (Clip, Context, Genre).
    
    Returns
    -------
    list of dict
        Results for each comparison
    """
    if verbose:
        print("\n" + "="*70)
        print("BINARY COMPARISONS")
        print("="*70)
    
    results = []
    for col, label in [('same_clip', 'Clip'), ('same_context', 'Context'), ('same_genre', 'Genre')]:
        results.append(compare_binary(sim_df, col, label, verbose=verbose))
    
    return results


# ==============================================================================
# FACTOR-SPECIFIC ANALYSES
# ==============================================================================

def analyze_within_factor_similarity(
    sim_df: pd.DataFrame,
    metadata: pd.DataFrame,
    factor_column: str,
    factor_name: str,
    verbose: bool = True
) -> pd.DataFrame:
    """
    Analyze within-factor similarity (e.g., same context/genre, different clips).

    Parameters
    -----------
    sim_df : pd.DataFrame
        Similarity dataframe
    metadata : pd.DataFrame
        METdocs dataframe
    factor_column : str
        Column name: 'context_word' or 'genre_code'
    factor_name : str
        Display name: 'Context' or 'Genre'
    verbose : bool
        Whether to print detailed output

    Returns
    --------
    pd.DataFrame
        Within-factor statistics sorted by mean similarity
    """
    if verbose:
        print(f"\n1. WITHIN-{factor_name.upper()} SIMILARITY")
        print("-" * 70)
        if factor_name == 'Context':
            print("When different music is heard with the same context, how similar are thoughts?")
        else:
            print("When different clips from the same genre are heard, how similar are thoughts?")

    # Determine condition filter
    if factor_name == 'Context':
        condition_filter = sim_df['condition'] == 'diff_clip_same_context'
    else:  # Genre
        condition_filter = (sim_df['same_genre'] == True) & (sim_df['same_clip'] == False)

    factor_key = get_factor_key(factor_column)
    within_results = []
    factors = metadata[factor_column].unique()

    for factor in factors:
        factor_sims = sim_df[
            condition_filter &
            (sim_df[f'{factor_key}_i'] == factor) &
            (sim_df[f'{factor_key}_j'] == factor)
        ]['similarity']

        if len(factor_sims) > 0:
            mean_sim = factor_sims.mean()
            std_sim = factor_sims.std()
            cv = safe_cv(std_sim, mean_sim)

            within_results.append({
                factor_name.lower(): factor,
                'mean': mean_sim,
                'std': std_sim,
                'n': len(factor_sims),
                'cv': cv
            })

            if verbose:
                print(f"\n{factor.upper()}:")
                print(f"  Mean similarity: {mean_sim:.4f}")
                print(f"  SD: {std_sim:.4f}")
                print(f"  CV: {cv:.4f}")
                print(f"  N pairs: {len(factor_sims)}")

    within_df = pd.DataFrame(within_results).sort_values('mean', ascending=False)

    if verbose and len(within_df) > 0:
        print(f"\n{'-'*70}")
        print(f"RANKING: {factor_name}s by Thought Convergence")
        print("-"*70)
        for idx, row in within_df.iterrows():
            print(f"  {idx+1}. {row[factor_name.lower()].upper()}: M={row['mean']:.4f} (CV={row['cv']:.4f})")
        print(f"\n→ {within_df.iloc[0][factor_name.lower()].upper()} produces MOST similar thoughts")
        print(f"→ {within_df.iloc[-1][factor_name.lower()].upper()} produces MOST DIVERSE thoughts")

    return within_df


def analyze_pairwise_factor_comparisons(
    sim_df: pd.DataFrame,
    metadata: pd.DataFrame,
    factor_column: str,
    factor_name: str,
    within_df: Optional[pd.DataFrame] = None,
    verbose: bool = True
) -> pd.DataFrame:
    """
    Perform pairwise comparisons between different factor levels.

    Parameters
    -----------
    sim_df : pd.DataFrame
        Similarity dataframe
    metadata : pd.DataFrame
        METdocs dataframe
    factor_column : str
        Column name: 'context_word' or 'genre_code'
    factor_name : str
        Display name: 'Context' or 'Genre'
    within_df : pd.DataFrame, optional
        Results from analyze_within_factor_similarity (not used but kept for API consistency)
    verbose : bool
        Whether to print detailed output

    Returns
    --------
    pd.DataFrame
        Pairwise comparison statistics sorted by absolute effect size
    """
    if verbose:
        print(f"\n\n2. PAIRWISE {factor_name.upper()} COMPARISONS")
        print("-" * 70)

    # Determine condition filter
    if factor_name == 'Context':
        condition_filter = sim_df['condition'] == 'diff_clip_same_context'
    else:  # Genre
        condition_filter = (sim_df['same_genre'] == True) & (sim_df['same_clip'] == False)

    factor_key = get_factor_key(factor_column)
    factor_pairs = []
    factors_list = list(metadata[factor_column].unique())

    for i, factor1 in enumerate(factors_list):
        for factor2 in factors_list[i+1:]:
            factor1_sims = sim_df[
                condition_filter &
                (sim_df[f'{factor_key}_i'] == factor1) &
                (sim_df[f'{factor_key}_j'] == factor1)
            ]['similarity']

            factor2_sims = sim_df[
                condition_filter &
                (sim_df[f'{factor_key}_i'] == factor2) &
                (sim_df[f'{factor_key}_j'] == factor2)
            ]['similarity']

            if len(factor1_sims) > 0 and len(factor2_sims) > 0:
                t_stat, p_val = stats.ttest_ind(factor1_sims, factor2_sims)
                effect_size = compute_cohens_d(factor1_sims, factor2_sims)
                sig = get_significance_marker(p_val)

                factor_pairs.append({
                    f'{factor_name.lower()}1': factor1,
                    f'{factor_name.lower()}2': factor2,
                    'mean1': factor1_sims.mean(),
                    'mean2': factor2_sims.mean(),
                    'difference': factor1_sims.mean() - factor2_sims.mean(),
                    't': t_stat,
                    'p': p_val,
                    'd': effect_size,
                    'sig': sig
                })

    pairs_df = pd.DataFrame(factor_pairs).sort_values('d', key=abs, ascending=False)

    if verbose and len(pairs_df) > 0:
        sig_pairs = pairs_df[pairs_df['sig'] != 'n.s.']
        print(f"\nSignificant differences between {factor_name.lower()}s:")
        
        if len(sig_pairs) > 0:
            for _, row in sig_pairs.iterrows():
                print(f"\n{row[f'{factor_name.lower()}1'].upper()} vs {row[f'{factor_name.lower()}2'].upper()}:")
                print(f"  Means: {row['mean1']:.4f} vs {row['mean2']:.4f}")
                print(f"  Difference: {row['difference']:.4f}")
                print(f"  t = {row['t']:.3f}, p = {row['p']:.4f} {row['sig']}, d = {row['d']:.3f}")
        else:
            print(f"  No significant differences found")

    return pairs_df


def analyze_factor_music_vs_context(
    sim_df: pd.DataFrame,
    metadata: pd.DataFrame,
    factor_column: str,
    factor_name: str,
    verbose: bool = True
) -> pd.DataFrame:
    """
    Compare music-driven vs. context-driven effects within each factor level.

    For Context: Uses OR logic for music-driven (captures cross-context comparisons)
    For Genre: Uses AND logic for both (pure within-genre comparisons)

    Parameters
    -----------
    sim_df : pd.DataFrame
        Similarity dataframe
    metadata : pd.DataFrame
        METdocs dataframe
    factor_column : str
        Column name: 'context_word' or 'genre_code'
    factor_name : str
        Display name: 'Context' or 'Genre'
    verbose : bool
        Whether to print detailed output

    Returns
    --------
    pd.DataFrame
        Comparison statistics for each factor level
    """
    if verbose:
        print(f"\n\n3. {factor_name.upper()}-SPECIFIC COMPARISON: Music vs. Context Effects")
        print("-" * 70)
        print(f"For each {factor_name.lower()}, comparing:")
        print("  - Music-driven similarity: same clip heard in DIFFERENT contexts")
        print("  - Context-driven similarity: DIFFERENT clips heard in the same context")

        if factor_name == 'Context':
            print("\nNote: Music-driven uses OR logic (at least one doc from target context)")
            print("      Context-driven uses AND logic (both docs from target context)\n")
        else:
            print(f"\nNote: Both use AND logic (both docs from target {factor_name.lower()})\n")

    factor_key = get_factor_key(factor_column)
    moderator_results = []
    factors = metadata[factor_column].unique()

    for factor in factors:
        # MUSIC-DRIVEN filter
        if factor_name == 'Context':
            music_filter = (
                (sim_df['condition'] == 'same_clip_diff_context') &
                ((sim_df[f'{factor_key}_i'] == factor) | (sim_df[f'{factor_key}_j'] == factor))
            )
        else:
            music_filter = (
                (sim_df['condition'] == 'same_clip_diff_context') &
                (sim_df[f'{factor_key}_i'] == factor) &
                (sim_df[f'{factor_key}_j'] == factor)
            )

        music_sims = sim_df[music_filter]['similarity']

        # CONTEXT-DRIVEN filter (always AND logic)
        context_filter = (
            (sim_df['condition'] == 'diff_clip_same_context') &
            (sim_df[f'{factor_key}_i'] == factor) &
            (sim_df[f'{factor_key}_j'] == factor)
        )
        context_sims = sim_df[context_filter]['similarity']

        if len(music_sims) > 0 and len(context_sims) > 0:
            t_stat, p_val = stats.ttest_ind(music_sims, context_sims)
            effect_size = compute_cohens_d(music_sims, context_sims)
            sig = get_significance_marker(p_val)

            moderator_results.append({
                factor_name.lower(): factor,
                'music_mean': music_sims.mean(),
                'music_sd': music_sims.std(),
                'context_mean': context_sims.mean(),
                'context_sd': context_sims.std(),
                'difference': music_sims.mean() - context_sims.mean(),
                'effect_size': effect_size,
                't': t_stat,
                'p': p_val,
                'sig': sig,
                'n_music': len(music_sims),
                'n_context': len(context_sims)
            })

            if verbose:
                print(f"\n{factor.upper()}:")
                print(f"  Music-driven: M={music_sims.mean():.4f}, SD={music_sims.std():.4f} (N={len(music_sims)})")
                print(f"  Context-driven: M={context_sims.mean():.4f}, SD={context_sims.std():.4f} (N={len(context_sims)})")
                print(f"  Difference: {music_sims.mean() - context_sims.mean():.4f}")
                print(f"  t({len(music_sims) + len(context_sims) - 2}) = {t_stat:.3f}, p = {p_val:.4f} {sig}")
                print(f"  Cohen's d = {effect_size:.3f}")

                if sig != "n.s.":
                    if music_sims.mean() > context_sims.mean():
                        print(f"  → In {factor}, MUSIC drives similarity MORE than context")
                    else:
                        print(f"  → In {factor}, CONTEXT drives similarity MORE than music")
                else:
                    print(f"  → In {factor}, music and context have comparable effects")

    if len(moderator_results) == 0:
        return pd.DataFrame()

    moderator_df = pd.DataFrame(moderator_results)

    if verbose:
        _print_moderator_summary(moderator_df, factor_name, factor_column, sim_df)

    return moderator_df


def _print_moderator_summary(
    moderator_df: pd.DataFrame,
    factor_name: str,
    factor_column: str,
    sim_df: pd.DataFrame
) -> None:
    """Helper function to print moderator analysis summary."""
    print(f"\n{'-'*70}")
    print(f"{factor_name.upper()}-SPECIFIC SUMMARY")
    print("-"*70)

    music_dominant = moderator_df[
        (moderator_df['difference'] > 0) & (moderator_df['sig'] != 'n.s.')
    ]
    context_dominant = moderator_df[
        (moderator_df['difference'] < 0) & (moderator_df['sig'] != 'n.s.')
    ]
    no_difference = moderator_df[moderator_df['sig'] == 'n.s.']

    print(f"\nAcross {len(moderator_df)} {factor_name.lower()}s:")
    print(f"  Music-dominant: {len(music_dominant)}")
    if len(music_dominant) > 0:
        print(f"    {', '.join(music_dominant[factor_name.lower()].values)}")

    print(f"  Context-dominant: {len(context_dominant)}")
    if len(context_dominant) > 0:
        print(f"    {', '.join(context_dominant[factor_name.lower()].values)}")

    print(f"  No significant difference: {len(no_difference)}")
    if len(no_difference) > 0:
        print(f"    {', '.join(no_difference[factor_name.lower()].values)}")

    print(f"\n  Mean effect size (|d|): {moderator_df['effect_size'].abs().mean():.3f}")
    print(f"  Range: {moderator_df['effect_size'].min():.3f} to {moderator_df['effect_size'].max():.3f}")


def analyze_factor_consistency(
    sim_df: pd.DataFrame,
    metadata: pd.DataFrame,
    factor_column: str,
    factor_name: str,
    verbose: bool = True
) -> Tuple[pd.DataFrame, pd.DataFrame]:
    """
    Analyze consistency (CV) within each factor and compare music vs. context consistency.

    Parameters
    -----------
    sim_df : pd.DataFrame
        Similarity dataframe
    metadata : pd.DataFrame
        METdocs dataframe
    factor_column : str
        Column name: 'context_word' or 'genre_code'
    factor_name : str
        Display name: 'Context' or 'Genre'
    verbose : bool
        Whether to print detailed output

    Returns
    --------
    Tuple[pd.DataFrame, pd.DataFrame]
        - within_consistency_df: CV for each factor level
        - music_vs_context_consistency_df: Music vs context consistency comparison
    """
    if verbose:
        print(f"\n{'-'*70}")
        print(f"WITHIN-{factor_name.upper()} CONSISTENCY ANALYSIS")
        print("-"*70)
        print(f"Testing which {factor_name.lower()}s produce more consistent/convergent thought patterns")
        print(f"Lower CV = more convergent/consistent thoughts\n")

    factor_key = get_factor_key(factor_column)

    # Determine condition filter
    if factor_name == 'Context':
        condition_filter = sim_df['condition'] == 'diff_clip_same_context'
    else:  # Genre
        condition_filter = (sim_df['same_genre'] == True) & (sim_df['same_clip'] == False)

    # Calculate CV for each factor
    consistency_results = []
    factors = metadata[factor_column].unique()

    for factor in factors:
        factor_sims = sim_df[
            condition_filter &
            (sim_df[f'{factor_key}_i'] == factor) &
            (sim_df[f'{factor_key}_j'] == factor)
        ]['similarity']

        if len(factor_sims) > 0:
            mean_sim = factor_sims.mean()
            std_sim = factor_sims.std()
            cv = safe_cv(std_sim, mean_sim)

            consistency_results.append({
                factor_name.lower(): factor,
                'mean': mean_sim,
                'std': std_sim,
                'cv': cv,
                'n': len(factor_sims)
            })

            if verbose:
                print(f"{factor.upper()}:")
                print(f"  Mean similarity: {mean_sim:.4f}")
                print(f"  SD: {std_sim:.4f}")
                print(f"  CV: {cv:.4f} (lower = more consistent)")
                print(f"  N pairs: {len(factor_sims)}\n")

    consistency_df = pd.DataFrame(consistency_results).sort_values('cv')

    if verbose and len(consistency_df) > 0:
        print(f"\n{factor_name.upper()} CONSISTENCY RANKING (most to least consistent)")
        print("-"*70)
        for i, row in consistency_df.iterrows():
            print(f"  {i+1}. {row[factor_name.lower()].upper()}: CV={row['cv']:.4f}")
        print(f"\n→ {consistency_df.iloc[0][factor_name.lower()].upper()} produces MOST CONSISTENT thoughts")
        print(f"→ {consistency_df.iloc[-1][factor_name.lower()].upper()} produces MOST VARIABLE thoughts")

    # Music vs. Context consistency comparison
    music_vs_context_df = _analyze_music_context_consistency(
        sim_df, metadata, factor_column, factor_name, factor_key, factors, verbose
    )

    return consistency_df, music_vs_context_df


def _analyze_music_context_consistency(
    sim_df: pd.DataFrame,
    metadata: pd.DataFrame,
    factor_column: str,
    factor_name: str,
    factor_key: str,
    factors: np.ndarray,
    verbose: bool
) -> pd.DataFrame:
    """Helper function to analyze music vs context consistency."""
    if verbose:
        print(f"\n\nCONSISTENCY COMPARISON: Music vs. Context Effects Within {factor_name}s")
        print("-"*70)
        print("Using Levene's test to assess if variance (consistency) differs significantly\n")

    music_vs_context_consistency = []

    for factor in factors:
        # Music-driven filter
        if factor_name == 'Context':
            music_filter = (
                (sim_df['condition'] == 'same_clip_diff_context') &
                ((sim_df[f'{factor_key}_i'] == factor) | (sim_df[f'{factor_key}_j'] == factor))
            )
        else:
            music_filter = (
                (sim_df['condition'] == 'same_clip_diff_context') &
                (sim_df[f'{factor_key}_i'] == factor) &
                (sim_df[f'{factor_key}_j'] == factor)
            )

        music_sims = sim_df[music_filter]['similarity']

        # Context-driven filter (always AND logic)
        context_filter = (
            (sim_df['condition'] == 'diff_clip_same_context') &
            (sim_df[f'{factor_key}_i'] == factor) &
            (sim_df[f'{factor_key}_j'] == factor)
        )
        context_sims = sim_df[context_filter]['similarity']

        if len(music_sims) > 0 and len(context_sims) > 0:
            music_cv = safe_cv(music_sims.std(), music_sims.mean())
            context_cv = safe_cv(context_sims.std(), context_sims.mean())
            cv_difference = music_cv - context_cv if not (np.isnan(music_cv) or np.isnan(context_cv)) else np.nan

            levene_stat, levene_p = levene(music_sims, context_sims)
            sig = get_significance_marker(levene_p)

            music_vs_context_consistency.append({
                factor_name.lower(): factor,
                'music_mean': music_sims.mean(),
                'music_sd': music_sims.std(),
                'music_cv': music_cv,
                'context_mean': context_sims.mean(),
                'context_sd': context_sims.std(),
                'context_cv': context_cv,
                'cv_difference': cv_difference,
                'levene_stat': levene_stat,
                'levene_p': levene_p,
                'sig': sig,
                'n_music': len(music_sims),
                'n_context': len(context_sims)
            })

            if verbose:
                print(f"\n{factor.upper()}:")
                print(f"  Music-driven: M={music_sims.mean():.4f}, SD={music_sims.std():.4f}, CV={music_cv:.4f}")
                print(f"  Context-driven: M={context_sims.mean():.4f}, SD={context_sims.std():.4f}, CV={context_cv:.4f}")
                print(f"  Levene's test: F={levene_stat:.3f}, p={levene_p:.4f} {sig}")

    return pd.DataFrame(music_vs_context_consistency)


# ==============================================================================
# HIGH-LEVEL WRAPPER FUNCTION
# ==============================================================================

def run_factor_analysis(
    sim_df_docs: pd.DataFrame,
    METdocs: pd.DataFrame,
    factor_column: str,
    factor_name: str,
    output_dir: str,
    model_prefix: str = 'TFIDF',
    verbose: bool = True
) -> Tuple[pd.DataFrame, pd.DataFrame, pd.DataFrame, pd.DataFrame, pd.DataFrame]:
    """
    Run complete factor analysis pipeline and save all results.

    This is a high-level wrapper that runs all four analysis steps:
    1. Within-factor similarity
    2. Pairwise comparisons
    3. Music vs context moderator analysis
    4. Consistency analysis

    Parameters
    -----------
    sim_df_docs : pd.DataFrame
        Similarity dataframe with document pairs
    METdocs : pd.DataFrame
        Document metadata
    factor_column : str
        Column name for the factor (e.g., 'context_word', 'genre_code')
    factor_name : str
        Display name for the factor (e.g., 'Context', 'Genre')
    output_dir : str
        Directory to save output CSV files
    model_prefix : str
        Prefix for output filenames (e.g., 'TFIDF', 'W2V', 'BERT')
    verbose : bool
        Whether to print detailed output

    Returns
    --------
    Tuple of DataFrames:
        - within_df: Within-factor analysis results
        - pairs_df: Pairwise comparison results
        - moderator_df: Music vs context moderator results
        - consistency_df: Consistency analysis results
        - consistency_comparison_df: Music vs context consistency comparison
    """
    if verbose:
        print("\n" + "="*70)
        print(f"SPECIFIC {factor_name.upper()} ANALYSIS")
        print("="*70)
        print(f"Testing whether specific {factor_name.lower()}s produce distinctive thought patterns\n")

    # Add factor labels to similarity dataframe if not present
    factor_col_i = f'{factor_name.lower()}_i'
    factor_col_j = f'{factor_name.lower()}_j'

    if factor_col_i not in sim_df_docs.columns:
        factor_values = METdocs[factor_column].values
        sim_df_docs[factor_col_i] = sim_df_docs['doc_i'].map(lambda x: factor_values[x])
        sim_df_docs[factor_col_j] = sim_df_docs['doc_j'].map(lambda x: factor_values[x])

    # Run all analyses
    within_df = analyze_within_factor_similarity(
        sim_df_docs, METdocs, factor_column, factor_name, verbose
    )

    pairs_df = analyze_pairwise_factor_comparisons(
        sim_df_docs, METdocs, factor_column, factor_name, within_df, verbose
    )

    moderator_df = analyze_factor_music_vs_context(
        sim_df_docs, METdocs, factor_column, factor_name, verbose
    )

    consistency_df, consistency_comparison_df = analyze_factor_consistency(
        sim_df_docs, METdocs, factor_column, factor_name, verbose
    )

    # Save results
    if verbose:
        print(f"\n→ Saving {factor_name.lower()} results...")

    factor_lower = factor_name.lower()
    within_df.to_csv(f'{output_dir}/{model_prefix}_within_{factor_lower}_analysis.csv', index=False)
    pairs_df.to_csv(f'{output_dir}/{model_prefix}_{factor_lower}_pairwise_comparisons.csv', index=False)
    consistency_df.to_csv(f'{output_dir}/{model_prefix}_{factor_lower}_consistency.csv', index=False)

    if len(moderator_df) > 0:
        moderator_df.to_csv(
            f'{output_dir}/{model_prefix}_{factor_lower}_moderator_music_vs_context.csv',
            index=False
        )

    if len(consistency_comparison_df) > 0:
        consistency_comparison_df.to_csv(
            f'{output_dir}/{model_prefix}_{factor_lower}_music_vs_context_consistency.csv',
            index=False
        )

    if verbose:
        print(f"✓ {factor_name} analysis complete and results saved")

    return within_df, pairs_df, moderator_df, consistency_df, consistency_comparison_df


def analyze_genre_context_interaction(
    sim_df_docs: pd.DataFrame,
    METdocs: pd.DataFrame,
    output_dir: str,
    model_prefix: str = 'TFIDF',
    verbose: bool = True
) -> pd.DataFrame:
    """
    Analyze Genre × Context interaction effects.

    Parameters
    -----------
    sim_df_docs : pd.DataFrame
        Similarity dataframe with genre and context labels
    METdocs : pd.DataFrame
        Document metadata
    output_dir : str
        Directory to save output CSV
    model_prefix : str
        Prefix for output filename
    verbose : bool
        Whether to print detailed output

    Returns
    --------
    pd.DataFrame
        Genre-Context interaction statistics
    """
    if verbose:
        print("\n\n" + "="*70)
        print("GENRE × CONTEXT INTERACTION")
        print("="*70)
        print("Do certain genres work better with certain contexts?\n")

    genre_context_interaction = []
    genres = METdocs['genre_code'].unique()
    contexts = METdocs['context_word'].unique()

    for genre in genres:
        for context in contexts:
            specific_sims = sim_df_docs[
                (sim_df_docs['condition'] == 'diff_clip_same_context') &
                (sim_df_docs['genre_i'] == genre) &
                (sim_df_docs['context_i'] == context)
            ]['similarity']

            if len(specific_sims) > 0:
                genre_context_interaction.append({
                    'genre': genre,
                    'context': context,
                    'mean': specific_sims.mean(),
                    'std': specific_sims.std(),
                    'n': len(specific_sims)
                })

    genre_context_df = pd.DataFrame(genre_context_interaction)

    if verbose and len(genre_context_df) > 0:
        print("Top 5 Genre-Context combinations (highest similarity):")
        top_combos = genre_context_df.nlargest(5, 'mean')
        for idx, row in top_combos.iterrows():
            print(f"  {row['genre'].upper()} + {row['context'].upper()}: M={row['mean']:.4f}")

        print("\nBottom 5 Genre-Context combinations (lowest similarity):")
        bottom_combos = genre_context_df.nsmallest(5, 'mean')
        for idx, row in bottom_combos.iterrows():
            print(f"  {row['genre'].upper()} + {row['context'].upper()}: M={row['mean']:.4f}")

    # Save results
    genre_context_df.to_csv(
        f'{output_dir}/{model_prefix}_genre_context_interaction.csv',
        index=False
    )

    if verbose:
        print("\n✓ Genre × Context interaction complete and results saved")

    return genre_context_df


def print_consistency_comparison_summary(
    genre_consistency_df: pd.DataFrame,
    context_consistency_df: pd.DataFrame
) -> None:
    """
    Print overall consistency comparison between genres and contexts.

    Parameters
    -----------
    genre_consistency_df : pd.DataFrame
        Genre consistency results
    context_consistency_df : pd.DataFrame
        Context consistency results
    """
    print("\n" + "="*70)
    print("OVERALL CONSISTENCY COMPARISON")
    print("="*70)

    if len(genre_consistency_df) > 0:
        print("\nGENRE CONSISTENCY:")
        print(f"  Most consistent: {genre_consistency_df.iloc[0]['genre'].upper()} (CV={genre_consistency_df.iloc[0]['cv']:.4f})")
        print(f"  Least consistent: {genre_consistency_df.iloc[-1]['genre'].upper()} (CV={genre_consistency_df.iloc[-1]['cv']:.4f})")
        print(f"  Range: {genre_consistency_df['cv'].max() - genre_consistency_df['cv'].min():.4f}")

    if len(context_consistency_df) > 0:
        print("\nCONTEXT CONSISTENCY:")
        print(f"  Most consistent: {context_consistency_df.iloc[0]['context'].upper()} (CV={context_consistency_df.iloc[0]['cv']:.4f})")
        print(f"  Least consistent: {context_consistency_df.iloc[-1]['context'].upper()} (CV={context_consistency_df.iloc[-1]['cv']:.4f})")
        print(f"  Range: {context_consistency_df['cv'].max() - context_consistency_df['cv'].min():.4f}")

    # Direct comparison with statistical test
    if len(genre_consistency_df) > 0 and len(context_consistency_df) > 0:
        genre_mean_cv = genre_consistency_df['cv'].mean()
        context_mean_cv = context_consistency_df['cv'].mean()

        print(f"\nOVERALL AVERAGE CV:")
        print(f"  Genre: {genre_mean_cv:.4f}")
        print(f"  Context: {context_mean_cv:.4f}")
        print(f"  Difference: {abs(genre_mean_cv - context_mean_cv):.4f}")

        if len(genre_consistency_df) >= 2 and len(context_consistency_df) >= 2:
            t_stat, p_val = stats.ttest_ind(
                genre_consistency_df['cv'],
                context_consistency_df['cv']
            )

            if p_val < 0.05:
                if genre_mean_cv < context_mean_cv:
                    print(f"  → Genres produce SIGNIFICANTLY more consistent thoughts (t={t_stat:.2f}, p={p_val:.4f})")
                else:
                    print(f"  → Contexts produce SIGNIFICANTLY more consistent thoughts (t={t_stat:.2f}, p={p_val:.4f})")
            else:
                print(f"  → No significant difference (t={t_stat:.2f}, p={p_val:.4f})")


# ==============================================================================
# PLOTTING & VISUALISATION
# ==============================================================================

def create_comparative_clip_vs_context_figure(
    sim_df: pd.DataFrame,
    figsize: Tuple[int, int] = (8, 5)
) -> plt.Figure:
    """
    Create the canonical clip vs context comparison figure.
    
    Compares 'same_clip_diff_context' vs 'diff_clip_same_context'.
    """
    conds = ["same_clip_diff_context", "diff_clip_same_context"]
    cond_labels = [
        "Same clip\nDifferent context\n(Clip Effect)",
        "Different clip\nSame context\n(Context Effect)",
    ]
    
    plot_df = sim_df[sim_df["condition"].isin(conds)].copy()
    plot_df["label"] = plot_df["condition"].map({c: lab for c, lab in zip(conds, cond_labels)})
    # Enforce categorical ordering so violinplot draws in requested order
    plot_df["label"] = pd.Categorical(plot_df["label"], categories=cond_labels, ordered=True)
    
    fig, ax = plt.subplots(figsize=figsize)
    sns.violinplot(x="label", y="similarity", data=plot_df,
        ax=ax, hue="label", palette=['#3498db', '#e74c3c'], 
        order=cond_labels
    )
    sns.pointplot(x="label", y="similarity", data=plot_df, linestyle='none',
        color="white", errorbar='sd', ax=ax, markers='d', scale=0.75,
        order=cond_labels
    )
    
    ax.set_title("Isolated Clip vs. Context Influence", fontsize=13, fontweight='bold')
    ax.set_ylabel("Cosine Similarity", fontsize=11)
    ax.set_xlabel("")
    plt.tight_layout()
    
    return fig


def create_binary_comparisons_figure(
    sim_df: pd.DataFrame,
    binary_results: List[Dict[str, Any]],
    figsize: Tuple[int, int] = (18, 6)
) -> plt.Figure:
    """
    Create figure showing all three binary comparisons side-by-side.
    
    Parameters
    ----------
    sim_df : pd.DataFrame
        Similarity dataframe
    binary_results : list of dict
        Results from binary_comparisons() function
    """
    fig, axes = plt.subplots(1, 3, figsize=figsize)
    
    comparisons = [
        ('same_clip', 'Clip', ['#95a5a6', '#3498db'], binary_results[0]),
        ('same_context', 'Context', ['#e74c3c', '#95a5a6'], binary_results[1]),
        ('same_genre', 'Genre', ['#2ecc71', '#95a5a6'], binary_results[2])
    ]
    
    for ax, (col, label, palette, result) in zip(axes, comparisons):
        data = sim_df.copy()
        data['label'] = data[col].map({True: f'Same {label}', False: f'Different {label}'})
        
        sns.violinplot(data=data, x='label', y='similarity', ax=ax,
                      order=[f'Same {label}', f'Different {label}'],
                      hue='label', palette=palette, legend=False)
        
        ax.set_title(f'{label} Effect', fontsize=13, fontweight='bold')
        ax.set_xlabel('')
        ax.set_ylabel('Cosine Similarity' if ax == axes[0] else '', fontsize=11)
        
        # Add effect size annotation
        ax.text(0.5, 0.95, f"d = {result['d']:.3f} {result['sig']}",
               ha='center', va='top', transform=ax.transAxes, fontsize=10,
               bbox=dict(boxstyle='round', facecolor='wheat', alpha=0.5))
    
    plt.tight_layout()
    return fig


# ==============================================================================
# UTILITY FUNCTIONS
# ==============================================================================

def save_figure(fig: plt.Figure, path: str, dpi: int = 300, bbox_inches: str = "tight"):
    """Save matplotlib Figure object to path."""
    fig.savefig(path, dpi=dpi, bbox_inches=bbox_inches)
    print(f"✓ Saved: {path}")


def save_similarity_by_condition(
    sim_df: pd.DataFrame,
    output_path: str,
    verbose: bool = True
):
    """
    Save similarity by condition dataframe with summary statistics.
    
    Parameters
    ----------
    sim_df : pd.DataFrame
        Similarity dataframe
    output_path : str
        Path to save CSV file
    verbose : bool
        Whether to print summary
    """
    sim_df.to_csv(output_path, index=False)
    
    if verbose:
        print(f"\n✓ Saved similarity data to: {output_path}")
        print("\nCondition summary:")
        summary = sim_df.groupby('condition')['similarity'].agg(['count', 'mean', 'std', 'min', 'max'])
        print(summary)


# End of file
