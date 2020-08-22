export class Card {
  constructor(templateSelector,formatDate) {
    this._templateSelector = templateSelector
    this._formatDate = formatDate
  }
  init = () => {
    this.card = document.querySelector(this._templateSelector).content.cloneNode(true)
  }
}
