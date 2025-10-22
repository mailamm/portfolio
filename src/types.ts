export type Project = {
  id: string
  title: string
  category: 'Data Engineering' | 'Machine Learning' | 'Visualization' | 'AI Agents' | 'Research'
  description: string
  views: number
  date: string
  tags: string[]
  thumbnail?: string
  github?: string
  demo?: string
  report?: string
  playlists: string[]
  durationHint?: string
}

export type Certificate = {
  id: string
  name: string
  issuer: string
  logo?: string
  link?: string
  takeaway: string
}
