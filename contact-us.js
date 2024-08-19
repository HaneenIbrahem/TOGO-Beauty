// Add any necessary JavaScript functionality here
// For example, you can handle form submission with AJAX
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    document.getElementById('contactForm').reset();
    alert("Your message has been sent!");
});
