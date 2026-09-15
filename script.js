document.addEventListener("DOMContentLoaded", function () {

  const yesBtn = document.getElementById("yesBtn");
  const noBtn = document.getElementById("noBtn");

  const opening = document.getElementById("opening");
  const journey = document.getElementById("journey");
  const loveSong = document.getElementById("loveSong");


  // YES 🤍
  if (yesBtn) {
    yesBtn.onclick = function () {

      opening.classList.add("hidden");
      journey.classList.remove("hidden");

      if (loveSong) {
        loveSong.volume = 0.45;

        const playPromise = loveSong.play();

        if (playPromise !== undefined) {
          playPromise.catch(function () {});
        }
      }

      window.scrollTo(0, 0);
    };
  }


  // NO 😂
  if (noBtn) {
    noBtn.addEventListener("mouseenter", function () {

      const x = Math.random() * 200 - 100;
      const y = Math.random() * 150 - 75;

      noBtn.style.transform =
        `translate(${x}px, ${y}px)`;
    });
  }


  // Scroll animation 🤍
  const items = document.querySelectorAll(
    ".message-card, .polaroid, .memory-card, .gift-single, .promise-card"
  );

  if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(function (entries) {

      entries.forEach(function (entry) {

        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }

      });

    }, {
      threshold: 0.15
    });

    items.forEach(function (item) {
      observer.observe(item);
    });

  }

});
