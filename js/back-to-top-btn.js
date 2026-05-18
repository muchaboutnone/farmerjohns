// Scroll to top when button is clicked
function topFunction() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

// Show/hide scroll-to-top button
const myBtn = document.getElementById("myBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    myBtn.style.display = "block";
  } else {
    myBtn.style.display = "none";
  }
});