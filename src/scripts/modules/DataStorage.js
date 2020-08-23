export class DataStorage {
  setStorage({query,news}) {
    window.localStorage.setItem('query',JSON.stringify(query))
    window.localStorage.setItem('news',JSON.stringify(news))
  }
  getStorage() {
    return {
      query: JSON.parse(window.localStorage.getItem('query')),
      news: JSON.parse(window.localStorage.getItem('news')),
    }
  }
}
