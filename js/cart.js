// const cartContainer = document.getElementById("cart-container");

// function loadCart() {
//   const cart = JSON.parse(localStorage.getItem("cart")) || [];

//   if (cart.length === 0) {
//     cartContainer.innerHTML = "<h2>Your cart is empty.</h2>";
//     return;
//   }

//   let html = `
//     <table class="cart-table">
//       <tr>
//         <th>Image</th>
//         <th>Title</th>
//         <th>Price</th>
//         <th>Qty</th>
//         <th>Total</th>
//         <th>Remove</th>
//       </tr>
//   `;

//   cart.forEach((item, index) => {
//     html += `
//       <tr>
//         <td><img src="${item.thumbnail}" class="cart-img"></td>
//         <td>${item.title}</td>
//         <td>$${item.price}</td>
//         <td>
//           <button onclick="changeQty(${index}, -1)">-</button>
//           ${item.quantity}
//           <button onclick="changeQty(${index}, 1)">+</button>
//         </td>
//         <td>$${item.price * item.quantity}</td>
//         <td><button onclick="removeItem(${index})">X</button></td>
//       </tr>
//     `;
//   });

//   html += `</table>`;

//   cartContainer.innerHTML = html;
// }

// function changeQty(index, amount) {
//   const cart = JSON.parse(localStorage.getItem("cart")) || [];
//   cart[index].quantity += amount;

//   if (cart[index].quantity <= 0) {
//     cart.splice(index, 1);
//   }

//   localStorage.setItem("cart", JSON.stringify(cart));
//   loadCart();
// }

// function removeItem(index) {
//   const cart = JSON.parse(localStorage.getItem("cart")) || [];
//   cart.splice(index, 1);

//   localStorage.setItem("cart", JSON.stringify(cart));
//   loadCart();
// }

// loadCart();




const cartItemsBox = document.getElementById("cart-items");
const priceBox = document.getElementById("price-box");

function loadCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        cartItemsBox.innerHTML = "<h2>Your cart is empty.</h2>";
        priceBox.innerHTML = "";
        return;
    }

    cartItemsBox.innerHTML = "";

    let totalPrice = 0;

    cart.forEach((item, index) => {
        totalPrice += item.price * item.quantity;

        cartItemsBox.innerHTML += `
            <div class="cart-item">
                <img src="${item.thumbnail}" class="cart-item-img">

                <div class="cart-details">
                    <h3 class="cart-title">${item.title}</h3>

                    <div class="price-section">
                        <span class="new-price">₹${item.price}</span>
                    </div>

                    <div class="qty-controls">
                        <button onclick="changeQty(${index}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="changeQty(${index}, 1)">+</button>
                    </div>
                </div>
            </div>
        `;
    });

    priceBox.innerHTML = `
        <div class="price-row"><span>Price</span><span>₹${totalPrice}</span></div>
        <div class="price-row"><span>Platform Fee</span><span>₹7</span></div>
        <div class="price-row total-amount">
            <span>Total Amount</span>
            <span>₹${totalPrice + 7}</span>
        </div>
    `;
}

function changeQty(index, amount) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart[index].quantity += amount;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

loadCart();
