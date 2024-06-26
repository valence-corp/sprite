
document.addEventListener("DOMContentLoaded", function () {
  const button = document.getElementById("nav_button");
  const indicator = button.querySelector("svg");
  const nav = document.getElementById("mainNavigation");
  const closeIcon = `
    <line x1="3" y1="4" x2="21" y2="21"></line>
    <line x1="21" y1="4" x2="3" y2="21"></line>
  `;

  const openIcon = `
    <line x1="3" y1="4" x2="21" y2="4"></line>
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="20" x2="21" y2="20"></line>
  `;
  let open = false;

  function createTouchEvents() {
    let previousPos = null;
    let translate = 0;

    nav.addEventListener("touchstart", (e) => {
      previousPos = e.touches[0].clientX;
    });

    nav.addEventListener("touchmove", (e) => {
      let currentPos = e.touches[0].clientX;
      delta = currentPos - previousPos;
      previousPos = currentPos;

      // Adjust the current translation based on the delta
      translate += delta;

      // Prevent rightward movement
      if (translate > 0) {
        translate = 0;
      }

      nav.style.transform = `translate3d(${translate}px, 0, 0)`;
    });

    nav.addEventListener("touchend", () => {
      previousPos = null;
      if (translate > -160) {
        translate = 0;
        nav.style.transform = `translate3d(${translate}px, 0, 0)`;
      } else {
        nav.style.transform = "";
        translate = 0;
        closeMenu();
        destroyTouchEvents();
      }
    });
  }

  function destroyTouchEvents() {
    nav.removeEventListener("touchend", createTouchEvents);
    nav.removeEventListener("touchstart", createTouchEvents);
    nav.removeEventListener("touchmove", createTouchEvents);
  }

  function closeMenu() {
    destroyTouchEvents();
    toggleOpenState();
    indicator.innerHTML = openIcon;
  }

  function openMenu() {
    createTouchEvents();
    indicator.innerHTML = closeIcon;
  }

  function toggleOpenState() {
    nav.classList.toggle("open");
    open = !open;
  }

  function menuClickHandler() {
    toggleOpenState();
    if (open) {
      openMenu();
    } else {
      closeMenu();
    }
  }

  button.addEventListener("click", menuClickHandler);
});
