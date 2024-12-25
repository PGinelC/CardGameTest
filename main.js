import ForestRitual from "./forestRitual.js";
import Display from "./display.js";

document.addEventListener('DOMContentLoaded', (event) => {
    console.log('Document fully loaded and parsed');
    window.game = new ForestRitual();
    window.display = new Display();
    // Game setup listeners
    document.getElementById('startGameBtn').addEventListener('click', () => startGame());

    // Opponent control listeners
    document.getElementById('opponentDrawBtn').addEventListener('click', () => opponentDraw(window.game));
    document.getElementById('opponentDiscardBtn').addEventListener('click', () => {
        const cardNum = document.getElementById('opponentCardNum').value-1;
        opponentDiscard(game, cardNum);
    });
    document.getElementById('opponentPlayBtn').addEventListener('click', () => {
        const cardNum = document.getElementById('opponentCardNum').value-1;
        opponentPlay(game, cardNum);
    });

    // Play area listeners
    document.getElementById('revealCardsBtn').addEventListener('click', () => revealCards(window.game));

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
    console.log("Game Started");
}

// Opponent actions
function opponentDraw(game) {
    const registeredPlayer = game.registeredPlayer;
    const opponentPlayer = registeredPlayer === 1 ? 2 : 1;
    game.drawCard(opponentPlayer);
    //window.display.updateHandDisplay();
    console.log(`Opponent Player ${opponentPlayer} drew a card`);
}

function opponentDiscard(game, cardNum) {
    const registeredPlayer = game.registeredPlayer;
    const opponentPlayer = registeredPlayer === 1 ? 2 : 1;
    game.discardCard(opponentPlayer, cardNum);
    //window.display.updateHandDisplay();
    console.log(`Opponent Player ${opponentPlayer} discarded their card number ${cardNum+1}`);
}

function opponentPlay(game, cardNum) {
    const registeredPlayer = game.registeredPlayer;
    const opponentPlayer = registeredPlayer === 1 ? 2 : 1;
    game.playCard(opponentPlayer, cardNum);
    window.display.updatePlayArea(game.play, true);
    console.log(`Opponent Player ${opponentPlayer} played their card number ${cardNum+1}`);
}

  // Player actions
function playerDraw() {
    window.game.drawCard(window.game.registeredPlayer);
    window.display.updateHandDisplay(window.game.playerHands[window.game.registeredPlayer]);
    console.log(`Opponent Player ${window.game.registeredPlayer} drew a card`);
}

function playerDiscard(cardNum) {
    window.game.discardCard(window.game.registeredPlayer, cardNum);
    window.display.updateHandDisplay(window.game.playerHands[window.game.registeredPlayer]);
    console.log(`Opponent Player ${window.game.registeredPlayer} discarded their card number ${cardNum+1}`);
}

function playerPlay(cardNum) {
    window.game.playCard(window.game.registeredPlayer, cardNum);
    window.display.updatePlayArea(window.game.play, true);
    console.log(`Opponent Player ${window.game.registeredPlayer} played their card number ${cardNum+1}`);
}

function revealCards() {
    window.game.revealCards();
    window.display.updatePlayArea(window.game.play, false);
    window.game.newRound();
}