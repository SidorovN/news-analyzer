import "../pages/analytics.css";

import {getToday,getDaysAgo,getStatsDate} from "./modules/utils/dateFunctions";
import {DataStorage} from "./modules/DataStorage";
import {CardList} from "./modules/CardList";
import {Card} from "./modules/Card";

const STATS_R0W_SELECTOR = '.stats-template'
const DAYS_AGO = 7
const STATS_SELECTORS = {
  element: '.table__stats',
  title: '.paper__query',
  countTotal: '.paper__text-bold_total',
  countTitle: '.paper__text-bold_title',

}

class StatsRow extends Card {
  constructor(templateSelector,formatDate, stat) {
    super(templateSelector,formatDate)
    this.stat = stat
  }
  create() {
    this.init();
    const date = this.card.querySelector('.text')
    const value = this.card.querySelector('.progress-bar__value')
    const progressBar = this.card.querySelector('.progress-bar__fill')
    date.textContent = this._formatDate(this.stat.date);
    value.textContent = this.stat.value;
    progressBar.style.width = this.stat.value + '%';
    return this.card
  }
}

class Analytics extends CardList{
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
    console.log(dates)
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
  addStats() {
    this.title.textContent = this.query
    this.render(this.collectObj())
  }
}

const createStat = (...args) => new StatsRow(STATS_R0W_SELECTOR,getStatsDate, ...args).create()

const stats = new Analytics(createStat, getToday, getDaysAgo, DAYS_AGO)
const storage = new DataStorage()

document.addEventListener('DOMContentLoaded', () => {
  const news = storage.getStorage().news
  const query = storage.getStorage().query
  stats.init(STATS_SELECTORS,{query,news})
  stats.addStats();
})
