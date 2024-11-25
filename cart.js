let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Function to render cart items
const renderCart = () => {
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  cartItemsContainer.innerHTML = "";

  let total = 0;

  cart.forEach((item, index) => {
    const itemTotal = (item.price * item.quantity).toFixed(2);
    total += parseFloat(itemTotal);

    cartItemsContainer.innerHTML += `
      <tr>
        <td>${item.name}</td>
        <td>$${item.price}</td>
        <td>
          <button class="decrease-btn" data-index="${index}">-</button>
          ${item.quantity}
          <button class="increase-btn" data-index="${index}">+</button>
        </td>
        <td>$${itemTotal}</td>
        <td><button class="remove-btn" data-index="${index}">Remove</button></td>
      </tr>
    `;
  });

  cartTotal.textContent = total.toFixed(2);

  // Attach event listeners
  document.querySelectorAll(".increase-btn").forEach((button) => {
    button.addEventListener("click", (event) => {
      const index = event.target.dataset.index;
      cart[index].quantity++;
      updateCart();
    });
  });

  document.querySelectorAll(".decrease-btn").forEach((button) => {
    button.addEventListener("click", (event) => {
      const index = event.target.dataset.index;
      if (cart[index].quantity > 1) {
        cart[index].quantity--;
      } else {
        cart.splice(index, 1);
      }
      updateCart();
    });
  });

  document.querySelectorAll(".remove-btn").forEach((button) => {
    button.addEventListener("click", (event) => {
      const index = event.target.dataset.index;
      cart.splice(index, 1);
      updateCart();
    });
  });
};

// Function to update cart in localStorage and re-render
const updateCart = () => {
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
};

// Initialize cart page
renderCart();
