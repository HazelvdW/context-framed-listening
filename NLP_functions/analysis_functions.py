"""
Analysis Functions for NLP Analysis
Author: Hazel A. van der Walle
Durham University, Music Department

Functions for factor-specific analyses (context, genre).
"""

import numpy as np
import pandas as pd
from scipy import stats
from scipy.stats import levene


def analyze_within_factor_similarity(sim_df, metadata, factor_column, factor_name):
    """
    Analyze within-factor similarity (e.g., same context/genre, different clips).
    
    Parameters:
    -----------
    sim_df : pd.DataFrame
        Similarity dataframe
    metadata : pd.DataFrame
        Document metadata
    factor_column : str
        'context_word' or 'genre_code'
    factor_name : str
        'Context' or 'Genre' (for display)
    
    Returns:
    --------
    pd.DataFrame : Within-factor statistics
    """
    print(f"\n1. WITHIN-{factor_name.upper()} SIMILARITY")
    print("-" * 70)
    
    if factor_name == 'Context':
        print("When different music is heard with the same context, how similar are thoughts?")
        condition_filter = sim_df['condition'] == 'diff_clip_same_context'
    else:  # Genre
        print("When different clips from the same genre are heard, how similar are thoughts?")
        condition_filter = (sim_df['same_genre'] == True) & (sim_df['same_clip'] == False)
    
    within_results = []
    factors = metadata[factor_column].unique()
    factor_key = factor_column.split('_')[0]
    
    for factor in factors:
        factor_sims = sim_df[
            condition_filter &
            (sim_df[f'{factor_key}_i'] == factor) &
            (sim_df[f'{factor_key}_j'] == factor)
        ]['similarity']
        
        if len(factor_sims) > 0:
            within_results.append({
                factor_name.lower(): factor,
                'mean': factor_sims.mean(),
                'std': factor_sims.std(),
                'n': len(factor_sims),
                'cv': factor_sims.std() / factor_sims.mean()
            })
            
            print(f"\n{factor.upper()}:")
            print(f"  Mean similarity: {factor_sims.mean():.4f}")
            print(f"  SD: {factor_sims.std():.4f}")
            print(f"  CV: {factor_sims.std() / factor_sims.mean():.4f}")
            print(f"  N pairs: {len(factor_sims)}")
    
    within_df = pd.DataFrame(within_results).sort_values('mean', ascending=False)
    
    print(f"\n{'-'*70}")
    print(f"RANKING: {factor_name}s by Thought Convergence")
    print("-"*70)
    for i, row in within_df.iterrows():
        print(f"  {i+1}. {row[factor_name.lower()].upper()}: M={row['mean']:.4f} (CV={row['cv']:.4f})")
    
    print(f"\n→ {within_df.iloc[0][factor_name.lower()].upper()} produces MOST similar thoughts")
    print(f"→ {within_df.iloc[-1][factor_name.lower()].upper()} produces MOST DIVERSE thoughts")
    
    return within_df


def analyze_pairwise_factor_comparisons(sim_df, metadata, factor_column, factor_name, within_df):
    """
    Pairwise comparisons between different factors.
    
    Parameters:
    -----------
    sim_df : pd.DataFrame
        Similarity dataframe
    metadata : pd.DataFrame
        Document metadata
    factor_column : str
        'context_word' or 'genre_code'
    factor_name : str
        'Context' or 'Genre'
    within_df : pd.DataFrame
        Within-factor results (not used directly, but kept for consistency)
    
    Returns:
    --------
    pd.DataFrame : Pairwise comparison statistics
    """
    print(f"\n\n2. PAIRWISE {factor_name.upper()} COMPARISONS")
    print("-" * 70)
    
    if factor_name == 'Context':
        condition_filter = sim_df['condition'] == 'diff_clip_same_context'
    else:  # Genre
        condition_filter = (sim_df['same_genre'] == True) & (sim_df['same_clip'] == False)
    
    factor_pairs = []
    factors_list = list(metadata[factor_column].unique())
    factor_key = factor_column.split('_')[0]
    
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
                pooled_std = np.sqrt((factor1_sims.std()**2 + factor2_sims.std()**2) / 2)
                effect_size = (factor1_sims.mean() - factor2_sims.mean()) / pooled_std
                
                if p_val < 0.001:
                    sig = "***"
                elif p_val < 0.01:
                    sig = "**"
                elif p_val < 0.05:
                    sig = "*"
                else:
                    sig = "n.s."
                
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
    
    print(f"\nSignificant differences between {factor_name.lower()}s:")
    for _, row in pairs_df.iterrows():
        if row['sig'] != 'n.s.':
            print(f"\n{row[f'{factor_name.lower()}1'].upper()} vs {row[f'{factor_name.lower()}2'].upper()}:")
            print(f"  Means: {row['mean1']:.4f} vs {row['mean2']:.4f}")
            print(f"  Difference: {row['difference']:.4f}")
            print(f"  t = {row['t']:.3f}, p = {row['p']:.4f} {row['sig']}, d = {row['d']:.3f}")
    
    return pairs_df


def analyze_factor_music_vs_context(sim_df, metadata, factor_column, factor_name):
    """
    Compare music-driven vs. context-driven effects within each factor level.
    
    Parameters:
    -----------
    sim_df : pd.DataFrame
        Similarity dataframe
    metadata : pd.DataFrame
        Document metadata
    factor_column : str
        'context_word' or 'genre_code'
    factor_name : str
        'Context' or 'Genre'
    
    Returns:
    --------
    pd.DataFrame : Comparison statistics
    """
    print(f"\n\n3. {factor_name.upper()}-SPECIFIC COMPARISON: Music vs. Context Effects")
    print("-" * 70)
    print(f"For each {factor_name.lower()}, comparing:")
    print("  - Music-driven similarity: same clip heard in DIFFERENT contexts")
    print("  - Context-driven similarity: DIFFERENT clips heard in the same context")
    
    moderator_results = []
    factors = metadata[factor_column].unique()
    factor_key = factor_column.split('_')[0]
    
    for factor in factors:
        # MUSIC-DRIVEN: Same clip, different contexts
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
        
        # CONTEXT-DRIVEN: Different clips, same context
        context_filter = (
            (sim_df['condition'] == 'diff_clip_same_context') &
            (sim_df[f'{factor_key}_i'] == factor) &
            (sim_df[f'{factor_key}_j'] == factor)
        )
        context_sims = sim_df[context_filter]['similarity']
        
        if len(music_sims) > 0 and len(context_sims) > 0:
            t_stat, p_val = stats.ttest_ind(music_sims, context_sims)
            pooled_std = np.sqrt((music_sims.std()**2 + context_sims.std()**2) / 2)
            effect_size = (music_sims.mean() - context_sims.mean()) / pooled_std
            
            if p_val < 0.001:
                sig = "***"
            elif p_val < 0.01:
                sig = "**"
            elif p_val < 0.05:
                sig = "*"
            else:
                sig = "n.s."
            
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
            
            print(f"\n{factor.upper()}:")
            print(f"  Music-driven: M={music_sims.mean():.4f}, SD={music_sims.std():.4f} (N={len(music_sims)})")
            print(f"  Context-driven: M={context_sims.mean():.4f}, SD={context_sims.std():.4f} (N={len(context_sims)})")
            print(f"  Difference: {music_sims.mean() - context_sims.mean():.4f}")
            print(f"  t({len(music_sims) + len(context_sims) - 2}) = {t_stat:.3f}, p = {p_val:.4f} {sig}")
            print(f"  Cohen's d = {effect_size:.3f}")
    
    if len(moderator_results) > 0:
        moderator_df = pd.DataFrame(moderator_results)
        
        print(f"\n{'-'*70}")
        print(f"{factor_name.upper()}-SPECIFIC SUMMARY")
        print("-"*70)
        
        music_dominant = moderator_df[
            (moderator_df['difference'] > 0) &
            (moderator_df['sig'] != 'n.s.')
        ]
        context_dominant = moderator_df[
            (moderator_df['difference'] < 0) &
            (moderator_df['sig'] != 'n.s.')
        ]
        no_difference = moderator_df[moderator_df['sig'] == 'n.s.']
        
        print(f"\nAcross {len(moderator_df)} {factor_name.lower()}s:")
        print(f"  Music-dominant: {len(music_dominant)} {factor_name.lower()}s")
        if len(music_dominant) > 0:
            print(f"    {', '.join(music_dominant[factor_name.lower()].values)}")
        
        print(f"  Context-dominant: {len(context_dominant)} {factor_name.lower()}s")
        if len(context_dominant) > 0:
            print(f"    {', '.join(context_dominant[factor_name.lower()].values)}")
        
        print(f"  No significant difference: {len(no_difference)} {factor_name.lower()}s")
        if len(no_difference) > 0:
            print(f"    {', '.join(no_difference[factor_name.lower()].values)}")
        
        return moderator_df
    
    return pd.DataFrame()


def analyze_factor_consistency(sim_df, metadata, factor_column, factor_name):
    """
    Analyze consistency (CV) within each factor and compare music vs. context consistency.
    
    Parameters:
    -----------
    sim_df : pd.DataFrame
        Similarity dataframe
    metadata : pd.DataFrame
        Document metadata
    factor_column : str
        'context_word' or 'genre_code'
    factor_name : str
        'Context' or 'Genre'
    
    Returns:
    --------
    tuple : (within_consistency_df, music_vs_context_consistency_df)
    """
    print(f"\n{'-'*70}")
    print(f"WITHIN-{factor_name.upper()} CONSISTENCY ANALYSIS")
    print("-"*70)
    print(f"Testing which {factor_name.lower()}s produce more consistent/convergent thought patterns")
    print(f"Lower CV = more convergent/consistent thoughts within that {factor_name.lower()}\n")
    
    consistency_results = []
    factors = metadata[factor_column].unique()
    factor_key = factor_column.split('_')[0]
    
    if factor_name == 'Context':
        condition_filter = sim_df['condition'] == 'diff_clip_same_context'
    else:  # Genre
        condition_filter = (sim_df['same_genre'] == True) & (sim_df['same_clip'] == False)
    
    for factor in factors:
        factor_sims = sim_df[
            condition_filter &
            (sim_df[f'{factor_key}_i'] == factor) &
            (sim_df[f'{factor_key}_j'] == factor)
        ]['similarity']
        
        if len(factor_sims) > 0:
            mean_sim = factor_sims.mean()
            std_sim = factor_sims.std()
            cv = std_sim / mean_sim
            
            consistency_results.append({
                factor_name.lower(): factor,
                'mean': mean_sim,
                'std': std_sim,
                'cv': cv,
                'n': len(factor_sims)
            })
            
            print(f"{factor.upper()}:")
            print(f"  Mean similarity: {mean_sim:.4f}")
            print(f"  SD: {std_sim:.4f}")
            print(f"  CV: {cv:.4f} (lower = more consistent)")
            print(f"  N pairs: {len(factor_sims)}\n")
    
    consistency_df = pd.DataFrame(consistency_results).sort_values('cv')
    
    print(f"\n{factor_name.upper()} CONSISTENCY RANKING (most to least consistent)")
    print("-"*70)
    for i, row in consistency_df.iterrows():
        print(f"  {i+1}. {row[factor_name.lower()].upper()}: CV={row['cv']:.4f}")
    
    print(f"\n→ {consistency_df.iloc[0][factor_name.lower()].upper()} produces MOST CONSISTENT thoughts")
    print(f"→ {consistency_df.iloc[-1][factor_name.lower()].upper()} produces MOST VARIABLE thoughts")
    
    # Music vs. Context consistency comparison
    print(f"\n\nCONSISTENCY COMPARISON: Music vs. Context Effects Within {factor_name}s")
    print("-"*70)
    
    music_vs_context_consistency = []
    
    for factor in factors:
        # Music-driven
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
        
        # Context-driven
        context_filter = (
            (sim_df['condition'] == 'diff_clip_same_context') &
            (sim_df[f'{factor_key}_i'] == factor) &
            (sim_df[f'{factor_key}_j'] == factor)
        )
        context_sims = sim_df[context_filter]['similarity']
        
        if len(music_sims) > 0 and len(context_sims) > 0:
            music_cv = music_sims.std() / music_sims.mean()
            context_cv = context_sims.std() / context_sims.mean()
            cv_difference = music_cv - context_cv
            
            levene_stat, levene_p = levene(music_sims, context_sims)
            
            if levene_p < 0.001:
                sig = "***"
            elif levene_p < 0.01:
                sig = "**"
            elif levene_p < 0.05:
                sig = "*"
            else:
                sig = "n.s."
            
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
            
            print(f"\n{factor.upper()}:")
            print(f"  Music-driven:")
            print(f"    M={music_sims.mean():.4f}, SD={music_sims.std():.4f}, CV={music_cv:.4f} (N={len(music_sims)})")
            print(f"  Context-driven:")
            print(f"    M={context_sims.mean():.4f}, SD={context_sims.std():.4f}, CV={context_cv:.4f} (N={len(context_sims)})")
            print(f"  CV Difference (Music - Context): {cv_difference:.4f}")
            print(f"  Levene's test: F={levene_stat:.3f}, p={levene_p:.4f} {sig}")
    
    music_vs_context_df = pd.DataFrame(music_vs_context_consistency)
    
    return consistency_df, music_vs_context_df


def analyze_genre_context_interaction(sim_df, metadata):
    """
    Analyze Genre × Context interaction.
    
    Parameters:
    -----------
    sim_df : pd.DataFrame
        Similarity dataframe
    metadata : pd.DataFrame
        Document metadata
    
    Returns:
    --------
    pd.DataFrame : Genre-Context interaction statistics
    """
    print("\n" + "="*70)
    print("GENRE × CONTEXT INTERACTION")
    print("="*70)
    print("Do certain genres work better with certain contexts?\n")
    
    genre_context_interaction = []
    genres = metadata['genre_code'].unique()
    contexts = metadata['context_word'].unique()
    
    for genre in genres:
        for context in contexts:
            specific_sims = sim_df[
                (sim_df['condition'] == 'diff_clip_same_context') &
                (sim_df['genre_i'] == genre) &
                (sim_df['context_i'] == context)
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
    
    print("Top 5 Genre-Context combinations (highest similarity):")
    top_combos = genre_context_df.nlargest(5, 'mean')
    for idx, row in top_combos.iterrows():
        print(f"  {row['genre'].upper()} + {row['context'].upper()}: M={row['mean']:.4f}")
    
    print("\nBottom 5 Genre-Context combinations (lowest similarity):")
    bottom_combos = genre_context_df.nsmallest(5, 'mean')
    for idx, row in bottom_combos.iterrows():
        print(f"  {row['genre'].upper()} + {row['context'].upper()}: M={row['mean']:.4f}")
    
    return genre_context_df
