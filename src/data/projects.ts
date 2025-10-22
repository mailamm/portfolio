import type { Project } from '../types'

export const PROJECTS: Project[] = [
  {
    id: 'skin-condition-diagnosis',
    title: 'Human Skin Condition Diagnosis',
    category: 'Machine Learning',
    description:
      'Multimodal pipeline that fuses dermatoscopic imagery with patient symptoms to triage common skin conditions.',
    views: 2450,
    date: '2025-08-04T10:00:00Z',
    tags: ['Computer Vision', 'Healthcare', 'TensorFlow', 'ETL'],
    playlists: ['machine-learning-diaries', 'data-engineering-diaries', 'nlp-generative-ai-logs'],
  },
  {
    id: 'flower-species-classification',
    title: 'Flower Species Classification',
    category: 'Machine Learning',
    description:
      'Comparing lightweight CNNs and classic ML baselines for identifying flower species from garden imagery.',
    views: 1320,
    date: '2025-05-12T10:00:00Z',
    tags: ['Python', 'CNN', 'Classification'],
    playlists: ['machine-learning-diaries'],
  },
  {
    id: 'emotion-dialogue-classifier',
    title: 'Emotion Classification from Dialogue',
    category: 'Machine Learning',
    description:
      'Labelling customer support chats with emotion intent using transformer embeddings and weak supervision.',
    views: 1875,
    date: '2025-06-18T10:00:00Z',
    tags: ['NLP', 'Transformers', 'Python'],
    playlists: ['machine-learning-diaries', 'nlp-generative-ai-logs'],
  },
  {
    id: 'million-song-spark-regression',
    title: 'Spark Regression on Million Song Dataset',
    category: 'Data Engineering',
    description:
      'Feature engineering on Spark + Delta Lake to predict song popularity with scalable regression pipelines.',
    views: 1640,
    date: '2025-07-02T10:00:00Z',
    tags: ['Spark', 'Delta Lake', 'Regression'],
    playlists: ['data-engineering-diaries'],
  },
  {
    id: 'movie-recommendations',
    title: 'Movie Recommendations',
    category: 'Machine Learning',
    description:
      'Hybrid collaborative-filtering service with batch features and real-time re-ranking for movie discovery.',
    views: 2285,
    date: '2025-07-24T10:00:00Z',
    tags: ['Recommender Systems', 'Python', 'AWS'],
    playlists: ['data-engineering-diaries', 'ai-systems-in-production'],
  },
  {
    id: 'travexp-rag-chatbot',
    title: 'TravExp RAG Chatbot',
    category: 'AI Agents',
    description:
      'Retriever-augmented travel assistant that plans itineraries by grounding LLM responses in curated docs.',
    views: 2030,
    date: '2025-08-10T10:00:00Z',
    tags: ['RAG', 'LangChain', 'Vector DB'],
    playlists: ['ai-systems-in-production', 'nlp-generative-ai-logs'],
  },
  {
    id: 'smart-device-analysis-python',
    title: 'Smart Device Data Analysis (Python)',
    category: 'Visualization',
    description:
      'Exploratory notebook uncovering healthy habit signals from wearable device telemetry using Python.',
    views: 980,
    date: '2025-05-28T10:00:00Z',
    tags: ['Python', 'EDA', 'Matplotlib'],
    playlists: ['data-analytics-visualization'],
  },
  {
    id: 'smart-device-analysis-r',
    title: 'Smart Device Data Analysis (R)',
    category: 'Visualization',
    description:
      'Recreating the wearable insights workflow in R with ggplot2, tidymodels, and Shiny prototypes.',
    views: 860,
    date: '2025-06-08T10:00:00Z',
    tags: ['R', 'ggplot2', 'tidymodels'],
    playlists: ['data-analytics-visualization'],
  },
  {
    id: 'sql-employee-training',
    title: 'SQL Employee Training Management',
    category: 'Data Engineering',
    description:
      `
        Designed a relational database schema for employee training and project tracking.
        Developed SQL scripts to create tables, enforce constraints, and insert test data.
        Wrote advanced SQL queries (JOINs, Window Functions, Aggregations, Subqueries) to analyze employee progress.
        Enabled HR teams to make data-driven training decisions.
      `,
    views: 1120,
    date: '2025-04-30T10:00:00Z',
    tags: ['SQL', 'PostgreSQL','Data Modeling', 'Analytics', 'ERD Modeling'],
    playlists: ['data-analytics-visualization'],
  },
]
