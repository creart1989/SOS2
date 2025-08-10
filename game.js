// Kartendaten für Balatro mit Musical-Jokern
const suits = ['♠', '♥', '♦', '♣'];
const ranks = ['7', '8', '9', '10', 'B', 'D', 'K', 'A'];

const jokers = [
  {
    name: 'Patrick Stanke',
    description: 'Kann eine Karte deiner Wahl tauschen.',
    icon: '🎭'
  },
  {
    name: 'Bühnenkritiker',
    description: 'Lässt Gegner eine Karte abwerfen.',
    icon: '📉'
  },
  {
    name: 'Tomate',
    description: 'Blockiert eine Karte für eine Runde.',
    icon: '🍅'
  },
  {
    name: 'Spotlight',
    description: 'Zeigt alle Karten eines Gegners.',
    icon: '🔦'
  }
];

let deck = [];
let playerHand = [];
let selectedCardIndex = null;
let playedCards = [];

const playerHandDiv = document.getElementById('player-hand');
const playButton = document.getElementById('play-button');
const playedCardsDiv = document.getElementById('played-cards');
const messageDiv = document.getElementById('message');

function createDeck() {
  deck = [];
  for (const suit of suits) {
    for (const rank of ranks) {
      deck.push({ type: 'normal', suit, rank });
    }
  }
  for (const joker of jokers) {
    deck.push({ type: 'joker', ...joker });
  }
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function dealCards(num = 8) {
  playerHand = [];
  for (let i = 0; i < num; i++) {
    playerHand.push(deck.pop());
  }
}

function renderHand() {
  playerHandDiv.innerHTML = '';
  playerHand.forEach((card, i) => {
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card');
    if (i === selectedCardIndex) cardDiv.classList.add('selected');

    if (card.type === 'normal') {
      cardDiv.innerHTML = `
        <div>${card.rank}</div>
        <div style="font-size: 30px;">${card.suit}</div>
      `;
    } else {
      cardDiv.innerHTML = `
        <div style="font-size: 28px;">${card.icon}</div>
        <div style="font-size: 12px; margin-top: 5px;">${card.name}</div>
      `;
      cardDiv.title = card.description;
    }

    cardDiv.addEventListener('click', () => {
      if (selectedCardIndex === i) {
        selectedCardIndex = null;
        playButton.disabled = true;
      } else {
        selectedCardIndex = i;
        playButton.disabled = false;
      }
      renderHand();
    });

    playerHandDiv.appendChild(cardDiv);
  });
}

function renderPlayedCards() {
  playedCardsDiv.innerHTML = '';
  playedCards.forEach(card => {
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card');
    cardDiv.style.opacity = '0.7';
    if (card.type === 'normal') {
      cardDiv.innerHTML = `
        <div>${card.rank}</div>
        <div style="font-size: 30px;">${card.suit}</div>
      `;
    } else {
      cardDiv.innerHTML = `
        <div style="font-size: 28px;">${card.icon}</div>
        <div style="font-size: 12px; margin-top: 5px;">${card.name}</div>
      `;
      cardDiv.title = card.description;
    }
    playedCardsDiv.appendChild(cardDiv);
  });
}

function playSelectedCard() {
  if (selectedCardIndex === null) return;

  const card = playerHand[selectedCardIndex];

  // Beispiel: Joker-Effekt Meldung (später komplexere Logik)
  if (card.type === 'joker') {
    messageDiv.textContent = `Joker gespielt: ${card.name} - ${card.description}`;
  } else {
    messageDiv.textContent = `Karte gespielt: ${card.rank}${card.suit}`;
  }

  playedCards.push(card);
  playerHand.splice(selectedCardIndex, 1);
  selectedCardIndex = null;
  playButton.disabled = true;
  renderHand();
  renderPlayedCards();

  if (playerHand.length === 0) {
    messageDiv.textContent = 'Herzlichen Glückwunsch! Alle Karten ausgespielt!';
  }
}

// Setup Spiel
createDeck();
shuffle(deck);
dealCards();
renderHand();
renderPlayedCards();

playButton.addEventListener('click', playSelectedCard);