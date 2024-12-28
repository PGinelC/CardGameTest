import ForestRitual from "./forestRitual.js";
import Display from "./display.js";

document.addEventListener('DOMContentLoaded', (event) => {
    console.log('Document fully loaded and parsed');
    window.game = new ForestRitual();
    window.display = new Display();
    // global var to check the round state and prevent actions
    window.reading = false;

    // Game setup listeners
    document.getElementById('startGameBtn').addEventListener('click', () => startGame());

    // Opponent control listeners
    document.getElementById('opponentDrawBtn').addEventListener('click', () => opponentDraw());
    document.getElementById('opponentDiscardBtn').addEventListener('click', () =>opponentDiscard());
    document.getElementById('opponentPlayBtn').addEventListener('click', () => opponentPlay());

    // Play area listeners
    document.getElementById('revealCardsBtn').addEventListener('click', () => revealCards());
    document.getElementById('nextRoundBtn').addEventListener('click', () => nextRound());

    // Player control listeners
    document.getElementById('playerDrawBtn').addEventListener('click', () => playerDraw());
    document.getElementById('playerDiscardBtn').addEventListener('click', () => playerDiscard());
    document.getElementById('playerPlayBtn').addEventListener('click', () => playerPlay());
});

//probably should be in base
async function startGame() {
    const seed = document.getElementById('seedInput').value;
    const playerNum = 2; //const playerNum = document.getElementById('playerNumInput').value;
    const registeredPlayer = 1; //const registeredPlayer = document.getElementById('registeredPlayerInput').value-1;
    window.game.setGame(seed, playerNum, registeredPlayer);
    await window.game.setCards("forestRitualCards.json");
    console.log(window.game.drawPile.length);
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
        window.display.updateHandDisplay(window.game.playerHands[window.game.opponentPlayer-1], `opponentHandCards`, true);
        console.log(`Opponent Player ${window.game.opponentPlayer} drew a card`);
    }
}

function opponentDiscard() {
    const cardNum = window.display.getSelectedCardsNumber(0);
    cardNum.sort((a, b) => b - a);
    cardNum.forEach(num => {
        const err = window.game.discardCard(window.game.opponentPlayer-1, num);
        if (err != 0) {
            console.log(`Opponent Player ${window.game.opponentPlayer} cannot discard a card`);
        } else {
            window.display.updateHandDisplay(window.game.playerHands[window.game.opponentPlayer-1], `opponentHandCards`, true);
            console.log(`Opponent Player ${window.game.opponentPlayer} discarded their card number ${cardNum}`);
        }
    });
}

function opponentPlay() {
    if (window.reading) return;
    const cardNum = window.display.getSelectedCardsNumber(0);
    cardNum.sort((a, b) => b - a);
    cardNum.forEach(num => {
        const err = window.game.playCard(window.game.opponentPlayer-1, num);
        if (err != 0) {
            console.log(`Opponent Player ${window.game.opponentPlayer} cannot play a card`);
    } else {
        window.display.updatePlayArea(window.game.play, true);
        window.display.updateHandDisplay(window.game.playerHands[window.game.opponentPlayer-1], `opponentHandCards`, true);
        console.log(`Opponent Player ${window.game.opponentPlayer} played their card number ${cardNum}`);
        }
    });
}

  // Player actions
function playerDraw() {
    const err = window.game.drawCard(window.game.registeredPlayer-1);
    if (err != 0) {
        console.log(`Player ${window.game.registeredPlayer} cannot draw a card`);
    } else {
        window.display.updateHandDisplay(window.game.playerHands[window.game.registeredPlayer-1], `handCards`, false);
        console.log(`Player ${window.game.registeredPlayer} drew a card`);
    }
}

function playerDiscard() {
    const cardNum = window.display.getSelectedCardsNumber(1);
    cardNum.sort((a, b) => b - a);
    cardNum.forEach(num => {
        const err = window.game.discardCard(window.game.registeredPlayer-1, num);
        if (err != 0) {
            console.log(`Player ${window.game.registeredPlayer} cannot discard card number ${num}`);
        } else {
            window.display.updateHandDisplay(window.game.playerHands[window.game.registeredPlayer-1], `handCards`, false);
            console.log(`Player ${window.game.registeredPlayer} discarded their card number ${num}`);
        }
    });
}

function playerPlay() {
    if (window.reading) return;
    const cardNum = window.display.getSelectedCardsNumber(1);
    cardNum.sort((a, b) => b - a);
    cardNum.forEach(num => {
        const err = window.game.playCard(window.game.registeredPlayer-1, num);
        if (err != 0) {
            console.log(`Player ${window.game.registeredPlayer} cannot play a card`);
        } else {
            window.display.updatePlayArea(window.game.play, true);
            window.display.updateHandDisplay(window.game.playerHands[window.game.registeredPlayer-1], `handCards`, false);
            console.log(`Player ${window.game.registeredPlayer} played their card number ${num}`);
        }
    });
}

function revealCards() {
    window.reading = true;
    window.game.revealCards();
    window.display.updatePlayArea(window.game.play, false);
}

function nextRound(){
    window.reading = false;
    window.game.newRound();
    window.display.updatePlayArea(window.game.play, false);
}