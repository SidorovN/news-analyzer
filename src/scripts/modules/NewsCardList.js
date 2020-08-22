import {CardList} from "./CardList";

export class NewsCardList extends CardList {
  constructor(addCardCallback, perPage = 3) {
    super(addCardCallback)
    this.perPage = perPage
    this.page = 0
  }
  init = (selectors) => {
    for (let key in selectors) {
      this[key] = this.setElement(selectors[key])
    }
    this.setListeners()
  }
  firstNews(data)  {
    this.page = 0
    this.element.innerHTML = ''
    this.data = data;
    this.addNews()
  }

  addNews = () => {
    this.render(this.data.slice(this.page * this.perPage, (this.page + 1) * this.perPage))
    this.page++
    if(this.data.length > ((this.page + 1) * this.perPage)) {
      this.showButton()
    } else {
      this.hideButton()
    }
  }
  showButton () {
    this.button.classList.remove('button_hidden')
  }
  hideButton () {
    this.button.classList.add('button_hidden')
  }
  showPreloader() {
    this.notFound.classList.remove('not-found_opened')
    this.preloader.classList.add('preloader_opened')
  }
  showError() {
    this.results.classList.remove('results_opened')
    this.notFound.classList.add('not-found_opened')
    this.preloader.classList.remove('preloader_opened')
  }
  showResults() {
    this.preloader.classList.remove('preloader_opened')
    this.notFound.classList.remove('not-found_opened')
    this.results.classList.add('results_opened')
  }
  setListeners = () => {
    if(this.results && this.button) {
      this.button.addEventListener('click',this.addNews)
    }
  }

}
