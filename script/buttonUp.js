const goTopBtn = document.querySelector(".button__top");

window.addEventListener("scroll", trackScroll);
goTopBtn.addEventListener("click", goTop);

function trackScroll() {
  const scrolled = window.scrollY
  const coords = document.documentElement.clientHeight;
  if (scrolled > coords) {
    goTopBtn.classList.add("button__top--show");
  } else {
    goTopBtn.classList.remove("button__top--show");
  }
}

function goTop() {
  if (window.scrollY > 0) {
    window.scrollTo({ top: 0, behavior: "smooth" }); 
  }
}