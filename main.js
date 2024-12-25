import ForestRitual from "./forestRitual.js";

document.addEventListener('DOMContentLoaded', (event) => {
    console.log('Document fully loaded and parsed');
    window.game = new ForestRitual();
    game.loadCards("forestRitualCards.json");
    // Your code here
});