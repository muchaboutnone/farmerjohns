// Toggle mobile menu
const menuToggle = document.getElementById('navbarToggle'); 
const navMenu = document.getElementById('navbarMenu'); 

menuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});