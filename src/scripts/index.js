import "../pages/index.css";

import {getToday,getDaysAgo, getCardDate} from "./utils/dateFunctions";
import {DataStorage} from "./modules/DataStorage";
import {NewsCard} from "./modules/NewsCard";
import {NewsCardList} from "./modules/NewsCardList";
import {SearchForm} from "./modules/SearchForm";
import {NewsApi} from "./modules/NewsApi";
import {NEWS_API_KEY,NEWS_API_URL,NEWS_CARD_SELECTOR,NEWS_LIST_SELECTOTS,FORM_SELECTOR,DAYS_AGO} from "./constans/constans";


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

const newsApi = new NewsApi(newsConfig)
const createNewsCard = (...args) => new NewsCard(NEWS_CARD_SELECTOR,getCardDate, ...args).create()
const newsList = new NewsCardList(createNewsCard)
const form = new SearchForm(FORM_SELECTOR, renderNews)
const storage = new DataStorage()

newsList.init(NEWS_LIST_SELECTOTS)

document.addEventListener('DOMContentLoaded', () => {
  const savedNews = storage.getStorage().news
  const query = storage.getStorage().query
  form.init(query)
  if(savedNews.length) {
    newsList.firstNews(savedNews)
  }
})
