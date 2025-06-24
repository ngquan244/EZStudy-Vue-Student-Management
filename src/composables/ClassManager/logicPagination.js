// Get total pages
export function getTotalPages(rows, perPage) {
  return Math.ceil(rows.length / perPage)
}

// Paginated index
export function getPaginatedRows(rows, page, perPage) {
  const start = (page - 1) * perPage
  return rows.slice(start, start + perPage).map((item, i) => ({
    ...item,
    index: start + i + 1
  }))
}
