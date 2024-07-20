const headerNav = document.querySelector(".header__nav");
const headerMenuBtn = document.querySelector(".header__menu-mobile");

headerMenuBtn.addEventListener("click", () => {
  headerNav.classList.toggle("open");
});

// Close the navigation menu if the click is outside
window.addEventListener("click", (event) => {
  if (
    headerNav.classList.contains("open") &&
    !headerNav.contains(event.target) &&
    !headerMenuBtn.contains(event.target)
  ) {
    headerNav.classList.remove("open");
  }
});
