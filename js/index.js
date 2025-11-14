// let Data = {}; // Store fetched data
// const Card = document.getElementById("cards");
// const searchBar = document.getElementById("search-bar");

// // Function to display products
// function displayProducts(products) {
//     Card.innerHTML = "";

//     if (!products || products.length === 0) {
//         Card.innerHTML = "<p>No products found.</p>";
//         return;
//     }

//     products.forEach((item) => {
//         Card.innerHTML += `
//             <div class="card">
//                 <a href="/html/product.html?id=${item.id}">
//                     <img src="${item.thumbnail}" alt="${item.title}">
//                     <h2>${item.title}</h2>
//                     <p>Price: $${item.price}</p>
//                     <p>Rating: ⭐ ${item.rating}</p>
//                 </a>
//             </div>
//         `;
//     });
// }

// // Fetch products from API
// async function fetchData() {
//     try {
//         let response = await fetch("https://dummyjson.com/products");
//         Data = await response.json();
//         displayProducts(Data.products); // show all products initially
//     } catch (error) {
//         console.log("Error fetching data:", error);
//         Card.innerHTML = "<p>Failed to load products.</p>";
//     }
// }

// // Search bar functionality
// searchBar.addEventListener("input", (e) => {
//     const query = e.target.value.toLowerCase();
//     if (!Data.products) return;

//     const filteredProduct = Data.products.filter((product) =>
//         product.title.toLowerCase().includes(query)
//     );
//     displayProducts(filteredProduct);
// });

// // Call fetchData when page loads
// fetchData();












let Data = {}; 
const Card = document.getElementById("cards");
const searchBar = document.getElementById("search-bar");

function displayProducts(products) {
    Card.innerHTML = "";

    if (!products || products.length === 0) {
        Card.innerHTML = "<p>No products found.</p>";
        return;
    }

    products.forEach((item) => {
        Card.innerHTML += `
            <div class="card">
                <a href="/html/product.html?id=${item.id}">
                    <img src="${item.thumbnail}" alt="${item.title}">
                    <h2>${item.title}</h2>
                    <p>Price: $${item.price}</p>
                    <p>Rating: ⭐ ${item.rating}</p>
                </a>
            </div>
        `;
    });
}

// Fetch 


async function fetchData() {
    try {
        let response = await fetch("https://dummyjson.com/products");
        Data = await response.json();
        displayProducts(Data.products);
    } catch (error) {
        console.log("Error fetching data:", error);
        Card.innerHTML = "<p>Failed to load products.</p>";
    }
}

// category


function applyFilters() {
    let query = searchBar.value.toLowerCase();
    let selectedCategory = document.getElementById("category").value;

    let filteredProducts = Data.products.filter(p =>
                             selectedCategory === "all" ||
                             p.category.toLowerCase()===selectedCategory
                             ).filter(p => p.title.toLowerCase().includes(query)).map(p => p); 
                             displayProducts(filteredProducts);
         }

searchBar.addEventListener("input", applyFilters);
document.getElementById("category").addEventListener("change", applyFilters);

fetchData();
