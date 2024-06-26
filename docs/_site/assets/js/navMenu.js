document.addEventListener("DOMContentLoaded", function () {
  const mainNav = document.getElementById("main_nav");
  const navButton = document.getElementById("nav_button");
  const navIndicator = navButton.querySelector("svg");

  const closeIconMarkup = `
    <line x1="3" y1="4" x2="21" y2="21"></line>
    <line x1="21" y1="4" x2="3" y2="21"></line>
  `;

  const openIconMarkup = `
    <line x1="3" y1="4" x2="21" y2="4"></line>
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="20" x2="21" y2="20"></line>
  `;

  let isOpen = false;
  let currentTranslation = 0;
  let previousTouchPosition = null;

  function handleTouchEnd() {
    previousTouchPosition = null;

    if (currentTranslation < -80) {
      closeMenu();
    }
    currentTranslation = 0;
    mainNav.style.transform = "";
  }

  function handleTouchStart(event) {
    previousTouchPosition = event.touches[0].clientX;
  }

  function handleTouchMove(event) {
    const currentTouchPosition = event.touches[0].clientX;
    const delta = currentTouchPosition - previousTouchPosition;
    previousTouchPosition = currentTouchPosition;

    currentTranslation += delta;

    if (currentTranslation > 0) {
      currentTranslation = 0;
    }

    mainNav.style.transform = `translate3d(${currentTranslation}px, 0, 0)`;
  }

  function enableTouchEvents() {
    mainNav.addEventListener("touchstart", handleTouchStart);
    mainNav.addEventListener("touchmove", handleTouchMove);
    mainNav.addEventListener("touchend", handleTouchEnd);
  }

  function disableTouchEvents() {
    mainNav.removeEventListener("touchstart", handleTouchStart);
    mainNav.removeEventListener("touchmove", handleTouchMove);
    mainNav.removeEventListener("touchend", handleTouchEnd);
  }

  function closeMenu() {
    toggleNavState();
    disableTouchEvents();
    navIndicator.innerHTML = openIconMarkup;
  }

  function openMenu() {
    toggleNavState();
    enableTouchEvents();
    navIndicator.innerHTML = closeIconMarkup;
  }

  function toggleNavState() {
    mainNav.classList.toggle("open");
    isOpen = !isOpen;
  }

  function handleNavButtonClick() {
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  navButton.addEventListener("click", handleNavButtonClick);
});
