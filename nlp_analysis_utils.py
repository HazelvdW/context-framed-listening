import os
import numpy as np
import pandas as pd
from scipy import stats

def pairwise_indices(n):
    for i in range(n):
        for j in range(i+1, n):
            yield i, j

def build_similarity_dataframe(cosine_matrix, metadata, id_col='ClipContext_pair',
                               clip_col='clip_name', context_col='context_word', genre_col='genre_code'):
    """
    Build sim_df like in notebooks: rows for unique pairs (i<j) with metadata and a 'condition' label.
    """
    n = cosine_matrix.shape[0]
    clips = metadata[clip_col].values
    contexts = metadata[context_col].values
    genres = metadata[genre_col].values

    rows = {
        'i': [], 'j': [], 'similarity': [], 'same_clip': [], 'same_context': [],
        'same_genre': [], 'condition': []
    }

    for i, j in pairwise_indices(n):
        s = float(cosine_matrix[i, j])
        same_clip = clips[i] == clips[j]
        same_context = contexts[i] == contexts[j]
        same_genre = genres[i] == genres[j]

        if same_clip and same_context:
            cond = 'same_clip_same_context'
        elif same_clip and not same_context:
            cond = 'same_clip_diff_context'
        elif not same_clip and same_context:
            cond = 'diff_clip_same_context'
        else:
            cond = 'diff_clip_diff_context_same_genre' if same_genre else 'diff_clip_diff_context_diff_genre'

        rows['i'].append(i); rows['j'].append(j)
        rows['similarity'].append(s)
        rows['same_clip'].append(same_clip)
        rows['same_context'].append(same_context)
        rows['same_genre'].append(same_genre)
        rows['condition'].append(cond)

    return pd.DataFrame(rows)

def _sig_from_p(p):
    return '***' if p<0.001 else '**' if p<0.01 else '*' if p<0.05 else 'n.s.'


# ---------- Comparisons ----------
def compare_binary(sim_df, column, label):
    same = sim_df[sim_df[column]==True]['similarity']
    diff = sim_df[sim_df[column]==False]['similarity']
    t, p = stats.ttest_ind(same, diff)
    pooled = np.sqrt((same.std()**2 + diff.std()**2)/2) if len(same)>1 and len(diff)>1 else np.nan
    d = (same.mean() - diff.mean())/pooled if pooled and pooled>0 else np.nan
    sig = '***' if p<0.001 else '**' if p<0.01 else '*' if p<0.05 else 'n.s.'
    return {'comparison':f'Same {label} vs Different {label}',
            'mean_same': same.mean(), 'mean_diff': diff.mean(),
            'diff': same.mean()-diff.mean(),'t':t,'p':p,'d':d,'sig':sig,
            'n_same':len(same),'n_diff':len(diff)}

def compare_conditions(sim_df, cond1, cond2, label1=None, label2=None):
    a = sim_df[sim_df['condition']==cond1]['similarity']
    b = sim_df[sim_df['condition']==cond2]['similarity']
    if len(a)<2 or len(b)<2:
        return None
    t,p = stats.ttest_ind(a,b)
    pooled = np.sqrt((a.std()**2 + b.std()**2)/2)
    d = (a.mean()-b.mean())/pooled if pooled>0 else np.nan
    sig = '***' if p<0.001 else '**' if p<0.01 else '*' if p<0.05 else 'n.s.'
    return {'comparison': f"{label1 or cond1} vs {label2 or cond2}",
            'mean1': a.mean(), 'mean2': b.mean(), 'diff': a.mean()-b.mean(),
            't': t, 'p': p, 'd': d, 'sig': sig, 'n1': len(a), 'n2': len(b)}

# ---------- Factor-specific helpers ----------
def analyze_within_factor_similarity(sim_df, metadata, factor_column, factor_name,
                                     i_col='i', j_col='j'):
    """Return DataFrame with mean/std/cv per factor for same-factor different-clip pairs."""
    if factor_name.lower() == 'context':
        filt = sim_df['condition']=='diff_clip_same_context'
    else:
        filt = (sim_df['same_genre']==True) & (sim_df['same_clip']==False)

    fact_vals = metadata[factor_column].unique()
    rows=[]
    key = factor_column.split('_')[0]
    for f in fact_vals:
        mask = (filt) & (sim_df[f'{key}_i'] == f) & (sim_df[f'{key}_j'] == f) if f'{key}_i' in sim_df else (
               (filt) & (sim_df[i_col].map(lambda x: metadata.iloc[x][factor_column])==f) &
               (sim_df[j_col].map(lambda x: metadata.iloc[x][factor_column])==f))
        vals = sim_df[mask]['similarity']
        if len(vals)>0:
            mean=vals.mean(); std=vals.std(); cv = std/mean if mean!=0 else np.nan
            rows.append({factor_name.lower(): f, 'mean':mean, 'std':std, 'cv':cv, 'n':len(vals)})
    return pd.DataFrame(rows).sort_values('mean', ascending=False)

def analyze_pairwise_factor_comparisons(sim_df, metadata, factor_column, factor_name):
    """Pairwise t-tests between factor levels (returns DataFrame of comparisons)."""
    factor_key = factor_column.split('_')[0]
    vals = metadata[factor_column].unique()
    rows=[]
    for i,f1 in enumerate(vals):
        for f2 in vals[i+1:]:
            mask1 = (sim_df[f'{factor_key}_i']==f1) & (sim_df[f'{factor_key}_j']==f1) & (sim_df['condition'].str.contains('diff_clip_same_context'))
            mask2 = (sim_df[f'{factor_key}_i']==f2) & (sim_df[f'{factor_key}_j']==f2) & (sim_df['condition'].str.contains('diff_clip_same_context'))
            a = sim_df[mask1]['similarity']; b = sim_df[mask2]['similarity']
            if len(a)>1 and len(b)>1:
                t,p = stats.ttest_ind(a,b)
                pooled = np.sqrt((a.std()**2 + b.std()**2)/2)
                d = (a.mean()-b.mean())/pooled if pooled>0 else np.nan
                sig = '***' if p<0.001 else '**' if p<0.01 else '*' if p<0.05 else 'n.s.'
                rows.append({f'{factor_name.lower()}1':f1, f'{factor_name.lower()}2':f2,
                             'mean1':a.mean(),'mean2':b.mean(),'difference':a.mean()-b.mean(),
                             't':t,'p':p,'d':d,'sig':sig})
    return pd.DataFrame(rows).sort_values('d', key=abs, ascending=False)

def analyze_factor_music_vs_context(sim_df, metadata, factor_column, factor_name):
    """Compare music-driven vs context-driven within each factor level."""
    factor_key = factor_column.split('_')[0]
    results=[]
    for f in metadata[factor_column].unique():
        if factor_name.lower()=='context':
            music_mask = (sim_df['condition']=='same_clip_diff_context') & ((sim_df[f'{factor_key}_i']==f) | (sim_df[f'{factor_key}_j']==f))
        else:
            music_mask = (sim_df['condition']=='same_clip_diff_context') & (sim_df[f'{factor_key}_i']==f) & (sim_df[f'{factor_key}_j']==f)
        context_mask = (sim_df['condition']=='diff_clip_same_context') & (sim_df[f'{factor_key}_i']==f) & (sim_df[f'{factor_key}_j']==f)
        a = sim_df[music_mask]['similarity']; b = sim_df[context_mask]['similarity']
        if len(a)>1 and len(b)>1:
            t,p = stats.ttest_ind(a,b)
            pooled = np.sqrt((a.std()**2 + b.std()**2)/2)
            d = (a.mean()-b.mean())/pooled if pooled>0 else np.nan
            sig = '***' if p<0.001 else '**' if p<0.01 else '*' if p<0.05 else 'n.s.'
            results.append({factor_name.lower(): f,'music_mean':a.mean(),'context_mean':b.mean(),
                            'difference':a.mean()-b.mean(),'effect_size':d,'t':t,'p':p,'sig':sig,
                            'n_music':len(a),'n_context':len(b)})
    return pd.DataFrame(results)

# ---------- I/O helpers ----------
def save_dfs(output_dir, dfs):
    os.makedirs(output_dir, exist_ok=True)
    for name, df in dfs.items():
        path = os.path.join(output_dir, name)
        df.to_csv(path, index=False)
    return list(dfs.keys())