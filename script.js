const nextButton = document.getElementById("nextBtn");
const prevButton = document.getElementById("prevBtn");

const yesButton = document.querySelector(".yes-btn");
const noButton = document.querySelector(".no-btn");

const leftPage = document.getElementById("leftPage");
const rightPage = document.getElementById("rightPage");

const flipPage = document.getElementById("flipPage");
const flipFront = document.getElementById("flipFront");
const flipBack = document.getElementById("flipBack");

const nextButton = document.getElementById("nextPage");
const prevButton = document.getElementById("prevPage");

const pageNumber = document.getElementById("pageNumber");

const audio = document.getElementById("loveSong");

const templates = Array.from(
  document.querySelectorAll("#pages .book-content")
);


/* =====================================================
   BOOK STATE
===================================================== */

let currentPage = 0;
let isTurning = false;

const totalPages = templates.length;


/* =====================================================
   HELPERS
===================================================== */

function clonePage(index) {
  if (index < 0 || index >= totalPages) {
    return null;
  }

  return templates[index].cloneNode(true);
}


function putPage(element, index) {
  element.innerHTML = "";

  const page = clonePage(index);

  if (page) {
    element.appendChild(page);
  }
}


function updatePageNumber() {
  const first = currentPage + 1;
  const second = Math.min(currentPage + 2, totalPages);

  if (currentPage >= totalPages - 1) {
    pageNumber.textContent = `${totalPages} / ${totalPages}`;
  } else {
    pageNumber.textContent = `${first}–${second} / ${totalPages}`;
  }
}


function renderBook() {
  putPage(leftPage, currentPage);
  putPage(rightPage, currentPage + 1);

  updatePageNumber();

  prevButton.disabled = currentPage <= 0;
  nextButton.disabled = currentPage >= totalPages - 2;

  prevButton.style.opacity =
    currentPage <= 0 ? "0.35" : "1";

  nextButton.style.opacity =
    currentPage >= totalPages - 2 ? "0.35" : "1";
}


/* =====================================================
   OPEN BOOK
===================================================== */

function openBook() {

  cover.classList.add("hidden");

  book.classList.remove("hidden");

  currentPage = 0;

  renderBook();

  /*
    Browsers usually block autoplay.
    Because the audio starts from the YES click,
    this is considered a user interaction and should play.
  */

  audio.currentTime = 0;

  audio.play().catch(() => {
    console.log("Audio playback was blocked.");
  });
}


/* =====================================================
   YES BUTTON
===================================================== */

yesButton.addEventListener("click", openBook);


/* =====================================================
   RUN-AWAY NO BUTTON
===================================================== */

function moveNoButton() {

  const parent = noButton.parentElement;

  const parentRect = parent.getBoundingClientRect();

  const maxX =
    Math.max(
      20,
      parentRect.width / 2 - 70
    );

  const maxY = 45;

  const x =
    (Math.random() * 2 - 1) * maxX;

  const y =
    (Math.random() * 2 - 1) * maxY;

  noButton.style.transform =
    `translate(${x}px, ${y}px)`;
}


noButton.addEventListener("mouseenter", moveNoButton);

noButton.addEventListener("touchstart", function(event) {
  event.preventDefault();
  moveNoButton();
});

noButton.addEventListener("click", function(event) {
  event.preventDefault();
  moveNoButton();
});


/* =====================================================
   PAGE TURN — NEXT
===================================================== */

function nextPage() {

  if (isTurning) return;

  if (currentPage >= totalPages - 2) {
    return;
  }

  isTurning = true;

  /*
    The right page is the page that visually turns.
  */

  const currentRight = clonePage(currentPage + 1);
  const nextLeft = clonePage(currentPage + 2);

  flipFront.innerHTML = "";

  if (currentRight) {
    flipFront.appendChild(currentRight);
  }

  flipBack.innerHTML = "";

  if (nextLeft) {
    flipBack.appendChild(nextLeft);
  }

  flipPage.style.display = "block";

  /*
    Reset the animation.
  */

  flipPage.style.transition = "none";
  flipPage.style.transform = "rotateY(0deg)";

  /*
    Force browser reflow.
  */

  void flipPage.offsetWidth;

  /*
    Start the page turn.
  */

  flipPage.style.transition =
    "transform 0.9s cubic-bezier(.65,.05,.36,1)";

  flipPage.style.transform =
    "rotateY(-180deg)";


  setTimeout(() => {

    currentPage += 2;

    renderBook();

    flipPage.style.transition = "none";
    flipPage.style.transform = "rotateY(0deg)";
    flipPage.style.display = "none";

    flipFront.innerHTML = "";
    flipBack.innerHTML = "";

    isTurning = false;

  }, 920);
}


/* =====================================================
   PAGE TURN — PREVIOUS
===================================================== */

function previousPage() {

  if (isTurning) return;

  if (currentPage <= 0) {
    return;
  }

  isTurning = true;

  /*
    When going backwards, the left page comes back.
  */

  const previousRight = clonePage(currentPage - 1);
  const currentLeft = clonePage(currentPage);

  flipFront.innerHTML = "";

  if (previousRight) {
    flipFront.appendChild(previousRight);
  }

  flipBack.innerHTML = "";

  if (currentLeft) {
    flipBack.appendChild(currentLeft);
  }

  /*
    Put the flipping sheet on the left side.
  */

  flipPage.style.left = "0";
  flipPage.style.right = "auto";

  flipPage.style.transformOrigin =
    "right center";

  flipPage.style.display = "block";

  flipPage.style.transition = "none";

  flipPage.style.transform =
    "rotateY(0deg)";

  void flipPage.offsetWidth;

  flipPage.style.transition =
    "transform 0.9s cubic-bezier(.65,.05,.36,1)";

  flipPage.style.transform =
    "rotateY(180deg)";


  setTimeout(() => {

    currentPage -= 2;

    renderBook();

    /*
      Return flip sheet to normal right-side position.
    */

    flipPage.style.transition = "none";
    flipPage.style.transform = "rotateY(0deg)";
    flipPage.style.left = "auto";
    flipPage.style.right = "0";
    flipPage.style.transformOrigin =
      "left center";

    flipPage.style.display = "none";

    flipFront.innerHTML = "";
    flipBack.innerHTML = "";

    isTurning = false;

  }, 920);
}


/* =====================================================
   BUTTONS
===================================================== */

nextButton.addEventListener("click", nextPage);

prevButton.addEventListener("click", previousPage);


/* =====================================================
   KEYBOARD
===================================================== */

document.addEventListener("keydown", function(event) {

  if (book.classList.contains("hidden")) {
    return;
  }

  if (event.key === "ArrowRight") {
    nextPage();
  }

  if (event.key === "ArrowLeft") {
    previousPage();
  }

});


/* =====================================================
   CLICK THE PAGE TO TURN
===================================================== */

rightPage.addEventListener("click", function() {

  if (isTurning) return;

  nextPage();

});


leftPage.addEventListener("click", function() {

  if (isTurning) return;

  previousPage();

});


/* =====================================================
   INITIAL STATE
===================================================== */

book.classList.add("hidden");

flipPage.style.display = "none";

renderBook();
