import type { Certificate } from '../types'

export const CERTS: Certificate[] = [
  {
    id: 'datacamp-de',
    name: 'DataCamp Data Engineer Associate',
    issuer: 'DataCamp',
    logo: '/datacamp.jpg',
    link: 'https://www.datacamp.com/certification/data-engineer',
    takeaway:
      'Skills: building resilient ETL pipelines, SQL-based warehousing, Python data wrangling, data modeling, Airflow orchestration, and stakeholder-ready data products.',
  },
  {
    id: 'datacamp-ds',
    name: 'DataCamp Data Scientist Associate (Expected Oct. 2025)',
    issuer: 'DataCamp',
    logo: '/datacamp.jpg',
    link: 'https://www.datacamp.com/certification/data-scientist',
    takeaway:
      'Skills: exploratory analysis, supervised & unsupervised learning, feature engineering, experiment design, Python statistical tooling, and narrative data storytelling.',
  },
  {
    id: 'aws-ml-assoc',
    name: 'AWS Certified Machine Learning Engineer – Associate (Expected Oct. 2025)',
    issuer: 'Amazon Web Services',
    logo: '/aws.jpg',
    link: 'https://aws.amazon.com/certification/certified-machine-learning-engineer-associate/',
    takeaway:
      'Skills: SageMaker pipelines, feature engineering, model training & tuning, secure deployment, cost-optimized inference, and ML governance on AWS.',
  },
  {
    id: 'google-da-pro',
    name: 'Google Data Analytics Professional Certificate',
    issuer: 'Google / Coursera',
    logo: '/coursera.jpg',
    link: 'https://www.coursera.org/professional-certificates/google-data-analytics',
    takeaway:
      'Skills: spreadsheet modeling, SQL querying, data cleaning, stakeholder-ready dashboards in Tableau/Looker Studio, and end-to-end analytics case studies.',
  },
  {
    id: 'google-ada-pro',
    name: 'Google Advanced Data Analytics Professional Certificate',
    issuer: 'Google / Coursera',
    logo: '/coursera.jpg',
    link: 'https://www.coursera.org/professional-certificates/google-advanced-data-analytics',
    takeaway:
      'Skills: Python-based analytics, statistical modeling, machine learning pipelines, executive-ready storytelling, and advanced visualization for business decisions.',
  },
]
