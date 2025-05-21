const suits = ['♠', '♥', '♦', '♣'];
const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

function getRandomCard() {
  const suit = suits[Math.floor(Math.random() * suits.length)];
  const value = values[Math.floor(Math.random() * values.length)];
  return { value, suit };
}

function cardToEmoji(card) {
  return `${card.value}${card.suit}`;
}

function getCardStrength(card) {
  const strength = values.indexOf(card.value);
  return strength;
}

document.getElementById("draw-button").addEventListener("click", () => {
  const playerCard = getRandomCard();
  const computerCard = getRandomCard();

  document.getElementById("player-card").textContent = cardToEmoji(playerCard);
  document.getElementById("computer-card").textContent = cardToEmoji(computerCard);

  const playerStrength = getCardStrength(playerCard);
  const computerStrength = getCardStrength(computerCard);

  const result = document.getElementById("result");
  if (playerStrength > computerStrength) {
    result.textContent = "You win!";
  } else if (playerStrength < computerStrength) {
    result.textContent = "Computer wins!";
  } else {
    result.textContent = "It's a tie!";
  }
});