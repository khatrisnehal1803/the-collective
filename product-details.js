// js/product-details.js

document.addEventListener('DOMContentLoaded', async () => {
    const productDetailsContainer = document.getElementById('product-details-container');
    const loadingMessage = productDetailsContainer.querySelector('.loading-message');

    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (!productId) {
        productDetailsContainer.innerHTML = '<p class="loading-message error">No product ID specified.</p>';
        return;
    }

    try {
        const products = await fetchProducts(); // Use the common fetchProducts function
        const product = products.find(p => p.id === productId);

        if (product) {
            loadingMessage.style.display = 'none'; // Hide loading message
            productDetailsContainer.innerHTML = `
                <div class="product-details-image">
                    <img src="${product.imageUrl}" alt="${product.name}">
                </div>
                <div class="product-details-content">
                    <p class="product-details-brand">${product.brand}</p>
                    <h1 class="product-details-name">${product.name}</h1>
                    <p class="product-details-price">${product.currency} ${product.price.toLocaleString('en-IN')}</p>
                    <p class="product-details-description">${product.description}</p>
                    <button class="btn-add-to-cart-details" data-product-id="${product.id}">Add to Cart</button>
                </div>
            `;

            // Add event listener for the "Add to Cart" button on this page
            document.querySelector('.btn-add-to-cart-details').addEventListener('click', (event) => {
                const id = event.target.dataset.productId;
                addToCart(id); // Use common function
                alert('Item added to cart!');
            });

        } else {
            productDetailsContainer.innerHTML = `<p class="loading-message error">Product not found for ID: ${productId}</p>`;
        }
    } catch (error) {
        productDetailsContainer.innerHTML = `<p class="loading-message error">Failed to load product details.</p>`;
        console.error('Error in product-details.js:', error);
    }
});