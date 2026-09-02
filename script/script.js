// Mobile menu toggle
const navHamburger = document.getElementById("navHamburger");
const navMobileMenu = document.getElementById("navMobileMenu");
const navMobileLinks = navMobileMenu.querySelectorAll("a");

// Toggle mobile menu when hamburger is clicked
navHamburger.addEventListener("click", () => {
  navMobileMenu.classList.toggle("active");
  navHamburger.innerHTML = navMobileMenu.classList.contains("active")
    ? '<i class="fa-solid fa-xmark"></i>'
    : '<i class="fa-solid fa-bars"></i>';
});

// Close mobile menu when a link is clicked
navMobileLinks.forEach(link => {
  link.addEventListener("click", () => {
    navMobileMenu.classList.remove("active");
    navHamburger.innerHTML = '<i class="fa-solid fa-bars"></i>';
  });
});

// How It Works animation
const intro = document.getElementById("introBox");
const steps = document.getElementById("steps");
const howStep = document.querySelector(".how-step");

const observer = new IntersectionObserver((entries) => {

  entries.forEach(entry => {

    if (entry.isIntersecting) {

      intro.classList.remove("expand", "hide");
      steps.classList.remove("show");

      setTimeout(() => {
        intro.classList.add("expand");
      }, 300);

      setTimeout(() => {
        intro.classList.add("hide");
        steps.classList.add("show");
      }, 1700);

    } else {
      intro.classList.remove("expand", "hide");
      steps.classList.remove("show");

    }

  });

}, {
  threshold: 0.6
});

observer.observe(howStep);