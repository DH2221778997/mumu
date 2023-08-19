


export default {
  set(key:string,value:any) {
    window.localStorage.setItem(key,JSON.stringify(value))
  },
  get(key:string) {
    const res = localStorage.getItem(key)
    const result = res? JSON.parse(res):null
    return result
  },
  remove(key:string) {
    localStorage.removeItem(key)
  },
  clear() {
    window.localStorage.clear()
  }
}
