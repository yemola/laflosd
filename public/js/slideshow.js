let slideIndex = 1;
showSlides(slideIndex);

const prev = document.querySelector('.prev');
const next = document.querySelector('.next');

prev.addEventListener('click', () => {
    plusSlides(-1);
})
next.addEventListener('click', () => {
    plusSlides(1);
})

function plusSlides(n) {
  showSlides(slideIndex += n);
}
const allDots = document.querySelectorAll('.dotbox .dot');
    allDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide(index +1);
        });
    })
    
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlide");
  let dots = document.getElementsByClassName("dot");
    if (n > slides.length)
  {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++)
      {
        dots[i].className = dots[i].className.replace("active", "")
      }
      (slides[slideIndex-1]).style.display = "block";
        dots[slideIndex-1].className += " active";
}