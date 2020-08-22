import {Card} from "./Card";

export class CommitCard extends Card {
  constructor(templateSelector, card) {
    super(templateSelector);
    this.name = card.name;
    this.date = card.date;
    this.text = card.text;
    this.author = card.author;
    this.mail = card.mail;
    this.imgUrl = card.imgUrl;
  }
  create() {
    const name = this.card.querySelector('.commit-card__name');
    const date = this.card.querySelector('.commit-card__date');
    const link = this.card.querySelector('.commit-card__link');
    const image = this.card.querySelector('.commit-card__avatar');
    const text = this.card.querySelector('.commit-card__text');
    const author = this.card.querySelector('.commit-card__author');
    name.textContent = this.title
    date.textContent = this.date
    text.textContent = this.text
    author.textContent = this.author
    image.src = this.imgUrl
    link.href = this.this.link
    return this.card
  }
}
