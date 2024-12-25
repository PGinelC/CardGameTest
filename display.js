class Display {
    createCardElement(card) {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card';
        
        const nameDiv = document.createElement('div');
        nameDiv.className = 'card-name';
        nameDiv.textContent = card.name;
        
        const descriptionDiv = document.createElement('div');
        descriptionDiv.className = 'card-description';
        descriptionDiv.textContent = card.description;
        
        cardDiv.appendChild(nameDiv);
        cardDiv.appendChild(descriptionDiv);
        
        return cardDiv;
    }

    createHiddenCardElement() {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card';
        
        const nameDiv = document.createElement('div');
        nameDiv.className = 'card-name';
        nameDiv.textContent = 'Hidden';
        
        const descriptionDiv = document.createElement('div');
        descriptionDiv.className = 'card-description';
        descriptionDiv.textContent = '???';
        
        cardDiv.appendChild(nameDiv);
        cardDiv.appendChild(descriptionDiv);
        
        return cardDiv;
    }

    updateHandDisplay(cards) {
        const handContainer = document.getElementById('handCards');
        handContainer.innerHTML = '';
        
        cards.forEach(card => {
            const cardElement = this.createCardElement(card);
            handContainer.appendChild(cardElement);
        });
    }

    updatePlayArea(playedCards, hidden) {
        const playArea = document.getElementById('playedCards');
        playArea.innerHTML = '';

        if (hidden) {
            playedCards.forEach(card => {
                const cardElement = this.createHiddenCardElement(card);
                playArea.appendChild(cardElement);
            })
            return;
        } else {
            playedCards.forEach(card => {
                const cardElement = this.createCardElement(card);
                playArea.appendChild(cardElement);
            })
    }   ;
    }
}

export default Display;