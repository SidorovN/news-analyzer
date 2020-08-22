export class Api {
  constructor(config) {
    this.config = config
  }
  fetchData(query,url) {
    return fetch(`${this.config.url}?q=${query}&apiKey=${this.config.apiKey}&from=${this.config.from}&to=${this.config.to}&pageSize=${this.config.pageSize}&sortBy=${this.config.sortBy}`, {
      method: 'GET',
      headers: {
        authorization: this.config.apiKey,
      }
    })
      .then(res => res.json())
  }
}
