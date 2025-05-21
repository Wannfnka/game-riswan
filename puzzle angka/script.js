const puzzleContainer = document.getElementById('puzzle');
const shuffleBtn = document.getElementById('shuffle-btn');
let tiles = [];

function createTiles() {
  puzzleContainer.innerHTML = '';
  tiles = [];

  for (let i = 1; i <= 15; i++) {
    tiles.push(i);
  }
  tiles.push(null); // empty slot

  tiles.forEach((tile, index) => {
    const tileElement = document.createElement('div');
    tileElement.className = 'tile';
    if (tile === null) {
      tileElement.classList.add('empty');
    } else {
      tileElement.textContent = tile;
    }
    tileElement.addEventListener('click', () => moveTile(index));
    puzzleContainer.appendChild(tileElement);
  });
}

function moveTile(index) {
  const emptyIndex = tiles.indexOf(null);
  const validMoves = [index - 1, index + 1, index - 4, index + 4];

  if (
    validMoves.includes(emptyIndex) &&
    !(index % 4 === 0 && emptyIndex === index - 1) &&
    !(index % 4 === 3 && emptyIndex === index + 1)
  ) {
    [tiles[index], tiles[emptyIndex]] = [tiles[emptyIndex], tiles[index]];
    updateTiles();
  }
}

function updateTiles() {
  const tileElements = document.querySelectorAll('.tile');
  tiles.forEach((tile, i) => {
    const tileElement = tileElements[i];
    tileElement.className = 'tile';
    if (tile === null) {
      tileElement.classList.add('empty');
      tileElement.textContent = '';
    } else {
      tileElement.textContent = tile;
    }
  });
}

function shuffleTiles() {
  let emptyIndex = 15;

  for (let i = 0; i < 1000; i++) {
    const moves = getValidMoves(emptyIndex);
    const randomMove = moves[Math.floor(Math.random() * moves.length)];
    [tiles[emptyIndex], tiles[randomMove]] = [tiles[randomMove], tiles[emptyIndex]];
    emptyIndex = randomMove;
  }
  updateTiles();
}

function getValidMoves(emptyIndex) {
  const moves = [];
  if (emptyIndex % 4 !== 0) moves.push(emptyIndex - 1); // left
  if (emptyIndex % 4 !== 3) moves.push(emptyIndex + 1); // right
  if (emptyIndex >= 4) moves.push(emptyIndex - 4); // up
  if (emptyIndex < 12) moves.push(emptyIndex + 4); // down
  return moves;
}

shuffleBtn.addEventListener('click', shuffleTiles);

createTiles();