import {Card} from "./Card";

export class StatsRow extends Card {
  constructor(templateSelector,formatDate, stat) {
    super(templateSelector,formatDate)
    this.stat = stat
  }
  create() {
    this.init();
    const date = this.card.querySelector('.text')
    const value = this.card.querySelector('.progress-bar__value')
    const progressBar = this.card.querySelector('.progress-bar__fill')
    date.textContent = this._formatDate(this.stat.date);
    value.textContent = this.stat.value;
    progressBar.style.width = this.stat.value + '%';
    return this.card
  }
}
