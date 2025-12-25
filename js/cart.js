let cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
let Total = 0;

document.getElementById("count").innerText = localStorage.getItem("cartCount") ? parseInt(localStorage.getItem("cartCount")) : 0;


if (cart.length === 0) {
    document.getElementById('cart-items').innerHTML = "<img src='media/empty-cart.png' alt='Empty Cart' class='empty-cart-image'>";
} else {
    showCartItems();
}

async function showCartItems() {
    const response = await fetch('Burgers.json');
    const burgers = await response.json();


    let body = document.getElementById('cart-items').innerHTML;
    cart.forEach(burgerId => {
        burgers.forEach(burger => {
            if (burger.Id === burgerId) {

                body += `
                    <div class="cart-item">
                        <div class="item-image">
                            <img src="${burger.Path}" alt="${burger.Name}">
                        </div>
                        <div class="item-details">
                            <h3>${burger.Name}</h3>
                            <p class="item-description">Beef patty, lettuce, tomato, cheese</p>
                            <div class="item-price">Rs.${burger.Price}</div>
                        </div>
                        <div class="item-quantity">
                            <button class="qty-btn"><i class="fas fa-minus"></i></button>
                            <input type="number" class="qty-input" value="1" min="1">
                            <button class="qty-btn"><i class="fas fa-plus"></i></button>
                        </div>
                        <div class="item-total">Rs.${burger.Price}</div>
                        <button class="remove-btn"><i class="fas fa-trash"></i></button>
                    </div>`;
                    Total += burger.Price;
            }
        });
    });
    document.getElementById('cart-items').innerHTML = body;
    document.getElementById('Subtotal').innerText = `Rs.${Total.toFixed(2)}`;
    document.getElementById('tax').innerText = `Rs.${(Total * 0.08).toFixed(2)}`;
    document.getElementById('total').innerText = `Rs.${(Total+(Total * 0.08)+100).toFixed(2)}`;
}

function checkout() {
    localStorage.setItem("cartCount", 0);
    localStorage.setItem("cart",  JSON.stringify([]));
    document.getElementById("count").innerText = 0;
    window.open("bill.html", "_self");
}