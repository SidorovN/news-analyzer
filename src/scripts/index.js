import "../pages/index.css";

import {getToday,getDaysAgo, getCardDate,getStatsDate} from "./modules/utils/dateFunctions";
import {DataStorage} from "./modules/DataStorage";
import {Api} from "./modules/Api";
import {CommitCard} from "./modules/CommitCard";
import {NewsCard} from "./modules/NewsCard";
import {NewsCardList} from "./modules/NewsCardList";
import {SearchForm} from "./modules/SearchForm";

const NEWS_API_KEY = '39e60f014e98480c9cd4386a113dc9da'
const NEWS_API_URL = 'https://newsapi.org/v2/everything'
const NEWS_CARD_SELECTOR = '.news-card-template'
const FORM_SELECTOR = '.search__form'
const DAYS_AGO = 7

const newsListSelectors = {
  element: '.results__cards',
  preloader: '.preloader',
  notFound: '.not-found',
  results: '.results',
  button: '.results__button'
}
console.log(getDaysAgo(DAYS_AGO));
const newsConfig = {
  url: NEWS_API_URL,
  all: 'everything',
  title: 'top-headlines',
  apiKey: NEWS_API_KEY,
  lang: 'ru',
  from: getToday(),
  to: getDaysAgo(DAYS_AGO),
  pageSize: 100,
  sortBy: 'publishedAt'
}

console.log(getStatsDate(getToday()))
const renderNews = query => {
  newsApi.fetchData(query)
    .then(res => {
      storage.setStorage({
        news: res.articles.map(elem => {
          return ({
            title: elem.title,
            date: elem.publishedAt.slice(0,elem.publishedAt.indexOf('T')),
            text: elem.description,
            author: elem.source.name,
            link: elem.url,
            imgUrl: elem.urlToImage,
          })
        }),
        query: query,
      })
      newsList.showPreloader()
      return storage.getStorage().news
    })
    .then(res => {
          if(res.length) {
            newsList.firstNews(res)
        } else newsList.showError()
    })
    .catch(res=> {
      newsList.showError()
      console.error(res)
    })
}

const newsApi = new Api(newsConfig)
const createNewsCard = (...args) => new NewsCard(NEWS_CARD_SELECTOR,getCardDate, ...args).create()
const newsList = new NewsCardList(createNewsCard)
const form = new SearchForm(FORM_SELECTOR, renderNews)
const storage = new DataStorage()

newsList.init(newsListSelectors)

document.addEventListener('DOMContentLoaded', () => {
  const savedNews = storage.getStorage().news
  const query = storage.getStorage().query
  form.init(query)
  if(savedNews) {
    newsList.firstNews(savedNews)
  }
})
