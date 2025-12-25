let cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];

var addedBurgers = [];


document.getElementById("count").innerText = localStorage.getItem("cartCount") ? parseInt(localStorage.getItem("cartCount")) : 0;


if (cart.length === 0) {
    document.getElementById('cart-items').innerHTML = "<img src='media/empty-cart.png' alt='Empty Cart' class='empty-cart-image'>";
} else {
    showCartItems();
}

async function showCartItems() {
    let Total = 0;
    const response = await fetch('Burgers.json');
    const burgers = await response.json();
    let bill = [];



    let body = document.getElementById('cart-items').innerHTML;
    cart.forEach(burgerId => {
        if (!(addedBurgers.includes(burgerId))) {
            addedBurgers.push(burgerId);
            


            burgers.forEach(burger => {
                if (burger.Id === burgerId) {

                    body += `
                    <div class="cart-item" id="item${burger.Id}">
                        <div class="item-image">
                            <img src="${burger.Path}" alt="${burger.Name}">
                        </div>
                        <div class="item-details">
                            <h3>${burger.Name}</h3>
                            <p class="item-description">Beef patty, lettuce, tomato, cheese</p>
                            <div class="item-price">Rs.${burger.Price}</div>
                        </div>
                        <div class="item-quantity">
                           <span> Qty:</span>
                            <input type="number" class="qty-input" value="1" min="1" id="qty${burger.Id}" readonly>
                            
                        </div>
                        <div class="item-total" id="itemTotal${burger.Id}">Rs.${(burger.Price).toFixed(2)}</div>
                        <button class="remove-btn" onclick="removeFromCart(${burger.Id})"><i class="fas fa-trash"></i></button>
                    </div>`;
                    Total += burger.Price;
                    console.log("qty" + burger.Id);
                }
                document.getElementById('cart-items').innerHTML = body;
                bill.push(burger.Id);
                bill.push(burger.Name);
                bill.push(1); // Initial quantity is 1

            });
        } else {
            addedBurgers.forEach(element => {
                if (element == burgerId) {
                    burgers.forEach(burger => {
                        if (burger.Id === burgerId) {
                            Total += burger.Price;
                        }
                    });         
                }
            });
           for(let i=0;i<bill.length;i+=3){
                if (bill[i] == burgerId) {
                    let index = bill.indexOf(bill[i]);
                    bill[index + 2] += 1; // Increase quantity
                }
            }
            document.getElementById("qty"+burgerId).value++;
            document.getElementById("itemTotal"+burgerId).innerText = `Rs.${(document.getElementById("qty"+burgerId).value * burgers.find(b => b.Id === burgerId).Price).toFixed(2)}`;
        }
        console.log(addedBurgers);
        console.log(cart);
        console.log("val :: "+document.getElementById("qty"+burgerId).value);

    });
   // document.getElementById('cart-items').innerHTML = body;
    document.getElementById('Subtotal').innerText = `Rs.${Total.toFixed(2)}`;
    document.getElementById('tax').innerText = `Rs.${(Total * 0.08).toFixed(2)}`;
    document.getElementById('total').innerText = `Rs.${(Total + (Total * 0.08) + 100).toFixed(2)}`;
    localStorage.setItem("bill", JSON.stringify(bill));
}

function checkout() {
    localStorage.setItem("cartCount", 0);
    document.getElementById("count").innerText = 0;
    window.open("bill.html", "_self");
}

function removeFromCart(burgerId) {
    cart = cart.filter(id => id !== burgerId);
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("cartCount", cart.length);
    document.getElementById("count").innerText = cart.length;
    if (cart.length === 0) {
        document.getElementById('cart-items').innerHTML = "<img src='media/empty-cart.png' alt='Empty Cart' class='empty-cart-image'>";
        document.getElementById('Subtotal').innerText = `Rs.0.00`;
        document.getElementById('tax').innerText = `Rs.0.00`;
        document.getElementById('total').innerText = `Rs.0.00`;
    }
    window.location.reload();
}

function increaseQuantity() {
    document.getElementById("qty1").value++;
}