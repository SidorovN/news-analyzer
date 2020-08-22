export class Api {
  constructor(config) {
    this.config = config
  }
  fetchData(query) {
    return fetch(`${this.config.url}?q=${query}&apiKey=${this.config.apiKey}&country=${this.config.lang}&from=${this.config.from}&to=${this.config.to}&pageSize=${this.config.pageSize}`, {
      method: 'GET',
      headers: {
        authorization: this.config.apiKey,
      }
    })
      .then(res => res.json())
  }
}
