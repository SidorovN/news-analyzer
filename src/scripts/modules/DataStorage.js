export class DataStorage {
  setStorage({query,news}) {
    console.log({query,news})
    window.localStorage.setItem('query',JSON.stringify(query))
    window.localStorage.setItem('news',JSON.stringify(news))
  }
  getStorage() {
    console.log({ query: JSON.parse(window.localStorage.getItem('query')), news: JSON.parse(window.localStorage.getItem('news')),})
    return {
      query: JSON.parse(window.localStorage.getItem('query')),
      news: JSON.parse(window.localStorage.getItem('news')),
    }
  }
}
