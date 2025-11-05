"""
TF-IDF Embedding Utilities for NLP Analyses
Author: Hazel A. van der Walle
Durham University, Music Department

Functions for computing TF-IDF embeddings and similarity metrics.
Mirrors the structure of embedding_utils.py (Word2Vec) and bert_embedding_utils.py.
"""

import numpy as np
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


def fit_tfidf_model(documents_df, text_column, max_features=5000, 
                    ngram_range=(1, 1), min_df=2, max_df=0.95):
    """
    Fit a TF-IDF vectorizer on the document corpus.
    
    Parameters:
    -----------
    documents_df : pd.DataFrame
        DataFrame containing documents
    text_column : str
        Column name containing text
    max_features : int
        Maximum number of features (vocabulary size)
    ngram_range : tuple
        Range of n-grams to extract (1,1) = unigrams only
    min_df : int or float
        Minimum document frequency
    max_df : float
        Maximum document frequency (ignore very common terms)
    
    Returns:
    --------
    TfidfVectorizer : Fitted vectorizer
    """
    print(f"\nFitting TF-IDF vectorizer...")
    print(f"  Max features: {max_features}")
    print(f"  N-gram range: {ngram_range}")
    print(f"  Min DF: {min_df}, Max DF: {max_df}")
    
    vectorizer = TfidfVectorizer(
        max_features=max_features,
        ngram_range=ngram_range,
        min_df=min_df,
        max_df=max_df,
        stop_words='english',  # Optional: remove English stop words
        lowercase=True
    )
    
    texts = documents_df[text_column].astype(str).values
    vectorizer.fit(texts)
    
    print(f"✓ Vectorizer fitted")
    print(f"  Vocabulary size: {len(vectorizer.vocabulary_):,}")
    
    return vectorizer


def get_tfidf_embedding(text, vectorizer):
    """
    Get TF-IDF embedding for a single text.
    Mirrors get_word2vec_embedding() and get_bert_embedding() structure.
    
    Parameters:
    -----------
    text : str
        Input text to embed
    vectorizer : TfidfVectorizer
        Fitted TF-IDF vectorizer
    
    Returns:
    --------
    tuple : (embedding vector, list of OOV terms if any)
    """
    # Transform text
    embedding = vectorizer.transform([str(text)]).toarray()[0]
    
    # Get terms in text
    text_terms = set(str(text).lower().split())
    vocab_terms = set(vectorizer.vocabulary_.keys())
    oov_terms = list(text_terms - vocab_terms)
    
    return embedding, oov_terms


def compute_embeddings_for_documents(documents_df, text_column, vectorizer=None,
                                     max_features=5000, verbose=True):
    """
    Compute TF-IDF embeddings for all documents in a DataFrame.
    Mirrors Word2Vec and BERT versions' structure and output format.
    
    Parameters:
    -----------
    documents_df : pd.DataFrame
        DataFrame containing documents
    text_column : str
        Column name containing text to embed
    vectorizer : TfidfVectorizer, optional
        Pre-fitted vectorizer. If None, fits new one.
    max_features : int
        Maximum features (only used if vectorizer is None)
    verbose : bool
        Whether to print progress
    
    Returns:
    --------
    tuple : (embeddings array, fitted vectorizer OR list of OOV terms)
    """
    if verbose:
        print(f"\nComputing TF-IDF embeddings for {len(documents_df)} documents...")
    
    texts = documents_df[text_column].astype(str).values
    
    # Fit vectorizer if not provided
    if vectorizer is None:
        if verbose:
            print("  No vectorizer provided - fitting new one...")
        vectorizer = fit_tfidf_model(documents_df, text_column, max_features)
        return_vectorizer = True
    else:
        return_vectorizer = False
    
    # Transform documents
    embeddings = vectorizer.transform(texts).toarray()
    
    if verbose:
        print(f"\n✓ Embeddings computed")
        print(f"  Embeddings shape: {embeddings.shape}")
        print(f"  Sparsity: {(embeddings == 0).sum() / embeddings.size:.1%}")
    
    # Return vectorizer if we fitted it, otherwise return OOV info
    if return_vectorizer:
        return embeddings, vectorizer
    else:
        # Calculate OOV terms across all documents
        all_terms = set()
        for text in texts:
            all_terms.update(str(text).lower().split())
        oov_terms = list(all_terms - set(vectorizer.vocabulary_.keys()))
        return embeddings, oov_terms


def compute_cosine_similarity_matrix(embeddings, document_labels=None):
    """
    Compute pairwise cosine similarity matrix for embeddings.
    Identical to Word2Vec and BERT versions - works with any embeddings.
    
    Parameters:
    -----------
    embeddings : np.ndarray
        Document embeddings (n_docs x embedding_dim)
    document_labels : list or pd.Series, optional
        Labels for documents (for DataFrame index/columns)
    
    Returns:
    --------
    tuple : (similarity matrix as numpy array, similarity matrix as DataFrame)
    """
    print("\nCalculating pairwise similarities...")
    cosine_matrix = cosine_similarity(embeddings, embeddings)
    
    # Create labeled DataFrame if labels provided
    if document_labels is not None:
        cosine_matrix_df = pd.DataFrame(
            cosine_matrix,
            index=document_labels,
            columns=document_labels
        )
    else:
        cosine_matrix_df = pd.DataFrame(cosine_matrix)
    
    print(f"\n✓ Cosine similarity matrix computed")
    print(f"  Matrix shape: {cosine_matrix.shape}")
    print(f"  Total pairwise comparisons: {(len(cosine_matrix) * (len(cosine_matrix) - 1)) // 2:,}")
    
    return cosine_matrix, cosine_matrix_df


def extract_similarity_by_condition(cosine_matrix, metadata_df, clip_col='clip_name', 
                                    context_col='context_word', genre_col='genre_code',
                                    verbose=True):
    """
    Extract similarity values and categorize by experimental conditions.
    Identical to Word2Vec and BERT versions - works with any similarity matrix.
    
    Parameters:
    -----------
    cosine_matrix : np.ndarray
        Pairwise cosine similarity matrix
    metadata_df : pd.DataFrame
        DataFrame with document metadata
    clip_col : str
        Column name for clip identifier
    context_col : str
        Column name for context identifier
    genre_col : str
        Column name for genre identifier
    verbose : bool
        Whether to print progress
    
    Returns:
    --------
    pd.DataFrame : Similarity data with condition labels
    """
    clips = metadata_df[clip_col].values
    contexts = metadata_df[context_col].values
    genres = metadata_df[genre_col].values
    
    # Initialize storage
    similarity_data = {
        'doc_i': [],
        'doc_j': [],
        'similarity': [],
        'same_clip': [],
        'same_context': [],
        'same_genre': [],
        'condition': []
    }
    
    # Process pairs
    n_docs = len(metadata_df)
    if verbose:
        print(f"\nProcessing {(n_docs * (n_docs - 1)) // 2:,} unique document pairs...")
    
    for i in range(n_docs):
        if verbose and (i + 1) % 10 == 0:
            print(f"  Processed {i + 1}/{n_docs} documents...")
        
        for j in range(i + 1, n_docs):
            sim_value = cosine_matrix[i, j]
            
            same_clip = clips[i] == clips[j]
            same_context = contexts[i] == contexts[j]
            same_genre = genres[i] == genres[j]
            
            # Categorize
            if same_clip and same_context:
                condition = 'same_clip_same_context'
            elif same_clip and not same_context:
                condition = 'same_clip_diff_context'
            elif not same_clip and same_context:
                condition = 'diff_clip_same_context'
            elif not same_clip and not same_context:
                if same_genre:
                    condition = 'diff_clip_diff_context_same_genre'
                else:
                    condition = 'diff_clip_diff_context_diff_genre'
            else:
                condition = 'other'
            
            similarity_data['doc_i'].append(i)
            similarity_data['doc_j'].append(j)
            similarity_data['similarity'].append(sim_value)
            similarity_data['same_clip'].append(same_clip)
            similarity_data['same_context'].append(same_context)
            similarity_data['same_genre'].append(same_genre)
            similarity_data['condition'].append(condition)
    
    sim_df = pd.DataFrame(similarity_data)
    
    if verbose:
        print("\n✓ Similarity measures extracted")
        print("\nSummary by condition:")
        summary = sim_df.groupby('condition')['similarity'].agg(['count', 'mean', 'std', 'min', 'max'])
        print(summary)
    
    return sim_df


# ============================================================================
# TF-IDF-SPECIFIC UTILITY FUNCTIONS
# ============================================================================

def get_top_terms(vectorizer, embeddings, top_n=20):
    """
    Get top TF-IDF terms for each document.
    
    Parameters:
    -----------
    vectorizer : TfidfVectorizer
        Fitted vectorizer
    embeddings : np.ndarray
        TF-IDF embeddings
    top_n : int
        Number of top terms to return
    
    Returns:
    --------
    list : List of top terms for each document
    """
    feature_names = vectorizer.get_feature_names_out()
    
    top_terms_per_doc = []
    for doc_embedding in embeddings:
        # Get indices of top N terms
        top_indices = doc_embedding.argsort()[-top_n:][::-1]
        top_terms = [(feature_names[i], doc_embedding[i]) for i in top_indices if doc_embedding[i] > 0]
        top_terms_per_doc.append(top_terms)
    
    return top_terms_per_doc


def get_vocabulary_info(vectorizer):
    """
    Get information about the TF-IDF vocabulary.
    
    Parameters:
    -----------
    vectorizer : TfidfVectorizer
        Fitted vectorizer
    
    Returns:
    --------
    dict : Vocabulary statistics
    """
    vocab = vectorizer.vocabulary_
    idf = vectorizer.idf_
    
    # Get terms sorted by IDF
    terms_idf = sorted(zip(vocab.keys(), idf), key=lambda x: x[1])
    
    info = {
        'vocab_size': len(vocab),
        'min_idf': idf.min(),
        'max_idf': idf.max(),
        'mean_idf': idf.mean(),
        'most_common_terms': [t[0] for t in terms_idf[:20]],  # Low IDF = common
        'rarest_terms': [t[0] for t in terms_idf[-20:]]  # High IDF = rare
    }
    
    print("\nTF-IDF Vocabulary Information:")
    print("="*50)
    print(f"  Vocabulary size: {info['vocab_size']:,}")
    print(f"  IDF range: [{info['min_idf']:.3f}, {info['max_idf']:.3f}]")
    print(f"  Mean IDF: {info['mean_idf']:.3f}")
    print(f"\n  Most common terms (lowest IDF):")
    print(f"    {', '.join(info['most_common_terms'][:10])}")
    print(f"\n  Rarest terms (highest IDF):")
    print(f"    {', '.join(info['rarest_terms'][:10])}")
    
    return info


def compare_tfidf_settings(documents_df, text_column, settings_list=None):
    """
    Compare different TF-IDF hyperparameter settings.
    
    Parameters:
    -----------
    documents_df : pd.DataFrame
        DataFrame with documents
    text_column : str
        Text column name
    settings_list : list of dict, optional
        List of settings to compare
    
    Returns:
    --------
    pd.DataFrame : Comparison results
    """
    if settings_list is None:
        settings_list = [
            {'max_features': 1000, 'ngram_range': (1, 1)},
            {'max_features': 5000, 'ngram_range': (1, 1)},
            {'max_features': 5000, 'ngram_range': (1, 2)},
            {'max_features': 10000, 'ngram_range': (1, 2)}
        ]
    
    results = []
    
    for settings in settings_list:
        print(f"\nTesting settings: {settings}")
        
        vectorizer = fit_tfidf_model(documents_df, text_column, **settings)
        embeddings = vectorizer.transform(documents_df[text_column]).toarray()
        
        results.append({
            'max_features': settings['max_features'],
            'ngram_range': str(settings['ngram_range']),
            'actual_vocab_size': len(vectorizer.vocabulary_),
            'sparsity': (embeddings == 0).sum() / embeddings.size,
            'mean_nonzero_values': embeddings[embeddings > 0].mean()
        })
    
    results_df = pd.DataFrame(results)
    
    print("\n" + "="*70)
    print("TF-IDF SETTINGS COMPARISON")
    print("="*70)
    print(results_df.to_string(index=False))
    
    return results_df
