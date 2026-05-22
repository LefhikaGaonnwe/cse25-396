/* =========================
   ABOUT PAGE BUTTON
========================= */

const learnMoreBtn = document.querySelector(".learn-btn");

if (learnMoreBtn) {

  learnMoreBtn.addEventListener("click", () => {

    alert("Thank you for learning more about our company!");

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

/* =========================
   FOOTER LINKS
========================= */

const footer = document.querySelector(".footer");

if (footer) {

  footer.addEventListener("click", () => {
    window.location.href = "contact.html";
  });
}

/* =========================
   SCROLL TO TOP BUTTON
========================= */

const scrollButton = document.createElement("button");

scrollButton.innerHTML = "↑";
scrollButton.className = "scroll-top-btn";

document.body.appendChild(scrollButton);

window.addEventListener("scroll", () => {

  if (window.scrollY > 300) {
    scrollButton.style.display = "block";
  } else {
    scrollButton.style.display = "none";
  }
});

scrollButton.addEventListener("click", () => {

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

/* =========================
   PAGE LOAD ANIMATION
========================= */

window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

/* =========================
   PRODUCT DATABASE
========================= */

const products = {
  "Digital Thermometer": 250.00,
  "Patient Monitor": 6500.00,
  "Mobility Walker": 950.00,
  "Heart Monitor": 6500.00,
  "Hospital Bed": 3250.00,
  "Wheelchair": 720.00
};

/* =========================
   CART STORAGE
========================= */

let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* =========================
   ADD TO CART
========================= */

const buyNowButtons = document.querySelectorAll(".btn-primary");

buyNowButtons.forEach(button => {

  if (button.textContent.includes("Buy")) {

    button.addEventListener("click", () => {

      const card = button.closest(".product-card");

      const productName = card.querySelector("h6").textContent;

      const productPrice = products[productName];

      const existingProduct = cart.find(item => item.name === productName);

      if (existingProduct) {

        existingProduct.quantity += 1;

      } else {

        cart.push({
          name: productName,
          price: productPrice,
          quantity: 1
        });
      }

      localStorage.setItem("cart", JSON.stringify(cart));

      alert(productName + " added to cart.");

      window.location.href = "checkout.html";
    });
  }
});

/* =========================
   DISPLAY CHECKOUT ITEMS
========================= */

const checkoutItems = document.getElementById("checkout-items");
const grandTotalElement = document.getElementById("grand-total");

function renderCheckout() {

  if (!checkoutItems) return;

  checkoutItems.innerHTML = "";

  let grandTotal = 0;

  cart.forEach((item, index) => {

    const itemTotal = item.price * item.quantity;

    grandTotal += itemTotal;

    checkoutItems.innerHTML += `
      <tr>

        <td>${item.name}</td>

        <td>P${item.price.toFixed(2)}</td>

        <td>

          <div class="quantity-controls">

            <button class="quantity-btn decrease-btn"
              data-index="${index}">
              -
            </button>

            <span class="quantity-number">
              ${item.quantity}
            </span>

            <button class="quantity-btn increase-btn"
              data-index="${index}">
              +
            </button>

          </div>

        </td>

        <td>P${itemTotal.toFixed(2)}</td>

        <td>

          <button class="remove-btn"
            data-index="${index}">
            Remove
          </button>

        </td>

      </tr>
    `;
  });

  grandTotalElement.textContent = `P${grandTotal.toFixed(2)}`;

  updateCartButtons();
}

/* =========================
   UPDATE CART BUTTONS
========================= */

function updateCartButtons() {

  const increaseButtons = document.querySelectorAll(".increase-btn");
  const decreaseButtons = document.querySelectorAll(".decrease-btn");
  const removeButtons = document.querySelectorAll(".remove-btn");

  /* Increase Quantity */

  increaseButtons.forEach(button => {

    button.addEventListener("click", () => {

      const index = button.dataset.index;

      cart[index].quantity += 1;

      localStorage.setItem("cart", JSON.stringify(cart));

      renderCheckout();
    });
  });

  /* Decrease Quantity */

  decreaseButtons.forEach(button => {

    button.addEventListener("click", () => {

      const index = button.dataset.index;

      if (cart[index].quantity > 1) {

        cart[index].quantity -= 1;

      } else {

        cart.splice(index, 1);
      }

      localStorage.setItem("cart", JSON.stringify(cart));

      renderCheckout();
    });
  });

  /* Remove Product */

  removeButtons.forEach(button => {

    button.addEventListener("click", () => {

      const index = button.dataset.index;

      cart.splice(index, 1);

      localStorage.setItem("cart", JSON.stringify(cart));

      renderCheckout();
    });
  });
}

/* =========================
   LOAD CHECKOUT
========================= */

renderCheckout();

/* =========================
   CONFIRM ORDER
========================= */

const confirmOrderBtn =
  document.getElementById("confirm-order-btn");

if (confirmOrderBtn) {

  confirmOrderBtn.addEventListener("click", () => {

    if (cart.length === 0) {

      alert("Your cart is empty.");

      return;
    }

    const successMessage =
      document.getElementById("success-message");

    successMessage.classList.remove("d-none");

    localStorage.removeItem("cart");

    cart = [];

    renderCheckout();

    setTimeout(() => {

      window.location.href = "purchases-history.html";

    }, 3000);
  });
}

/* ==================================================
   12. DISPLAY ORDER HISTORY
================================================== */

const historyTable =
  document.getElementById("history-table-body");

if (historyTable) {

  const orders =
    JSON.parse(localStorage.getItem("orders")) || [];

  historyTable.innerHTML = "";

  orders.forEach(order => {

    let products = "";

    order.items.forEach(item => {

      products += `
        ${item.name} x${item.quantity}<br>
      `;
    });

    historyTable.innerHTML += `

      <tr>

        <td>#${order.id}</td>

        <td>
          ${products}
        </td>

        <td>P${order.total.toFixed(2)}</td>

        <td>${order.date}</td>

        <td>

          <span class="badge bg-success">

            ${order.status}

          </span>

        </td>

      </tr>
    `;
  });
}
