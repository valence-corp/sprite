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
        <line x1="34" y1="18" x2="18" y2="34"></line>
        <line x1="18" y1="18" x2="34" y2="34"></line>
      `;
    } else {
      indicator.innerHTML = `
        <line x1="18" y1="20" x2="34" y2="20"></line>
        <line x1="18" y1="26" x2="34" y2="26"></line>
        <line x1="18" y1="32" x2="34" y2="32"></line>
      `;
    }
  });
});
