'use strict';

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// for (let i = 0; i < btnsOpenModal.length; i++)
// btnsOpenModal[i].addEventListener('click', openModal);
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

btnScrollTo.addEventListener('click', function (e) {
  section1.scrollIntoView({ behavior: 'smooth' });
});
// Page Navigation
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     // console.log('LINK');
//     const id = this.getAttribute('href');
//     // console.log(id);
//     document.querySelector(id).scrollIntoView({
//       behavior: 'smooth',
//     });
//   });
// });

// Using Event Delegation method

// 1. Add event listener to common parent element
document.querySelector('.nav__links').addEventListener('click', function (e) {
  // 2 Determine what element organiated the event
  console.log(e.target);

  // Matching Techniques
  if (e.target.classList.contains('nav__link')) {
    e.preventDefault();
    // console.log('LINK');
    const id = e.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({
      behavior: 'smooth',
    });
  }
});

// /////////////////////////////////////////////////////
// Tabbed Component

// Not a good implementation as it keeps on opening new tabs as we click so it might result in opening a lot of tags which might cause the webpage to lag.
// tabs.forEach(t => t.addEventListener('click', () => console.log('TAB')));

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  // console.log(clicked);

  // A guard clause to prevent null values to execute further
  if (!clicked) return;

  // Active Tab
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  // Activate content tab
  // console.log(clicked.dataset.tab);

  // Remove the active classes
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// Menu fade animation
// We use mouseover=/>mouseout for the element to bubble as mouseenter =/> mouseleave doesnt bubble
const handleHover = function (e) {
  // console.log(this, e.currentTarget);
  if (e.target.classList.contains('nav__link')) {
    const linked = e.target;
    // console.log(linked);
    const siblings = linked.closest('.nav').querySelectorAll('.nav__link');
    const logo = linked.closest('.nav').querySelector('img');

    siblings.forEach(e => {
      if (e !== linked) e.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// 3rd method
// Passing an "argument" into handler
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

// //////////////////////////////////////
// Sticky Navigation
// const initialCoords = section1.getBoundingClientRect();
// console.log(initialCoords);
// window.addEventListener('scroll', function () {
//   // console.log(window.scrollY);
//   if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

// 2nd Method
// nav.addEventListener('mouseover', function (e) {
//   handleHover(e, 0.5);
// });
// nav.addEventListener('mouseout', function (e) {
//   handleHover(e, 1);
// });

// 1st method
// nav.addEventListener('mouseover', function (e) {
//   if (e.target.classList.contains('nav__link')) {
//     const linked = e.target;
//     // console.log(linked);
//     const siblings = linked.closest('.nav').querySelectorAll('.nav__link');
//     const logo = linked.closest('.nav').querySelector('img');

//     siblings.forEach(e => {
//       if (e !== linked) e.style.opacity = 0.5;
//     });
//     logo.style.opacity = 0.5;
//   }
// });

// nav.addEventListener('mouseout', function (e) {
//   if (e.target.classList.contains('nav__link')) {
//     const linked = e.target;
//     // console.log(linked);
//     const siblings = linked.closest('.nav').querySelectorAll('.nav__link');
//     const logo = linked.closest('.nav').querySelector('img');

//     siblings.forEach(e => {
//       if (e !== linked) e.style.opacity = 1;
//     });
//     logo.style.opacity = 1;
//   }
// });

//////////////////////////////////////////////////////////////////////
// Sticky Navigation :Intersection Observer API
// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };

// // When the root and threshold intersect the obsCallback gets called
// const obsOptions = {
//   root: null,
//   // % of intersection at which the observer callback will be called
//   threshold: 0.1,
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// // To observe the certain target
// observer.observe(section1);

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
console.log(navHeight);
const stickyNav = function (entries) {
  const [entry] = entries;
  console.log(entry);

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `${navHeight}px`,
});
headerObserver.observe(header);

////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////
// /////////////////////////////////////
// Selecting , Creating and deleting elements

// Selecting Elements
// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);

// const header = document.querySelector('.header');
// // Returns a NodeList
// const allSections = document.querySelectorAll('.section');
// console.log(allSections);

// document.getElementById('section--1');
// // Returns a HTMLCollection is actually so called a live collection  i.e,. if the dom changes then changes are updated automatically
// const allButtons = document.getElementsByTagName('button');
// console.log(allButtons);

// //Live Html collection
// console.log(document.getElementsByClassName('btn'));

// Craeting and Inserting Elements
//.insertAdjacentHTML

// An Object that represents a DOM element
// const message = document.createElement('div');
// message.classList.add('cookie-message');
// message.textContent = 'We use cookied for improved functionality and analytics';
// message.innerHTML =
//   'We use cookied for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

// As it is in live action it occurs only once. We can noy only insert elements using prepend and append but also move elements

// Prepending means adding the child to first in the header tag
// header.prepend(message);
// last child
// header.append(message);

// To make the more than one copy of the element
// header.append(message.cloneNode(true));

// Add before the header as the sibling
// header.before(message);
// Add after the header as the sibling
// header.after(message);

// Delete elements

// document
//   .querySelector('.btn--close-cookie')
//   .addEventListener('click', function () {
//     // message.remove();
//     // older method (Dom Traversing)
//     message.parentElement.removeChild(message);
//   });

// // ////////////////////////////////////////////
// // Style , Attributes and Classes

// // Styles
// message.style.backgroundColor = '#37383d';
// message.style.width = '120%';

// // Only works for inline styles which we set
// console.log(message.style.height); //Nothing
// console.log(message.style.backgroundColor); //rgb(...,...,...)

// // To view
// console.log(getComputedStyle(message).color);
// console.log(getComputedStyle(message).height);

// message.style.height =
//   Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

// document.documentElement.style.setProperty('--color-primary', 'orangered');

// // Attributes
// const logo = document.querySelector('.nav__logo');
// console.log(logo.alt);
// console.log(logo.src); //returns the absolute url
// // To get relative url
// console.log(logo.getAttribute('src'));
// console.log(logo.className);

// logo.alt = 'Beautiful minimalist logo';
// // Non-standard
// console.log(logo.designer); //undefined

// // But we can read them by
// console.log(logo.getAttribute('designer'));
// logo.setAttribute('company', 'Bankist');

// const link = document.querySelector('.nav__link--btn'); //returns the absolute url
// console.log(link.href);
// console.log(link.getAttribute('href'));

// // Data attributes
// console.log(logo.dataset.versionNumber);

// Classes
// We can write multiple class names
// logo.classList.add('c', 'j');
// logo.classList.remove('c', 'j');
// logo.classList.toggle('c');
// logo.classList.contains('c');

// // Dont use
// logo.className = 'san';

// const btnScrollTo = document.querySelector('.btn--scroll-to');
// const section1 = document.querySelector('#section--1');

// btnScrollTo.addEventListener('click', function (e) {
// const s1cords = section1.getBoundingClientRect();
// console.log(s1cords);
// console.log(e.target.getBoundingClientRect());

// console.log(
//   'Current scroll position (X/Y',
//   window.pageXOffset,
//   window.pageYOffset
// );

// View Port height and width
// console.log(
//   'height/width viewport',
//   document.documentElement.clientHeight,
//   document.documentElement.clientWidth
// );

// Scrolling
//   window.scrollTo(
//     s1cords.left + window.pageXOffset,
//     s1cords.top + window.pageYOffset
//   );
// Old approah
// window.scrollTo({
//   left: s1cords.left + window.pageXOffset,
//   top: s1cords.top + window.pageYOffset,
//   behavior: 'smooth',
// });

// Modern Approach
//   section1.scrollIntoView({ behavior: 'smooth' });
// });

// Mouse Enter Event

// const h1 = document.querySelector('h1');

// Using Event Listener
// New Way
// h1.addEventListener('mouseenter', function (e) {
//   alert('addEventListener: Great you are reading an heading :D');
// });

// Using On Event Listener

// Old Way
// h1.onmouseenter = function (e) {
//   alert('addEventListener: Great you are reading an heading :D');
// };

// const alertH1 = function (e) {
//   alert('addEventListener: Great you are reading an heading :D');
// };

// h1.addEventListener('mouseenter', alertH1);
// setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);

// /////////////////////////////////////////////
// Bubbling and Capturing
///////////////////////////////////////////////
// Event Propagation

// rgb(255,255,255)
// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);
// const randomColor = () =>
//   `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

// console.log(randomColor(0, 255));

// // Link , container and nav displays same color in console because
// // all of them handles the exact same event
// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   console.log('LINK');
//   this.style.backgroundColor = randomColor();
//   console.log('Link', e.target, e.currentTarget);
//   console.log(e.currentTarget === this); //true
//   // Stop propagation
//   // Event didn't arrive in the parent elements
//   // e.stopPropagation();
// });

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   console.log('LINK');
//   this.style.backgroundColor = randomColor();
//   console.log('container', e.target, e.currentTarget);
// });

// // As we set the value to true , the event following the catching phase NAV i.e., which comes first while travelling from the catch.So nav listens first.
// document.querySelector('.nav').addEventListener(
//   'click',
//   function (e) {
//     console.log('LINK');
//     this.style.backgroundColor = randomColor();
//     console.log('Nav', e.target, e.currentTarget);
//   },
//   true
// );

//////////////////////////////////////////
// Dom Trvaersing
// const h1 = document.querySelector('h1');

// // Going downwards: child
// console.log(h1.querySelectorAll('.highlight'));

// // When we need direct children
// console.log(h1.childNodes);

// // Returns live collection
// console.log(h1.children);

// h1.firstElementChild.style.color = 'white';
// h1.lastElementChild.style.color = 'orangered';

// // Going upwards: parents
// console.log(h1.parentNode);
// console.log(h1.parentElement);

// // Closest finds the parent no matter how far but it should be the closest one
// h1.closest('.header').style.background = 'var(--gradient-secondary)';

// h1.closest('h1').style.background = 'var(--gradient-primary)0';

// // Going sideways:siblings

// console.log(h1.previousElementSibling); //null since there is no previous sibling of h1
// console.log(h1.nextElementSibling); //h4

// console.log(h1.previousSibling);
// console.log(h1.nextSibling);

// // Read all children
// console.log(h1.parentElement.children);
// [...h1.parentElement.children].forEach(function (e) {
//   if (e !== h1) {
//     e.style.transform = 'scale(0.5)';
//   }
// });
