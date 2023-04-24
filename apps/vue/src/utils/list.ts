import { reactive } from 'vue'

function token() {
  return Math.random().toString(36).substring(2, 10)
}

export function createList() {
  return Array.from({ length: 500 }, (_, id) => {
    const newVar = reactive({ name: token(), id })
    // TODO cleanup on component unmount
    setInterval(() => {
      newVar.name = token()
    }, 10)
    return newVar
  })
}
