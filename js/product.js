
// const queryString = window.location.search;
// const urlParams = new URLSearchParams(queryString);
// const productId = urlParams.get("id");


// const productContainer = document.getElementById("product");


// async function fetchProduct() {
//   try {
//     const res = await fetch(`https://dummyjson.com/products/${productId}`);
//     const product = await res.json();


//   const thumbnails = product.images.slice(0, 5)
//   .map((img, i) => 
//     `<img src="${img}" class="thumb-img" alt="thumb ${i}" onclick="changeMainImage('${img}', ${i})"/>`
//   ).join("");

    
//     productContainer.innerHTML = `
//       <div class="product-card">
//         <div class="image-section">
//           <div class="thumbs-container">
//             ${thumbnails}
//           </div>
//           <div class="main-image-container">
//             <img id="main-image" src="${product.thumbnail}" alt="${product.title}" />
//           </div>
//         </div>

//         <div class="product-info">
//           <h2>${product.title}</h2>
//           <p><strong>Price:</strong> $${product.price}</p>
//           <p><strong>Rating:</strong> ⭐ ${product.rating}</p>
//           <p><strong>Description:</strong> ${product.description}</p>
//           <p><strong>Brand:</strong> ${product.brand}</p>
//           <p><strong>Category:</strong> ${product.category}</p>

//           <div class="btn-container">
//             <button id="add-to-cart">ADD TO CART</button>
//             <button id="buy-now">BUY NOW</button>
//           </div>
//         </div>
//       </div>
//     `;

   
//     highlightThumbnail(0);

//   } catch (error) {
//     console.error("Error fetching product:", error);
//     productContainer.innerHTML = "<p>Failed to load product details.</p>";
//   }
// }


// function changeMainImage(src, index) {
//   document.getElementById("main-image").src = src;
//   highlightThumbnail(index);
// }


// function highlightThumbnail(activeIndex) {
//   const thumbs = document.querySelectorAll(".thumb-img");
//   thumbs.forEach((thumb, i) => {
//     thumb.classList.toggle("active-thumb", i === activeIndex);
//   });
// }

// fetchProduct();



















const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const productId = urlParams.get("id")

let products = document.getElementById("product");

async function display() {
  try {
    let response = await fetch(`https://dummyjson.com/products/${productId}`);
    let data = await response.json();
    const thumbnails = data.images
      .slice(0, 5)
      .map(
        (img, i) => `
          <img src="${img}" class="thumb-img" alt="thumb ${i}"
               onclick="changeMainImage('${img}', ${i})"/>
        `
      )
      .join("");
      
       const reviewsArray = Array.isArray(data.reviews) ? data.reviews : [];

    const reviewsHTML = reviewsArray.map(r => `
      <div class="review-card">
        <h4>${r.reviewerName || "Anonymous"}</h4>
        <p>⭐ ${r.rating}</p>
        <p>${r.comment || ""}</p>
        <p class="review-date">${new Date(r.date).toLocaleDateString()}</p>
      </div>
    `).join("");
    
    products.innerHTML = `
      <div class="product-card">
          <div class="image-section">
             <div class="thumbs-container">
               ${thumbnails}
             </div>
             <div class="main-image">
              <div class="main-image-container">
              <img id="main-image" src="${data.thumbnail}" alt="${data.title}" />
             
             <div class="btn-container">
               <button id="add-to-cart">ADD TO CART</button>
               <button id="buy-now">BUY NOW</button>
             </div>
            </div>
            </div>
          </div>

        <div class="product-info">
          <h2>${data.title}</h2>
          <p><strong>Price:</strong> $${data.price}</p>
          <p><strong>Rating:</strong> ⭐ ${data.rating}</p>
          <p><strong>Description:</strong> ${data.description}</p>
          <p><strong>Brand:</strong> ${data.brand}</p>
          <p><strong>Category:</strong> ${data.category}</p>
          <p><strong>Discount:</strong> ${data.discountPercentage}%</p>

          <div class="reviews-section">
            <h3>Customer Reviews</h3>
            ${reviewsHTML || "<p>No reviews yet.</p>"}
          </div>
          <div class="reviews-section">
            <h3>Customer Reviews</h3>
            ${reviewsHTML || "<p>No reviews yet.</p>"}
          </div>
        </div>
      </div>
    `;

    highlightThumbnail(0);


    const addToCartBtn = document.getElementById("add-to-cart");
    
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const isInCart = cart.some((item) => item.id == data.id);
    if (isInCart) {
      addToCartBtn.textContent = "VIEW CART";
    }

    addToCartBtn.addEventListener("click", () => {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      const productExists = cart.some((item) => item.id === data.id);

      if (!productExists) {
        cart.push({
          id: data.id,
          title: data.title,
          price: data.price,
          thumbnail: data.thumbnail,
          quantity: 1,
        });
        localStorage.setItem("cart", JSON.stringify(cart));
        addToCartBtn.textContent = "VIEW CART";
      } else {
        window.location.href = "cart.html";
      }
    });

  } catch (error) {
    console.error("Error fetching product:", error);
    products.innerHTML = "<p>Failed to load product details.</p>";
  }
}

function changeMainImage(src, index) {
  document.getElementById("main-image").src = src;
  highlightThumbnail(index);
}

function highlightThumbnail(activeIndex) {
  const thumbs = document.querySelectorAll(".thumb-img");
  thumbs.forEach((thumb, i) => {
    thumb.classList.toggle("active-thumb", i === activeIndex);
  });
}

display();


