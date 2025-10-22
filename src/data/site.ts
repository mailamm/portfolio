const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`

export const SITE = {
  name: "Mai's Data Diaries",
  handle: '@maisdatadiaries',
  bannerText: 'Mai’s Data Diaries — Data stories, pipelines, and ML experiments',
  avatarEmoji: '📊',
  techStack: ['Python','SQL','Spark','Airflow','Snowflake','Docker','AWS','Power BI'],
  githubStarsTotal: 42,
  linkedinFollowers: 500,
  resumeUrl: '/resume.pdf',
  logoPath: asset('logo.png'),
  bannerUrl: asset('banner.jpg'),
  linkedinUrl: 'https://www.linkedin.com/in/mai-q-lam/',
  avatarUrl: asset('avatar.jpg')
}

export function computeSubs() {
  return SITE.githubStarsTotal + SITE.linkedinFollowers
}
