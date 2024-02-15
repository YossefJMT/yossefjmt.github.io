// ---------------------------JS for the menu

const menuIcon = document.querySelector('.menu_icon');
const menuIconBars = document.querySelectorAll('.bar');

menuIcon.addEventListener('click', toggleMenu);

const navList = document.querySelector('nav ul');
/**
 * Function to toggle the menu on and off
 */
function toggleMenu() {
  navList.classList.toggle('fade_in');

  menuIconBars.forEach((bar) => {
    bar.classList.toggle('exit');
  });
}

const navLinks = document.querySelectorAll('nav ul li a');
/**
 * Function to close the menu when a link is clicked
 */
navLinks.forEach((navlink) => {
  navlink.addEventListener('click', function(event) {
    // Remove the active class from all links
    navLinks.forEach((navlink) => navlink.classList.remove('active'));
    navlink.classList.add('active');
    // Close the menu after a link is clicked
    toggleMenu();

    // Prevent the default behavior of the link
    event.preventDefault();

    // Get the href of the link
    const targetId = navlink.getAttribute('href').substring(1);

    // Find the corresponding element for the section on the page
    const targetElement = document.getElementById(targetId);

    // Scroll the page to the section
    if (targetElement) {
      targetElement.scrollIntoView({behavior: 'smooth'});
    }
  });
});


/**
 * Function to update the active class on the nav links
 */
function updateNavClass() {
  // Get the scroll position
  const scrollPosition = window.scrollY || document.documentElement.scrollTop;

  // Get all the nav links
  const navLinks = document.querySelectorAll('nav ul li a');

  // Iterate through the links and add the active
  // class to the link that corresponds to the section in view
  navLinks.forEach(function(link) {
    const sectionId = link.getAttribute('href').substring(1);
    const sectionElement = document.getElementById(sectionId);

    // Adjust the offset by subtracting a certain number of pixels
    const offset = 250;

    if (sectionElement && scrollPosition >= sectionElement.offsetTop - offset &&
      scrollPosition < sectionElement.offsetTop - offset + sectionElement.offsetHeight) {
      link.parentElement.classList.add('active_link');
    } else {
      link.parentElement.classList.remove('active_link');
    }
  });
}

// Call the function when the page loads and on scroll
document.addEventListener('DOMContentLoaded', updateNavClass);
window.addEventListener('scroll', updateNavClass);


// Llama a la función al cargar la página y al hacer scroll
updateNavClass();
window.scroll(updateNavClass);

/** ---------------------------------------------
 * this part is for the animation of the letters
 */
const letterElements = document.querySelectorAll('#homepage_col2 h1 span');

/**
 * This function animates the elements in the array with the given interval.
 * @param {Array} elements The elements to animate.
 * @param {number} interval The interval between animations.
 */
function animateElementsWithInterval(elements, interval) {
  let index = 0;

  /**
  * This function animates the next element in the array.
  */
  function animateNextElement() {
    if (index < elements.length) {
      const element = elements[index];
      // Aplica la animación con el intervalo adecuado
      element.style.animation = 'mostrarh1 0.2s both ' + (index * interval) + 's';
      index++;
      // Espera el intervalo y continúa con el siguiente elemento
      setTimeout(animateNextElement, interval * 500);
    }
  }

  animateNextElement();
}

// Inicia la animación con un intervalo de 0.5 segundos
setTimeout(() => {
  animateElementsWithInterval(letterElements, 0.1);
}, 500);


/** ---------------------------------------------
 * This is for the animation of the images
 */
const imgSobremi = document.getElementById('about_me_col1');
const images = document.querySelectorAll('#about_me_col1 div');
const imagesURL = [
  './media/images/mine/foto4.jpg',
  './media/images/mine/foto7.jpeg',
  './media/images/mine/foto1.jpg',
  './media/images/mine/foto6.jpg',
  './media/images/mine/foto3.jpg',
  './media/images/mine/foto5.jpg'];
let indexRotation = 0;
let indexImages = 1;

/**
 * This function rotates the images in the array.
 */
function rotateElements() {
  const prevIndex = (indexRotation - 1 + images.length) % images.length;
  const nextIndex = (indexRotation + 1) % images.length;

  // Change the classes of the images to rotate them
  images[prevIndex].classList.remove('left', 'center', 'right');
  images[prevIndex].classList.add('left');

  images[indexRotation].classList.remove('left', 'center', 'right');
  images[indexRotation].classList.add('center');

  images[nextIndex].classList.remove('left', 'center', 'right');
  images[nextIndex].classList.add('right');

  // Change the background image of the images
  images[nextIndex].style.backgroundImage = `url(${imagesURL[indexImages]})`;
  indexImages++;
  if (indexImages == imagesURL.length) {
    indexImages = 0;
  }

  indexRotation = nextIndex;
}
imgSobremi.addEventListener('click', rotateElements);
rotateElements();
rotateElements();
rotateElements();
setInterval(rotateElements, 8000);

/** ---------------------------------------------
 * This is a function to animate the skills cards
 * on a mouse hover.
 */
// Select all elements with the class '.soft_skill'
const softSkillsCards = document.querySelectorAll('.soft_skill');

// Loop through each '.soft_skill' element
softSkillsCards.forEach((card) => {
  const height = card.offsetHeight;
  const width = card.offsetWidth;

  card.addEventListener('mousemove', (e) => {
    const {offsetX, offsetY} = e;

    const yrotation = 30 * ((offsetX - width / 2) / width);
    const xrotation = -30 * ((offsetY - height / 2) / height);
    card.style.transform = `perspective(1000px) scale(0.95) rotateX(${xrotation}deg) rotateY(${yrotation}deg)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = `perspective(1000px) scale(1) rotateX(0deg) rotateY(0deg)`;
  });
});

