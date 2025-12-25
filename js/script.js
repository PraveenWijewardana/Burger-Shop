let countCount = localStorage.getItem("cartCount") ? parseInt(localStorage.getItem("cartCount")) : 0;
let cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];

function addToCart(burgerId) {
    Swal.fire({
        title: "Added to cart   !",
        icon: "success",
        draggable: true
    });
    countCount++;
    updateCartCount();

    cart.push(burgerId);

    localStorage.setItem("cart", JSON.stringify(cart));
}

async function loadBurgers() {

    const response = await fetch('Burgers.json');
    const burgers = await response.json();

    let body = "";

    burgers.forEach(burger => {
        body += `
        <div class="product-card">
                <div class="product-image">
                    <img src="${burger.Path}" alt="Hot Chicken Burger">
                    <span class="price-badge">Rs.${burger.Price}</span>
                </div>
                <div class="product-info">
                    <h3>${burger.Name}</h3>
                    <div class="product-footer">
                        <div class="rating">
                            <i class="fas fa-star"></i>
                            <span>${burger.Rating}</span>
                        </div>
                        <div class="product-actions">
                            <button class="action-btn" onclick="addToCart(${burger.Id})"><i class="fas fa-plus"></i></button>
                            <button class="action-btn"><i class="fas fa-heart"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    document.getElementById('products').innerHTML = body;
}

function updateCartCount() {
    document.getElementById("count").innerText = countCount;
    localStorage.setItem("cartCount", countCount);
}


loadBurgers();
updateCartCount();