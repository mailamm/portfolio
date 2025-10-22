export const SITE = {
  name: "Mai's Data Diaries",
  handle: '@maisdatadiaries',
  bannerText: 'Mai’s Data Diaries — Data stories, pipelines, and ML experiments',
  avatarEmoji: '📊',
  techStack: ['Python','SQL','Spark','Airflow','Snowflake','Docker','AWS','Power BI'],
  githubStarsTotal: 42,
  linkedinFollowers: 500,
  resumeUrl: '/resume.pdf',
  logoPath: '/logo.png',
  bannerUrl: '/banner.jpg',
  linkedinUrl: 'https://www.linkedin.com/in/mai-q-lam/',
  avatarUrl: '/avatar.jpg'
}

export function computeSubs() {
  return SITE.githubStarsTotal + SITE.linkedinFollowers
}
