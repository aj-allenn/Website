const params = new URLSearchParams(window.location.search);
const productId = params.get("id");
const productContainer = document.getElementById("product-details");

async function fetchProduct() {
    try {
        if (!productId) {
            productContainer.innerHTML = "<p>No product ID provided.</p>";
            return;
        }

        const response = await fetch(`https://dummyjson.com/products/${productId}`);
        const product = await response.json();

        productContainer.innerHTML = `
        <div class="product-page">
            <div class="gallery">
            ${product.images.map(img => `<img src="${img}" alt="${product.title}">`).join('')}
            <div class="actions">
                <button onclick="window.history.back()">ADD TO CART</button>  <button onclick="window.history.back()">BUY NOW</button>
            </div>
            </div>
            <div class="product-info">
                <h2>${product.title}</h2>
                <p><strong>Brand:</strong> ${product.brand}</p>
                <p><strong>Category:</strong> ${product.category}</p>
                <p><strong>Price:</strong> $${product.price}</p>
                <p><strong>Rating:</strong> ⭐ ${product.rating}</p>
                <p><strong>Description:</strong> ${product.description}</p>
             </div>
        </div>
        `;
    } catch (error) {
        console.error("Error fetching product details:", error);
        productContainer.innerHTML = "<p>Failed to load product details.</p>";
    }
}

fetchProduct();
