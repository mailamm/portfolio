export function relativeTimeFromISO(iso: string): string {
  const then = new Date(iso).getTime(); const now = Date.now(); const diff = Math.max(0, now-then)
  const mins = Math.floor(diff/60000), hours=Math.floor(mins/60), days=Math.floor(hours/24), months=Math.floor(days/30), years=Math.floor(days/365)
  if (years>0) return `${years} year${years>1?'s':''} ago`
  if (months>0) return `${months} month${months>1?'s':''} ago`
  if (days>0) return `${days} day${days>1?'s':''} ago`
  if (hours>0) return `${hours} hour${hours>1?'s':''} ago`
  if (mins>0) return `${mins} minute${mins>1?'s':''} ago`
  return 'just now'
}