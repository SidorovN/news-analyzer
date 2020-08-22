import {BaseComponent} from "./BaseComponent";

export class SearchForm extends BaseComponent {
  constructor(selector, createCardCallback) {
    super()
    this.selector = selector
    this.createCard = createCardCallback;
  }
  init = () => {
    this.element = this.setElement(this.selector)
    this.setListeners()
    this.input = this.element.querySelector('input')
  }
  setListeners() {
    this.element.addEventListener('submit',this.formHandler)
  }
  formHandler = (evt) => {
    evt.preventDefault()
    this.createCard(this.input.value)
  }
}
