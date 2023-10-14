// get all the buttons
const deleteButtons = document.querySelectorAll('.delete');
const buyButtons = document.querySelectorAll('.buy');
const quantityButtons = document.querySelectorAll('.buttons button');
const priceElements = document.querySelectorAll('.price[data-unitPrice]'); // Seleccionar todos los elementos de precio con data-unitPrice
var cartItems = {};

// add event listeners to the buttons
for (var i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener('click', deleteItem);
}

for (var i = 0; i < buyButtons.length; i++) {
    buyButtons[i].addEventListener('click', buyItem);
}

for (var i = 0; i < quantityButtons.length; i++) {
    quantityButtons[i].addEventListener('click', updateQuantity);
}

for (var i = 0; i < buyButtons.length; i++) {
    buyButtons[i].addEventListener('click', function (event) {
        // Encuentra el elemento del artículo
        var item = event.target.parentElement.parentElement;
        var itemName = item.querySelector('h3').textContent;
        var itemPrice = parseFloat(item.querySelector('.price').getAttribute('data-unitPrice'));
        var itemQuantity = parseInt(item.querySelector('.quantity').textContent, 10);

        // Verifica si el artículo ya está en el carrito
        if (cartItems[itemName]) {
            // Si ya existe en el carrito, actualiza la cantidad
            cartItems[itemName].quantity += itemQuantity;
        } else {
            // Si no existe, crea un nuevo elemento en el carrito
            cartItems[itemName] = {
                price: itemPrice,
                quantity: itemQuantity
            };
        }

        // Actualiza la lista de detalles de compra
        updateCartDetails();
    });
}

function calculateTotalPrice() {
    var total = 0;
    for (var itemName in cartItems) {
        var item = cartItems[itemName];
        total += item.price * item.quantity;
    }
    return total;
}

function updateTotalPrice(price) {
    var totalPriceElement = document.getElementById('total-price');
    var currentTotal = parseFloat(totalPriceElement.textContent.replace('$', ''));
    currentTotal += price;
    totalPriceElement.textContent = '$' + currentTotal.toFixed(2);
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

function updateCartDetails() {
    var cartDetails = document.getElementById('cart-details');
    cartDetails.innerHTML = ''; // Limpia la lista

    // Recorre los elementos del carrito y crea elementos para la lista de detalles de compra
    for (var itemName in cartItems) {
        var item = cartItems[itemName];
        var cartItem = document.createElement('div');
        cartItem.textContent = 'x' + item.quantity + ' ' + itemName;
        cartDetails.appendChild(cartItem);
    }

    // Calcula y actualiza el precio total
    var totalPrice = calculateTotalPrice();
    document.getElementById('total-price').textContent = '$' + totalPrice.toFixed(0);

    // Actualiza la cantidad total de productos
    var totalQuantity = calculateTotalQuantity();
    document.getElementById('total-items').textContent = totalQuantity;
}

// function to delete an item
function deleteItem(event) {
    var button = event.target;
    var item = button.parentElement.parentElement;
    item.remove();
}

// function to buy an item
function buyItem(event) {
    alert('Gracias por su compra!');
}

function updateQuantity(event) {
    var button = event.target;
    var item = button.parentElement.parentElement;
    var quantity = item.querySelector('.quantity');
    var value = parseInt(quantity.innerText, 10);

    if (button.classList.contains('increase')) {
        value++;
    } else if (button.classList.contains('decrease')) {
        value = Math.max(value - 1, 1); // Asegúrate de no disminuir la cantidad por debajo de 1
    }

    quantity.innerText = value;

    // Get the price unit from data-unitPrice attribute
    var unitPrice = parseFloat(item.querySelector('.price').getAttribute('data-unitPrice'));

    // Calculate and update the total price
    var totalPrice = unitPrice * value;
    item.querySelector('.price').innerText = '$' + totalPrice.toFixed(0);
    
    // Actualiza el resumen de compra
    updateCartDetails();
}

document.addEventListener('DOMContentLoaded', function () {
    // Obtén todos los elementos de precio
    var priceElements = document.querySelectorAll('.price');
    var cartItems = JSON.parse(localStorage.getItem('cart')) || {};

    // Recorre cada elemento de precio
    priceElements.forEach(function (priceElement) {
        // Obtén el precio unitario del atributo data-unitPrice
        var unitPrice = parseFloat(priceElement.getAttribute('data-unitPrice'));
        priceElement.querySelector('span').innerText = '$' + unitPrice.toFixed(0);
    });

    // Agrega elementos del carrito al resumen de compra y actualiza los totales
    for (var itemName in cartItems) {
        addItemToSummary(itemName, cartItems[itemName].quantity, cartItems[itemName].price);
    }

    updateTotal();
});

function addItemToSummary(name, quantity, unitPrice) {
    var cartDetails = document.getElementById('cart-details');
    var cartItems = cartDetails.children;
    
    for (var i = 0; i < cartItems.length; i++) {
        if (cartItems[i].textContent.includes(name)) {
            var currentItem = cartItems[i];
            var currentQuantity = parseInt(currentItem.textContent.split('x')[1], 10);
            currentQuantity += quantity;
            currentItem.textContent = 'x' + currentQuantity + ' ' + name;
            return;
        }
    }

    var cartItem = document.createElement('div');
    cartItem.textContent = 'x' + quantity + ' ' + name;
    cartDetails.appendChild(cartItem);
}

function updateTotal() {
    var cartDetails = document.getElementById('cart-details');
    var cartItems = cartDetails.children;
    var totalItems = 0;
    var totalPrice = 0;

    for (var i = 0; i < cartItems.length; i++) {
        var itemDetails = cartItems[i].textContent.split(' ');
        var quantity = parseInt(itemDetails[0].substring(1), 10);
        totalItems += quantity;

        var unitPrice = parseFloat(itemDetails[2]);
        totalPrice += quantity * unitPrice;
    }

    document.getElementById('total-items').textContent = totalItems;
    document.getElementById('total-price').textContent = '$' + totalPrice.toFixed(0);
}


function updateLocalStorage() {
    // Obtén el carrito actual del almacenamiento local (si existe)
    var currentCart = JSON.parse(localStorage.getItem('cart')) || {};

    // Ahora, actualiza el carrito con los cambios (en tu caso, cartItems)
    currentCart = cartItems; // Esto reemplaza el carrito actual con el nuevo carrito

    // Guarda el carrito actualizado en el almacenamiento local
    localStorage.setItem('cart', JSON.stringify(currentCart));
}


