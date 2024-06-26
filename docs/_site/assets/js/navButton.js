document.addEventListener("DOMContentLoaded", function () {
  const button = document.getElementById("nav_button");
  const indicator = button.querySelector("svg");
  const nav = document.getElementById("mainNavigation");
  let open = false;

  button.addEventListener("click", function () {
    nav.classList.toggle("open");
    open = !open;
    if (open) {
      indicator.innerHTML = `
        <line x1="3" y1="4" x2="21" y2="21"></line>
        <line x1="21" y1="4" x2="3" y2="21"></line>
      `;

      let previousPos = null;
      let currentTranslate = 0;

      nav.addEventListener("touchstart", (e) => {
        previousPos = e.touches[0].clientX;
      });

      nav.addEventListener("touchmove", (e) => {
        let currentPos = e.touches[0].clientX;
        let delta = currentPos - previousPos;
        previousPos = currentPos;

        // Adjust the current translation based on the delta
        currentTranslate += delta;

        // Prevent rightward movement
        if (currentTranslate > 0) {
          currentTranslate = 0;
        }

        nav.style.transform = `translate3d(${currentTranslate}px, 0, 0)`;
      });

      nav.addEventListener("touchend", () => {
        previousPos = null;
      });
    } else {
      indicator.innerHTML = `
        <line x1="3" y1="4" x2="21" y2="4"></line>
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="20" x2="21" y2="20"></line>
      `;
    }
  });
});
