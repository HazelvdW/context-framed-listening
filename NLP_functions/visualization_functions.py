"""
Visualization Functions for NLP Analysis
Author: Hazel A. van der Walle
Durham University, Music Department

Functions for creating visualizations of analysis results.
"""

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns


def create_similarity_heatmap(cosine_matrix_df, title, output_path):
    """
    Create and save a heatmap of the cosine similarity matrix.
    
    Parameters:
    -----------
    cosine_matrix_df : pd.DataFrame
        Cosine similarity matrix
    title : str
        Plot title
    output_path : str
        Path to save the figure
    """
    plt.figure(figsize=(16, 14))
    sns.heatmap(cosine_matrix_df, cmap='viridis', annot=False, square=True,
                cbar_kws={'label': 'Cosine Similarity'})
    plt.title(title, fontsize=14, fontweight='bold')
    plt.tight_layout()
    plt.savefig(output_path, dpi=300, bbox_inches='tight')
    plt.show()
    print(f"✓ Saved: {output_path}")


def create_binary_comparison_violins(sim_df, binary_results, output_path):
    """
    Create violin plots for binary comparisons (clip, context, genre).
    
    Parameters:
    -----------
    sim_df : pd.DataFrame
        Similarity dataframe
    binary_results : dict
        Results from run_binary_comparisons
    output_path : str
        Path to save the figure
    """
    fig, axes = plt.subplots(1, 3, figsize=(18, 6))
    
    # Clip comparison
    clip_data = sim_df.copy()
    clip_data['clip_label'] = clip_data['same_clip'].map({True: 'Same Clip', False: 'Different Clip'})
    sns.violinplot(data=clip_data, x='clip_label', y='similarity',
                   order=['Same Clip', 'Different Clip'], ax=axes[0],
                   hue='clip_label', palette=['#95a5a6', '#3498db'], legend=False)
    axes[0].set_title('Clip Effect', fontsize=13, fontweight='bold')
    axes[0].set_xlabel('')
    axes[0].set_ylabel('Cosine Similarity', fontsize=11)
    axes[0].text(0.5, 0.95, f"d = {binary_results['clip']['d']:.3f} {binary_results['clip']['sig']}",
                 ha='center', va='top', transform=axes[0].transAxes, fontsize=10,
                 bbox=dict(boxstyle='round', facecolor='wheat', alpha=0.5))
    
    # Context comparison
    context_data = sim_df.copy()
    context_data['context_label'] = context_data['same_context'].map({True: 'Same Context', False: 'Different Context'})
    sns.violinplot(data=context_data, x='context_label', y='similarity',
                   order=['Same Context', 'Different Context'], ax=axes[1],
                   hue='context_label', palette=['#e74c3c', '#95a5a6'], legend=False)
    axes[1].set_title('Context Effect', fontsize=13, fontweight='bold')
    axes[1].set_xlabel('')
    axes[1].set_ylabel('')
    axes[1].text(0.5, 0.95, f"d = {binary_results['context']['d']:.3f} {binary_results['context']['sig']}",
                 ha='center', va='top', transform=axes[1].transAxes, fontsize=10,
                 bbox=dict(boxstyle='round', facecolor='wheat', alpha=0.5))
    
    # Genre comparison
    genre_data = sim_df.copy()
    genre_data['genre_label'] = genre_data['same_genre'].map({True: 'Same Genre', False: 'Different Genre'})
    sns.violinplot(data=genre_data, x='genre_label', y='similarity',
                   order=['Same Genre', 'Different Genre'], ax=axes[2],
                   hue='genre_label', palette=['#2ecc71', '#95a5a6'], legend=False)
    axes[2].set_title('Genre Effect', fontsize=13, fontweight='bold')
    axes[2].set_xlabel('')
    axes[2].set_ylabel('')
    axes[2].text(0.5, 0.95, f"d = {binary_results['genre']['d']:.3f} {binary_results['genre']['sig']}",
                 ha='center', va='top', transform=axes[2].transAxes, fontsize=10,
                 bbox=dict(boxstyle='round', facecolor='wheat', alpha=0.5))
    
    plt.tight_layout()
    plt.savefig(output_path, dpi=300, bbox_inches='tight')
    plt.show()
    print(f"✓ Saved: {output_path}")


def create_within_factor_comparison(context_df, genre_df, output_path):
    """
    Create 2x2 comparison of within-factor similarity and consistency.
    
    Parameters:
    -----------
    context_df : pd.DataFrame
        Within-context results
    genre_df : pd.DataFrame
        Within-genre results
    output_path : str
        Path to save the figure
    """
    fig = plt.figure(figsize=(16, 12))
    gs = fig.add_gridspec(2, 2, hspace=0.3, wspace=0.25)
    
    context_sorted = context_df.sort_values('mean', ascending=False)
    genre_sorted = genre_df.sort_values('mean', ascending=False)
    
    # PANEL A: Context within-factor similarity
    ax_a = fig.add_subplot(gs[0, 0])
    context_sorted.plot(kind='bar', x='context', y='mean', yerr='std',
                        ax=ax_a, capsize=5, color='teal',
                        edgecolor='black', alpha=0.8, legend=False)
    ax_a.set_title('A. Within-Context Similarity\n(Same Context, Different Music)',
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
    plt.show()
    print(f"✓ Saved: {output_path}")


def create_pairwise_comparison(context_pairs_df, genre_pairs_df, output_path):
    """
    Create side-by-side pairwise comparisons for context and genre.
    
    Parameters:
    -----------
    context_pairs_df : pd.DataFrame
        Context pairwise comparison results
    genre_pairs_df : pd.DataFrame
        Genre pairwise comparison results
    output_path : str
        Path to save the figure
    """
    fig, axes = plt.subplots(1, 2, figsize=(18, 8))
    
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
        axes[0].grid(axis='x', alpha=0.3)
    
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
        axes[1].grid(axis='x', alpha=0.3)
    
    from matplotlib.patches import Patch
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
    plt.show()
    print(f"✓ Saved: {output_path}")


def create_music_vs_context_comparison(context_moderator_df, genre_moderator_df, output_path):
    """
    Create 2x2 comparison of music vs. context effects by factor.
    
    Parameters:
    -----------
    context_moderator_df : pd.DataFrame
        Context moderator results
    genre_moderator_df : pd.DataFrame
        Genre moderator results
    output_path : str
        Path to save the figure
    """
    fig = plt.figure(figsize=(16, 12))
    gs = fig.add_gridspec(2, 2, hspace=0.3, wspace=0.25)
    
    # PANEL A: Context music vs. context means
    ax_a = fig.add_subplot(gs[0, 0])
    if len(context_moderator_df) > 0:
        context_sorted = context_moderator_df.sort_values('difference')
        x = np.arange(len(context_sorted))
        width = 0.35
        
        ax_a.bar(x - width/2, context_sorted['music_mean'],
                width, label='Music-driven', color='#3498db',
                edgecolor='black', alpha=0.8)
        ax_a.bar(x + width/2, context_sorted['context_mean'],
                width, label='Context-driven', color='#e74c3c',
                edgecolor='black', alpha=0.8)
        
        ax_a.set_xlabel('')
        ax_a.set_ylabel('Mean Cosine Similarity', fontsize=10)
        ax_a.set_title('A. Music vs. Context by Context',
                      fontsize=13, fontweight='bold')
        ax_a.set_xticks(x)
        ax_a.set_xticklabels(context_sorted['context'], rotation=45, ha='right', fontsize=10)
        ax_a.legend(fontsize=9, loc='upper right')
        ax_a.grid(axis='y', alpha=0.3)
    
    # PANEL B: Genre music vs. context means
    ax_b = fig.add_subplot(gs[0, 1])
    if len(genre_moderator_df) > 0:
        genre_sorted = genre_moderator_df.sort_values('difference')
        x = np.arange(len(genre_sorted))
        width = 0.35
        
        ax_b.bar(x - width/2, genre_sorted['music_mean'],
                width, label='Music-driven', color='#3498db',
                edgecolor='black', alpha=0.8)
        ax_b.bar(x + width/2, genre_sorted['context_mean'],
                width, label='Context-driven', color='#e74c3c',
                edgecolor='black', alpha=0.8)
        
        ax_b.set_xlabel('')
        ax_b.set_ylabel('Mean Cosine Similarity', fontsize=10)
        ax_b.set_title('B. Music vs. Context by Genre',
                      fontsize=13, fontweight='bold')
        ax_b.set_xticks(x)
        ax_b.set_xticklabels(genre_sorted['genre'], rotation=45, ha='right', fontsize=10)
        ax_b.legend(fontsize=9, loc='upper right')
        ax_b.grid(axis='y', alpha=0.3)
    
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
        ax_c.set_title('C. Context Effect Sizes\n(Positive = Music > Context)',
                      fontsize=13, fontweight='bold')
        ax_c.axvline(x=0, color='black', linestyle='-', linewidth=1.2)
        ax_c.grid(axis='x', alpha=0.3)
    
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
        ax_d.set_title('D. Genre Effect Sizes\n(Positive = Music > Context)',
                      fontsize=13, fontweight='bold')
        ax_d.axvline(x=0, color='black', linestyle='-', linewidth=1.2)
        ax_d.grid(axis='x', alpha=0.3)
    
    plt.suptitle('Music vs. Context Effects: Context vs. Genre',
                fontsize=16, fontweight='bold', y=0.995)
    plt.savefig(output_path, dpi=300, bbox_inches='tight')
    plt.show()
    print(f"✓ Saved: {output_path}")


def create_consistency_comparison(context_consistency_comp_df, genre_consistency_comp_df, output_path):
    """
    Create side-by-side consistency comparison.
    
    Parameters:
    -----------
    context_consistency_comp_df : pd.DataFrame
        Context consistency comparison results
    genre_consistency_comp_df : pd.DataFrame
        Genre consistency comparison results
    output_path : str
        Path to save the figure
    """
    fig, axes = plt.subplots(1, 2, figsize=(16, 7))
    
    # PANEL A: Context music vs. context consistency
    if len(context_consistency_comp_df) > 0:
        context_sorted = context_consistency_comp_df.sort_values('context')
        x = np.arange(len(context_sorted))
        width = 0.35
        
        axes[0].bar(x - width/2, context_sorted['music_cv'],
                   width, label='Music-driven', color='#3498db',
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
    
    # PANEL B: Genre music vs. context consistency
    if len(genre_consistency_comp_df) > 0:
        genre_sorted = genre_consistency_comp_df.sort_values('genre')
        x = np.arange(len(genre_sorted))
        width = 0.35
        
        axes[1].bar(x - width/2, genre_sorted['music_cv'],
                   width, label='Music-driven', color='#3498db',
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
    
    plt.suptitle('Consistency Comparison: Music vs. Context Effects',
                fontsize=16, fontweight='bold')
    plt.tight_layout()
    plt.savefig(output_path, dpi=300, bbox_inches='tight')
    plt.show()
    print(f"✓ Saved: {output_path}")


def create_similarity_matrices(context_within_df, genre_within_df, sim_df, metadata, output_path):
    """
    Create side-by-side similarity matrices for context and genre.
    
    Parameters:
    -----------
    context_within_df : pd.DataFrame
        Within-context results
    genre_within_df : pd.DataFrame
        Within-genre results
    sim_df : pd.DataFrame
        Similarity dataframe
    metadata : pd.DataFrame
        Document metadata
    output_path : str
        Path to save the figure
    """
    fig, axes = plt.subplots(1, 2, figsize=(16, 7))
    
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
    plt.show()
    print(f"✓ Saved: {output_path}")


def create_genre_context_interaction_heatmap(genre_context_df, output_path):
    """
    Create Genre × Context interaction heatmap.
    
    Parameters:
    -----------
    genre_context_df : pd.DataFrame
        Genre-Context interaction results
    output_path : str
        Path to save the figure
    """
    fig, ax = plt.subplots(figsize=(10, 8))
    
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
    plt.show()
    print(f"✓ Saved: {output_path}")


def create_primary_comparison_bar(primary_effect, sim_df, output_path):
    """
    Create bar chart comparing music vs. context with confidence intervals.
    
    Parameters:
    -----------
    primary_effect : dict
        Results from compare_conditions
    sim_df : pd.DataFrame
        Similarity dataframe
    output_path : str
        Path to save the figure
    """
    from scipy import stats as sp_stats
    
    music_driven = sim_df[sim_df['condition'] == 'same_clip_diff_context']['similarity']
    context_driven = sim_df[sim_df['condition'] == 'diff_clip_same_context']['similarity']
    
    music_mean = music_driven.mean()
    context_mean = context_driven.mean()
    music_std = music_driven.std()
    context_std = context_driven.std()
    
    music_ci = sp_stats.t.interval(0.95, len(music_driven)-1,
                                    loc=music_mean,
                                    scale=music_std/np.sqrt(len(music_driven)))
    context_ci = sp_stats.t.interval(0.95, len(context_driven)-1,
                                      loc=context_mean,
                                      scale=context_std/np.sqrt(len(context_driven)))
    
    fig, ax = plt.subplots(figsize=(9, 7))
    
    categories = ['Music-Driven\n(Same Clip,\nDiff Context)',
                  'Context-Driven\n(Diff Clip,\nSame Context)']
    means = [music_mean, context_mean]
    colors_primary = ['#3498db', '#e74c3c']
    
    bars = ax.bar(categories, means, color=colors_primary, edgecolor='black',
                  linewidth=2, alpha=0.85, width=0.6)
    
    ci_ranges = [
        (music_ci[1] - music_ci[0]) / 2,
        (context_ci[1] - context_ci[0]) / 2
    ]
    ax.errorbar(range(len(means)), means, yerr=ci_ranges, fmt='none',
                ecolor='black', capsize=8, capthick=2, linewidth=2)
    
    for i, (bar, mean, ci, ci_range) in enumerate(zip(bars, means, [music_ci, context_ci], ci_ranges)):
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
    
    effect_text = f"Cohen's d = {primary_effect['d']:.3f} {primary_effect['sig']}\n"
    effect_text += f"Δ = {primary_effect['diff']:.4f}\n"
    effect_text += f"t = {primary_effect['t']:.2f}, p = {primary_effect['p']:.4f}"
    ax.text(0.5, y_arrow + 0.02, effect_text,
            ha='center', va='bottom', fontsize=11, fontweight='bold',
            bbox=dict(boxstyle='round,pad=0.8', facecolor='yellow',
                     edgecolor='black', alpha=0.8, linewidth=2))
    
    ax.set_ylabel('Mean Cosine Similarity', fontsize=13, fontweight='bold')
    ax.set_title('Music vs. Context Influence\nWhich Factor Drives Thought Similarity More?',
                 fontsize=14, fontweight='bold', pad=20)
    ax.set_ylim([0, max(means) * 1.35])
    ax.grid(axis='y', alpha=0.3, linestyle='--')
    ax.set_axisbelow(True)
    
    plt.tight_layout()
    plt.savefig(output_path, dpi=300, bbox_inches='tight')
    plt.show()
    print(f"✓ Saved: {output_path}")


def create_comprehensive_conditions_figure(sim_df, primary_effect, output_path):
    """
    Create comprehensive 3-panel comparison figure.
    
    Parameters:
    -----------
    sim_df : pd.DataFrame
        Similarity dataframe
    primary_effect : dict
        Results from compare_conditions
    output_path : str
        Path to save the figure
    """
    fig = plt.figure(figsize=(16, 12))
    gs = fig.add_gridspec(2, 2, hspace=0.3, wspace=0.3)
    
    # PANEL A: Boxplot comparison
    ax_a = fig.add_subplot(gs[0, 0])
    comparison_data = sim_df[sim_df['condition'].isin([
        'same_clip_diff_context',
        'diff_clip_same_context'
    ])].copy()
    
    comparison_data['condition_label'] = comparison_data['condition'].map({
        'same_clip_diff_context': 'Same Music\nDifferent Context',
        'diff_clip_same_context': 'Different Music\nSame Context'
    })
    
    order = ['Same Music\nDifferent Context', 'Different Music\nSame Context']
    palette = ['#3498db', '#e74c3c']
    
    sns.boxplot(data=comparison_data, x='condition_label', y='similarity', ax=ax_a,
                hue='condition_label', palette=palette, legend=False, order=order)
    sns.stripplot(data=comparison_data, x='condition_label', y='similarity', ax=ax_a,
                  hue='condition_label', palette='dark:black', alpha=0.3, size=3,
                  legend=False, order=order)
    
    ax_a.set_title('A. Distribution Comparison',
                   fontsize=12, fontweight='bold')
    ax_a.set_xlabel('')
    ax_a.set_ylabel('Cosine Similarity', fontsize=10)
    ax_a.grid(axis='y', alpha=0.3)
    
    # PANEL B: Distribution histogram
    ax_b = fig.add_subplot(gs[0, 1])
    music_driven = sim_df[sim_df['condition'] == 'same_clip_diff_context']['similarity']
    context_driven = sim_df[sim_df['condition'] == 'diff_clip_same_context']['similarity']
    
    ax_b.hist(music_driven, bins=25, alpha=0.6, label='Same Music, Diff Context',
              color='#3498db', density=True, edgecolor='black')
    ax_b.hist(context_driven, bins=25, alpha=0.6, label='Diff Music, Same Context',
              color='#e74c3c', density=True, edgecolor='black')
    ax_b.axvline(music_driven.mean(), color='#3498db', linestyle='--', linewidth=2.5)
    ax_b.axvline(context_driven.mean(), color='#e74c3c', linestyle='--', linewidth=2.5)
    
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
    labels_all = ['Same Music\nDiff Context',
                  'Diff Music\nSame Context',
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
    ax_c.set_title('C. All Experimental Conditions',
                   fontsize=12, fontweight='bold')
    ax_c.set_xlabel('')
    ax_c.set_ylabel('Cosine Similarity', fontsize=10)
    ax_c.grid(axis='y', alpha=0.3, linestyle='--')
    
    plt.suptitle('Comprehensive Condition Comparison Analysis',
                fontsize=15, fontweight='bold', y=0.995)
    plt.savefig(output_path, dpi=300, bbox_inches='tight')
    plt.show()
    print(f"✓ Saved: {output_path}")
