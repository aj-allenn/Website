let Data=``;
let Card=document.getElementById("cards");

async function fetchData(){
    try{
        let response=await fetch("https://dummyjson.com/products");
        Data=await response.json();
        console.log(Data);
        Data.products.forEach((item)=> {
                Card.innerHTML+=`
                <div class="card">
                <a href="/html/product.html?id=${item.id}">
                    <img src="${item.thumbnail}" alt="${item.title}">
                    <h2>${item.title}</h2>
                    <p>Price: $${item.price}</p>
                    <p>Rating: ${item.rating}</p>
                    </a>
                </div> `;
        });            
        
    }
    catch(error){
        console.log("Error fetching data:", error);
    }
}


fetchData();

