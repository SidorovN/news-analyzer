export class NewsApi {
  constructor(config) {
    this.config = config
  }
  fetchData(query) {
    return fetch(`${this.config.url}?q=${query}&apiKey=${this.config.apiKey}&from=${this.config.from}&to=${this.config.to}&pageSize=${this.config.pageSize}&sortBy=${this.config.sortBy}`, {
      method: 'GET',
    })
      .then(res => res.json())
  }
}
