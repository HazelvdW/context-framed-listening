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
        create_comparative_clip_vs_context_figure,
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
import os
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.decomposition import TruncatedSVD
from sklearn.manifold import TSNE
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
                condition = "same_clip_diff_context"  # isolated CLIP influence
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
            print("When different clip is heard with the same context, how similar are thoughts?")
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


def analyze_factor_clip_vs_context(
    sim_df: pd.DataFrame,
    metadata: pd.DataFrame,
    factor_column: str,
    factor_name: str,
    verbose: bool = True
) -> pd.DataFrame:
    """
    Compare clip-driven vs. context-driven effects within each factor level.

    For Context: Uses OR logic for clip-driven (captures cross-context comparisons)
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
        print(f"\n\n3. {factor_name.upper()}-SPECIFIC COMPARISON: Clip vs. Context Effects")
        print("-" * 70)
        print(f"For each {factor_name.lower()}, comparing:")
        print("  - Clip-driven similarity: same clip heard in DIFFERENT contexts")
        print("  - Context-driven similarity: DIFFERENT clips heard in the same context")

        if factor_name == 'Context':
            print("\nNote: Clip-driven uses OR logic (at least one doc from target context)")
            print("      Context-driven uses AND logic (both docs from target context)\n")
        else:
            print(f"\nNote: Both use AND logic (both docs from target {factor_name.lower()})\n")

    factor_key = get_factor_key(factor_column)
    moderator_results = []
    factors = metadata[factor_column].unique()

    for factor in factors:
        # CLIP-DRIVEN filter
        if factor_name == 'Context':
            clip_filter = (
                (sim_df['condition'] == 'same_clip_diff_context') &
                ((sim_df[f'{factor_key}_i'] == factor) | (sim_df[f'{factor_key}_j'] == factor))
            )
        else:
            clip_filter = (
                (sim_df['condition'] == 'same_clip_diff_context') &
                (sim_df[f'{factor_key}_i'] == factor) &
                (sim_df[f'{factor_key}_j'] == factor)
            )

        clip_sims = sim_df[clip_filter]['similarity']

        # CONTEXT-DRIVEN filter (always AND logic)
        context_filter = (
            (sim_df['condition'] == 'diff_clip_same_context') &
            (sim_df[f'{factor_key}_i'] == factor) &
            (sim_df[f'{factor_key}_j'] == factor)
        )
        context_sims = sim_df[context_filter]['similarity']

        if len(clip_sims) > 0 and len(context_sims) > 0:
            t_stat, p_val = stats.ttest_ind(clip_sims, context_sims)
            effect_size = compute_cohens_d(clip_sims, context_sims)
            sig = get_significance_marker(p_val)

            moderator_results.append({
                factor_name.lower(): factor,
                'clip_mean': clip_sims.mean(),
                'clip_sd': clip_sims.std(),
                'context_mean': context_sims.mean(),
                'context_sd': context_sims.std(),
                'difference': clip_sims.mean() - context_sims.mean(),
                'effect_size': effect_size,
                't': t_stat,
                'p': p_val,
                'sig': sig,
                'n_clip': len(clip_sims),
                'n_context': len(context_sims)
            })

            if verbose:
                print(f"\n{factor.upper()}:")
                print(f"  Clip-driven: M={clip_sims.mean():.4f}, SD={clip_sims.std():.4f} (N={len(clip_sims)})")
                print(f"  Context-driven: M={context_sims.mean():.4f}, SD={context_sims.std():.4f} (N={len(context_sims)})")
                print(f"  Difference: {clip_sims.mean() - context_sims.mean():.4f}")
                print(f"  t({len(clip_sims) + len(context_sims) - 2}) = {t_stat:.3f}, p = {p_val:.4f} {sig}")
                print(f"  Cohen's d = {effect_size:.3f}")

                if sig != "n.s.":
                    if clip_sims.mean() > context_sims.mean():
                        print(f"  → In {factor}, CLIP drives similarity MORE than context")
                    else:
                        print(f"  → In {factor}, CONTEXT drives similarity MORE than clip")
                else:
                    print(f"  → In {factor}, clip and context have comparable effects")

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

    clip_dominant = moderator_df[
        (moderator_df['difference'] > 0) & (moderator_df['sig'] != 'n.s.')
    ]
    context_dominant = moderator_df[
        (moderator_df['difference'] < 0) & (moderator_df['sig'] != 'n.s.')
    ]
    no_difference = moderator_df[moderator_df['sig'] == 'n.s.']

    print(f"\nAcross {len(moderator_df)} {factor_name.lower()}s:")
    print(f"  Clip-dominant: {len(clip_dominant)}")
    if len(clip_dominant) > 0:
        print(f"    {', '.join(clip_dominant[factor_name.lower()].values)}")

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
    Analyze consistency (CV) within each factor and compare clip vs. context consistency.

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
        - clip_vs_context_consistency_df: Clip vs context consistency comparison
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

    # Clip vs. Context consistency comparison
    clip_vs_context_df = _analyze_clip_context_consistency(
        sim_df, metadata, factor_column, factor_name, factor_key, factors, verbose
    )

    return consistency_df, clip_vs_context_df


def _analyze_clip_context_consistency(
    sim_df: pd.DataFrame,
    metadata: pd.DataFrame,
    factor_column: str,
    factor_name: str,
    factor_key: str,
    factors: np.ndarray,
    verbose: bool
) -> pd.DataFrame:
    """Helper function to analyze clip vs context consistency."""
    if verbose:
        print(f"\n\nCONSISTENCY COMPARISON: Clip vs. Context Effects Within {factor_name}s")
        print("-"*70)
        print("Using Levene's test to assess if variance (consistency) differs significantly\n")

    clip_vs_context_consistency = []

    for factor in factors:
        # Clip-driven filter
        if factor_name == 'Context':
            clip_filter = (
                (sim_df['condition'] == 'same_clip_diff_context') &
                ((sim_df[f'{factor_key}_i'] == factor) | (sim_df[f'{factor_key}_j'] == factor))
            )
        else:
            clip_filter = (
                (sim_df['condition'] == 'same_clip_diff_context') &
                (sim_df[f'{factor_key}_i'] == factor) &
                (sim_df[f'{factor_key}_j'] == factor)
            )

        clip_sims = sim_df[clip_filter]['similarity']

        # Context-driven filter (always AND logic)
        context_filter = (
            (sim_df['condition'] == 'diff_clip_same_context') &
            (sim_df[f'{factor_key}_i'] == factor) &
            (sim_df[f'{factor_key}_j'] == factor)
        )
        context_sims = sim_df[context_filter]['similarity']

        if len(clip_sims) > 0 and len(context_sims) > 0:
            clip_cv = safe_cv(clip_sims.std(), clip_sims.mean())
            context_cv = safe_cv(context_sims.std(), context_sims.mean())
            cv_difference = clip_cv - context_cv if not (np.isnan(clip_cv) or np.isnan(context_cv)) else np.nan

            levene_stat, levene_p = levene(clip_sims, context_sims)
            sig = get_significance_marker(levene_p)

            clip_vs_context_consistency.append({
                factor_name.lower(): factor,
                'clip_mean': clip_sims.mean(),
                'clip_sd': clip_sims.std(),
                'clip_cv': clip_cv,
                'context_mean': context_sims.mean(),
                'context_sd': context_sims.std(),
                'context_cv': context_cv,
                'cv_difference': cv_difference,
                'levene_stat': levene_stat,
                'levene_p': levene_p,
                'sig': sig,
                'n_clip': len(clip_sims),
                'n_context': len(context_sims)
            })

            if verbose:
                print(f"\n{factor.upper()}:")
                print(f"  Clip-driven: M={clip_sims.mean():.4f}, SD={clip_sims.std():.4f}, CV={clip_cv:.4f}")
                print(f"  Context-driven: M={context_sims.mean():.4f}, SD={context_sims.std():.4f}, CV={context_cv:.4f}")
                print(f"  Levene's test: F={levene_stat:.3f}, p={levene_p:.4f} {sig}")

    return pd.DataFrame(clip_vs_context_consistency)


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
    3. Clip vs context moderator analysis
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
        - moderator_df: Clip vs context moderator results
        - consistency_df: Consistency analysis results
        - consistency_comparison_df: Clip vs context consistency comparison
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

    moderator_df = analyze_factor_clip_vs_context(
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
            f'{output_dir}/{model_prefix}_{factor_lower}_moderator_clip_vs_context.csv',
            index=False
        )

    if len(consistency_comparison_df) > 0:
        consistency_comparison_df.to_csv(
            f'{output_dir}/{model_prefix}_{factor_lower}_clip_vs_context_consistency.csv',
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


def create_comparative_within_factor_figure(
    context_df: pd.DataFrame,
    genre_df: pd.DataFrame,
    output_path: str,
    figsize: Tuple[int, int] = (16, 12)
) -> plt.Figure:
    """
    Side-by-side comparison of within-factor similarity and consistency.
    
    Layout (2x2):
    A - Context within-factor similarity
    B - Genre within-factor similarity
    C - Context consistency (CV)
    D - Genre consistency (CV)
    """
    fig = plt.figure(figsize=figsize)
    gs = fig.add_gridspec(2, 2, hspace=0.3, wspace=0.25)

    context_sorted = context_df.sort_values('mean', ascending=False)
    genre_sorted = genre_df.sort_values('mean', ascending=False)

    # PANEL A: Context within-factor similarity
    ax_a = fig.add_subplot(gs[0, 0])
    context_sorted.plot(kind='bar', x='context', y='mean', yerr='std',
                        ax=ax_a, capsize=5, color='teal',
                        edgecolor='black', alpha=0.8, legend=False)
    ax_a.set_title('A. Within-Context Similarity\n(Same Context, Different Clip)',
                   fontsize=13, fontweight='bold')
    ax_a.set_xlabel('')
    ax_a.set_ylabel('Mean Cosine Similarity', fontsize=11)
    ax_a.set_xticklabels(context_sorted['context'], rotation=45, ha='right', fontsize=10)
    ax_a.grid(axis='y', alpha=0.3)
    ax_a.axhline(y=context_sorted['mean'].mean(), color='red',
                 linestyle='--', alpha=0.5, linewidth=1.5, label='Overall Mean')
    ax_a.legend(fontsize=9)

    # PANEL B: Genre within-factor similarity
    ax_b = fig.add_subplot(gs[0, 1])
    genre_sorted.plot(kind='bar', x='genre', y='mean', yerr='std',
                      ax=ax_b, capsize=5, color='mediumpurple',
                      edgecolor='black', alpha=0.8, legend=False)
    ax_b.set_title('B. Within-Genre Similarity\n(Same Genre, Different Clips)',
                   fontsize=13, fontweight='bold')
    ax_b.set_xlabel('')
    ax_b.set_ylabel('Mean Cosine Similarity', fontsize=11)
    ax_b.set_xticklabels(genre_sorted['genre'], rotation=45, ha='right', fontsize=10)
    ax_b.grid(axis='y', alpha=0.3)
    ax_b.axhline(y=genre_sorted['mean'].mean(), color='red',
                 linestyle='--', alpha=0.5, linewidth=1.5, label='Overall Mean')
    ax_b.legend(fontsize=9)

    # PANEL C: Context consistency (CV)
    ax_c = fig.add_subplot(gs[1, 0])
    context_cv_sorted = context_df.sort_values('cv')
    context_cv_sorted.plot(kind='bar', x='context', y='cv',
                           ax=ax_c, color='coral',
                           edgecolor='black', alpha=0.8, legend=False)
    ax_c.set_title('C. Context Consistency\n(Lower CV = More Convergent)',
                   fontsize=13, fontweight='bold')
    ax_c.set_xlabel('Context', fontsize=11)
    ax_c.set_ylabel('Coefficient of Variation (CV)', fontsize=11)
    ax_c.set_xticklabels(context_cv_sorted['context'], rotation=45, ha='right', fontsize=10)
    ax_c.grid(axis='y', alpha=0.3)
    ax_c.axhline(y=context_cv_sorted['cv'].mean(), color='red',
                 linestyle='--', alpha=0.5, linewidth=1.5, label='Mean CV')
    ax_c.legend(fontsize=9)

    # PANEL D: Genre consistency (CV)
    ax_d = fig.add_subplot(gs[1, 1])
    genre_cv_sorted = genre_df.sort_values('cv')
    genre_cv_sorted.plot(kind='bar', x='genre', y='cv',
                         ax=ax_d, color='orange',
                         edgecolor='black', alpha=0.8, legend=False)
    ax_d.set_title('D. Genre Consistency\n(Lower CV = More Convergent)',
                   fontsize=13, fontweight='bold')
    ax_d.set_xlabel('Genre', fontsize=11)
    ax_d.set_ylabel('Coefficient of Variation (CV)', fontsize=11)
    ax_d.set_xticklabels(genre_cv_sorted['genre'], rotation=45, ha='right', fontsize=10)
    ax_d.grid(axis='y', alpha=0.3)
    ax_d.axhline(y=genre_cv_sorted['cv'].mean(), color='red',
                 linestyle='--', alpha=0.5, linewidth=1.5, label='Mean CV')
    ax_d.legend(fontsize=9)

    plt.suptitle('Within-Factor Analysis: Context vs. Genre',
                fontsize=16, fontweight='bold', y=0.995)

    plt.savefig(output_path, dpi=300, bbox_inches='tight')
    plt.close()
    return fig


def create_comparative_pairwise_figure(
    context_pairs_df: pd.DataFrame,
    genre_pairs_df: pd.DataFrame,
    output_path: str,
    figsize: Tuple[int, int] = (18, 8)
) -> plt.Figure:
    """
    Side-by-side comparison of pairwise effect sizes.
    
    Layout (1x2):
    A - Context pairwise comparisons
    B - Genre pairwise comparisons
    """
    fig, axes = plt.subplots(1, 2, figsize=figsize)

    # PANEL A: Context pairwise effect sizes
    if len(context_pairs_df) > 0:
        context_pairs_df['comparison'] = (context_pairs_df['context1'] + '\nvs\n' +
                                          context_pairs_df['context2'])
        context_sorted = context_pairs_df.sort_values('d', key=abs, ascending=True)
        colors_sig = ['steelblue' if sig != 'n.s.' else 'lightgray'
                     for sig in context_sorted['sig']]

        axes[0].barh(range(len(context_sorted)), context_sorted['d'],
                    color=colors_sig, edgecolor='black', alpha=0.8)
        axes[0].set_yticks(range(len(context_sorted)))
        axes[0].set_yticklabels(context_sorted['comparison'], fontsize=9)
        axes[0].set_xlabel("Cohen's d (Effect Size)", fontsize=11)
        axes[0].set_title('A. Pairwise Context Comparisons',
                         fontsize=13, fontweight='bold')
        axes[0].axvline(x=0, color='black', linestyle='-', linewidth=1.2)
        axes[0].axvline(x=0.5, color='gray', linestyle='--', alpha=0.4, linewidth=1)
        axes[0].axvline(x=-0.5, color='gray', linestyle='--', alpha=0.4, linewidth=1)
        axes[0].grid(axis='x', alpha=0.3)
    else:
        axes[0].text(0.5, 0.5, 'No pairwise comparisons available',
                    ha='center', va='center', fontsize=12, transform=axes[0].transAxes)

    # PANEL B: Genre pairwise effect sizes
    if len(genre_pairs_df) > 0:
        genre_pairs_df['comparison'] = (genre_pairs_df['genre1'] + '\nvs\n' +
                                        genre_pairs_df['genre2'])
        genre_sorted = genre_pairs_df.sort_values('d', key=abs, ascending=True)
        colors_sig = ['steelblue' if sig != 'n.s.' else 'lightgray'
                     for sig in genre_sorted['sig']]

        axes[1].barh(range(len(genre_sorted)), genre_sorted['d'],
                    color=colors_sig, edgecolor='black', alpha=0.8)
        axes[1].set_yticks(range(len(genre_sorted)))
        axes[1].set_yticklabels(genre_sorted['comparison'], fontsize=9)
        axes[1].set_xlabel("Cohen's d (Effect Size)", fontsize=11)
        axes[1].set_title('B. Pairwise Genre Comparisons',
                         fontsize=13, fontweight='bold')
        axes[1].axvline(x=0, color='black', linestyle='-', linewidth=1.2)
        axes[1].axvline(x=0.5, color='gray', linestyle='--', alpha=0.4, linewidth=1)
        axes[1].axvline(x=-0.5, color='gray', linestyle='--', alpha=0.4, linewidth=1)
        axes[1].grid(axis='x', alpha=0.3)
    else:
        axes[1].text(0.5, 0.5, 'No pairwise comparisons available',
                    ha='center', va='center', fontsize=12, transform=axes[1].transAxes)

    from matplotlib.patches import Patch
    from IPython.display import display, Image
    legend_elements = [
        Patch(facecolor='steelblue', edgecolor='black', label='Significant'),
        Patch(facecolor='lightgray', edgecolor='black', label='n.s.')
    ]
    fig.legend(handles=legend_elements, loc='lower center', ncol=2,
              fontsize=10, bbox_to_anchor=(0.5, -0.02))

    plt.suptitle('Pairwise Comparisons: Context vs. Genre',
                fontsize=16, fontweight='bold')

    plt.tight_layout()
    plt.savefig(output_path, dpi=300, bbox_inches='tight')
    plt.close()
    return fig


def create_comparative_clip_vs_context_figure(
    context_moderator_df: pd.DataFrame,
    genre_moderator_df: pd.DataFrame,
    output_path: str,
    figsize: Tuple[int, int] = (16, 12)
) -> plt.Figure:
    """
    Side-by-side comparison of clip vs. context effects by factor.
    
    Layout (2x2):
    A - Context: Clip vs. Context means
    B - Genre: Clip vs. Context means
    C - Context: Effect sizes
    D - Genre: Effect sizes
    """
    fig = plt.figure(figsize=figsize)
    gs = fig.add_gridspec(2, 2, hspace=0.3, wspace=0.25)

    # PANEL A: Context clip vs. context means
    ax_a = fig.add_subplot(gs[0, 0])
    if len(context_moderator_df) > 0:
        context_sorted = context_moderator_df.sort_values('difference')
        x = np.arange(len(context_sorted))
        width = 0.35

        ax_a.bar(x - width/2, context_sorted['clip_mean'],
                width, label='Clip-driven', color='#3498db',
                edgecolor='black', alpha=0.8)
        ax_a.bar(x + width/2, context_sorted['context_mean'],
                width, label='Context-driven', color='#e74c3c',
                edgecolor='black', alpha=0.8)

        ax_a.set_xlabel('')
        ax_a.set_ylabel('Mean Cosine Similarity', fontsize=10)
        ax_a.set_title('A. Clip vs. Context by Context',
                      fontsize=13, fontweight='bold')
        ax_a.set_xticks(x)
        ax_a.set_xticklabels(context_sorted['context'], rotation=45, ha='right', fontsize=10)
        ax_a.legend(fontsize=9, loc='upper right')
        ax_a.grid(axis='y', alpha=0.3)

        for i, (idx, row) in enumerate(context_sorted.iterrows()):
            if row['sig'] != 'n.s.':
                y_pos = max(row['clip_mean'], row['context_mean']) + 0.01
                ax_a.text(i, y_pos, row['sig'], ha='center', va='bottom',
                         fontsize=10, fontweight='bold')
    else:
        ax_a.text(0.5, 0.5, 'No data available',
                 ha='center', va='center', fontsize=12, transform=ax_a.transAxes)

    # PANEL B: Genre clip vs. context means
    ax_b = fig.add_subplot(gs[0, 1])
    if len(genre_moderator_df) > 0:
        genre_sorted = genre_moderator_df.sort_values('difference')
        x = np.arange(len(genre_sorted))
        width = 0.35

        ax_b.bar(x - width/2, genre_sorted['clip_mean'],
                width, label='Clip-driven', color='#3498db',
                edgecolor='black', alpha=0.8)
        ax_b.bar(x + width/2, genre_sorted['context_mean'],
                width, label='Context-driven', color='#e74c3c',
                edgecolor='black', alpha=0.8)

        ax_b.set_xlabel('')
        ax_b.set_ylabel('Mean Cosine Similarity', fontsize=10)
        ax_b.set_title('B. Clip vs. Context by Genre',
                      fontsize=13, fontweight='bold')
        ax_b.set_xticks(x)
        ax_b.set_xticklabels(genre_sorted['genre'], rotation=45, ha='right', fontsize=10)
        ax_b.legend(fontsize=9, loc='upper right')
        ax_b.grid(axis='y', alpha=0.3)

        for i, (idx, row) in enumerate(genre_sorted.iterrows()):
            if row['sig'] != 'n.s.':
                y_pos = max(row['clip_mean'], row['context_mean']) + 0.01
                ax_b.text(i, y_pos, row['sig'], ha='center', va='bottom',
                         fontsize=10, fontweight='bold')
    else:
        ax_b.text(0.5, 0.5, 'No data available',
                 ha='center', va='center', fontsize=12, transform=ax_b.transAxes)

    # PANEL C: Context effect sizes
    ax_c = fig.add_subplot(gs[1, 0])
    if len(context_moderator_df) > 0:
        context_sorted = context_moderator_df.sort_values('effect_size')
        colors = ['#3498db' if d > 0 else '#e74c3c'
                 for d in context_sorted['effect_size']]

        ax_c.barh(range(len(context_sorted)), context_sorted['effect_size'],
                        color=colors, edgecolor='black', alpha=0.8)
        ax_c.set_yticks(range(len(context_sorted)))
        ax_c.set_yticklabels(context_sorted['context'], fontsize=10)
        ax_c.set_xlabel("Cohen's d (Effect Size)", fontsize=10)
        ax_c.set_title('C. Context Effect Sizes\n(Positive = Clip > Context)',
                      fontsize=13, fontweight='bold')
        ax_c.axvline(x=0, color='black', linestyle='-', linewidth=1.2)
        ax_c.grid(axis='x', alpha=0.3)

        for i, (idx, row) in enumerate(context_sorted.iterrows()):
            if row['sig'] != 'n.s.':
                x_pos = row['effect_size'] + (0.05 if row['effect_size'] > 0 else -0.05)
                ax_c.text(x_pos, i, row['sig'], ha='left' if row['effect_size'] > 0 else 'right',
                         va='center', fontsize=9, fontweight='bold')
    else:
        ax_c.text(0.5, 0.5, 'No data available',
                 ha='center', va='center', fontsize=12, transform=ax_c.transAxes)

    # PANEL D: Genre effect sizes
    ax_d = fig.add_subplot(gs[1, 1])
    if len(genre_moderator_df) > 0:
        genre_sorted = genre_moderator_df.sort_values('effect_size')
        colors = ['#3498db' if d > 0 else '#e74c3c'
                 for d in genre_sorted['effect_size']]

        ax_d.barh(range(len(genre_sorted)), genre_sorted['effect_size'],
                        color=colors, edgecolor='black', alpha=0.8)
        ax_d.set_yticks(range(len(genre_sorted)))
        ax_d.set_yticklabels(genre_sorted['genre'], fontsize=10)
        ax_d.set_xlabel("Cohen's d (Effect Size)", fontsize=10)
        ax_d.set_title('D. Genre Effect Sizes\n(Positive = Clip > Context)',
                      fontsize=13, fontweight='bold')
        ax_d.axvline(x=0, color='black', linestyle='-', linewidth=1.2)
        ax_d.grid(axis='x', alpha=0.3)

        for i, (idx, row) in enumerate(genre_sorted.iterrows()):
            if row['sig'] != 'n.s.':
                x_pos = row['effect_size'] + (0.05 if row['effect_size'] > 0 else -0.05)
                ax_d.text(x_pos, i, row['sig'], ha='left' if row['effect_size'] > 0 else 'right',
                         va='center', fontsize=9, fontweight='bold')
    else:
        ax_d.text(0.5, 0.5, 'No data available',
                 ha='center', va='center', fontsize=12, transform=ax_d.transAxes)

    plt.suptitle('Clip vs. Context Effects: Context vs. Genre',
                fontsize=16, fontweight='bold', y=0.995)

    plt.savefig(output_path, dpi=300, bbox_inches='tight')
    plt.close()
    return fig


def create_comparative_consistency_figure(
    context_consistency_comp_df: pd.DataFrame,
    genre_consistency_comp_df: pd.DataFrame,
    output_path: str,
    figsize: Tuple[int, int] = (16, 7)
) -> plt.Figure:
    """
    Side-by-side comparison of clip vs. context consistency.
    
    Layout (1x2):
    A - Context: Clip vs. Context consistency (CV)
    B - Genre: Clip vs. Context consistency (CV)
    """
    fig, axes = plt.subplots(1, 2, figsize=figsize)

    # PANEL A: Context clip vs. context consistency
    if len(context_consistency_comp_df) > 0:
        context_sorted = context_consistency_comp_df.sort_values('context')
        x = np.arange(len(context_sorted))
        width = 0.35

        axes[0].bar(x - width/2, context_sorted['clip_cv'],
                   width, label='Clip-driven', color='#3498db',
                   edgecolor='black', alpha=0.8)
        axes[0].bar(x + width/2, context_sorted['context_cv'],
                   width, label='Context-driven', color='#e74c3c',
                   edgecolor='black', alpha=0.8)

        axes[0].set_xlabel('Context', fontsize=11)
        axes[0].set_ylabel('Coefficient of Variation (CV)', fontsize=11)
        axes[0].set_title('A. Consistency by Context\n(Lower CV = More Consistent)',
                         fontsize=13, fontweight='bold')
        axes[0].set_xticks(x)
        axes[0].set_xticklabels(context_sorted['context'], rotation=45, ha='right', fontsize=10)
        axes[0].legend(fontsize=10)
        axes[0].grid(axis='y', alpha=0.3)

        for i, (idx, row) in enumerate(context_sorted.iterrows()):
            if row['levene_p'] < 0.05:
                y_pos = max(row['clip_cv'], row['context_cv']) + 0.01
                axes[0].text(i, y_pos, row['sig'], ha='center', va='bottom',
                            fontsize=10, fontweight='bold')
    else:
        axes[0].text(0.5, 0.5, 'No data available',
                    ha='center', va='center', fontsize=12, transform=axes[0].transAxes)

    # PANEL B: Genre clip vs. context consistency
    if len(genre_consistency_comp_df) > 0:
        genre_sorted = genre_consistency_comp_df.sort_values('genre')
        x = np.arange(len(genre_sorted))
        width = 0.35

        axes[1].bar(x - width/2, genre_sorted['clip_cv'],
                   width, label='Clip-driven', color='#3498db',
                   edgecolor='black', alpha=0.8)
        axes[1].bar(x + width/2, genre_sorted['context_cv'],
                   width, label='Context-driven', color='#e74c3c',
                   edgecolor='black', alpha=0.8)

        axes[1].set_xlabel('Genre', fontsize=11)
        axes[1].set_ylabel('Coefficient of Variation (CV)', fontsize=11)
        axes[1].set_title('B. Consistency by Genre\n(Lower CV = More Consistent)',
                         fontsize=13, fontweight='bold')
        axes[1].set_xticks(x)
        axes[1].set_xticklabels(genre_sorted['genre'], rotation=45, ha='right', fontsize=10)
        axes[1].legend(fontsize=10)
        axes[1].grid(axis='y', alpha=0.3)

        for i, (idx, row) in enumerate(genre_sorted.iterrows()):
            if row['levene_p'] < 0.05:
                y_pos = max(row['clip_cv'], row['context_cv']) + 0.01
                axes[1].text(i, y_pos, row['sig'], ha='center', va='bottom',
                            fontsize=10, fontweight='bold')
    else:
        axes[1].text(0.5, 0.5, 'No data available',
                    ha='center', va='center', fontsize=12, transform=axes[1].transAxes)

    plt.suptitle('Consistency Comparison: Clip vs. Context Effects',
                fontsize=16, fontweight='bold')

    plt.tight_layout()
    plt.savefig(output_path, dpi=300, bbox_inches='tight')
    plt.close()
    return fig


def create_similarity_matrices_figure(
    context_within_df: pd.DataFrame,
    genre_within_df: pd.DataFrame,
    sim_df: pd.DataFrame,
    metadata: pd.DataFrame,
    output_path: str,
    figsize: Tuple[int, int] = (16, 7)
) -> plt.Figure:
    """
    Side-by-side similarity matrices for context and genre.
    
    Layout (1x2):
    A - Context similarity matrix
    B - Genre similarity matrix
    """
    fig, axes = plt.subplots(1, 2, figsize=figsize)

    # PANEL A: Context similarity matrix
    unique_contexts = metadata['context_word'].unique()
    context_matrix = np.zeros((len(unique_contexts), len(unique_contexts)))

    for i, ctx1 in enumerate(unique_contexts):
        for j, ctx2 in enumerate(unique_contexts):
            if i == j:
                val = context_within_df[context_within_df['context'] == ctx1]['mean'].values
                context_matrix[i, j] = val[0] if len(val) > 0 else np.nan
            else:
                cross_sims = sim_df[
                    (sim_df['context_i'] == ctx1) &
                    (sim_df['context_j'] == ctx2)
                ]['similarity']

                if len(cross_sims) > 0:
                    context_matrix[i, j] = cross_sims.mean()
                else:
                    cross_sims = sim_df[
                        (sim_df['context_i'] == ctx2) &
                        (sim_df['context_j'] == ctx1)
                    ]['similarity']
                    context_matrix[i, j] = cross_sims.mean() if len(cross_sims) > 0 else np.nan

    sns.heatmap(context_matrix, annot=True, fmt='.3f', cmap='YlOrRd',
                xticklabels=unique_contexts, yticklabels=unique_contexts, ax=axes[0],
                cbar_kws={'label': 'Mean Similarity'},
                mask=np.isnan(context_matrix),
                linewidths=0.5, linecolor='gray')

    axes[0].set_title('A. Context Similarity Matrix\n(Diagonal = Within-Context)',
                     fontsize=13, fontweight='bold')
    axes[0].set_xlabel('Context', fontsize=11)
    axes[0].set_ylabel('Context', fontsize=11)

    # PANEL B: Genre similarity matrix
    unique_genres = metadata['genre_code'].unique()
    genre_matrix = np.zeros((len(unique_genres), len(unique_genres)))

    for i, genre1 in enumerate(unique_genres):
        for j, genre2 in enumerate(unique_genres):
            if i == j:
                val = genre_within_df[genre_within_df['genre'] == genre1]['mean'].values
                genre_matrix[i, j] = val[0] if len(val) > 0 else np.nan
            else:
                cross_sims = sim_df[
                    (sim_df['genre_i'] == genre1) &
                    (sim_df['genre_j'] == genre2)
                ]['similarity']

                if len(cross_sims) > 0:
                    genre_matrix[i, j] = cross_sims.mean()
                else:
                    cross_sims = sim_df[
                        (sim_df['genre_i'] == genre2) &
                        (sim_df['genre_j'] == genre1)
                    ]['similarity']
                    genre_matrix[i, j] = cross_sims.mean() if len(cross_sims) > 0 else np.nan

    sns.heatmap(genre_matrix, annot=True, fmt='.3f', cmap='YlOrRd',
                xticklabels=unique_genres, yticklabels=unique_genres, ax=axes[1],
                cbar_kws={'label': 'Mean Similarity'},
                mask=np.isnan(genre_matrix),
                linewidths=0.5, linecolor='gray')

    axes[1].set_title('B. Genre Similarity Matrix\n(Diagonal = Within-Genre)',
                     fontsize=13, fontweight='bold')
    axes[1].set_xlabel('Genre', fontsize=11)
    axes[1].set_ylabel('Genre', fontsize=11)

    plt.suptitle('Similarity Matrices: Context vs. Genre',
                fontsize=16, fontweight='bold')

    plt.tight_layout()
    plt.savefig(output_path, dpi=300, bbox_inches='tight')
    plt.close()
    return fig


def create_genre_context_interaction_heatmap(
    genre_context_df: pd.DataFrame,
    output_path: str,
    figsize: Tuple[int, int] = (10, 8)
) -> plt.Figure:
    """
    Create Genre × Context interaction heatmap.
    """
    fig, ax = plt.subplots(figsize=figsize)

    genre_context_pivot = genre_context_df.pivot(index='genre', columns='context', values='mean')

    sns.heatmap(genre_context_pivot, annot=True, fmt='.3f', cmap='RdYlGn',
                ax=ax, cbar_kws={'label': 'Mean Similarity'},
                linewidths=0.5, linecolor='gray')

    ax.set_title('Genre × Context Interaction\n(Thought Similarity When Context Matches)',
                fontsize=14, fontweight='bold')
    ax.set_xlabel('Context', fontsize=12)
    ax.set_ylabel('Genre', fontsize=12)

    plt.tight_layout()
    plt.savefig(output_path, dpi=300, bbox_inches='tight')
    plt.close()
    return fig


def create_primary_comparison_bar_chart(
    sim_df: pd.DataFrame,
    primary_comparison: Dict[str, Any],
    output_path: str,
    figsize: Tuple[int, int] = (9, 7)
) -> plt.Figure:
    """
    Bar chart comparing clip vs context with confidence intervals and effect size.
    """
    fig, ax = plt.subplots(figsize=figsize)

    clip_data = sim_df[sim_df['condition'] == 'same_clip_diff_context']['similarity']
    context_data = sim_df[sim_df['condition'] == 'diff_clip_same_context']['similarity']

    clip_mean = clip_data.mean()
    context_mean = context_data.mean()
    
    # Calculate 95% CI
    clip_ci = stats.t.interval(0.95, len(clip_data)-1, loc=clip_mean, scale=stats.sem(clip_data))
    context_ci = stats.t.interval(0.95, len(context_data)-1, loc=context_mean, scale=stats.sem(context_data))

    categories = ['Clip-Driven\n(Same Clip,\nDiff Context)',
                  'Context-Driven\n(Diff Clip,\nSame Context)']
    means = [clip_mean, context_mean]
    colors_primary = ['#3498db', '#e74c3c']

    bars = ax.bar(categories, means, color=colors_primary, edgecolor='black',
                  linewidth=2, alpha=0.85, width=0.6)

    ci_ranges = [
        (clip_ci[1] - clip_ci[0]) / 2,
        (context_ci[1] - context_ci[0]) / 2
    ]
    ax.errorbar(range(len(means)), means, yerr=ci_ranges, fmt='none',
                ecolor='black', capsize=8, capthick=2, linewidth=2)

    for i, (bar, mean, ci, ci_range) in enumerate(zip(bars, means, [clip_ci, context_ci], ci_ranges)):
        height = bar.get_height()
        ax.text(bar.get_x() + bar.get_width()/2., height + ci_range + 0.008,
                f'{mean:.4f}', ha='center', va='bottom', fontsize=12, fontweight='bold')
        ax.text(bar.get_x() + bar.get_width()/2., height - 0.015,
                f'95% CI:\n[{ci[0]:.4f},\n{ci[1]:.4f}]',
                ha='center', va='top', fontsize=9, style='italic')

    mid_point = (means[0] + means[1]) / 2
    y_arrow = mid_point + 0.01
    ax.annotate('', xy=(0, y_arrow), xytext=(1, y_arrow),
                arrowprops=dict(arrowstyle='<->', lw=2.5, color='black'))

    effect_text = f"Cohen's d = {primary_comparison['d']:.3f} {primary_comparison['sig']}\n"
    effect_text += f"Δ = {primary_comparison['diff']:.4f} ({(primary_comparison['diff']/context_mean)*100:+.1f}%)\n"
    effect_text += f"t = {primary_comparison['t']:.2f}, p = {primary_comparison['p']:.4f}"
    ax.text(0.5, y_arrow + 0.02, effect_text,
            ha='center', va='bottom', fontsize=11, fontweight='bold',
            bbox=dict(boxstyle='round,pad=0.8', facecolor='yellow',
                     edgecolor='black', alpha=0.8, linewidth=2))

    ax.set_ylabel('Mean Cosine Similarity', fontsize=13, fontweight='bold')
    ax.set_title('Clip vs. Context Influence\n' +
                 'Which Factor Drives Thought Similarity More?',
                 fontsize=14, fontweight='bold', pad=20)
    ax.set_ylim([0, max(means) * 1.35])
    ax.grid(axis='y', alpha=0.3, linestyle='--')
    ax.set_axisbelow(True)

    ax.text(0, -0.08, f'N = {len(clip_data)}',
            transform=ax.transData, ha='center', fontsize=10, style='italic')
    ax.text(1, -0.08, f'N = {len(context_data)}',
            transform=ax.transData, ha='center', fontsize=10, style='italic')

    plt.tight_layout()
    plt.savefig(output_path, dpi=300, bbox_inches='tight')
    plt.close()
    return fig


def create_comprehensive_conditions_figure(
    sim_df: pd.DataFrame,
    primary_comparison: Dict[str, Any],
    output_path: str,
    figsize: Tuple[int, int] = (16, 12)
) -> plt.Figure:
    """
    Comprehensive 4-panel comparison showing all conditions.
    
    Layout (2x2):
    A - Boxplot comparison
    B - Distribution histogram
    C - All conditions violin plot
    """
    fig = plt.figure(figsize=figsize)
    gs = fig.add_gridspec(2, 2, hspace=0.3, wspace=0.3)

    # PANEL A: Boxplot comparison
    ax_a = fig.add_subplot(gs[0, 0])
    comparison_data = sim_df[sim_df['condition'].isin([
        'same_clip_diff_context',
        'diff_clip_same_context'
    ])].copy()

    comparison_data['condition_label'] = comparison_data['condition'].map({
        'same_clip_diff_context': 'Same Clip\nDifferent Context',
        'diff_clip_same_context': 'Different Clip\nSame Context'
    })

    order = ['Same Clip\nDifferent Context', 'Different Clip\nSame Context']
    palette = ['#e74c3c', '#3498db']

    sns.boxplot(data=comparison_data, x='condition_label', y='similarity', ax=ax_a,
                hue='condition_label', palette=palette, legend=False, order=order)
    sns.stripplot(data=comparison_data, x='condition_label', y='similarity', ax=ax_a,
                  hue='condition_label', palette='dark:black', alpha=0.3, size=3,
                  legend=False, order=order)

    ax_a.set_title('A. Distribution Comparison\n(Clip vs. Context)',
                   fontsize=12, fontweight='bold')
    ax_a.set_xlabel('')
    ax_a.set_ylabel('Cosine Similarity', fontsize=10)
    ax_a.grid(axis='y', alpha=0.3)

    y_max_a = comparison_data['similarity'].max()
    bracket_y_a = y_max_a + 0.05
    ax_a.plot([0, 1], [bracket_y_a, bracket_y_a], 'k-', linewidth=2)
    ax_a.plot([0, 0], [bracket_y_a - 0.01, bracket_y_a], 'k-', linewidth=2)
    ax_a.plot([1, 1], [bracket_y_a - 0.01, bracket_y_a], 'k-', linewidth=2)
    ax_a.text(0.5, bracket_y_a + 0.01, primary_comparison['sig'],
             ha='center', va='bottom', fontsize=11, fontweight='bold')

    # PANEL B: Distribution histogram
    ax_b = fig.add_subplot(gs[0, 1])
    clip_driven = sim_df[sim_df['condition'] == 'same_clip_diff_context']['similarity']
    context_driven = sim_df[sim_df['condition'] == 'diff_clip_same_context']['similarity']

    ax_b.hist(clip_driven, bins=25, alpha=0.6, label='Same Clip, Diff Context',
              color='#3498db', density=True, edgecolor='black')
    ax_b.hist(context_driven, bins=25, alpha=0.6, label='Diff Clip, Same Context',
              color='#e74c3c', density=True, edgecolor='black')
    ax_b.axvline(clip_driven.mean(), color='#3498db', linestyle='--', linewidth=2.5,
                 label=f'Clip Mean: {clip_driven.mean():.3f}')
    ax_b.axvline(context_driven.mean(), color='#e74c3c', linestyle='--', linewidth=2.5,
                 label=f'Context Mean: {context_driven.mean():.3f}')

    ax_b.set_xlabel('Cosine Similarity', fontsize=10)
    ax_b.set_ylabel('Density', fontsize=10)
    ax_b.set_title('B. Distribution Overlap',
                   fontsize=12, fontweight='bold')
    ax_b.legend(fontsize=9, loc='upper right')
    ax_b.grid(axis='y', alpha=0.3)

    # PANEL C: All conditions violin plot
    ax_c = fig.add_subplot(gs[1, :])

    order_all = ['same_clip_diff_context', 'diff_clip_same_context',
                 'diff_clip_diff_context_same_genre', 'diff_clip_diff_context_diff_genre']
    labels_all = ['Same Clip\nDiff Context\n(Clip-Driven)',
                  'Diff Clip\nSame Context\n(Context-Driven)',
                  'Both Different\nSame Genre',
                  'Both Different\nDiff Genre']
    palette_all = {
        'same_clip_diff_context': '#3498db',
        'diff_clip_same_context': '#e74c3c',
        'diff_clip_diff_context_same_genre': '#2ecc71',
        'diff_clip_diff_context_diff_genre': '#95a5a6'
    }

    sns.violinplot(data=sim_df, x='condition', y='similarity', ax=ax_c,
                   order=order_all, hue='condition', palette=palette_all,
                   legend=False, inner='box', linewidth=1.5)

    ax_c.set_xticklabels(labels_all, rotation=0, ha='center', fontsize=10)
    ax_c.set_title('C. All Experimental Conditions (Clip vs. Context Highlighted)',
                   fontsize=12, fontweight='bold')
    ax_c.set_xlabel('')
    ax_c.set_ylabel('Cosine Similarity', fontsize=10)
    ax_c.grid(axis='y', alpha=0.3, linestyle='--')
    ax_c.set_axisbelow(True)

    y_max_c = sim_df['similarity'].max()
    bracket_y_c = y_max_c + 0.08
    ax_c.plot([0, 1], [bracket_y_c, bracket_y_c], 'k-', linewidth=2)
    ax_c.plot([0, 0], [bracket_y_c - 0.01, bracket_y_c], 'k-', linewidth=2)
    ax_c.plot([1, 1], [bracket_y_c - 0.01, bracket_y_c], 'k-', linewidth=2)
    ax_c.text(0.5, bracket_y_c + 0.01,
              f"Primary Comparison\nd = {primary_comparison['d']:.3f} {primary_comparison['sig']}",
              ha='center', va='bottom', fontsize=10, fontweight='bold',
              bbox=dict(boxstyle='round', facecolor='yellow', alpha=0.7,
                       edgecolor='black', linewidth=1.5))

    for i, cond in enumerate(order_all):
        n = len(sim_df[sim_df['condition'] == cond])
        ax_c.text(i, -0.05, f'n={n}', ha='center', va='top',
                  transform=ax_c.get_xaxis_transform(), fontsize=9, style='italic')

    overall_mean = sim_df['similarity'].mean()
    ax_c.axhline(y=overall_mean, color='darkgreen', linestyle=':',
                 linewidth=2, alpha=0.5, label=f'Overall Mean: {overall_mean:.4f}')
    ax_c.legend(loc='upper right', fontsize=9)

    plt.suptitle('Comprehensive Condition Comparison Analysis',
                fontsize=15, fontweight='bold', y=0.995)

    plt.savefig(output_path, dpi=300, bbox_inches='tight')
    plt.close()
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
# t-SNE DIMENSIONALITY REDUCTION
# ==============================================================================

def run_tsne_analysis(
    embedding_matrix: np.ndarray,
    metadata: pd.DataFrame,
    output_dir: str,
    model_prefix: str = 'TFIDF',
    svd_components: int = 50,
    tsne_perplexity: int = 30,
    tsne_n_iter: int = 1000,
    tsne_random_state: int = 42,
    do_word_tsne: bool = False,
    tfidf_scores_df: Optional[pd.DataFrame] = None,
    top_n_words: int = 500,
    verbose: bool = True
) -> Tuple[pd.DataFrame, Optional[pd.DataFrame]]:
    """
    Run t-SNE dimensionality reduction on document embeddings.
    
    Parameters
    ----------
    embedding_matrix : np.ndarray
        Document embedding matrix (n_docs, n_features) - can be sparse or dense
    metadata : pd.DataFrame
        Document metadata with columns: ClipContext_pair, clip_name, context_word, genre_code
    output_dir : str
        Directory to save outputs
    model_prefix : str
        Prefix for output files (e.g., 'TFIDF', 'W2V', 'BERT')
    svd_components : int
        Number of SVD components for dimensionality reduction before t-SNE
    tsne_perplexity : int
        t-SNE perplexity parameter
    tsne_n_iter : int
        Number of t-SNE iterations
    tsne_random_state : int
        Random state for reproducibility
    do_word_tsne : bool
        Whether to run t-SNE on word vectors (only for TF-IDF)
    tfidf_scores_df : pd.DataFrame, optional
        TF-IDF scores dataframe for word-level t-SNE (rows=docs, cols=terms)
    top_n_words : int
        Number of top words to include in word t-SNE
    verbose : bool
        Whether to print progress messages
        
    Returns
    -------
    Tuple[pd.DataFrame, Optional[pd.DataFrame]]
        - doc_tsne_df: Document t-SNE coordinates with metadata
        - word_tsne_df: Word t-SNE coordinates (None if do_word_tsne=False)
    """
    if verbose:
        print("\n" + "="*70)
        print(f"t-SNE ANALYSIS ({model_prefix})")
        print("="*70)
    
    # Convert to dense if sparse
    if hasattr(embedding_matrix, "toarray"):
        X_docs = embedding_matrix.toarray()
        if verbose:
            print(f"Converted sparse matrix to dense")
    else:
        X_docs = embedding_matrix
    
    if verbose:
        print(f"Document embedding shape: {X_docs.shape}")
    
    # Ensure alignment
    if X_docs.shape[0] != len(metadata):
        raise ValueError(f"Embedding rows ({X_docs.shape[0]}) != metadata rows ({len(metadata)})")
    
    # Dimensionality reduction with TruncatedSVD
    n_svd = min(svd_components, X_docs.shape[1] - 1) if X_docs.shape[1] > 1 else 1
    if n_svd <= 0:
        n_svd = 1
    
    if verbose:
        print(f"\nRunning TruncatedSVD -> {n_svd} components (original dim={X_docs.shape[1]})")
    
    svd = TruncatedSVD(n_components=n_svd, random_state=tsne_random_state)
    X_svd = svd.fit_transform(X_docs)
    
    explained = svd.explained_variance_ratio_.sum()
    if verbose:
        print(f"TruncatedSVD explained variance ratio: {explained:.3f}")
    
    # t-SNE on documents
    if verbose:
        print(f"\nRunning t-SNE on document vectors...")
        print(f"  Perplexity: {tsne_perplexity}")
        print(f"  Iterations: {tsne_n_iter}")
    
    tsne = TSNE(n_components=2, perplexity=tsne_perplexity, n_iter=tsne_n_iter,
                random_state=tsne_random_state, init='pca', learning_rate='auto')
    X_doc_emb = tsne.fit_transform(X_svd)
    
    # Create results dataframe
    meta_subset = metadata[['ClipContext_pair', 'clip_name', 'context_word', 'genre_code']].reset_index(drop=True)
    emb_df = pd.DataFrame(X_doc_emb, columns=['TSNE1', 'TSNE2'])
    doc_tsne_df = pd.concat([meta_subset, emb_df], axis=1)
    
    # Save coordinates
    doc_coords_path = os.path.join(output_dir, f'{model_prefix}_tsne_coords.csv')
    doc_tsne_df.to_csv(doc_coords_path, index=False)
    if verbose:
        print(f"\n✓ Saved document t-SNE coordinates to: {doc_coords_path}")
    
    # Plot document t-SNE
    _plot_document_tsne(doc_tsne_df, output_dir, model_prefix, verbose)
    
    # Optional: Word-level t-SNE (only for TF-IDF)
    word_tsne_df = None
    if do_word_tsne and tfidf_scores_df is not None:
        word_tsne_df = _run_word_tsne(
            tfidf_scores_df, output_dir, model_prefix,
            top_n_words, tsne_random_state, verbose
        )
    
    if verbose:
        print("\n✓ t-SNE analysis complete")
    
    return doc_tsne_df, word_tsne_df


def _plot_document_tsne(
    tsne_df: pd.DataFrame,
    output_dir: str,
    model_prefix: str,
    verbose: bool
) -> None:
    """Helper function to plot document t-SNE results."""
    plt.figure(figsize=(10, 8))
    sns.set(style='whitegrid', font_scale=1.1)
    
    ax = sns.scatterplot(data=tsne_df, x='TSNE1', y='TSNE2',
                         hue='genre_code', style='context_word',
                         palette='tab10', s=120, alpha=0.9)
    
    plt.title(f't-SNE: {model_prefix} Document Embeddings (2D)', fontsize=13, fontweight='bold')
    plt.legend(bbox_to_anchor=(1.05, 1), loc='upper left', borderaxespad=0.)
    plt.tight_layout()
    
    plot_path = os.path.join(output_dir, f'{model_prefix}_tsne_plot.png')
    plt.savefig(plot_path, dpi=300, bbox_inches='tight')
    plt.close()
    
    if verbose:
        print(f"✓ Saved document t-SNE plot to: {plot_path}")


def _run_word_tsne(
    tfidf_scores_df: pd.DataFrame,
    output_dir: str,
    model_prefix: str,
    top_n_words: int,
    random_state: int,
    verbose: bool
) -> pd.DataFrame:
    """Helper function to run word-level t-SNE (TF-IDF only)."""
    if verbose:
        print(f"\nRunning word-level t-SNE on top {top_n_words} terms...")
    
    # Select top-N words by average TF-IDF
    term_means = tfidf_scores_df.mean(axis=0)
    top_terms = term_means.sort_values(ascending=False).head(top_n_words).index.tolist()
    
    if verbose:
        print(f"Selected {len(top_terms)} terms by mean TF-IDF")
    
    # Build term x doc matrix
    W = tfidf_scores_df[top_terms].T.values  # shape (n_terms, n_docs)
    
    # Reduce with SVD
    svd_w_components = min(30, W.shape[1] - 1) if W.shape[1] > 1 else 1
    if svd_w_components <= 0:
        svd_w_components = 1
    svd_w = TruncatedSVD(n_components=svd_w_components, random_state=random_state)
    W_reduced = svd_w.fit_transform(W)
    
    # t-SNE
    tsne_w = TSNE(n_components=2, perplexity=30, n_iter=1000,
                  random_state=random_state, init='pca', learning_rate='auto')
    W_emb = tsne_w.fit_transform(W_reduced)
    
    # Create results dataframe
    words_df = pd.DataFrame(W_emb, columns=['TSNE1', 'TSNE2'])
    words_df['term'] = top_terms
    
    words_csv = os.path.join(output_dir, f'{model_prefix}_word_tsne_top{len(top_terms)}.csv')
    words_df.to_csv(words_csv, index=False)
    if verbose:
        print(f"✓ Saved word t-SNE coords to: {words_csv}")
    
    # Plot words
    _plot_word_tsne(words_df, term_means, top_terms, output_dir, model_prefix, verbose)
    
    return words_df


def _plot_word_tsne(
    words_df: pd.DataFrame,
    term_means: pd.Series,
    top_terms: List[str],
    output_dir: str,
    model_prefix: str,
    verbose: bool,
    annotate_k: int = 60
) -> None:
    """Helper function to plot word t-SNE results."""
    plt.figure(figsize=(12, 10))
    sns.scatterplot(data=words_df, x='TSNE1', y='TSNE2', s=40, color='darkgreen', alpha=0.7)
    
    # Annotate top K highest-mean tfidf words
    annotate_terms = term_means.loc[top_terms].sort_values(ascending=False).head(annotate_k).index
    for _, row in words_df[words_df['term'].isin(annotate_terms)].iterrows():
        plt.text(row['TSNE1'] + 0.5, row['TSNE2'] + 0.5, row['term'], fontsize=9)
    
    plt.title(f't-SNE: top-{len(top_terms)} TF-IDF terms (annotated top {annotate_k})',
              fontsize=13, fontweight='bold')
    plt.tight_layout()
    
    words_png = os.path.join(output_dir, f'{model_prefix}_word_tsne_top{len(top_terms)}.png')
    plt.savefig(words_png, dpi=300, bbox_inches='tight')
    plt.close()
    
    if verbose:
        print(f"✓ Saved word t-SNE plot to: {words_png}")


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


def generate_all_visualizations(
    context_within_df: pd.DataFrame,
    genre_within_df: pd.DataFrame,
    context_pairs_df: pd.DataFrame,
    genre_pairs_df: pd.DataFrame,
    context_moderator_df: pd.DataFrame,
    genre_moderator_df: pd.DataFrame,
    context_consistency_df: pd.DataFrame,
    genre_consistency_df: pd.DataFrame,
    context_consistency_comp_df: pd.DataFrame,
    genre_consistency_comp_df: pd.DataFrame,
    genre_context_df: pd.DataFrame,
    sim_df: pd.DataFrame,
    metadata: pd.DataFrame,
    primary_comparison: Dict[str, Any],
    output_dir: str,
    model_prefix: str = 'TFIDF',
    verbose: bool = True
) -> None:
    """
    Generate all visualization figures in one call and display them inline
    (useful when running in a Jupyter notebook). Figures are still saved to disk.
    """
    if verbose:
        print("\n" + "="*70)
        print("GENERATING FACTOR-SPECIFIC VISUALIZATIONS")
        print("="*70)

    # local import to avoid hard dependency for non-notebook contexts
    try:
        from IPython.display import display, Image
    except Exception:
        display = None
        Image = None
    os.makedirs(output_dir, exist_ok=True)

    os.makedirs(output_dir, exist_ok=True)

    # Helper to save & display image if possible
    def _call_and_display(func, *args, out_path: str, **kwargs):
        """Call plotting function, then display saved image if running in notebook."""
        # Call function (they save and often close the figure internally)
        try:
            _ = func(*args, **kwargs)
        except Exception as e:
            if verbose:
                print(f"WARNING: {func.__name__} raised an error: {e}")
            return

        # Display saved image inline if IPython is available and file exists
        if display is not None and Image is not None and os.path.exists(out_path):
            try:
                display(Image(filename=out_path))
            except Exception:
                # fallback to printing path
                if verbose:
                    print(f"Saved figure at: {out_path}")
        else:
            if verbose:
                print(f"Saved figure at: {out_path}")

    # Prepare filepaths and call each plotting function, displaying inline when possible
    # 1. Within-factor comparison
    out1 = os.path.join(output_dir, f'{model_prefix}_within_factor_comparison.png')
    if verbose:
        print("\n1. Generating within-factor comparison (Context vs. Genre)...")
    _call_and_display(
        create_comparative_within_factor_figure,
        context_within_df, genre_within_df,
        out_path=out1,
        output_path=out1
    )

    # 2. Pairwise comparison
    out2 = os.path.join(output_dir, f'{model_prefix}_pairwise_comparison.png')
    if verbose:
        print("\n2. Generating pairwise comparison (Context vs. Genre)...")
    _call_and_display(
        create_comparative_pairwise_figure,
        context_pairs_df, genre_pairs_df,
        out_path=out2,
        output_path=out2
    )

    # 3. Clip vs. context comparison
    out3 = os.path.join(output_dir, f'{model_prefix}_clip_vs_context_comparison.png')
    if verbose:
        print("\n3. Generating clip vs. context comparison (Context vs. Genre)...")
    _call_and_display(
        create_comparative_clip_vs_context_figure,
        context_moderator_df, genre_moderator_df,
        out_path=out3,
        output_path=out3
    )

    # 4. Consistency comparison
    out4 = os.path.join(output_dir, f'{model_prefix}_consistency_comparison.png')
    if verbose:
        print("\n4. Generating consistency comparison (Context vs. Genre)...")
    _call_and_display(
        create_comparative_consistency_figure,
        context_consistency_comp_df, genre_consistency_comp_df,
        out_path=out4,
        output_path=out4
    )

    # 5. Similarity matrices
    out5 = os.path.join(output_dir, f'{model_prefix}_similarity_matrices.png')
    if verbose:
        print("\n5. Generating similarity matrices (Context vs. Genre)...")
    _call_and_display(
        create_similarity_matrices_figure,
        context_within_df, genre_within_df, sim_df, metadata,
        out_path=out5,
        output_path=out5
    )

    # 6. Genre × Context interaction
    out6 = os.path.join(output_dir, f'{model_prefix}_genre_context_interaction.png')
    if verbose:
        print("\n6. Generating Genre × Context interaction heatmap...")
    _call_and_display(
        create_genre_context_interaction_heatmap,
        genre_context_df,
        out_path=out6,
        output_path=out6
    )

    # 7. Primary comparison bar chart
    out7 = os.path.join(output_dir, f'{model_prefix}_clip_vs_context.png')
    if verbose:
        print("\n7. Generating primary comparison bar chart...")
    _call_and_display(
        create_primary_comparison_bar_chart,
        sim_df, primary_comparison,
        out_path=out7,
        output_path=out7
    )

    # 8. Comprehensive conditions figure
    out8 = os.path.join(output_dir, f'{model_prefix}_comprehensive_conditions.png')
    if verbose:
        print("\n8. Generating comprehensive conditions figure...")
    _call_and_display(
        create_comprehensive_conditions_figure,
        sim_df, primary_comparison,
        out_path=out8,
        output_path=out8
    )

    if verbose:
        print("\n" + "="*70)
        print("FACTOR-SPECIFIC VISUALIZATION SUMMARY")
        print("="*70)
        print("Generated 8 comprehensive figures (saved and displayed inline if in a notebook).")
        print("="*70)


# End of file