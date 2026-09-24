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
