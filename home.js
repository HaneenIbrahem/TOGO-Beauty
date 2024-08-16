


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
