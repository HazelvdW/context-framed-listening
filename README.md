# Framed Listening

**Does contextual framing shape what listeners think about while hearing music?**

This repository contains all data, analysis code, and outputs for the *Framed Listening* project (Hazel A. van der Walle, PhD, Music, Durham University). The study investigates whether brief contextual framing cues — descriptions of the contextual situation in which a piece of music may be typically heard (e.g., *bar*, *concert*, *movie*, *video game*) — shape the semantic content of listeners' music-influenced mental content (MIMC), and whether this varies across musical genres.

### https://hazelvdw.github.io/context-framed-listening/

**Read the preprint here:**
> van der Walle, H. A., Margulis, E. H., Jakubowski, K. (2026). *Framed Listening: Can accompanying contextual cues shape Music-Influenced Mental Content?. _PsyArXiv_. https://doi.org/10.31234/osf.io/zup69_v1*.

---

## Study Overview

Participants listened to sixteen musical excerpts from four genres (80s-pop, Electronic, Jazz, Metal) while being given one of four contextual framing cues. After each clip they described any thoughts, images, or mental experiences they had. A supplementary study collected independent believability ratings for all 64 clip–context pairings.

Semantic similarity of MIMC descriptions was quantified using two complementary NLP pipelines:

- **MiniLM** (`all-MiniLM-L6-v2`) — sentence-embedding semantic similarity at the individual response level
- **TF-IDF** — lexical similarity at the aggregated document level (combMIMC)

Three research questions were addressed:

1. **RQ1** — Do contextual framing cues shape MIMC similarity?
2. **RQ2** — Does music or context drive greater MIMC convergence? Does combined alignment produce additional convergence?
3. **RQ3** — Does musical genre moderate the context effect?

---

## Repository Structure

```
context-framed-listening/
│
├── dataMAINstudy.csv              # Main study raw data (participant MIMC descriptions)
├── dataSUPPstudy.csv              # Supplementary study believability ratings
├── LICENSE
│
├── NLP_analyses/                  # Analysis pipeline (run in order)
│   ├── text-prep.qmd              # 1. Spell-checking, preprocessing, combMIMC aggregation
│   ├── TFIDF-analysis.qmd         # 2. TF-IDF cosine similarity (combMIMC level)
│   ├── SEmb-analysis.qmd          # 3. Sentence-embedding similarity (individual level)
│   ├── model-comparison.qmd       # 4. Cross-model comparison (9 models × 2 levels)
│   ├── requirements.txt           # Python minimum-version dependencies
│   ├── constraints.txt            # Python exact-version pins
│   ├── DESCRIPTION                # R package metadata (used by renv)
│   ├── renv.lock                  # R exact-version lockfile
│   └── REPRODUCIBILITY.md         # Full setup and reproduction instructions
│
├── NLP_outputs/                   # Generated outputs (not tracked by git if large)
│   ├── combMIMC_lvl1a.csv         # Aggregated MIMC, light preprocessing + text_original
│   ├── combMIMC_lvl1b.csv         # Aggregated MIMC, light preprocessing (thought words kept)
│   ├── combMIMC_lvl2a.csv         # Aggregated MIMC, aggressive preprocessing + text_original
│   ├── combMIMC_lvl2b.csv         # Aggregated MIMC, aggressive preprocessing (thought words kept)
│   ├── dataMIMC_preprocessed.csv  # Individual MIMC responses (all preprocessing levels)
│   ├── dataMIMC.csv               # Cleaned individual MIMC data
│   ├── clipContextDescrStats.csv  # Descriptive statistics by clip × context
│   ├── misspellings_df.csv        # Flagged misspellings for manual review
│   ├── misspelling_c...csv        # Applied correction mapping
│   ├── model_comparison/          # Cross-model comparison outputs and embedding caches
│   ├── SentenceEmbedding/         # MiniLM outputs and embedding cache
│   ├── TFIDF/                     # TF-IDF outputs
│   └── supp_study/                # Supplementary study analysis outputs
│
├── PsychoPy-files/                # Experiment files
│   ├── PsychoPy-exp-master.js
│   └── PsychoPy-exp-master.psyexp
│
└── supp-study/                    # Supplementary study analysis
    ├── suppstudy-analysis.qmd
    ├── suppstudy-analysis.html
    ├── ptp-descriptive-data.html
    └── output/suppstudy/          # Figures and exported tables
```

---

## Analysis Pipeline

The four QMD files in `NLP_analyses/` should be run in order:

| Step | File | Purpose |
|---|---|---|
| 1 | `text-prep.qmd` | Spell-check, stop word removal, lemmatisation, combMIMC aggregation |
| 2 | `model-comparison.qmd` | Cross-model comparison: 9 models × 2 data levels, rank correlation, top/bottom pair inspection |
| 3 | `TFIDF-analysis.qmd` | TF-IDF vectorisation and cosine similarity at the combMIMC level |
| 4 | `SEmb-analysis.qmd` | Sentence-embedding similarity at the individual level; LMMs; t-SNE |

Each file includes a version-check chunk that confirms all dependencies are correctly installed before any analysis runs.

---

## Preprocessing Levels

Two preprocessing pipelines are applied, tailored to model requirements:

| Level | Used for | What is removed |
|---|---|---|
| `lvl1` | MiniLM (light) | Custom stop words; punctuation and word forms preserved |
| `lvl2` | TF-IDF (aggressive) | Custom stop words + NLTK English stop words + lemmatisation; punctuation and case lowered |

---

## Reproducibility

See [`REPRODUCIBILITY.md`](NLP_analyses/REPRODUCIBILITY.md) for full setup instructions. In brief:

**Python:**
```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

**R:**
```r
install.packages("renv")
renv::restore()
# If knitr/rmarkdown are missing after restore:
renv::install(c("knitr", "rmarkdown", "reticulate"))
renv::snapshot()
```

**Rendering:**
```bash
quarto render text-prep.qmd
quarto render TFIDF-analysis.qmd
quarto render SEmb-analysis.qmd
quarto render model-comparison.qmd
```

The Word2Vec model (~1.6 GB) and all sentence embeddings are cached locally on first run; subsequent runs load from cache. See `REPRODUCIBILITY.md` for cache management.

---

## Dependencies

| Type | Key packages |
|---|---|
| Python | `pandas`, `numpy`, `scikit-learn`, `sentence-transformers`, `torch`, `gensim`, `nltk`, `pyspellchecker`, `matplotlib`, `seaborn`, `wordcloud` |
| R | `lme4`, `lmerTest`, `MuMIn`, `emmeans`, `ARTool`, `randomForest`, `MASS`, `ggplot2`, `dplyr`, `dunn.test` |
| Quarto | ≥ 1.4 |
| Python | 3.10–3.12 |
| R | ≥ 4.2 |

---

## Citation

If you use this code or data, please cite:

> van der Walle, H. A., Margulis, E. H., Jakubowski, K. (2026). *Framed Listening: Can accompanying contextual cues shape Music-Influenced Mental Content?. _PsyArXiv_. https://doi.org/10.31234/osf.io/zup69_v1*.

---

## Licence

Code: [MIT](LICENSE)
Data and written materials: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)
