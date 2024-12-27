import ForestRitual from "./forestRitual.js";
import Display from "./display.js";

document.addEventListener('DOMContentLoaded', (event) => {
    console.log('Document fully loaded and parsed');
    window.game = new ForestRitual();
    window.display = new Display();
    // Game setup listeners
    document.getElementById('startGameBtn').addEventListener('click', () => startGame());

    // Opponent control listeners
    document.getElementById('opponentDrawBtn').addEventListener('click', () => opponentDraw());
    document.getElementById('opponentDiscardBtn').addEventListener('click', () => {
        const cardNum = document.getElementById('opponentCardNum').value-1;
        opponentDiscard(cardNum);
    });
    document.getElementById('opponentPlayBtn').addEventListener('click', () => {
        const cardNum = document.getElementById('opponentCardNum').value-1;
        opponentPlay(cardNum);
    });

    // Play area listeners
    document.getElementById('revealCardsBtn').addEventListener('click', () => revealCards());
    document.getElementById('nextRoundBtn').addEventListener('click', () => nextRound());

    // Player control listeners
    document.getElementById('playerDrawBtn').addEventListener('click', () => playerDraw());
    document.getElementById('playerDiscardBtn').addEventListener('click', () => {
        const cardNum = document.getElementById('playerCardNum').value-1;
        playerDiscard(cardNum);
    });
    document.getElementById('playerPlayBtn').addEventListener('click', () => {
        const cardNum = document.getElementById('playerCardNum').value-1;
        playerPlay(cardNum);
    });
});

//probably should be in base
function startGame() {
    const seed = document.getElementById('seedInput').value;
    const playerNum = document.getElementById('playerNumInput').value;
    const registeredPlayer = document.getElementById('registeredPlayerInput').value-1;
    window.game.setGame(seed, playerNum, registeredPlayer);
    window.game.setCards("forestRitualCards.json");
    window.game.shuffleCards();
    window.display.updateHandDisplay(window.game.playerHands[window.game.registeredPlayer-1]);
    window.display.updatePlayArea(window.game.play, false);
    console.log("Game Started");
}

// Opponent actions
function opponentDraw() {
    const err = window.game.drawCard(window.game.opponentPlayer-1);
    if (err != 0) {
        console.log(`Player ${window.game.registeredPlayer} cannot draw a card`);
    } else {
        console.log(`Opponent Player ${window.game.opponentPlayer} drew a card`);
        //window.display.updateHandDisplay();
    }
}

function opponentDiscard(cardNum) {
    const err = game.discardCard(window.game.opponentPlayer-1, cardNum);
    if (err != 0) {
        console.log(`Opponent Player ${window.game.opponentPlayer} cannot discard a card`);
    } else {
        console.log(`Opponent Player ${window.game.opponentPlayer} discarded their card number ${cardNum+1}`);
        //window.display.updateHandDisplay();
    }
}

function opponentPlay(cardNum) {
    const err = game.playCard(window.game.opponentPlayer-1, cardNum);
    if (err != 0) {
        console.log(`Opponent Player ${window.game.opponentPlayer} cannot play a card`);
    } else {
        window.display.updatePlayArea(window.game.play, true);
        console.log(`Opponent Player ${window.game.opponentPlayer} played their card number ${cardNum+1}`);
    }
}

  // Player actions
function playerDraw() {
    const err = window.game.drawCard(window.game.registeredPlayer-1);
    if (err != 0) {
        console.log(`Player ${window.game.registeredPlayer} cannot draw a card`);
    } else {
        window.display.updateHandDisplay(window.game.playerHands[window.game.registeredPlayer-1]);
        console.log(`Player ${window.game.registeredPlayer} drew a card`);
    }
}

function playerDiscard(cardNum) {
    const err = window.game.discardCard(window.game.registeredPlayer-1, cardNum);
    if (err != 0) {
        console.log(`Player ${window.game.registeredPlayer} cannot discard a card`);
    } else {
        window.display.updateHandDisplay(window.game.playerHands[window.game.registeredPlayer-1]);
        console.log(`Player ${window.game.registeredPlayer} discarded their card number ${cardNum+1}`);
    }
}

function playerPlay(cardNum) {
    const err = window.game.playCard(window.game.registeredPlayer-1, cardNum);
    if (err != 0) {
        console.log(`Player ${window.game.registeredPlayer} cannot play a card`);
    } else {
        window.display.updatePlayArea(window.game.play, true);
        window.display.updateHandDisplay(window.game.playerHands[window.game.registeredPlayer-1]);
        console.log(`Player ${window.game.registeredPlayer} played their card number ${cardNum+1}`);
    }
}

function revealCards() {
    window.game.revealCards();
    window.display.updatePlayArea(window.game.play, false);
}

function nextRound(){
    window.game.newRound();
    window.display.updatePlayArea(window.game.play, false);
}