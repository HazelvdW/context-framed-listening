"""
Embedding Utilities for NLP Analysis
Author: Hazel A. van der Walle
Durham University, Music Department

Functions for computing embeddings and similarity metrics.
"""

import numpy as np
import pandas as pd
import nltk
from sklearn.metrics.pairwise import cosine_similarity


def get_word2vec_embedding(text, model):
    """
    Get Word2Vec embedding for text by averaging word vectors.
    Handles words not in vocabulary (OOV).
    
    Parameters:
    -----------
    text : str
        Input text to embed
    model : gensim.models.KeyedVectors
        Pre-trained Word2Vec model
    
    Returns:
    --------
    tuple : (embedding vector, list of OOV words)
    """
    word_vectors = []
    words_not_in_vocab = []
    
    tokens = nltk.word_tokenize(str(text))
    
    for word in tokens:
        try:
            word_vectors.append(model[word])
        except KeyError:
            words_not_in_vocab.append(word)
    
    if len(word_vectors) > 0:
        return np.mean(word_vectors, axis=0), words_not_in_vocab
    else:
        return np.zeros(model.vector_size), words_not_in_vocab


def compute_embeddings_for_documents(documents_df, text_column, model, verbose=True):
    """
    Compute embeddings for all documents in a DataFrame.
    
    Parameters:
    -----------
    documents_df : pd.DataFrame
        DataFrame containing documents
    text_column : str
        Column name containing text to embed
    model : gensim.models.KeyedVectors
        Pre-trained embedding model
    verbose : bool
        Whether to print progress
    
    Returns:
    --------
    tuple : (embeddings array, list of all OOV words)
    """
    if verbose:
        print(f"\nComputing embeddings for {len(documents_df)} documents...")
    
    doc_embeddings = []
    all_missing_words = []
    
    for idx, row in documents_df.iterrows():
        text = str(row[text_column])
        embedding, missing_words = get_word2vec_embedding(text, model)
        doc_embeddings.append(embedding)
        all_missing_words.extend(missing_words)
        
        if verbose and (idx + 1) % 10 == 0:
            print(f"  Processed {idx + 1}/{len(documents_df)} documents...")
    
    doc_embeddings = np.array(doc_embeddings)
    
    if verbose:
        print(f"\n✓ Embeddings computed")
        print(f"  Embeddings shape: {doc_embeddings.shape}")
        print(f"  Unique OOV words: {len(set(all_missing_words)):,}")
        print(f"  OOV rate: {len(all_missing_words) / (len(documents_df) * 50):.1%}")
    
    return doc_embeddings, all_missing_words


def compute_cosine_similarity_matrix(embeddings, document_labels=None):
    """
    Compute pairwise cosine similarity matrix for embeddings.
    
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
