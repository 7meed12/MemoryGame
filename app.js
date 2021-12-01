const cards = document.querySelectorAll(".card");

let hasFlippedCard = false;
let lock = false;
let firstCard;
let secondCard;
function flipCard() {
  if (lock) return; //prevent more than 2 clicks b4 flipping back
  if (this === firstCard) return;
  this.classList.add("flip");
  if (!hasFlippedCard) {
    //first click
    hasFlippedCard = true;
    firstCard = this;
  } else {
    //second click
    secondCard = this;
    check();
  }
}

function check() {
  if (firstCard.dataset.img === secondCard.dataset.img) {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    rest();
  } else {
    lock = true;
    setTimeout(() => {
      firstCard.classList.remove("flip");
      secondCard.classList.remove("flip");
      rest();
    }, 1500);
  }
}

function rest() {
  // resets the board after each 2 clicks if fails
  [hasFlippedCard, lock] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach((card) => {
    let random = Math.floor(Math.random() * 12);
    card.style.order = random;
  });
})();
cards.forEach((card) => {
  card.addEventListener("click", flipCard);
});
