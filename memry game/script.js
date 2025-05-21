const emojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼']; // 8 emojis
let cards = [];
let firstCard = null;
let lockBoard = false;

const board = document.getElementById('game-board');
const message = document.getElementById('message');
const restartBtn = document.getElementById('restart-btn');

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function setupBoard() {
  board.innerHTML = '';
  message.textContent = '';
  const pairs = [...emojis, ...emojis]; // Duplicate for matching
  shuffle(pairs);
  cards = [];

  // Set 4x4 grid
  board.style.gridTemplateColumns = 'repeat(4, 80px)';

  pairs.forEach((emoji, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.emoji = emoji;
    card.dataset.index = index;
    card.innerHTML = '<span style="display:none;">' + emoji + '</span>';

    card.addEventListener('click', () => revealCard(card));
    board.appendChild(card);
    cards.push(card);
  });
}

function revealCard(card) {
  if (lockBoard || card.classList.contains('revealed')) return;

  card.classList.add('revealed');
  card.querySelector('span').style.display = 'block';

  if (!firstCard) {
    firstCard = card;
  } else {
    lockBoard = true;
    if (firstCard.dataset.emoji === card.dataset.emoji) {
      message.textContent = 'You found a match!';
      firstCard = null;
      lockBoard = false;
    } else {
      message.textContent = '';
      setTimeout(() => {
        firstCard.classList.remove('revealed');
        card.classList.remove('revealed');
        firstCard.querySelector('span').style.display = 'none';
        card.querySelector('span').style.display = 'none';
        firstCard = null;
        lockBoard = false;
      }, 1000);
    }
  }
}

restartBtn.addEventListener('click', setupBoard);

setupBoard();
