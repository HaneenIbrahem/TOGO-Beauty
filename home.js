


let currentSlideIndex = 0;

function showSlides(n) {
    const slides = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    
    if (n >= slides.length) currentSlideIndex = 0;
    if (n < 0) currentSlideIndex = slides.length - 1;
    
    slides.forEach((slide, index) => {
        slide.style.display = (index === currentSlideIndex) ? 'block' : 'none';
    });
    
    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentSlideIndex].classList.add('active');
}

function currentSlide(n) {
    showSlides(currentSlideIndex = n - 1);
}

// Auto Slide
let slideInterval = setInterval(() => {
    currentSlideIndex++;
    showSlides(currentSlideIndex);
}, 3000);

// Initialize the first slide
showSlides(currentSlideIndex);


// Get modal element
var modal = document.getElementById("featuresModal");

// Get button that opens the modal
var btn = document.querySelector(".view-features-button");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
