"""
BERT Embedding Utilities for NLP Analyses
Author: Hazel A. van der Walle
Durham University, Music Department

Functions for computing BERT embeddings and similarity metrics.
Mirrors the structure of embedding_utils.py for Word2Vec.
"""

import numpy as np
import pandas as pd
import torch
from transformers import BertTokenizer, BertModel
from sklearn.metrics.pairwise import cosine_similarity


def load_bert_model(model_name='bert-large-uncased', device=None):
    """
    Load pretrained BERT model and tokenizer.
    
    Parameters:
    -----------
    model_name : str
        Name of pretrained BERT model
        Options: 'bert-base-uncased', 'bert-large-uncased', 
                'vinai/bertweet-large', etc.
    device : str, optional
        'cuda' or 'cpu'. If None, automatically detects.
    
    Returns:
    --------
    tuple : (tokenizer, model, device)
    """
    if device is None:
        device = 'cuda' if torch.cuda.is_available() else 'cpu'
    
    print(f"\nLoading BERT model: {model_name}")
    print(f"Device: {device}")
    
    tokenizer = BertTokenizer.from_pretrained(model_name)
    model = BertModel.from_pretrained(model_name)
    model = model.to(device)
    model.eval()  # Set to evaluation mode
    
    print("✓ BERT model loaded successfully\n")
    
    return tokenizer, model, device


def get_bert_embedding(text, tokenizer, model, device='cpu'):
    """
    Get BERT embedding for text using mean pooling.
    Mirrors get_word2vec_embedding() structure.
    
    Parameters:
    -----------
    text : str
        Input text to embed
    tokenizer : BertTokenizer
        BERT tokenizer
    model : BertModel
        BERT model
    device : str
        'cuda' or 'cpu'
    
    Returns:
    --------
    tuple : (embedding vector, list of truncated tokens if any)
    """
    # Tokenize
    tokens = tokenizer.tokenize(str(text))
    
    # Track if truncation occurred
    truncated_tokens = []
    if len(tokens) > 510:  # 512 - 2 for [CLS] and [SEP]
        truncated_tokens = tokens[510:]
        tokens = tokens[:510]
    
    # Encode
    inputs = tokenizer(
        str(text), 
        return_tensors='pt', 
        padding=True,
        truncation=True, 
        max_length=512
    )
    
    # Move to device
    inputs = {k: v.to(device) for k, v in inputs.items()}
    
    # Get embeddings
    with torch.no_grad():
        outputs = model(**inputs)
    
    # Mean pooling
    embedding = outputs.last_hidden_state.mean(dim=1).squeeze().cpu().numpy()
    
    return embedding, truncated_tokens


def compute_embeddings_for_documents(documents_df, text_column, tokenizer, model, 
                                     device='cpu', verbose=True):
    """
    Compute BERT embeddings for all documents in a DataFrame.
    Mirrors Word2Vec version's structure and output format.
    
    Parameters:
    -----------
    documents_df : pd.DataFrame
        DataFrame containing documents
    text_column : str
        Column name containing text to embed
    tokenizer : BertTokenizer
        BERT tokenizer
    model : BertModel
        BERT model
    device : str
        'cuda' or 'cpu'
    verbose : bool
        Whether to print progress
    
    Returns:
    --------
    tuple : (embeddings array, list of all truncated tokens)
    """
    if verbose:
        print(f"\nComputing BERT embeddings for {len(documents_df)} documents...")
    
    doc_embeddings = []
    all_truncated = []
    
    for idx, row in documents_df.iterrows():
        text = str(row[text_column])
        embedding, truncated = get_bert_embedding(text, tokenizer, model, device)
        doc_embeddings.append(embedding)
        all_truncated.extend(truncated)
        
        if verbose and (idx + 1) % 10 == 0:
            print(f"  Processed {idx + 1}/{len(documents_df)} documents...")
    
    doc_embeddings = np.array(doc_embeddings)
    
    if verbose:
        print(f"\n✓ Embeddings computed")
        print(f"  Embeddings shape: {doc_embeddings.shape}")
        print(f"  Truncated tokens: {len(all_truncated):,}")
        if len(all_truncated) > 0:
            print(f"  Truncation occurred in {len([t for t in all_truncated if t])/(len(documents_df)):.1%} of documents")
    
    return doc_embeddings, all_truncated


def compute_cosine_similarity_matrix(embeddings, document_labels=None):
    """
    Compute pairwise cosine similarity matrix for embeddings.
    Identical to Word2Vec version - works with any embeddings.
    
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
    Identical to Word2Vec version - works with any similarity matrix.
    
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
# BERT-SPECIFIC UTILITY FUNCTIONS
# ============================================================================

def compare_bert_models(text, model_names=None):
    """
    Compare embeddings from different BERT models on the same text.
    Useful for model selection.
    
    Parameters:
    -----------
    text : str
        Sample text to compare
    model_names : list, optional
        List of model names to compare
        Default: ['bert-base-uncased', 'bert-large-uncased']
    
    Returns:
    --------
    pd.DataFrame : Comparison results
    """
    if model_names is None:
        model_names = ['bert-base-uncased', 'bert-large-uncased']
    
    results = []
    embeddings_dict = {}
    
    for model_name in model_names:
        print(f"\nTesting {model_name}...")
        try:
            tokenizer, model, device = load_bert_model(model_name)
            embedding, truncated = get_bert_embedding(text, tokenizer, model, device)
            
            embeddings_dict[model_name] = embedding
            
            results.append({
                'model': model_name,
                'embedding_dim': len(embedding),
                'truncated_tokens': len(truncated),
                'embedding_norm': np.linalg.norm(embedding)
            })
            
            # Cleanup
            del tokenizer, model
            if device == 'cuda':
                torch.cuda.empty_cache()
                
        except Exception as e:
            print(f"  Error with {model_name}: {e}")
            results.append({
                'model': model_name,
                'embedding_dim': None,
                'truncated_tokens': None,
                'embedding_norm': None
            })
    
    # Compute pairwise similarities between models
    model_pairs = []
    model_list = list(embeddings_dict.keys())
    for i, model1 in enumerate(model_list):
        for model2 in model_list[i+1:]:
            sim = cosine_similarity(
                embeddings_dict[model1].reshape(1, -1),
                embeddings_dict[model2].reshape(1, -1)
            )[0, 0]
            model_pairs.append({
                'model1': model1,
                'model2': model2,
                'similarity': sim
            })
    
    print("\n" + "="*70)
    print("MODEL COMPARISON RESULTS")
    print("="*70)
    
    results_df = pd.DataFrame(results)
    print("\nModel Statistics:")
    print(results_df.to_string(index=False))
    
    if model_pairs:
        pairs_df = pd.DataFrame(model_pairs)
        print("\nInter-Model Similarities:")
        print(pairs_df.to_string(index=False))
    
    return results_df


def get_model_info(model_name='bert-large-uncased'):
    """
    Get information about a BERT model without loading it.
    
    Parameters:
    -----------
    model_name : str
        Name of the BERT model
    
    Returns:
    --------
    dict : Model information
    """
    from transformers import AutoConfig
    
    config = AutoConfig.from_pretrained(model_name)
    
    info = {
        'model_name': model_name,
        'embedding_dim': config.hidden_size,
        'num_layers': config.num_hidden_layers,
        'num_attention_heads': config.num_attention_heads,
        'max_position_embeddings': config.max_position_embeddings,
        'vocab_size': config.vocab_size
    }
    
    print(f"\nModel Information: {model_name}")
    print("="*50)
    for key, value in info.items():
        print(f"  {key}: {value}")
    
    return info
