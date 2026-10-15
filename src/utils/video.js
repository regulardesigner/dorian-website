// Vue CLI public path, normalised to end with a single slash
const publicPath = (process.env.BASE_URL || '/').replace(/\/?$/, '/')

const YOUTUBE_ID = /^.*(?:youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/

export function getYoutubeId(url) {
  if (Array.isArray(url)) url = url[0]
  if (typeof url !== 'string') return null
  const match = url.match(YOUTUBE_ID)
  return match && match[1].length === 11 ? match[1] : null
}

export function getThumbnail(project) {
  if (project.thumbnail) return `${publicPath}img/${project.thumbnail}`
  const id = getYoutubeId(project.link)
  return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : ''
}

// YouTube serves fixed sizes; let the browser pick one for the card width and pixel density
// (hqdefault/sddefault are 4:3 letterboxed — object-cover crops the bars)
const YOUTUBE_SIZES = [
  ['mqdefault', 320],
  ['hqdefault', 480],
  ['sddefault', 640],
  ['maxresdefault', 1280],
]

export function getThumbnailSrcset(project) {
  if (project.thumbnail) return ''
  const id = getYoutubeId(project.link)
  if (!id) return ''
  return YOUTUBE_SIZES.map(([name, w]) => `https://i.ytimg.com/vi/${id}/${name}.jpg ${w}w`).join(', ')
}

export function getEmbedUrl(project) {
  const id = getYoutubeId(project.link)
  if (!id) return ''
  const params = new URLSearchParams({ autoplay: '1', rel: '0', modestbranding: '1' })
  return `https://www.youtube-nocookie.com/embed/${id}?${params}`
}

// "2025-05-01" -> "05.2025" (string split avoids timezone shifts from Date parsing)
export function formatMonthYear(isoDate) {
  const [year, month] = isoDate.split('-')
  return `${month}.${year}`
}

export function projectKey(project) {
  return `${project.link}|${project.date}`
}
