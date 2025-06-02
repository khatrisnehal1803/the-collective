// js/common.js

let allProducts = []; // Global variable to store all products once fetched

// Function to fetch product data from data.json
async function fetchProducts() {
    if (allProducts.length > 0) {
        return allProducts; // Return cached data if already fetched
    }
    try {
        const response = await fetch('data.json'); // Path relative to HTML file
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        allProducts = await response.json();
        return allProducts;
    } catch (error) {
        console.error("Could not fetch products:", error);
        return []; // Return empty array on error
    }
}

// --- Cart Management Functions (using localStorage) ---

function getCart() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount(); // Update the cart count whenever cart changes
}

function addToCart(productId) {
    const cart = getCart();
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        const product = allProducts.find(p => p.id === productId);
        if (product) {
            cart.push({ ...product, quantity: 1 });
        } else {
            console.error(`Product with ID ${productId} not found!`);
        }
    }
    saveCart(cart);
}

function updateCartItemQuantity(productId, newQuantity) {
    let cart = getCart();
    const itemIndex = cart.findIndex(item => item.id === productId);

    if (itemIndex > -1) {
        if (newQuantity <= 0) {
            cart.splice(itemIndex, 1); // Remove if quantity is 0 or less
        } else {
            cart[itemIndex].quantity = newQuantity;
        }
    }
    saveCart(cart);
}

function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
}

function calculateCartTotal() {
    const cart = getCart();
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Function to update cart count display in header
function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        const cart = getCart();
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountElement.textContent = totalItems;
        cartCountElement.style.display = totalItems > 0 ? 'flex' : 'none'; // Show/hide
    }
}

// Function to create a product card HTML element
function createProductCard(product) {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');

    productCard.innerHTML = `
        <a href="product-details.html?id=${product.id}" class="product-link">
            <div class="product-image-container">
                <img src="${product.imageUrl}" alt="${product.name}" class="product-image">
            </div>
            <div class="product-info">
                <p class="product-brand">${product.brand}</p>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-price">${product.currency} ${product.price.toLocaleString('en-IN')}</p>
            </div>
        </a>
        <button class="btn-add-to-cart" data-product-id="${product.id}">Add to Cart</button>
    `;
    return productCard;
}

// Initialize cart count on every page load
document.addEventListener('DOMContentLoaded', updateCartCount);