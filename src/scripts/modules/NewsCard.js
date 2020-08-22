import {Card} from './Card'

export class NewsCard extends Card {
  constructor(templateSelector, card) {
    super(templateSelector);
    this.title = card.title;
    this.date = card.date;
    this.text = card.text;
    this.author = card.author;
    this.link = card.link;
    this.imgUrl = card.imgUrl;
  }
  create() {
    this.init();
    const title = this.card.querySelector('.news-card__heading');
    const date = this.card.querySelector('.news-card__date');
    const link = this.card.querySelector('.news-card__link');
    const image = this.card.querySelector('.news-card__image');
    const text = this.card.querySelector('.news-card__text');
    const author = this.card.querySelector('.news-card__author');
    title.textContent = this.title
    date.textContent = this.date
    text.textContent = this.text
    author.textContent = this.author
    image.src = this.imgUrl
    link.href = this.link
    return this.card
  }
}
