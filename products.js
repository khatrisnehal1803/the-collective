// js/products.js

document.addEventListener('DOMContentLoaded', async () => {
    const allProductGrid = document.getElementById('all-product-grid');
    const loadingMessage = allProductGrid.querySelector('.loading-message');
    const categoryFilter = document.getElementById('category-filter');
    const brandFilter = document.getElementById('brand-filter');
    const sortBy = document.getElementById('sort-by');

    let currentProducts = []; // To store products after filtering/sorting

    try {
        const products = await fetchProducts(); // Use the common fetchProducts function
        if (products.length === 0) {
            loadingMessage.textContent = 'No products available.';
            return;
        }

        loadingMessage.style.display = 'none';

        // Populate brand filter options
        const uniqueBrands = [...new Set(products.map(p => p.brand))].sort();
        uniqueBrands.forEach(brand => {
            const option = document.createElement('option');
            option.value = brand;
            option.textContent = brand;
            brandFilter.appendChild(option);
        });

        // Get category from URL if present (e.g., from Home page category links)
        const urlParams = new URLSearchParams(window.location.search);
        const initialCategory = urlParams.get('category');
        if (initialCategory) {
            categoryFilter.value = initialCategory;
        }

        // Apply initial filters/sort and render
        applyFiltersAndSort();

        // Add event listeners for filters and sort
        categoryFilter.addEventListener('change', applyFiltersAndSort);
        brandFilter.addEventListener('change', applyFiltersAndSort);
        sortBy.addEventListener('change', applyFiltersAndSort);

    } catch (error) {
        loadingMessage.textContent = 'Failed to load products.';
        loadingMessage.style.color = 'red';
        console.error('Error in products.js:', error);
    }

    function applyFiltersAndSort() {
        let filteredProducts = [...allProducts]; // Start with all products

        // Apply category filter
        const selectedCategory = categoryFilter.value;
        if (selectedCategory !== 'all') {
            filteredProducts = filteredProducts.filter(p => p.category === selectedCategory);
        }

        // Apply brand filter
        const selectedBrand = brandFilter.value;
        if (selectedBrand !== 'all') {
            filteredProducts = filteredProducts.filter(p => p.brand === selectedBrand);
        }

        // Apply sorting
        const selectedSort = sortBy.value;
        if (selectedSort === 'price-asc') {
            filteredProducts.sort((a, b) => a.price - b.price);
        } else if (selectedSort === 'price-desc') {
            filteredProducts.sort((a, b) => b.price - a.price);
        } else if (selectedSort === 'name-asc') {
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        } else if (selectedSort === 'name-desc') {
            filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
        }
        // 'default' implies no specific sort, so order remains as filtered or initial

        currentProducts = filteredProducts; // Update current products
        renderProducts(currentProducts);
    }

    function renderProducts(productsToRender) {
        allProductGrid.innerHTML = ''; // Clear previous products

        if (productsToRender.length === 0) {
            allProductGrid.innerHTML = '<p class="loading-message">No products match your criteria.</p>';
            return;
        }

        productsToRender.forEach(product => {
            const productCard = createProductCard(product); // Use common function
            allProductGrid.appendChild(productCard);
        });

        // Add event listeners for "Add to Cart" buttons
        allProductGrid.querySelectorAll('.btn-add-to-cart').forEach(button => {
            button.addEventListener('click', (event) => {
                const productId = event.target.dataset.productId;
                addToCart(productId); // Use common function
                alert('Item added to cart!');
            });
        });
    }
});