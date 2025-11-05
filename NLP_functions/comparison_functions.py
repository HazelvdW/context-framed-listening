"""
Comparison Functions for NLP Analysis
Author: Hazel A. van der Walle
Durham University, Music Department

Functions for statistical comparisons between conditions.
"""

import numpy as np
import pandas as pd
from scipy import stats


def compare_binary(df, column, label):
    """
    Compare same vs different for a binary factor.
    
    Parameters:
    -----------
    df : pd.DataFrame
        Similarity dataframe
    column : str
        Column name for binary comparison (e.g., 'same_clip')
    label : str
        Factor name for display
    
    Returns:
    --------
    dict : Comparison statistics
    """
    same_data = df[df[column] == True]['similarity']
    diff_data = df[df[column] == False]['similarity']
    
    t_stat, p_value = stats.ttest_ind(same_data, diff_data)
    pooled_std = np.sqrt((same_data.std()**2 + diff_data.std()**2) / 2)
    effect_size = (same_data.mean() - diff_data.mean()) / pooled_std
    
    if p_value < 0.001:
        sig_str = "***"
    elif p_value < 0.01:
        sig_str = "**"
    elif p_value < 0.05:
        sig_str = "*"
    else:
        sig_str = "n.s."
    
    return {
        'comparison': f"Same {label} vs Different {label}",
        'mean_same': same_data.mean(),
        'mean_diff': diff_data.mean(),
        'diff': same_data.mean() - diff_data.mean(),
        't': t_stat,
        'p': p_value,
        'sig': sig_str,
        'd': effect_size,
        'n_same': len(same_data),
        'n_diff': len(diff_data)
    }


def compare_conditions(df, cond1, cond2, label1, label2):
    """
    Compare two specific conditions with t-test and effect size.
    
    Parameters:
    -----------
    df : pd.DataFrame
        Similarity dataframe with 'condition' and 'similarity' columns
    cond1, cond2 : str
        Condition identifiers to compare
    label1, label2 : str
        Human-readable labels for output
    
    Returns:
    --------
    dict : Comparison statistics
    """
    data1 = df[df['condition'] == cond1]['similarity']
    data2 = df[df['condition'] == cond2]['similarity']
    
    if len(data1) < 2 or len(data2) < 2:
        print(f"WARNING: Insufficient data for {label1} vs {label2}")
        return None
    
    t_stat, p_value = stats.ttest_ind(data1, data2)
    pooled_std = np.sqrt((data1.std()**2 + data2.std()**2) / 2)
    effect_size = (data1.mean() - data2.mean()) / pooled_std
    
    if p_value < 0.001:
        sig_str = "***"
    elif p_value < 0.01:
        sig_str = "**"
    elif p_value < 0.05:
        sig_str = "*"
    else:
        sig_str = "n.s."
    
    return {
        'comparison': f"{label1} vs {label2}",
        'mean1': data1.mean(),
        'mean2': data2.mean(),
        'diff': data1.mean() - data2.mean(),
        't': t_stat,
        'p': p_value,
        'sig': sig_str,
        'd': effect_size,
        'n1': len(data1),
        'n2': len(data2)
    }


def run_binary_comparisons(sim_df):
    """
    Run all three binary comparisons (clip, context, genre).
    
    Parameters:
    -----------
    sim_df : pd.DataFrame
        Similarity dataframe
    
    Returns:
    --------
    dict : Dictionary with comparison results for clip, context, and genre
    """
    print("\n" + "="*70)
    print("BINARY COMPARISONS - Fundamental Effects")
    print("="*70)
    
    results = {}
    
    # CLIP EFFECT
    print("\n1. CLIP EFFECT: Same Clip vs Different Clip")
    print("-" * 70)
    clip_comp = compare_binary(sim_df, 'same_clip', 'Clip')
    results['clip'] = clip_comp
    
    print(f"Same clip: M={clip_comp['mean_same']:.4f}, SD={sim_df[sim_df['same_clip']]['similarity'].std():.4f} (N={clip_comp['n_same']})")
    print(f"Different clip: M={clip_comp['mean_diff']:.4f}, SD={sim_df[~sim_df['same_clip']]['similarity'].std():.4f} (N={clip_comp['n_diff']})")
    print(f"Difference: {clip_comp['diff']:.4f}")
    print(f"t({clip_comp['n_same'] + clip_comp['n_diff'] - 2}) = {clip_comp['t']:.3f}, p = {clip_comp['p']:.4f} {clip_comp['sig']}")
    print(f"Cohen's d = {clip_comp['d']:.3f}")
    
    # CONTEXT EFFECT
    print("\n\n2. CONTEXT EFFECT: Same Context vs Different Context")
    print("-" * 70)
    context_comp = compare_binary(sim_df, 'same_context', 'Context')
    results['context'] = context_comp
    
    print(f"Same context: M={context_comp['mean_same']:.4f}, SD={sim_df[sim_df['same_context']]['similarity'].std():.4f} (N={context_comp['n_same']})")
    print(f"Different context: M={context_comp['mean_diff']:.4f}, SD={sim_df[~sim_df['same_context']]['similarity'].std():.4f} (N={context_comp['n_diff']})")
    print(f"Difference: {context_comp['diff']:.4f}")
    print(f"t({context_comp['n_same'] + context_comp['n_diff'] - 2}) = {context_comp['t']:.3f}, p = {context_comp['p']:.4f} {context_comp['sig']}")
    print(f"Cohen's d = {context_comp['d']:.3f}")
    
    # GENRE EFFECT
    print("\n\n3. GENRE EFFECT: Same Genre vs Different Genre")
    print("-" * 70)
    genre_comp = compare_binary(sim_df, 'same_genre', 'Genre')
    results['genre'] = genre_comp
    
    print(f"Same genre: M={genre_comp['mean_same']:.4f}, SD={sim_df[sim_df['same_genre']]['similarity'].std():.4f} (N={genre_comp['n_same']})")
    print(f"Different genre: M={genre_comp['mean_diff']:.4f}, SD={sim_df[~sim_df['same_genre']]['similarity'].std():.4f} (N={genre_comp['n_diff']})")
    print(f"Difference: {genre_comp['diff']:.4f}")
    print(f"t({genre_comp['n_same'] + genre_comp['n_diff'] - 2}) = {genre_comp['t']:.3f}, p = {genre_comp['p']:.4f} {genre_comp['sig']}")
    print(f"Cohen's d = {genre_comp['d']:.3f}")
    
    # KEY COMPARISON
    print("\n\n" + "="*70)
    print("KEY FINDING: Comparing Binary Effects")
    print("="*70)
    
    effects = [
        ('CLIP', clip_comp['d'], clip_comp['diff']),
        ('CONTEXT', context_comp['d'], context_comp['diff']),
        ('GENRE', genre_comp['d'], genre_comp['diff'])
    ]
    effects_sorted = sorted(effects, key=lambda x: abs(x[1]), reverse=True)
    
    print("\nEffect sizes ranked (absolute Cohen's d):")
    for i, (factor, d, diff) in enumerate(effects_sorted, 1):
        print(f"  {i}. {factor}: d = {d:.3f}, mean difference = {diff:.4f}")
    
    print(f"\n→ {effects_sorted[0][0]} has the LARGEST effect on thought similarity")
    
    return results


def run_combined_comparisons(sim_df):
    """
    Run primary and genre-specific condition comparisons.
    
    Parameters:
    -----------
    sim_df : pd.DataFrame
        Similarity dataframe
    
    Returns:
    --------
    dict : Dictionary with 'primary' and 'genre' comparison results
    """
    print("\n" + "-"*70)
    print("COMBINED CONDITION COMPARISONS")
    print("-"*70)
    
    results = {}
    
    # PRIMARY: Music vs Context
    print("\n1. PRIMARY COMPARISON: Music vs Context Influence")
    print("-" * 70)
    
    primary_effect = compare_conditions(
        sim_df,
        'same_clip_diff_context',
        'diff_clip_same_context',
        'Same Clip, Different Context',
        'Different Clip, Same Context'
    )
    results['primary'] = primary_effect
    
    music_driven = sim_df[sim_df['condition'] == 'same_clip_diff_context']['similarity']
    context_driven = sim_df[sim_df['condition'] == 'diff_clip_same_context']['similarity']
    
    print(f"\nSame clip, different context: M={primary_effect['mean1']:.4f}, SD={music_driven.std():.4f} (N={primary_effect['n1']})")
    print(f"Different clip, same context: M={primary_effect['mean2']:.4f}, SD={context_driven.std():.4f} (N={primary_effect['n2']})")
    print(f"\nDifference: {primary_effect['diff']:.4f}")
    print(f"t({primary_effect['n1'] + primary_effect['n2'] - 2}) = {primary_effect['t']:.3f}, p = {primary_effect['p']:.4f} {primary_effect['sig']}")
    print(f"Cohen's d = {primary_effect['d']:.3f}")
    
    # GENRE EFFECTS
    print("\n\n2. GENRE EFFECTS: When both clip and context differ")
    print("-" * 70)
    
    genre_effect = compare_conditions(
        sim_df,
        'diff_clip_diff_context_same_genre',
        'diff_clip_diff_context_diff_genre',
        'Both Different, Same Genre',
        'Both Different, Different Genre'
    )
    results['genre'] = genre_effect
    
    print(f"\nSame genre (different clip & context): M={genre_effect['mean1']:.4f} (N={genre_effect['n1']})")
    print(f"Different genre (different clip & context): M={genre_effect['mean2']:.4f} (N={genre_effect['n2']})")
    print(f"\nDifference: {genre_effect['diff']:.4f}")
    print(f"t = {genre_effect['t']:.3f}, p = {genre_effect['p']:.4f} {genre_effect['sig']}, d = {genre_effect['d']:.3f}")
    
    return results


def run_omnibus_test(sim_df):
    """
    Run one-way ANOVA across all conditions.
    
    Parameters:
    -----------
    sim_df : pd.DataFrame
        Similarity dataframe
    
    Returns:
    --------
    dict : ANOVA results (F-statistic, p-value, eta-squared)
    """
    print("\n" + "-"*70)
    print("OMNIBUS TEST: Overall Condition Differences")
    print("-"*70)
    
    conditions_list = sim_df['condition'].unique()
    groups = [sim_df[sim_df['condition'] == cond]['similarity'] for cond in conditions_list]
    f_stat, p_anova = stats.f_oneway(*groups)
    
    # Calculate eta-squared
    ss_between = sum(len(g) * (g.mean() - sim_df['similarity'].mean())**2 for g in groups)
    ss_total = sum((sim_df['similarity'] - sim_df['similarity'].mean())**2)
    eta_squared = ss_between / ss_total
    
    print(f"\nOne-way ANOVA across all {len(conditions_list)} conditions:")
    print(f"F({len(conditions_list)-1}, {len(sim_df)-len(conditions_list)}) = {f_stat:.3f}, p = {p_anova:.4e}")
    print(f"η² = {eta_squared:.4f}")
    
    if p_anova < 0.001:
        print("→ Conditions are HIGHLY significantly different overall (p < .001)")
    elif p_anova < 0.01:
        print("→ Conditions are significantly different overall (p < .01)")
    elif p_anova < 0.05:
        print("→ Conditions show significant differences (p < .05)")
    else:
        print("→ No significant differences between conditions")
    
    return {
        'f_stat': f_stat,
        'p_value': p_anova,
        'eta_squared': eta_squared,
        'n_conditions': len(conditions_list)
    }
