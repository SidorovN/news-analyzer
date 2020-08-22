export class Card {
  constructor(templateSelector) {
    this._templateSelector = templateSelector
  }
  init = () => {
    this.card = document.querySelector(this._templateSelector).content.cloneNode(true)
  }
}
