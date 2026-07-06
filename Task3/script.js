const nameInput = document.getElementById("nameInput");
const priceInput = document.getElementById("priceInput");
const quantityInput = document.getElementById("quantityInput");
const addBtn = document.getElementById("addBtn");
const cartContainer = document.getElementById("cartContainer");
const totalDisplay = document.getElementById("totalDisplay");

let cart = []; 

// Add item
addBtn.addEventListener("click", addItem);

function addItem() {
    const name = nameInput.value.trim();
    const price = parseFloat(priceInput.value);
    const quantity = parseInt(quantityInput.value);

    // Validation
    if (
        name === "" ||
        isNaN(price) || price <= 0 ||
        isNaN(quantity) || quantity <= 0
    ) {
        alert("Please enter valid product data!");
        return;
    }

    const item = {
        id: Date.now(),
        name,
        price,
        quantity
    };

    cart.push(item);

    nameInput.value = "";
    priceInput.value = "";
    quantityInput.value = "";

    renderCart();
}

// Render cart
function renderCart() {
    cartContainer.innerHTML = "";

    cart.forEach(item => {

        const row = document.createElement("div");
        row.classList.add("cart-item");

        row.innerHTML = `
        <span>${item.name}</span>
        <span>$${item.price}</span>

        <div>
            <button class="minus small-btn">-</button>
            <span class="qty">${item.quantity}</span>
            <button class="plus small-btn">+</button>
        </div>

        <button class="remove-btn">✗</button>
        `;

        // Increase quantity
        row.querySelector(".plus").addEventListener("click", () => {
        updateQuantity(item.id, 1);
        });

        // Decrease quantity
        row.querySelector(".minus").addEventListener("click", () => {
        updateQuantity(item.id, -1);
        });

        // Remove item
        row.querySelector(".remove-btn").addEventListener("click", () => {
        removeItem(item.id);
        });

        cartContainer.appendChild(row);
    });

    calculateTotal();
}

// Update quantity
function updateQuantity(id, change) {
    cart = cart.map(item => {
        if (item.id === id) {
        const newQty = item.quantity + change;

        if (newQty <= 0) {
            return null; // سيتم حذفها
        }

        return { ...item, quantity: newQty };
        }
        return item;
    }).filter(Boolean);

    renderCart();
}

// Remove item
function removeItem(id) {
  cart = cart.filter(item => item.id !== id);
  renderCart();
}

// Calculate total
function calculateTotal() {
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
    });

    totalDisplay.textContent = `Total: $${total.toFixed(2)}`;
}

