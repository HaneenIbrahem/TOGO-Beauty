// Retrieve product ID from URL query parameters
const urlParams = new URLSearchParams(window.location.search);
const productId = parseInt(urlParams.get("id"), 10);

// Fetch product details from local storage
const products = JSON.parse(localStorage.getItem("products")) || [];
const product = products.find((item) => item.id === productId);

if (product) {
  // Populate product details on the page
  document.getElementById("product-image").src = product.image_link;
  document.getElementById("product-name").textContent = product.name;
  document.getElementById("product-description").textContent =
    product.description || "No description available.";
  document.getElementById("product-price").textContent = `$${product.price}`;

  // Add to cart functionality
  document.getElementById("add-to-cart").addEventListener("click", () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItem = cart.find((item) => item.id === product.id);

    if (cartItem) {
      cartItem.quantity++; // If the item is already in the cart, increase the quantity
    } else {
      // If it's a new product, add it to the cart
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
      });
    }

    // Save the updated cart back to local storage
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} has been added to the cart!`);
  });
} else {
  alert("Product not found!");
}
