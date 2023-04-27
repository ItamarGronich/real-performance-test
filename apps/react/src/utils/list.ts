export function token() {
  return Math.random().toString(36).substring(2, 10);
}

export function createList() {
  const list = [];
  for (let i = 1; i <= 500; i++) {
    list.push({ name: token(), id: i });
  }
  return list;
}
