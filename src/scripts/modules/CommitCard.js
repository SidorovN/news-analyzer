import {Card} from "./Card";

export class CommitCard extends Card {
  constructor(templateSelector,formatDate, card) {
    super(templateSelector,formatDate);
    this.name = card.name;
    this.date = card.date;
    this.text = card.text;
    this.mail = card.mail;
    this.imgUrl = card.imgUrl;
  }
  create() {
    this.init()
    const name = this.card.querySelector('.commit-card__name');
    const date = this.card.querySelector('.commit-card__date');
    const image = this.card.querySelector('.commit-card__avatar');
    const text = this.card.querySelector('.commit-card__text');
    const mail = this.card.querySelector('.commit-card__mail');
    mail.textContent = this.mail
    name.textContent = this.name
    date.textContent = this._formatDate(this.date)
    text.textContent = this.text
    image.src = this.imgUrl
    return this.card
  }
}
