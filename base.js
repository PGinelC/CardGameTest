import Random from "./random.js";

class Base {
  constructor() {
    this.seed = 0;

    this.playerNum = 2;
    this.registeredPlayer = -1;
    this.opponentPlayer = -1;
    this.playerHands = {};

    this.drawPile = [];
    this.discardPile = [];
    this.play = [];
  }

  setGame(seed, playerNum, registeredPlayer) {
    this.seed = new Random(seed);
    this.playerNum = playerNum;
    if (registeredPlayer >= playerNum) {
      console.log("Invalid player number");
      return;
    }
    for (let i = 0; i < playerNum; i++) {
      this.playerHands[i] = [];
    }
    this.registeredPlayer = registeredPlayer;
    this.opponentPlayer = registeredPlayer === 1 ? 2 : 1;
  }

  drawCard(player) {
    if (this.drawPile.length == 0) {
      if (this.discardPile.length == 0) {
        return -1;
      }
      // add discard pile cards to draw pile
      while (this.discardPile.length > 0) {
        this.drawPile.push(this.discardPile.pop());
      }
      // shuffle
      this.drawPile = this.shuffle(this.drawPile);
    }
    this.playerHands[player].push(this.drawPile.pop());
    return 0;
  }

  discardCard(player, card_num) {
    if (!this.playerHands[player] || this.playerHands[player].length == 0) {
        return -1;
    } else {
        this.discardPile.push(this.playerHands[player].pop(card_num));
        return 0;
    }
  }

  discard_random(player) {
    this.discardPile.push(
      this.playerHands[player].pop(
        Math.floor(Math.random() * this.playerHands[player].length)
      )
    );
  }

  playCard(player, card_num) {
    if (!this.playerHands[player] || this.playerHands[player].length == 0) {
      return -1;
    } else {
      this.play.push(this.playerHands[player].pop(card_num));
      return 0;
    }
  }

  seeHand(player) {
    if (player == this.registeredPlayer) {
      return this.playerHands[player];
    }
  }

  gameInfo() {
    return [
      this.seed,
      this.drawPile.length,
      this.play.length,
      this.discardPile.length,
    ];
  }

  restart() {
    this.random = None;

    this.playerNum = 2;
    this.registeredPlayer = None;
    this.playerHands = [];

    this.drawPile = [];
    this.discardPile = [];
    this.play = [];
  }

  shuffle(deck) {
    let currentIndex = deck.length;
    var temporaryValue;
    var randomIndex;
    while (0 < currentIndex) {
      randomIndex = Math.floor(this.seed.next() * currentIndex);
      currentIndex -= 1;
      temporaryValue = deck[currentIndex];
      deck[currentIndex] = deck[randomIndex];
      deck[randomIndex] = temporaryValue;
    }
    return deck;
  }

  newRound() {
    while (this.play.length > 0) {
      this.discardPile.push(this.play.pop());
    }
  }

  async loadCards(path) {
    try {
      const response = await fetch(path);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}

export default Base;
