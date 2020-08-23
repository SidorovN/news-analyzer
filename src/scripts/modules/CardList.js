import {BaseComponent} from "./BaseComponent";

export class CardList extends BaseComponent {
  constructor(addCardCallback) {
    super()
    this.addCard = addCardCallback;
  }
  render(data) {
    data.forEach(elem => {
      this.element.append(this.addCard(elem))
    })
  }

}

