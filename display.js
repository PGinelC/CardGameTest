class Display {
    createCardElement(card, index, clickable) {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card';

        const numberDiv = document.createElement('div');
        numberDiv.className = 'card-number';
        numberDiv.textContent = index;
        
        const nameDiv = document.createElement('div');
        nameDiv.className = 'card-name';
        nameDiv.textContent = card.name;
        
        const descriptionDiv = document.createElement('div');
        descriptionDiv.className = 'card-description';
        descriptionDiv.textContent = card.description;
        if (clickable) {
            cardDiv.addEventListener('click', (event) => {
            console.log("ckicled");
            // Check if the clicked element has the class 'card'
            const card = event.target.closest('.card');
            if (card) {
              if (card.classList.contains('selected')) {
                // If the card is already selected, remove the 'selected' class and set id to "none"
                card.classList.remove('selected');
                card.id = "none";
              } else {
                // Otherwise, add the 'selected' class
                card.classList.add('selected');
                card.id = "selected";
              }
            }
          });
        }

        cardDiv.appendChild(numberDiv);
        cardDiv.appendChild(nameDiv);
        cardDiv.appendChild(descriptionDiv);
        
        return cardDiv;
    }

    createHiddenCardElement(index, clickable) {
        const cardDiv = document.createElement('div');
        if (clickable) {
            cardDiv.className = 'card-hidden-opponent';
        } else {
            cardDiv.className = 'card-hidden';
        }
        
        const nameDiv = document.createElement('div');
        nameDiv.className = 'card-name';
        nameDiv.textContent = 'Hidden';

        const numberDiv = document.createElement('div');
        numberDiv.className = 'card-number';
        numberDiv.textContent = index;
        
        const descriptionDiv = document.createElement('div');
        descriptionDiv.className = 'card-description';
        descriptionDiv.textContent = '???';

        if (clickable) {
            cardDiv.addEventListener('click', (event) => {
                console.log("opp ckicled");
                // Check if the clicked element has the class 'card'
                const card = event.target.closest('.card-hidden-opponent');
                if (card) {
                  if (card.classList.contains('selected')) {
                    // If the card is already selected, remove the 'selected' class and set id to "none"
                    card.classList.remove('selected');
                    card.id = "none";
                  } else {
                    // Otherwise, add the 'selected' class
                    card.classList.add('selected');
                    card.id = "selected";
                  }
                }
            });
        }
        
        cardDiv.appendChild(numberDiv);
        cardDiv.appendChild(nameDiv);
        cardDiv.appendChild(descriptionDiv);
        
        return cardDiv;
    }

    updateHandDisplay(cards, tag, hidden) {
        const handContainer = document.getElementById(tag);
        handContainer.innerHTML = '';
        cards.forEach((card, index) => {
            if (hidden) {
                //clickable cause these are the opponent's cards
                const cardElement = this.createHiddenCardElement(index, true);
                handContainer.appendChild(cardElement);
            } else {
                const cardElement = this.createCardElement(card, index, true);
                handContainer.appendChild(cardElement);
            }
        });
    }

    updatePlayArea(playedCards, hidden) {
        const playArea = document.getElementById('playedCards');
        playArea.innerHTML = '';

        if (hidden) {
            playedCards.forEach((card, index) => {
                const cardElement = this.createHiddenCardElement(index, false);
                playArea.appendChild(cardElement);
            })
            return;
        } else {
            playedCards.forEach((card, index) => {
                const cardElement = this.createCardElement(card, index, false);
                playArea.appendChild(cardElement);
            })
        };
    }

    getSelectedCardsNumber(player) {
        const selector = player ? '.card.selected' : '.card-hidden-opponent.selected';
        const selectedCards = document.querySelectorAll(selector);
        return Array.from(selectedCards).map(card => {
            const numberElement = card.querySelector('.card-number');
            const cardNumber = numberElement ? parseInt(numberElement.textContent, 10) : null;
          return numberElement ? cardNumber : null;
        }).filter(name => name !== null);
      }
}

export default Display;