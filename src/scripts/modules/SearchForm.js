import {BaseComponent} from "./BaseComponent";

export class SearchForm extends BaseComponent {
  constructor(selector, createCardCallback) {
    super()
    this.selector = selector
    this.createCard = createCardCallback;
  }
  init = (query='') => {
    this.element = this.setElement(this.selector)
    this.input = this.element.querySelector('input')
    this.input.value = query
    this.setListeners()
  }
  setListeners() {
    this.element.addEventListener('submit',this.formHandler)
  }
  formHandler = (evt) => {
    evt.preventDefault()
    this.createCard(this.input.value)
  }
}
