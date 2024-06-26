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

      let previousPos = 0;

      nav.addEventListener("touchmove", (e) => {
        let currentPos = e.touches[0].clientX;

        if (!previousPos) {
          previousPos = currentPos;
        }

        delta = currentPos - previousPos;
        console.log(delta);

        if (delta > 0) {
          delta = 0;
        }

        nav.style.transform = `translate3d(${delta}px, 0, 0)`;
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
