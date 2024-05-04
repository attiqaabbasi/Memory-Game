const images = [
  "Mango.jpg",
  "Mango.jpg",
  "banana.jpg",
  "banana.jpg",
  "blueberray.jpg",
  "blueberray.jpg",
  "litichi.jpg",
  "litichi.jpg",
  "pomegrant.jpg",
  "pomegrant.jpg",
  "watermelon.jpg",
  "watermelon.jpg",
  "apple.jpg",
  "apple.jpg",
  "jamun.jpg",
  "jamun.jpg",
  "Cherry.jpg",
  "Cherry.jpg",
  "coconut.jpg",
  "coconut.jpg",
];

const matchCard = document.querySelectorAll(".cards");
const showKey = document.querySelector("#key");
const cardsContainer = document.querySelector(".top-panel");
let flippedCards = [];
let matchedCards = 0;

// Function to shuffle array
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// Preload images
const preloadImages = () => {
  images.forEach((image) => {
    const img = new Image();
    img.src = image;
  });
};
preloadImages();

// Generate game cards
const generateCards = () => {
  shuffleArray(images); // Shuffle the images array
  let clutter = "";
  images.forEach((image) => {
    clutter += `
      <div class="cards">
        <div class="front">
          <img src="OIP.jpg" />
        </div>
        <div class="back">
          <img src="${image}" alt="Card" />
        </div>
      </div>`;
  });
  cardsContainer.innerHTML = clutter;
};
generateCards();

// Flip card
const flipCard = (card) => {
  card.style.transform = "rotateY(180deg)";
};
const flipBack = (card) => {
  card.style.transform = "rotateY(0deg)";
};

// Check for a match
const checkForMatch = () => {
  const [card1, card2] = flippedCards;
  const img1 = card1.querySelector(".back img").src;
  const img2 = card2.querySelector(".back img").src;
  if (img1 === img2) {
    matchedCards += 2;
    flippedCards = [];
    if (matchedCards === images.length) {
      // Game over logic
      setTimeout(() => {
        console.log("game over");
        hide();
      }, 1000);
    }
  } else {
    setTimeout(() => {
      flippedCards.forEach((card) => {
        flipBack(card);
      });
      flippedCards = [];
    }, 1000);
  }
};

// Event listener for card clicks
cardsContainer.addEventListener("click", (event) => {
  const clickedCard = event.target.closest(".cards");
  if (!clickedCard || flippedCards.includes(clickedCard)) return;
  flipCard(clickedCard);
  flippedCards.push(clickedCard);
  if (flippedCards.length === 2) {
    checkForMatch();
  }
});

// Function to show all cards briefly
const showAllCards = () => {
  const allCards = document.querySelectorAll(".cards");
  allCards.forEach((card, index) => {
    setTimeout(() => {
      flipCard(card);
    });
  });
  allCards.forEach((card, index) => {
    setTimeout(() => {
      flipBack(card);
    }, 1500);
  });
};

showKey.addEventListener("click", () => {
  showAllCards();
});

const hide = () => {
  cardsContainer.innerHTML = "<p class='message'> YOU WIN!<p>";
};
