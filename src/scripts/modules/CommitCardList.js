import {CardList} from "./CardList";

export class CommitCardList extends CardList {
  constructor(addCardCallback) {
    super(addCardCallback)
  }
  init = (selector) => {
    this.element = this.setElement(selector)
  }
  addCommits = (commits) => {
    this.render(commits)
  }
}
