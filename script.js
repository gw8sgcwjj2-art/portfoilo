/* =========================
   LOADER
========================= */

window.addEventListener("load", () => {
  setTimeout(() => {
    const loader = document.querySelector(".loader");

    if (loader) {
      loader.classList.add("hide");
    }
  }, 1600);
});


/* =========================
   NAVBAR
========================= */

const nav = document.querySelector("nav");

window.addEventListener("scroll", () => {
  if (nav) {
    nav.classList.toggle("scrolled", window.scrollY > 50);
  }
});


/* =========================
   REVEAL ANIMATIONS
========================= */

const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.12
  }
);

revealElements.forEach((element) => {
  observer.observe(element);
});


/* =========================
   MOBILE MENU
========================= */

const menuButton = document.querySelector(".menu");
const mobileMenu = document.querySelector(".mobile-menu");

if (menuButton && mobileMenu) {

  menuButton.addEventListener("click", () => {
    mobileMenu.classList.toggle("open");
  });

  document.querySelectorAll(".mobile-menu a").forEach((link) => {

    link.addEventListener("click", () => {
      mobileMenu.classList.remove("open");
    });

  });

}


/* =========================
   CUSTOM CURSOR
========================= */

const cursor = document.querySelector(".cursor");

if (cursor && window.innerWidth > 800) {

  document.addEventListener("mousemove", (event) => {

    cursor.style.left = event.clientX + "px";
    cursor.style.top = event.clientY + "px";

  });

  document
    .querySelectorAll("a, button, .skill, .project")
    .forEach((element) => {

      element.addEventListener("mouseenter", () => {
        cursor.classList.add("big");
      });

      element.addEventListener("mouseleave", () => {
        cursor.classList.remove("big");
      });

    });

}


/* =========================
   THREE.JS 3D BACKGROUND
========================= */

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


  /* =========================
     CENTRAL 3D OBJECT
  ========================= */

  const geometry =
    new THREE.IcosahedronGeometry(1.5, 2);

  const material =
    new THREE.MeshBasicMaterial({
      color: 0x777777,
      wireframe: true,
      transparent: true,
      opacity: 0.25
    });

  const sphere =
    new THREE.Mesh(
      geometry,
      material
    );

  sphere.position.x = 1.7;
  sphere.position.y = 0.1;

  scene.add(sphere);


  /* =========================
     INNER OBJECT
  ========================= */

  const innerGeometry =
    new THREE.IcosahedronGeometry(0.8, 1);

  const innerMaterial =
    new THREE.MeshBasicMaterial({
      color: 0xb7ff4a,
      wireframe: true,
      transparent: true,
      opacity: 0.15
    });

  const innerSphere =
    new THREE.Mesh(
      innerGeometry,
      innerMaterial
    );

  innerSphere.position.copy(
    sphere.position
  );

  scene.add(innerSphere);


  /* =========================
     PARTICLES
  ========================= */

  const particleGeometry =
    new THREE.BufferGeometry();

  const particleCount = 800;

  const particlePositions =
    new Float32Array(
      particleCount * 3
    );

  for (
    let i = 0;
    i < particleCount * 3;
    i++
  ) {

    particlePositions[i] =
      (Math.random() - 0.5) * 15;

  }

  particleGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(
      particlePositions,
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


  /* =========================
     MOUSE MOVEMENT
  ========================= */

  let mouseX = 0;
  let mouseY = 0;

  document.addEventListener(
    "mousemove",
    (event) => {

      mouseX =
        (event.clientX /
          window.innerWidth -
          0.5) * 2;

      mouseY =
        (event.clientY /
          window.innerHeight -
          0.5) * 2;

    }
  );


  /* =========================
     ANIMATION
  ========================= */

  function animate() {

    requestAnimationFrame(animate);

    sphere.rotation.x += 0.0018;
    sphere.rotation.y += 0.003;

    innerSphere.rotation.x -= 0.002;
    innerSphere.rotation.y -= 0.003;

    particles.rotation.y += 0.0003;


    sphere.rotation.x +=
      (
        mouseY * 0.25 -
        sphere.rotation.x
      ) * 0.015;

    sphere.rotation.y +=
      (
        mouseX * 0.25 -
        sphere.rotation.y
      ) * 0.015;


    innerSphere.rotation.x =
      sphere.rotation.x;

    innerSphere.rotation.y =
      sphere.rotation.y;


    renderer.render(
      scene,
      camera
    );

  }

  animate();


  /* =========================
     RESIZE
  ========================= */

  window.addEventListener(
    "resize",
    () => {

      camera.aspect =
        window.innerWidth /
        window.innerHeight;

      camera.updateProjectionMatrix();

      renderer.setSize(
        window.innerWidth,
        window.innerHeight
      );

      renderer.setPixelRatio(
        Math.min(
          window.devicePixelRatio,
          2
        )
      );

    }
  );

}


/* =========================
   MAGNETIC BUTTON EFFECT
========================= */

if (window.innerWidth > 800) {

  document
    .querySelectorAll(".btn")
    .forEach((button) => {

      button.addEventListener(
        "mousemove",
        (event) => {

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
            `translate(${x * 0.15}px, ${y * 0.15}px)`;

        }
      );


      button.addEventListener(
        "mouseleave",
        () => {

          button.style.transform =
            "translate(0, 0)";

        }
      );

    });

}


/* =========================
   PROJECT PARALLAX
========================= */

const projects =
  document.querySelectorAll(".project");

window.addEventListener(
  "scroll",
  () => {

    if (window.innerWidth <= 800) {
      return;
    }

    projects.forEach(
      (project, index) => {

        const rect =
          project.getBoundingClientRect();

        const center =
          window.innerHeight / 2;

        const distance =
          (rect.top - center) * 0.02;

        project.style.transform =
          `translateY(${Math.max(
            0,
            distance + index * 10
          )}px)`;

      }
    );

  }
);
