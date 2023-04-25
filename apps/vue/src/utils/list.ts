export function token() {
  return Math.random().toString(36).substring(2, 10)
}

export function createList() {
  return Array.from({ length: 500 }, (_, id) => ({ name: token(), id }))
}
