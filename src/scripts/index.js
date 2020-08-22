import "../pages/index.css";

import {DataStorage} from "./modules/DataStorage";
import {Api} from "./modules/Api";
import {CommitCard} from "./modules/CommitCard";
import {NewsCard} from "./modules/NewsCard";
import {NewsCardList} from "./modules/NewsCardList";
import {SearchForm} from "./modules/SearchForm";

const NEWS_API_KEY = '39e60f014e98480c9cd4386a113dc9da'
const NEWS_API_URL = 'https://nomoreparties.co/news/v2/top-headlines'
const NEWS_CARD_SELECTOR = '.news-card-template'
const FORM_SELECTOR = '.search__form'

const newsListSelectors = {
  element: '.results__cards',
  preloader: '.preloader',
  notFound: '.not-found',
  results: '.results',
  button: '.results__button'
}

const newsConfig = {
  url: NEWS_API_URL,
  apiKey: NEWS_API_KEY,
  lang: 'ru',
  from:  "2020-08-01",
  to: "2020-08-17",
  pageSize: 100,
}

const renderNews = query => {
  newsApi.fetchData(query)
    .then(res => {
      storage.setStorage({
        news: res.articles.map(elem => {
          return ({
            title: elem.title,
            date: elem.publishedAt,
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
const createNewsCard = (...args) => new NewsCard(NEWS_CARD_SELECTOR, ...args).create()
const newsList = new NewsCardList(createNewsCard)
const form = new SearchForm(FORM_SELECTOR, renderNews)
form.init()
newsList.init(newsListSelectors)

const storage = new DataStorage()

if(storage.query && storage.news) newsList.firstNews(storage.news)


document.addEventListener('load', () => {
  const savedNews = storage.getStorage().news
  if(savedNews) {
    newsList.firstNews(savedNews)
  }
})
