'use strict';

///////////////////////////////////////
// Selecting Elements

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');//Learn more Button in the header
const section1 = document.querySelector('#section--1');//Scrolling to this section


///////////////////////////////////////
// Modal window
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

//Adding an event listener for opening account because it exists in more than one place. 
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////
//Implementing smooth scrolling
btnScrollTo.addEventListener('click', function(){
  section1.scrollIntoView({ behavior: 'smooth' });
})

///////////////////////////////////////
//Page navigation
document.querySelector('.nav__links').addEventListener('click', function(e){
  //Matching strategy - ignores clicks if it didnt happen on the link (i.e on the ul)
  if (e.target.classList.contains('nav__link')) {
        e.preventDefault();//removes the default behaviour of scrolling automatically to the section
        const id = e.target.getAttribute('href')
        document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
})

//Tabbed Component
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content')

tabsContainer.addEventListener('click', function(e){
  const clicked = e.target.closest('.operations__tab');

  if (!clicked) return;

  //Remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'))//removes active tab except for the first one
  tabsContent.forEach(c => c.classList.remove('operations__content--active'))//remove content except default
  clicked.classList.add('operations__tab--active');//adds active tab

  //Activate content area
  console.log(clicked.dataset.tab);//Shows the number of the tab
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active')
});