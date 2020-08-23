export class GithubApi {
  constructor(config) {
    this.config = config;
  }
  fetchData() {
    return fetch(`${this.config.url}${this.config.user}/${this.config.repo}/commits`, {
      method: 'GET',
    })
      .then(res => res.json())
  }
}
