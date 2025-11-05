"""
NLP Functions Package
Author: Hazel A. van der Walle
Durham University, Music Department

A modular toolkit for embedding-based NLP analyses of 
music-evoked thoughts (METs).

Supports multiple embedding models:
- Word2Vec (via embedding_utils_w2v)
- BERT (via embedding_utils_bert)
- TF-IDF (via embedding_utils_tfidf)
"""

#TF-IDF embedding functions
from .embedding_utils_tfidf import (
    fit_tfidf_model,
    get_tfidf_embedding,
    compute_embeddings_for_documents as compute_tfidf_embeddings,
    get_top_terms,
    get_vocabulary_info,
    compare_tfidf_settings
)

# Word2Vec embedding functions
from .embedding_utils import (
    get_word2vec_embedding,
    compute_embeddings_for_documents as compute_w2v_embeddings,
    compute_cosine_similarity_matrix,
    extract_similarity_by_condition
)

# BERT embedding functions
from .bert_embedding_utils import (
    load_bert_model,
    get_bert_embedding,
    compute_embeddings_for_documents as compute_bert_embeddings,
    compare_bert_models,
    get_model_info
)

# Model-agnostic comparison functions (work with any embeddings)
from .comparison_functions import (
    compare_binary,
    compare_conditions,
    run_binary_comparisons,
    run_combined_comparisons,
    run_omnibus_test
)

# Model-agnostic analysis functions (work with any embeddings)
from .analysis_functions import (
    analyze_within_factor_similarity,
    analyze_pairwise_factor_comparisons,
    analyze_factor_music_vs_context,
    analyze_factor_consistency,
    analyze_genre_context_interaction
)

# Model-agnostic visualization functions (work with any embeddings)
from .visualization_functions import (
    create_similarity_heatmap,
    create_binary_comparison_violins,
    create_within_factor_comparison,
    create_pairwise_comparison,
    create_music_vs_context_comparison,
    create_consistency_comparison,
    create_similarity_matrices,
    create_genre_context_interaction_heatmap,
    create_primary_comparison_bar,
    create_comprehensive_conditions_figure
)

__version__ = "2.0.0"
__author__ = "Hazel A. van der Walle"

__all__ = [
    # TF-IDF embedding utilities
    'fit_tfidf_model',
    'get_tfidf_embedding',
    'compute_tfidf_embeddings',
    'get_top_terms',
    'get_vocabulary_info',
    'compare_tfidf_settings',
    
    # Word2Vec embedding utilities
    'get_word2vec_embedding',
    'compute_w2v_embeddings',
    
    # BERT embedding utilities
    'load_bert_model',
    'get_bert_embedding',
    'compute_bert_embeddings',
    'compare_bert_models',
    'get_model_info',
    
    # Shared utilities (work with any embeddings)
    'compute_cosine_similarity_matrix',
    'extract_similarity_by_condition',
    
    # Comparison functions (model-agnostic)
    'compare_binary',
    'compare_conditions',
    'run_binary_comparisons',
    'run_combined_comparisons',
    'run_omnibus_test',
    
    # Analysis functions (model-agnostic)
    'analyze_within_factor_similarity',
    'analyze_pairwise_factor_comparisons',
    'analyze_factor_music_vs_context',
    'analyze_factor_consistency',
    'analyze_genre_context_interaction',
    
    # Visualization functions (model-agnostic)
    'create_similarity_heatmap',
    'create_binary_comparison_violins',
    'create_within_factor_comparison',
    'create_pairwise_comparison',
    'create_music_vs_context_comparison',
    'create_consistency_comparison',
    'create_similarity_matrices',
    'create_genre_context_interaction_heatmap',
    'create_primary_comparison_bar',
    'create_comprehensive_conditions_figure',
]


# Convenience function to detect which embedding method to use
def get_embedding_method(method='word2vec'):
    """
    Get the appropriate embedding functions for a specified method.
    
    Parameters:
    -----------
    method : str
        'word2vec', 'bert', or 'tfidf'
    
    Returns:
    --------
    dict : Dictionary with compute_embeddings and get_embedding functions
    
    Example:
    --------
    >>> embedding_funcs = get_embedding_method('bert')
    >>> embeddings, _ = embedding_funcs['compute'](df, 'text_col', tokenizer, model, device)
    """
    if method.lower() == 'word2vec':
        return {
            'compute': compute_w2v_embeddings,
            'single': get_word2vec_embedding,
            'name': 'Word2Vec'
        }
    elif method.lower() == 'bert':
        return {
            'compute': compute_bert_embeddings,
            'single': get_bert_embedding,
            'name': 'BERT'
        }
    else:
        raise ValueError(f"Unknown method: {method}. Choose 'word2vec' or 'bert'")


def print_available_models():
    """Print information about available embedding models."""
    print("\n" + "="*70)
    print("AVAILABLE EMBEDDING MODELS")
    print("="*70)
    
    print("\n1. WORD2VEC")
    print("   - Model: Google News 300D")
    print("   - Functions: get_word2vec_embedding, compute_w2v_embeddings")
    print("   - Handles OOV words gracefully")
    
    print("\n2. BERT")
    print("   - Models available:")
    print("     • bert-base-uncased (110M params, 768 dim)")
    print("     • bert-large-uncased (340M params, 1024 dim)")
    print("     • vinai/bertweet-large (for tweets)")
    print("     • any HuggingFace BERT model")
    print("   - Functions: load_bert_model, get_bert_embedding, compute_bert_embeddings")
    print("   - GPU support available")
    
    print("\n3. TF-IDF (Coming Soon)")
    print("   - Classic TF-IDF vectorization")
    print("   - Functions: compute_tfidf_embeddings")
    
    print("\n" + "="*70)
    print("All analysis and visualization functions work with ANY embedding method!")
    print("="*70)
