var count = 0;
var card = [];
var content = "";
while(count < 6){
    var random = Math.floor(Math.random() * 348);
    if(card.includes(random)){
        console.log("Bereits enthalten");
    }else{
        card[count] = random;
        content += '<div class="memory-card" data-framework="'+random+'"><img class="front-face" src="img/'+random+'.jpg" alt="'+random+'" /><img class="back-face" src="img/black.svg" alt="black" /></div><div class="memory-card" data-framework="'+random+'"><img class="front-face" src="img/'+random+'.jpg" alt="'+random+'" /><img class="back-face" src="img/black.svg" alt="black" /></div>';
        count ++;
    }
}
document.getElementById('memory-game').innerHTML = content;

const cards = document.querySelectorAll('.memory-card');



let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));