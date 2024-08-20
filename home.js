


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
// ----------------------------------------------------

const apiUrl = "http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline";
let products = []; 
let products1 = []; 
let products2 = []; 
let products3 = []; 

const fetchProducts = async () => {
    try {
        const response = await fetch(apiUrl);
        products = await response.json();
         products1 = products.slice(0, 4); 
         products2 = products.slice(5, 9);
         products3 = products.slice(10, 14);

        displayProducts(products1); 
    } catch (error) {
        console.error("Error fetching the products:", error);
    }
};

const displayProducts = (products) => {
    const productGrid = document.querySelector(".product-grid");
    productGrid.innerHTML = ''; 

    products.forEach((product) => {
        productGrid.innerHTML += `
            <div class="product-card">
                <img src="${product.image_link}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>$${product.price}</p>
                ${product.isHot ? '<span class="badge hot">Hot</span>' : ''}
                ${product.isOnSale ? '<span class="badge discount">Sale</span>' : ''}
            </div>
        `;
    });
};

document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', function () {
        document.querySelector('.tab.active').classList.remove('active');
        this.classList.add('active');

        // Determine which set of products to display based on the tab clicked
        const tabId = this.dataset.tab;

        switch (tabId) {
            case 'new':
                displayProducts(products1);
                break;
            case 'best':
                displayProducts(products2);
                break;
            case 'sale':
                displayProducts(products3);
                break;
            default:
                displayProducts(products1); // Default to New Arrivals
        }
    });
});

fetchProducts();

var modal = document.getElementById("popupModal");

var barsMenu = document.querySelector(".bars-menu");

var span = document.querySelector(".close");

barsMenu.onclick = function() {
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
