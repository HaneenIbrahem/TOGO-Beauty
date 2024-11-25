let currentPage = 1;
const productsPerPage = 9;
let filters = {};

const getProducts = async () => {
  document.getElementById("loader").style.display = "block"; // Show the loader
  let url = "http://makeup-api.herokuapp.com/api/v1/products.json";

  if (
    filters.brand ||
    filters.category ||
    filters.minPrice ||
    filters.maxPrice
  ) {
    url += "?"; 

    if (filters.brand) {
      url += `brand=${filters.brand}&`;
    }
    if (filters.category) {
      url += `product_type=${filters.category}&`;
    }
    if (filters.minPrice) {
      url += `price_greater_than=${filters.minPrice}&`;
    }
    if (filters.maxPrice) {
      url += `price_less_than=${filters.maxPrice}&`;
    }
  }

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching the products:", error);
    return [];
  } finally {
    document.getElementById("loader").style.display = "none"; // Hide the loader
  }
};
const cart = [];
let currentProducts = [];

const displayProducts = async (page = 1) => {
  const products = await getProducts();
  currentProducts = products;

  if (products.length > 0) {
    const startIndex = (page - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const paginatedProducts = products.slice(startIndex, endIndex);

    const result = paginatedProducts
      .map((product) => {
        return `
                    <div class="product-card">
                        <img src="${product.image_link}" alt="${product.name}">
                        <div class="product-details">
                            <h2>${product.name}</h2>
                            
                            <p class="price">$${product.price}</p>
                            <p class="price">$${product.price}</p>
                           
                            <p class="tags">${product.tag_list
                              .map((tag) => `<span>${tag}</span>`)
                              .join(" ")}</p>
                              <button class="add-to-cart" data-id="${product.id}">
                Add to Cart
              </button>
              <button class="view" data-id="${product.id}">
                View
              </button>
                        </div>
                    </div>
                `;
      })
      .join("");

    if (page === 1) {
      document.querySelector(".product-container").innerHTML = result;
    } else {
      document.querySelector(".product-container").innerHTML += result;
    }

    if (products.length > endIndex) {
      const loadMore = document.createElement("button");
      loadMore.innerText = "Load More";
      loadMore.classList.add("load-more");
      loadMore.onclick = () => {
        currentPage++;
        displayProducts(currentPage);
        loadMore.remove(); // Remove the button after it's clicked
      };
      document.querySelector(".product-container").appendChild(loadMore);
    }
    // Add event listeners for "Add to Cart" buttons
    const cartButtons = document.querySelectorAll(".add-to-cart");
    cartButtons.forEach((button) =>
      button.addEventListener("click", (event) => {
        const productId = parseInt(event.target.getAttribute("data-id"), 10); // Convert to number
        addToCart(productId);
      })
    );
    // Add event listeners for "View" buttons
    const viewButtons = document.querySelectorAll(".view");
    viewButtons.forEach((button) =>
      button.addEventListener("click", (event) => {
        const productId = parseInt(event.target.getAttribute("data-id"), 10); // Convert to number
        viewProductDetails(productId);
      })
    );
  } else {
    document.querySelector(".product-container").innerHTML =
      '<img src="./imgs/nproduct.png" alt="No Product found" style="width: 100%; height: auto;">';
  }
};

const viewProductDetails = (productId) => {
  const product = currentProducts.find((item) => item.id === productId);
  if (!product) {
    alert("Product not found!");
    return;
  }

  // Store product details in localStorage
  localStorage.setItem("selectedProduct", JSON.stringify(product));

  // Redirect to the details page
  window.location.href = "product-details.html";
};

const addToCart = (productId) => {
  const product = currentProducts.find((item) => item.id === productId); // Find product details
  if (!product) {
    alert("Product not found!");
    return;
  }

  const cartItem = cart.find((item) => item.id === productId);
  if (cartItem) {
    cartItem.quantity++;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: parseFloat(product.price) || 0,
      quantity: 1,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${product.name} has been added to the cart!`);
};


const applyFilters = () => {
  const selectedCategory = document.querySelector(
    'input[name="category"]:checked'
  )?.value;
  const selectedBrand = document.querySelector(
    'input[name="brand"]:checked'
  )?.value;
  const minPrice = document.getElementById("price-greater-than").value;
  const maxPrice = document.getElementById("price-less-than").value;

  filters = {
    category: selectedCategory,
    brand: selectedBrand,
    minPrice: minPrice ? parseFloat(minPrice) : undefined,
    maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
  };

  currentPage = 1; 
  displayProducts(currentPage);
};

document
  .querySelectorAll('input[name="category"], input[name="brand"]')
  .forEach((input) => {
    input.addEventListener("change", applyFilters);
  });

document.querySelectorAll(".price-filter").forEach((input) => {
  input.addEventListener("change", applyFilters);
});

const clearCategoryFilter = () => {
  const categoryRadioButtons = document.querySelectorAll(
    'input[name="category"]'
  );
  categoryRadioButtons.forEach((button) => (button.checked = false));
  applyFilters();
};

const clearPriceFilter = () => {
  document.getElementById("price-greater-than").value = "";
  document.getElementById("price-less-than").value = "";
  applyFilters();
};

const clearBrandFilter = () => {
  const brandRadioButtons = document.querySelectorAll('input[name="brand"]');
  brandRadioButtons.forEach((button) => (button.checked = false));
  applyFilters(); 
};

document
  .querySelector(".clear-category")
  .addEventListener("click", clearCategoryFilter);
document
  .querySelector(".clear-price")
  .addEventListener("click", clearPriceFilter);
document
  .querySelector(".clear-brand")
  .addEventListener("click", clearBrandFilter);

displayProducts();

// document.querySelector('.bars-menu1').addEventListener('click', function () {
//     document.querySelector('.sidebar').classList.toggle('active');
// });

document.querySelector(".bars-menu1").addEventListener("click", function () {
  document.querySelector(".sidebar").classList.toggle("active");
});

const filterInputs = document.querySelectorAll(
  '.sidebar input[type="radio"], .sidebar input[type="checkbox"]'
);

filterInputs.forEach((input) => {
  input.addEventListener("change", function () {
    document.querySelector(".sidebar").classList.remove("active");
  });
});

const clearButtons = document.querySelectorAll(
  ".sidebar .clear-category, .sidebar .clear-price, .sidebar .clear-brand"
);

clearButtons.forEach((button) => {
  button.addEventListener("click", function () {
    document.querySelector(".sidebar").classList.remove("active");
  });
});

document.querySelector(".back-button").addEventListener("click", function () {
  document.querySelector(".sidebar").classList.remove("active");
});
