// Mobile menu

const menuButton = document.querySelector(".menu");
const mobileMenu = document.querySelector(".mobile-menu");

if (menuButton && mobileMenu) {
  menuButton.addEventListener("click", function () {
    mobileMenu.classList.toggle("open");
  });

  const menuLinks = mobileMenu.querySelectorAll("a");

  menuLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      mobileMenu.classList.remove("open");
    });
  });
}


// Navbar on scroll

const navbar = document.querySelector("nav");

window.addEventListener("scroll", function () {
  if (window.scrollY > 40) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});


// Smooth scrolling

const links = document.querySelectorAll('a[href^="#"]');

links.forEach(function (link) {
  link.addEventListener("click", function (event) {
    const targetId = link.getAttribute("href");

    if (targetId === "#") {
      return;
    }

    const target = document.querySelector(targetId);

    if (target) {
      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth"
      });
    }
  });
});

// Simple text switch

const switchButton = document.querySelector(".theme-switch");

if (switchButton) {
  switchButton.addEventListener("click", function () {
    document.body.classList.toggle("light-mode");
  });
}
