// js/home.js

document.addEventListener('DOMContentLoaded', async () => {
    const featuredProductGrid = document.getElementById('featured-product-grid');
    const loadingMessage = featuredProductGrid.querySelector('.loading-message');

    try {
        const products = await fetchProducts(); // Use the common fetchProducts function

        if (products.length > 0) {
            loadingMessage.style.display = 'none'; // Hide loading message

            // Select a few featured products (e.g., first 4 or a random selection)
            const featuredProducts = products.slice(0, 4); // Example: first 4 products

            featuredProducts.forEach(product => {
                const productCard = createProductCard(product); // Use common function
                featuredProductGrid.appendChild(productCard);
            });

            // Add event listeners for "Add to Cart" buttons
            featuredProductGrid.querySelectorAll('.btn-add-to-cart').forEach(button => {
                button.addEventListener('click', (event) => {
                    const productId = event.target.dataset.productId;
                    addToCart(productId); // Use common function
                    alert('Item added to cart!'); // Simple alert for confirmation
                });
            });

        } else {
            loadingMessage.textContent = 'No featured products available at the moment.';
        }
    } catch (error) {
        loadingMessage.textContent = 'Failed to load featured products.';
        loadingMessage.style.color = 'red';
        console.error('Error in home.js:', error);
    }
});