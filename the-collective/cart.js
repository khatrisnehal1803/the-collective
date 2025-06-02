// js/cart.js

document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartSummary = document.getElementById('cart-summary');
    const cartSubtotal = document.getElementById('cart-subtotal');
    const emptyCartMessage = document.getElementById('empty-cart-message');
    const checkoutButton = document.getElementById('checkout-button');

    renderCart();

    function renderCart() {
        const cart = getCart(); // Get cart from common.js
        cartItemsContainer.innerHTML = ''; // Clear existing items

        if (cart.length === 0) {
            emptyCartMessage.style.display = 'block';
            cartSummary.style.display = 'none';
            return;
        } else {
            emptyCartMessage.style.display = 'none';
            cartSummary.style.display = 'block';
        }

        cart.forEach(item => {
            const cartItemDiv = document.createElement('div');
            cartItemDiv.classList.add('cart-item');
            cartItemDiv.dataset.productId = item.id;

            cartItemDiv.innerHTML = `
                <img src="${item.imageUrl}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <h3 class="cart-item-name">${item.name}</h3>
                    <p class="cart-item-brand">${item.brand}</p>
                    <p class="cart-item-price">${item.currency} ${(item.price * item.quantity).toLocaleString('en-IN')}</p>
                </div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn decrement-qty" data-id="${item.id}">-</button>
                    <input type="number" value="${item.quantity}" min="1" class="quantity-input" data-id="${item.id}">
                    <button class="quantity-btn increment-qty" data-id="${item.id}">+</button>
                </div>
                <button class="remove-item-btn" data-id="${item.id}">Remove</button>
            `;
            cartItemsContainer.appendChild(cartItemDiv);
        });

        updateCartTotals();
        attachEventListeners();
    }

    function updateCartTotals() {
        const total = calculateCartTotal(); // Get total from common.js
        cartSubtotal.textContent = `₹${total.toLocaleString('en-IN')}`;
    }

    function attachEventListeners() {
        // Quantity buttons
        cartItemsContainer.querySelectorAll('.decrement-qty').forEach(button => {
            button.addEventListener('click', (event) => {
                const productId = event.target.dataset.id;
                const input = event.target.nextElementSibling; // The input field
                let newQty = parseInt(input.value) - 1;
                updateCartItemQuantity(productId, newQty);
                renderCart(); // Re-render cart to update display
            });
        });

        cartItemsContainer.querySelectorAll('.increment-qty').forEach(button => {
            button.addEventListener('click', (event) => {
                const productId = event.target.dataset.id;
                const input = event.target.previousElementSibling; // The input field
                let newQty = parseInt(input.value) + 1;
                updateCartItemQuantity(productId, newQty);
                renderCart();
            });
        });

        // Input field quantity change (optional, can just rely on buttons)
        cartItemsContainer.querySelectorAll('.quantity-input').forEach(input => {
            input.addEventListener('change', (event) => {
                const productId = event.target.dataset.id;
                let newQty = parseInt(event.target.value);
                if (isNaN(newQty) || newQty < 1) newQty = 1; // Ensure valid number
                updateCartItemQuantity(productId, newQty);
                renderCart();
            });
        });


        // Remove item buttons
        cartItemsContainer.querySelectorAll('.remove-item-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                const productId = event.target.dataset.id;
                removeFromCart(productId); // Use common function
                renderCart(); // Re-render cart to update display
            });
        });

        // Checkout button (placeholder)
        checkoutButton.addEventListener('click', () => {
            const cart = getCart();
            if (cart.length > 0) {
                alert('Proceeding to checkout! (This is a placeholder)');
                // In a real app, this would redirect to a checkout page,
                // potentially clear cart, send order to backend, etc.
                // localStorage.removeItem('cart'); // Clear cart after checkout
                // renderCart();
            } else {
                alert('Your cart is empty. Please add items before checking out.');
            }
        });
    }
});