import {CardList} from "./CardList";

export class Analytics extends CardList{
  constructor(addCardCallback, getToday,getDaysAgo, days = 7) {
    super(addCardCallback)
    this.getToday = getToday
    this.getDaysAgo = getDaysAgo
    this.days = days
  }
  init = (selectors,{ query, news}) => {
    for (let key in selectors) {
      this[key] = this.setElement(selectors[key])
    }
    this.query = query
    this.news = news
  }
  collectObj() {
    this.stats = {}
    for(let i = this.days; i > 0; i --) {
      this.stats[this.getDaysAgo(i)] = 0
    }
    const dates = this.news.map(elem => elem.date).sort()
    dates.forEach(a => {
      this.stats[a] = this.stats[a] + 1 || 1;
    })
    return Object.keys(this.stats).map((elem,index) => {
      return {
        date: elem,
        value: Math.round((this.stats[elem] * 100) / this.news.length)
      }
    })
  }
  getCountTitle() {
    let sum = 0
    this.news.forEach(elem => {
      if(elem.title.includes(this.query)) sum++
    })
    return sum
  }
  addStats() {
    this.countTitle.textContent = this.getCountTitle()
    this.countTotal.textContent = this.news.length
    this.title.textContent = this.query
    this.render(this.collectObj())
  }
}
