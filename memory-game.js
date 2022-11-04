"use strict";

/** Memory game: find matching pairs of cards and flip both of them. */

const FOUND_MATCH_WAIT_MSECS = 1000;
const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
];

const colors = shuffle(COLORS);
const maxScore = colors.length;
let firstCard;
let secondCard;
let cardsFlipped = 0;
let score = 0;

/** Shuffle array items in-place and return shuffled array. */

function shuffle(items) {
  // This algorithm does a "perfect shuffle", where there won't be any
  // statistical bias in the shuffle (many naive attempts to shuffle end up not
  // be a fair shuffle). This is called the Fisher-Yates shuffle algorithm; if
  // you're interested, you can learn about it, but it's not important.

  for (let i = items.length - 1; i > 0; i--) {
    // generate a random index between 0 and i
    let j = Math.floor(Math.random() * i);
    // swap item at i <-> item at j
    [items[i], items[j]] = [items[j], items[i]];
  }

  return items;
}

function startGame() {
  const start = document.querySelector("#start");
  start.classList.toggle("hidden");
  createCards(colors);
}

/** Create card for every color in colors (each will appear twice)
 *
 * Each div DOM element will have:
 * - a class with the value of the color
 * - a click event listener for each card to handleCardClick
 */

function createCards(colors) {
  const gameBoard = document.getElementById("game");

  for (let color of colors) {
    let card = document.createElement("div");
    card.classList.add(color);
    card.addEventListener("click", handleCardClick);
    gameBoard.append(card);
  }
}

/** Flip a card face-up. */

function flipCard(card) {
  card.classList.add("flipped");
}

/** Flip a card face-down. */

function unFlipCard(card) {
  card.classList.remove("flipped");
}

/** Handle clicking on a card: this could be first-card or second-card. */

function handleCardClick(evt) {
  const clickedCard = evt.target;

  // Proceed only if clicked card is not flipped and there's less than 2 flipped cards
  if (!clickedCard.classList.contains("flipped") && cardsFlipped < 2) {
    if (cardsFlipped === 0) {
      flipCard(clickedCard);
      cardsFlipped++;
      firstCard = clickedCard;
    } else if (cardsFlipped === 1) {
      flipCard(clickedCard);
      cardsFlipped++;
      secondCard = clickedCard;

      setTimeout(() => {
        cardsFlipped = 0;
        if (firstCard.classList[0] !== secondCard.classList[0]) {
          unFlipCard(firstCard);
          unFlipCard(secondCard);
        } else {
          score++;
        }
      }, FOUND_MATCH_WAIT_MSECS);
    }
  }
}
