console.clear();

//  =============  xxxxx  ==========================	

gsap.set(".centered", {autoAlpha: 1, xPercent:-50, yPercent:-50});	
gsap.set("h1", {autoAlpha: 1, yPercent:-50});	
gsap.set(" .slide", {autoAlpha: 1, xPercent:0});	
gsap.set(".go", {autoAlpha: 1, yPercent:-50});	

var slides = $(".slide"),
    activeSlide = $(".slide.active"),
    next = $(".go-next"),
    prev = $(".go-prev"),
    moveSlideTL = gsap.timeline(),
    lines = $('h1');

// individual animations per slide ======

const allSlides = [].slice.call(slides); 
let animations = [];

for(let [i] of allSlides.entries()) {
  animations[i] = gsap.timeline({});
}

animations[0]
  .from('#slide01 .lines', {y:30, autoAlpha:0, duration:1, delay:0.5})
  .reverse();

animations[1]
  .from('.apple', {xPercent:-200, duration:0.6, ease: "elastic.out(0.5, 0.4)", stagger:-0.4})
  .from('#slide02 .lines', {y:120, duration:1, delay:1}, '-=1.5')
  .reverse();

animations[2]
  .from('#slide03 .lines', {y:30, autoAlpha:0, duration:1})
  .set('#slide03 span', {color:'green'})
  .reverse();

animations[3]
  .from('#slide04 .lines', {scale:0.2, transformOrigin:'center', duration:2})
  .reverse();

// ===========================

	

//==============================

function onMouseWheel(event) {
  //Normalize event wheel delta
  var delta = event.originalEvent.wheelDelta / 30 || -event.originalEvent.detail;
  
  if(delta < -1) {  //scrolling down -> next slide
    if(!moveSlideTL.isActive()) {
      var	slideFrom = $(".slide.active"),
          sectionToIndex = slides.index(slideFrom);

      if(sectionToIndex !== slides.length - 1) {
        slideTo = slides.eq(sectionToIndex + 1);
        moveToSlide(slideFrom, slideTo);
      }
    }

  } else if(delta > 1)  {  // -> prev
    if(!moveSlideTL.isActive()) {
      if(!moveSlideTL.isActive()) {
        var	slideFrom = $(".slide.active"),
            sectionToIndex = slides.index(slideFrom);

        if(sectionToIndex != 0) {
          slideTo = slides.eq(sectionToIndex - 1);
          moveToSlide(slideFrom, slideTo);
        }
      }
    }
  }
  //event.preventDefault();
}

// ============================
function dotClick() {

  var	slideFrom = $(".slide.active"),
      sectionToIndex = $(this).index(),
      sectionToIndex = $(this).index(),
      slideTo = slides.eq(sectionToIndex);

  var indexFrom = slideFrom.index();

  console.log(slideFrom, 'from: ' + indexFrom, 'to: ' + sectionToIndex, 'slideTo: ' + slideTo);

  //if(slideFrom !== slideTo && !moveSlideTL.isActive()) {  // not working

  if(indexFrom !== sectionToIndex && !moveSlideTL.isActive()) {
    moveToSlide(slideFrom, slideTo);
  }

}

// =============================
function nextClick() {
  if(!moveSlideTL.isActive()) {
    var	slideFrom = $(".slide.active"),
        sectionToIndex = slides.index(slideFrom);

    if(sectionToIndex !== slides.length - 1) {
      slideTo = slides.eq(sectionToIndex + 1);
      moveToSlide(slideFrom, slideTo);
    }
  }
}

function prevClick() {
  if(!moveSlideTL.isActive()) {
    var	slideFrom = $(".slide.active"),
        sectionToIndex = slides.index(slideFrom);

    if(sectionToIndex != 0) {
      slideTo = slides.eq(sectionToIndex - 1);
      moveToSlide(slideFrom, slideTo);
    }
  }
}

// ==============================
function moveToSlide(slideFrom, slideTo) {

  gsap.set('.go', {autoAlpha:0}) // ????

  if(slides.index(slideFrom) < slides.index(slideTo)) { // vorwärts

    moveSlideTL = gsap.timeline({onComplete: setActiveSlide, onCompleteParams: [slideTo, slideFrom]})
      .to(slideTo, {xPercent:-100, duration:0.8, className: "slide active"})
      .to(slideFrom, {xPercent:-200, duration:0.8, className: "slide"},0)
      .set(slideFrom, {xPercent:0})

  } else {

    moveSlideTL = gsap.timeline({onComplete: setActiveSlide, onCompleteParams: [slideTo, slideFrom]})
      .set(slideTo, {xPercent:-200, className: "slide active"})
      .to(slideTo, {xPercent:-100, duration:0.8})
      .to(slideFrom, {xPercent:0, duration:0.8, className: "slide"},0)
  }

}

function setActiveSlide(active, last) {
  
  var currentSlideIndex = slides.index(active);
  var lastSlideIndex = slides.index(last);

  animations[currentSlideIndex].reversed(false);
  animations[lastSlideIndex].progress(0).reversed(true);

  gsap.to(".navDot.active", {opacity: 0.5, scale:1});
  $(".navDot.active").removeClass("active");
  $(".navDot").eq(currentSlideIndex).addClass("active");
  gsap.to(".navDot.active", {opacity: 1, scale:1.3});
  
  if(currentSlideIndex == 0) {
    gsap.set('.go-prev', {autoAlpha:0})
  } else {
    gsap.set('.go-prev', {autoAlpha:1})
  }
  if(currentSlideIndex == slides.length-1) {
    gsap.set('.go-next', {autoAlpha:0})
  } else {
    gsap.set('.go-next', {autoAlpha:1})
  }
  
}

// ================================
function init() {

  for( var i = 0; i < slides.length; i++ ) {
    var navDots = $('<div></div>').addClass("navDot").appendTo('nav');
    gsap.set(".navDot:first-child", {className: "navDot active", opacity:1, scale:1.3, transformOrigin:'center'});
    navDots.on('click', dotClick);
  };

  if(slides[0]){
    gsap.set('.go-prev', {autoAlpha:0})
  }
  
  next.on('click', nextClick);
  prev.on('click', prevClick);
  
  $(window).on("mousewheel DOMMouseScroll", onMouseWheel);
   //$(window).on("touchmove", onMouseWheel);
 
  gsap.set($( ".slide:odd" ),{backgroundColor:"#0f8c0d", color: "#333333"});
  gsap.set(".slide.active", {xPercent:-100});
  animations[0].reversed(false);
}

init();


 