let currentSlideIndex = 0;

function showSlides(n) {
  const slides = document.querySelectorAll(".testimonial-card");
  const dots = document.querySelectorAll(".dot");

  if (n >= slides.length) currentSlideIndex = 0;
  if (n < 0) currentSlideIndex = slides.length - 1;

  slides.forEach((slide, index) => {
    slide.style.display = index === currentSlideIndex ? "block" : "none";
  });

  dots.forEach((dot) => dot.classList.remove("active"));
  dots[currentSlideIndex].classList.add("active");
}

function currentSlide(n) {
  showSlides((currentSlideIndex = n - 1));
}

// Auto Slide
let slideInterval = setInterval(() => {
  currentSlideIndex++;
  showSlides(currentSlideIndex);
}, 3000);

// Initialize the first slide
showSlides(currentSlideIndex);

// Modal handling
const modals = {
  features: document.getElementById("featuresModal"),
  popup: document.getElementById("popupModal"),
};

const buttons = {
  features: document.querySelector(".view-features-button"),
  popup: document.querySelector(".bars-menu"),
};

const closeButtons = {
  features: document.querySelector("#featuresModal .close"),
  popup: document.querySelector("#popupModal .close"),
};

// Function to open a specific modal
function openModal(modal) {
  modals[modal].style.display = "block";
}

// Function to close a specific modal
function closeModal(modal) {
  modals[modal].style.display = "none";
}

// Event listeners for opening modals
buttons.features.onclick = function () {
  openModal("features");
};

buttons.popup.onclick = function () {
  openModal("popup");
};

// Event listeners for closing modals
Object.keys(closeButtons).forEach((modal) => {
  closeButtons[modal].onclick = function () {
    closeModal(modal);
  };
});

// Click outside modal to close
window.onclick = function (event) {
  Object.keys(modals).forEach((modal) => {
    if (event.target == modals[modal]) {
      closeModal(modal);
    }
  });
};

// Fetch and display products
const apiUrl =
  "http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline";
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
  productGrid.innerHTML = "";

  products.forEach((product) => {
    productGrid.innerHTML += `
            <div class="product-card">
                <img src="${product.image_link}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>$${product.price}</p>
                ${product.isHot ? '<span class="badge hot">Hot</span>' : ""}
                ${
                  product.isOnSale
                    ? '<span class="badge discount">Sale</span>'
                    : ""
                }
            </div>
        `;
  });
};

document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", function () {
    document.querySelector(".tab.active").classList.remove("active");
    this.classList.add("active");

    const tabId = this.dataset.tab;

    switch (tabId) {
      case "new":
        displayProducts(products1);
        break;
      case "best":
        displayProducts(products2);
        break;
      case "sale":
        displayProducts(products3);
        break;
      default:
        displayProducts(products1);
    }
  });
});

fetchProducts();
