// =========================
// PAGE LOADER
// =========================

window.addEventListener("load", function () {
  const loader = document.querySelector(".loader");

  setTimeout(function () {
    if (loader) {
      loader.classList.add("hide");
    }
  }, 1500);
});


// =========================
// NAVBAR
// =========================

const navbar = document.querySelector("nav");

window.addEventListener("scroll", function () {
  if (!navbar) return;

  if (window.scrollY > 40) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});


// =========================
// SCROLL REVEAL
// =========================

const revealItems = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12
  }
);

revealItems.forEach(function (item) {
  revealObserver.observe(item);
});


// =========================
// MOBILE MENU
// =========================

const menuButton = document.querySelector(".menu");
const mobileMenu = document.querySelector(".mobile-menu");

if (menuButton && mobileMenu) {

  menuButton.addEventListener("click", function () {
    mobileMenu.classList.toggle("open");
  });

  const mobileLinks =
    document.querySelectorAll(".mobile-menu a");

  mobileLinks.forEach(function (link) {

    link.addEventListener("click", function () {
      mobileMenu.classList.remove("open");
    });

  });
}


// =========================
// CUSTOM CURSOR
// =========================

const cursor = document.querySelector(".cursor");

if (cursor && window.innerWidth > 800) {

  document.addEventListener("mousemove", function (event) {

    cursor.style.left = event.clientX + "px";
    cursor.style.top = event.clientY + "px";

  });

  const hoverElements =
    document.querySelectorAll(
      "a, button, .skill, .project"
    );

  hoverElements.forEach(function (element) {

    element.addEventListener("mouseenter", function () {
      cursor.classList.add("big");
    });

    element.addEventListener("mouseleave", function () {
      cursor.classList.remove("big");
    });

  });
}


// =========================
// THREE.JS BACKGROUND
// =========================

const canvas = document.getElementById("canvas");

if (canvas && typeof THREE !== "undefined") {

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    55,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );

  camera.position.z = 5;


  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true
  });

  renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, 2)
  );

  renderer.setSize(
    window.innerWidth,
    window.innerHeight
  );


  // Main shape

  const geometry =
    new THREE.IcosahedronGeometry(1.5, 2);

  const material =
    new THREE.MeshBasicMaterial({
      color: 0x777777,
      wireframe: true,
      transparent: true,
      opacity: 0.25
    });

  const mainShape =
    new THREE.Mesh(
      geometry,
      material
    );

  mainShape.position.set(1.7, 0.1, 0);

  scene.add(mainShape);


  // Smaller inner shape

  const innerGeometry =
    new THREE.IcosahedronGeometry(0.8, 1);

  const innerMaterial =
    new THREE.MeshBasicMaterial({
      color: 0xb7ff4a,
      wireframe: true,
      transparent: true,
      opacity: 0.15
    });

  const innerShape =
    new THREE.Mesh(
      innerGeometry,
      innerMaterial
    );

  innerShape.position.copy(
    mainShape.position
  );

  scene.add(innerShape);


  // Particles

  const particleGeometry =
    new THREE.BufferGeometry();

  const particleCount = 700;

  const positions =
    new Float32Array(
      particleCount * 3
    );

  for (let i = 0; i < particleCount * 3; i++) {

    positions[i] =
      (Math.random() - 0.5) * 15;

  }

  particleGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(
      positions,
      3
    )
  );

  const particleMaterial =
    new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.012,
      transparent: true,
      opacity: 0.35
    });

  const particles =
    new THREE.Points(
      particleGeometry,
      particleMaterial
    );

  scene.add(particles);


  // Mouse position

  let mouseX = 0;
  let mouseY = 0;

  document.addEventListener(
    "mousemove",
    function (event) {

      mouseX =
        (event.clientX / window.innerWidth - 0.5) * 2;

      mouseY =
        (event.clientY / window.innerHeight - 0.5) * 2;

    }
  );


  // Animation

  function animate() {

    requestAnimationFrame(animate);

    mainShape.rotation.x += 0.0015;
    mainShape.rotation.y += 0.003;

    innerShape.rotation.x -= 0.002;
    innerShape.rotation.y -= 0.003;

    particles.rotation.y += 0.0003;


    // Slight mouse movement

    mainShape.rotation.x +=
      (mouseY * 0.2 - mainShape.rotation.x) * 0.01;

    mainShape.rotation.y +=
      (mouseX * 0.2 - mainShape.rotation.y) * 0.01;


    innerShape.rotation.x =
      mainShape.rotation.x;

    innerShape.rotation.y =
      mainShape.rotation.y;


    renderer.render(
      scene,
      camera
    );
  }

  animate();


  // Resize

  window.addEventListener(
    "resize",
    function () {

      camera.aspect =
        window.innerWidth /
        window.innerHeight;

      camera.updateProjectionMatrix();

      renderer.setSize(
        window.innerWidth,
        window.innerHeight
      );

      renderer.setPixelRatio(
        Math.min(window.devicePixelRatio, 2)
      );

    }
  );
}


// =========================
// BUTTON EFFECT
// =========================

if (window.innerWidth > 800) {

  const buttons =
    document.querySelectorAll(".btn");

  buttons.forEach(function (button) {

    button.addEventListener(
      "mousemove",
      function (event) {

        const rect =
          button.getBoundingClientRect();

        const x =
          event.clientX -
          rect.left -
          rect.width / 2;

        const y =
          event.clientY -
          rect.top -
          rect.height / 2;

        button.style.transform =
          `translate(${x * 0.12}px, ${y * 0.12}px)`;

      }
    );


    button.addEventListener(
      "mouseleave",
      function () {

        button.style.transform =
          "translate(0, 0)";

      }
    );

  });
}


// =========================
// BACK TO TOP
// =========================

const topButton =
  document.querySelector('a[href="#"]');

if (topButton) {

  topButton.addEventListener(
    "click",
    function (event) {

      event.preventDefault();

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    }
  );

}
