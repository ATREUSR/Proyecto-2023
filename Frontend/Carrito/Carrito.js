// get all the buttons
const deleteButtons = document.querySelectorAll('.delete');
const buyButtons = document.querySelectorAll('.buy'); 
const quantityButtons = document.querySelectorAll('.buttons button'); 
const priceElements = document.querySelectorAll('.price[data-unitPrice]'); 
var cartItems = JSON.parse(localStorage.getItem('cart')) || {}; 
var input = document.getElementById("search_id");


function buscar() {
  var query = document.getElementById("search_id").value;

  if (query) {
    window.location.href = "../Buscar-productos/Buscar-productos.html=" + query;
  }
}

// Agregar el evento keydown
input.addEventListener("keydown", function(event) {
  // Verificar que la tecla presionada sea enter (código 13)
  if (event.key === 'Enter') {
    // Ejecutar la función buscar()
    buscar();
  }
});


for (var i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener('click', deleteItem);
}

for (var i = 0; i < buyButtons.length; i++) {
    buyButtons[i].addEventListener('click', buyItem);
}

for (var i = 0; i < quantityButtons.length; i++) {
    quantityButtons[i].addEventListener('click', updateQuantity);
}


function updateCartDetails() {
    var cartDetails = document.getElementById('cart-details');
    var emptyCartMessage = document.getElementById('empty-cart-message');
    var receipt = document.querySelector('.receipt'); 

    // Limpia la lista
    cartDetails.innerHTML = '';

    if (Object.keys(cartItems).length === 0) {
        emptyCartMessage.style.display = 'block'; 
        receipt.style.display = 'none'; 
    } else {
        emptyCartMessage.style.display = 'none'; 
        receipt.style.display = 'block'; 
    }

    for (var itemName in cartItems) {
        var item = cartItems[itemName];
        var cartItem = document.createElement('div');
        cartItem.textContent = `x${item.quantity} ${itemName} - Precio: $${item.price.toFixed(0)}`;
        cartDetails.appendChild(cartItem);
    }
}

for (var i = 0; i < buyButtons.length; i++) {
    buyButtons[i].addEventListener('click', function (event) {
        var item = event.target.parentElement.parentElement;
        var itemName = item.querySelector('h3').textContent;
        var itemPrice = parseFloat(item.querySelector('.price').getAttribute('data-unitPrice'));
        var itemQuantity = parseInt(item.querySelector('.quantity').textContent, 10);

        if (cartItems[itemName]) {
            cartItems[itemName].quantity += itemQuantity;
        } else {
            cartItems[itemName] = {
                price: itemPrice,
                quantity: itemQuantity
            };
        }
        updateCartDetails();
    });
}

function calculateTotalPrice() {
    var total = 0;
    for (var itemName in cartItems) {
        var item = cartItems[itemName];
        total += item.price;
    }
    return total;
}

function updateTotalPrice(price) {
    var totalPriceElement = document.getElementById('total-price');
    var currentTotal = parseFloat(totalPriceElement.textContent.replace('$', ''));
    currentTotal += price;
    totalPriceElement.textContent = '$' + currentTotal.toFixed(0);
}

function calculateTotalQuantity() {
    var total = 0;
    for (var itemName in cartItems) {
        var item = cartItems[itemName];
        total += item.quantity;
    }
    return total;
}

function updateTotalItems(quantity) {
    var totalItemsElement = document.getElementById('total-items');
    var currentQuantity = parseInt(totalItemsElement.textContent, 10);
    currentQuantity += quantity;
    totalItemsElement.textContent = currentQuantity;
}

function deleteItem(event) {
    var button = event.target;
    var item = button.parentElement.parentElement;
    var itemName = item.querySelector('h3').textContent;
    var itemPrice = parseFloat(item.querySelector('.price').getAttribute('data-unitPrice'));

    updateTotalPrice(-itemPrice);

    delete cartItems[itemName]; 

    item.remove();

    updateCartDetails();

    updateTotal();

    localStorage.setItem('cart', JSON.stringify(cartItems));
}


function buyItem(event) {
    alert('Gracias por su compra!');
}

document.addEventListener('DOMContentLoaded', function () {
    var priceElements = document.querySelectorAll('.price');
    cartItems = JSON.parse(localStorage.getItem('cart')) || {};
    var itemName;

    priceElements.forEach(function (priceElement) {
        var unitPrice = parseFloat(priceElement.getAttribute('data-unitPrice'));
        priceElement.querySelector('span').innerText = '$' + unitPrice.toFixed(0);

        var itemName = priceElement.parentElement.parentElement.querySelector('h3').textContent;
        addItemToSummary(itemName, 1, unitPrice);
    });

    quantityButtons.forEach(function (button) {
        var quantity = button.parentElement.querySelector('.quantity');
        quantity.setAttribute('data-quantity', quantity.innerText);
    });

    updateTotal();
    updateCartDetails();
    addDefaultQuantities(cartItems);

});

function addDefaultQuantities(cartItems) {
    var items = document.querySelectorAll('.item');
    for (var itemName in cartItems) {
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            var nameElement = item.querySelector('h3');
            if (nameElement.textContent === itemName) {
                var quantityElement = item.querySelector('.quantity');
                quantityElement.setAttribute('data-quantity', cartItems[itemName].quantity);
                addItemToSummary(itemName, cartItems[itemName].quantity, cartItems[itemName].price);
                break;
            }
        }
    }
}

function updateQuantity(event) {
    var button = event.target;
    var item = button.parentElement.parentElement;
    var quantity = item.querySelector('.quantity');
    var value = parseInt(quantity.innerText, 10);
    var unitPrice = parseFloat(item.querySelector('.price').getAttribute('data-unitPrice'));

    if (button.classList.contains('increase')) {
        value++;
    } else if (button.classList.contains('decrease')) {
        value = Math.max(1, value - 1);
    }

    quantity.innerText = value;
    quantity.setAttribute('data-quantity', value);

    var itemName = item.querySelector('h3').textContent;
    var itemPrice = value * unitPrice;
    updateItemInCart(itemName, value, itemPrice);
    updateTotal();
    updateCartDetails();
}

function updateItemInCart(itemName, quantity, itemPrice) {
    cartItems[itemName] = {
        price: itemPrice,
        quantity: quantity
    };
    localStorage.setItem('cart', JSON.stringify(cartItems));
}


function addItemToSummary(name, quantity, unitPrice) {
    var cartDetails = document.getElementById('cart-details');
    var cartItems = cartDetails.children;
    var found = false;

    for (var i = 0; i < cartItems.length; i++) {
        if (cartItems[i].textContent.includes(name)) {
            var currentItem = cartItems[i];
            var currentQuantity = parseInt(currentItem.textContent.split('x')[1], 10);
            currentQuantity += quantity; 
            currentItem.textContent = `x${quantity} ${name}`;
            found = true;
            break;
        }
    }

    if (!found) {
        var item = document.createElement('div');
        item.textContent = `x${quantity} ${name}`;
        cartDetails.appendChild(item);
    }
}

function updateTotal() {
    var totalItems = calculateTotalQuantity(); 
    var totalPrice = calculateTotalPrice(); 

    document.getElementById('total-items').textContent = totalItems;

    if (isNaN(totalPrice)) {
        totalPrice = 0; 
    }

    document.getElementById('total-price').textContent = '$' + totalPrice.toFixed(0);
}

function updateTotalItems(quantity) {
    var totalItemsElement = document.getElementById('total-items');
    var currentQuantity = parseInt(totalItemsElement.textContent, 10);

    if (isNaN(currentQuantity)) {
        currentQuantity = 0;
    }

    currentQuantity += quantity;
    totalItemsElement.textContent = currentQuantity;
}

function updateLocalStorage() {
    var currentCart = JSON.parse(localStorage.getItem('cart')) || {};

    currentCart = cartItems;

    // Guarda el carrito actualizado en el almacenamiento local
    localStorage.setItem('cart', JSON.stringify(currentCart));
}