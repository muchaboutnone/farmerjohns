document.addEventListener("DOMContentLoaded", () => {

  /* ================= MOBILE NAV ================= */
  const toggle = document.getElementById("navbarToggle");
  const menu = document.getElementById("navbarMenu");

  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      menu.classList.toggle("active");
    });

    // Close menu when clicking a link
    document.querySelectorAll(".navbar__link").forEach(link => {
      link.addEventListener("click", () => {
        menu.classList.remove("active");
      });
    });

    // Close when clicking outside
    document.addEventListener("click", (e) => {
      const clickedInsideMenu = menu.contains(e.target);
      const clickedToggle = toggle.contains(e.target);

      if (!clickedInsideMenu && !clickedToggle) {
        menu.classList.remove("active");
      }
    });
  }

  /* ================= HERO PARALLAX ================= */
  const hero = document.getElementById("hero");
  if (hero) {
    const updateHeroParallax = () => {
      const offset = window.scrollY * 0.4;
      hero.style.backgroundPosition = `center ${offset}px`;
    };

    window.addEventListener("scroll", () => {
      window.requestAnimationFrame(updateHeroParallax);
    });

    updateHeroParallax();
  }

  /* ================= NAVBAR SCROLL EFFECT ================= */
  const navbar = document.getElementById("navbar");

  if (navbar) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 20) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    });
  }

  /* ================= SCROLL REVEAL ================= */
  if (typeof ScrollReveal !== "undefined") {

    ScrollReveal().reveal(".hero", {
      distance: "60px",
      duration: 1400,
      origin: "bottom"
    });

    ScrollReveal().reveal(".about-container", {
      distance: "60px",
      duration: 1200,
      origin: "bottom"
    });

    ScrollReveal().reveal(".services-grid li", {
      interval: 150,
      distance: "40px"
    });

    ScrollReveal().reveal(".stat-card", {
      interval: 150,
      distance: "40px"
    });

    ScrollReveal().reveal(".contact-container", {
      distance: "60px",
      duration: 1200,
      origin: "bottom"
    });

  } else {
    console.warn("ScrollReveal is not loaded.");
  }

});

/* Web3Forms Success Message*/
document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("contactForm");
  const btn = document.getElementById("submitBtn");

  // Track page open time
  const startTime = Date.now();

  form.addEventListener("submit", async (e) => {

    e.preventDefault();

    btn.disabled = true;
    btn.textContent = "Sending...";

    try {

      // Block suspiciously fast submissions
      const seconds =
        (Date.now() - startTime) / 1000;

      if (seconds < 3) {

        btn.disabled = false;
        btn.textContent = "Please wait a moment";

        setTimeout(() => {
          btn.textContent = "Send";
        }, 3000);

        return;
      }

      // Add timestamp
      document.getElementById(
        "submitted_at"
      ).value = new Date().toISOString();

      const formData = new FormData(form);

      const response = await fetch(
        "https://api.web3forms.com/submit",
        {
          method: "POST",
          body: formData
        }
      );

      const data = await response.json();

      console.log(data);

      if (data.success) {

        btn.textContent =
          "Thank you for contacting us!";

        form.reset();

        setTimeout(() => {
          btn.disabled = false;
          btn.textContent = "Send";
        }, 10000);

      } else {

        btn.disabled = false;

        btn.textContent =
          data.message || "Submission failed";

        setTimeout(() => {
          btn.textContent = "Send";
        }, 5000);
      }

    } catch (err) {

      console.error(err);

      btn.disabled = false;
      btn.textContent = "Something went wrong";

      setTimeout(() => {
        btn.textContent = "Send";
      }, 5000);
    }
  });
});