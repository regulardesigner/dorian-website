// Display order and labels for the filter bar. Keys match `category` in projects.json.
export const CATEGORIES = [
  { id: 'production', label: 'Production' },
  { id: 'interview', label: 'Interview' },
  { id: 'documentary', label: 'Documentary' },
  { id: 'animation', label: 'Animation' },
]

export const categoryLabel = (id) =>
  CATEGORIES.find((c) => c.id === id)?.label ?? id
