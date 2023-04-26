'use strict';

///////////////////////////////////////
// Selecting Elements

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');//Learn more Button in the header
const section1 = document.querySelector('#section--1');//Scrolling to this section
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');
const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
const slides = document.querySelectorAll('.slide');
const btnLeftSlider = document.querySelector('.slider__btn--left');
const btnRightSlider = document.querySelector('.slider__btn--right');
const dotsContainer = document.querySelector('.dots');


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
  if (e.target.classList.contains('nav__link')) {
        e.preventDefault();
        const id = e.target.getAttribute('href')
        document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
})

///////////////////////////////////////
//Tabbed Component
tabsContainer.addEventListener('click', function(e){
  const clicked = e.target.closest('.operations__tab');

  if (!clicked) return;

  //Remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'))
  tabsContent.forEach(c => c.classList.remove('operations__content--active'))
  clicked.classList.add('operations__tab--active');

  //Activate content area
  console.log(clicked.dataset.tab);
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active')
});


///////////////////////////////////////
//Menu fade animation
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
}

nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));


///////////////////////////////////////
//Sticky Navigation
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting)
    nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header)

///////////////////////////////////////
//Reveal Sections when scrolling to it

const revealSection = function(entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target)
}

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15
});

allSections.forEach(function(section) { 
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
})

///////////////////////////////////////
//Lazy Loading Images
const imgTargets = document.querySelectorAll('img[data-src')

const loadImg = function (entries, observer) {
  const [entry] = entries

  if(!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function() {
    entry.target.classList.remove('lazy-img')
  });
  observer.unobserve(entry.target)
};


const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0.40
})

imgTargets.forEach(img => imgObserver.observe(img));


//Slider
let curSlide = 0;
const maxSlide = slides.length - 1;

//Creating the dot slider and integrating the slides with it
const createDots = function () {
  slides.forEach(function (_, i) {
    dotsContainer.insertAdjacentHTML('beforeend', `<button class ="dots__dot" data-slide="${i}"></button>`)
  })
}
createDots();

//Activate dot to show current slide
const activateDot = function(slide) {
  document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'));
  document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
};
activateDot(0);

//Makes the slides move using CSS
const goToSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%`)
  );
}

goToSlide(0)

//Next Slide
const nextSlide = function () {
    if (curSlide === maxSlide) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    goToSlide(curSlide);
    activateDot(curSlide)
}

btnRightSlider.addEventListener('click', nextSlide)

//Previous Slide
const prevSlide = function () {
  if(curSlide == 0) {
    curSlide = maxSlide;
  } else {
    curSlide--;
  }
  goToSlide(curSlide)
  activateDot(curSlide)
}

btnLeftSlider.addEventListener('click', prevSlide)

//keyboard slide
document.addEventListener('keydown', function (e) {
  if(e.key === 'ArrowLeft') prevSlide();
  e.key === 'ArrowRight' && nextSlide(); //same as above using short circuiting
})

dotsContainer.addEventListener('click', function(e) {
  if(e.target.classList.contains('dots__dot')) {
    const {slide} = e.target.dataset //destructured
    goToSlide(slide);
    activateDot(slide);
  };
})