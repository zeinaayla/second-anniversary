/* ==================================================
   ELEMENTS
================================================== */

const opening = document.getElementById("opening");
const journey = document.getElementById("journey");

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

const loveSong = document.getElementById("loveSong");


/* ==================================================
   YES BUTTON
================================================== */

yesBtn.addEventListener("click", () => {

  // Start the music after the user's interaction
  loveSong.volume = 0.45;

  loveSong.play().catch(() => {
    // Browser may block autoplay.
    // The journey still opens normally.
  });


  // Hide opening screen
  opening.classList.add("hidden");


  // Show the journey
  journey.classList.remove("hidden");


  // Start from the top
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });


  // Reveal sections one by one
  setTimeout(() => {
    revealSections();
  }, 300);

});


/* ==================================================
   RUNAWAY NO BUTTON 😂
================================================== */

let noMoves = 0;

noBtn.addEventListener("mouseenter", moveNoButton);
noBtn.addEventListener("touchstart", moveNoButton);
noBtn.addEventListener("click", moveNoButton);


function moveNoButton() {

  noMoves++;

  const maxX = Math.min(
    window.innerWidth / 2 - 70,
    180
  );

  const maxY = 120;

  const randomX =
    Math.floor(Math.random() * (maxX * 2 + 1)) - maxX;

  const randomY =
    Math.floor(Math.random() * (maxY * 2 + 1)) - maxY;


  noBtn.style.position = "relative";

  noBtn.style.transform =
    `translate(${randomX}px, ${randomY}px) rotate(${randomX / 10}deg)`;


  // After a few attempts, make the message more obvious 😂
  if (noMoves >= 3) {
    noBtn.textContent = "NO 😭";
  }

  if (noMoves >= 6) {
    noBtn.textContent = "خلص YES 😂";
  }

}


/* ==================================================
   SECTION REVEAL
================================================== */

function revealSections() {

  const sections =
    document.querySelectorAll(".journey-section");


  sections.forEach((section, index) => {

    section.style.opacity = "0";
    section.style.transform = "translateY(30px)";
    section.style.transition =
      "opacity 0.9s ease, transform 0.9s ease";


    setTimeout(() => {

      section.style.opacity = "1";
      section.style.transform = "translateY(0)";

    }, index * 120);

  });

}


/* ==================================================
   SCROLL ANIMATIONS
================================================== */

const observer =
  new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          entry.target.classList.add("visible");

          observer.unobserve(entry.target);

        }

      });

    },
    {
      threshold: 0.12
    }
  );


document
  .querySelectorAll(
    ".message-card, .polaroid, .memory-card, .gift-single, .promise-card, .emotional-box, .love-letter"
  )
  .forEach((element) => {

    element.classList.add("scroll-hidden");

    observer.observe(element);

  });


/* ==================================================
   SCROLL STYLE
================================================== */

const scrollStyle = document.createElement("style");

scrollStyle.innerHTML = `

  .scroll-hidden {
    opacity: 0;
    transform: translateY(35px);
    transition:
      opacity 0.8s ease,
      transform 0.8s ease;
  }

  .scroll-hidden.visible {
    opacity: 1;
    transform: translateY(0);
  }

`;

document.head.appendChild(scrollStyle);


/* ==================================================
   MUSIC VOLUME
================================================== */

loveSong.volume = 0.45;


/* ==================================================
   IMAGE LOAD FALLBACK
================================================== */

document.querySelectorAll("img").forEach((image) => {

  image.addEventListener("error", () => {

    image.style.display = "none";

  });

});


/* ==================================================
   PREVENT NO BUTTON FROM GOING OFF SCREEN
================================================== */

window.addEventListener("resize", () => {

  noBtn.style.transform = "translate(0, 0)";

});
