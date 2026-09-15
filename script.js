const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const cover = document.getElementById("cover");
const book = document.getElementById("book");
const loveSong = document.getElementById("loveSong");
const nextButtons = document.querySelectorAll(".next-btn");

/* =========================
   NO BUTTON - RUNS AWAY
========================= */

function moveNoButton() {
  const padding = 25;

  const maxX = window.innerWidth - noBtn.offsetWidth - padding;
  const maxY = window.innerHeight - noBtn.offsetHeight - padding;

  const x = Math.max(
    padding,
    Math.random() * maxX
  );

  const y = Math.max(
    padding,
    Math.random() * maxY
  );

  noBtn.style.position = "fixed";
  noBtn.style.left = x + "px";
  noBtn.style.top = y + "px";
  noBtn.style.zIndex = "9999";
}

noBtn.addEventListener("mouseenter", moveNoButton);
noBtn.addEventListener("touchstart", function(event) {
  event.preventDefault();
  moveNoButton();
});

noBtn.addEventListener("click", function(event) {
  event.preventDefault();
  moveNoButton();
});

/* =========================
   YES BUTTON
   OPENS THE BOOK + MUSIC
========================= */

yesBtn.addEventListener("click", function() {

  cover.classList.add("hidden");
  book.classList.remove("hidden");

  loveSong.currentTime = 0;

  loveSong.play().catch(function() {
    console.log("Music playback was blocked.");
  });

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

/* =========================
   NEXT BUTTONS
========================= */

nextButtons.forEach(function(button) {

  button.addEventListener("click", function() {

    const currentPage = button.closest(".page");
    const nextPage = currentPage.nextElementSibling;

    if (nextPage && nextPage.classList.contains("page")) {

      nextPage.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    }

  });

});

/* =========================
   LITTLE HEARTS
========================= */

function createHeart() {

  const heart = document.createElement("div");

  heart.innerHTML = "♡";

  heart.style.position = "fixed";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.bottom = "-30px";
  heart.style.fontSize = (12 + Math.random() * 18) + "px";
  heart.style.color = "rgba(118, 83, 90, 0.25)";
  heart.style.pointerEvents = "none";
  heart.style.zIndex = "1";

  document.body.appendChild(heart);

  const duration = 4000 + Math.random() * 3000;

  heart.animate(
    [
      {
        transform: "translateY(0) rotate(0deg)",
        opacity: 0
      },
      {
        transform: "translateY(-45vh) rotate(20deg)",
        opacity: 1
      },
      {
        transform: "translateY(-110vh) rotate(-20deg)",
        opacity: 0
      }
    ],
    {
      duration: duration,
      easing: "ease-out"
    }
  );

  setTimeout(function() {
    heart.remove();
  }, duration);
}

/* Hearts appear gently */
setInterval(createHeart, 1800);
