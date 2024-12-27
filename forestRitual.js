import Base from "./base.js";

class ForestRitual extends Base {
  constructor() {
    super();
    this.registeredPLayerRole = -1;
  }

  async setCards(path) {
    const cardsData = await super.loadCards(path);
    cardsData["playCards"].forEach(card => {
        for (let i = 0; i < card.amount; i++) {
            this.drawPile.push({ name: card.name, description: card.description });
        }
    });
    //roles are note necessry to load for now
  }

  shuffleCards(){
    this.drawPile = super.shuffle(this.drawPile);
  }

  revealCards() {
    if (this.play.length == 0) {
        console.log("No cards to reveal");
    } else {
        this.play = this.shuffle(this.play);
        for (let i = 0; i < this.play.length; i++) {
            console.log(`Index: ${i}, Card: ${this.play[i].name}`);//, Description: ${this.play[i].description}
        }
    }
  }

  dealRole(player) {
    // empty for now since I am just testing with 2 players
  }
}

export default ForestRitual;
