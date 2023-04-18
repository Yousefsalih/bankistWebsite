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
  console.log(e.target); //which is .nav__links is the ul (parent element) and e.target will include it when clicking

  //Matching strategy - ignores clicks if it didnt happen on the link (i.e on the ul)
  if (e.target.classList.contains('nav__link')) {
    // console.log('LINK'); //Shows only links
        e.preventDefault();//removes the default behaviour of scrolling automatically to the section
        // console.log('LINK');
        const id = e.target.getAttribute('href')
        // console.log(id);
        document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
})
