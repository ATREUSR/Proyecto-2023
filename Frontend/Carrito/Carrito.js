// get all the buttons
const deleteButtons = document.querySelectorAll('.delete');
const buyButtons = document.querySelectorAll('.buy');
const quantityButtons = document.querySelectorAll('.buttons button');
const priceElements = document.querySelectorAll('.price[data-unitPrice]'); // Seleccionar todos los elementos de precio con data-unitPrice
var cartItems = JSON.parse(localStorage.getItem('cart')) || {};

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

function updateCartDetails() {
    var cartDetails = document.getElementById('cart-details');
    var emptyCartMessage = document.getElementById('empty-cart-message');
    var receipt = document.querySelector('.receipt'); // Selecciona el resumen de compra

    // Limpia la lista
    cartDetails.innerHTML = '';

    if (Object.keys(cartItems).length === 0) {
        emptyCartMessage.style.display = 'block'; // Muestra el mensaje
        receipt.style.display = 'none'; // Oculta el resumen de compra
    } else {
        emptyCartMessage.style.display = 'none'; // Oculta el mensaje
        receipt.style.display = 'block'; // Muestra el resumen de compra
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

// function to delete an item
function deleteItem(event) {
    var button = event.target;
    var item = button.parentElement.parentElement;
    var itemName = item.querySelector('h3').textContent;
    var itemPrice = parseFloat(item.querySelector('.price').getAttribute('data-unitPrice'));

    // Resta el precio del elemento que se va a eliminar del total
    updateTotalPrice(-itemPrice);

    delete cartItems[itemName]; // Elimina el elemento del carrito

    item.remove(); // Elimina el elemento de la interfaz

    updateCartDetails(); // Actualiza el resumen de compra

    updateTotal(); // Actualiza el total

    localStorage.setItem('cart', JSON.stringify(cartItems));
}

// function to buy an item
function buyItem(event) {
    alert('Gracias por su compra!');
}

document.addEventListener('DOMContentLoaded', function () {
    // Obtén todos los elementos de precio
    var priceElements = document.querySelectorAll('.price');
    cartItems = JSON.parse(localStorage.getItem('cart')) || {};

    // Agrega elementos del carrito al resumen de compra y actualiza los totales
    priceElements.forEach(function (priceElement) {
        var unitPrice = parseFloat(priceElement.getAttribute('data-unitPrice'));
        priceElement.querySelector('span').innerText = '$' + unitPrice.toFixed(0);

        // Agrega 1 de cada artículo al resumen de compra
        var itemName = priceElement.parentElement.parentElement.querySelector('h3').textContent;
        addItemToSummary(itemName, 1, unitPrice);
    });

    quantityButtons.forEach(function (button) {
        var quantity = button.parentElement.querySelector('.quantity');
        quantity.setAttribute('data-quantity', quantity.innerText);
    });

    updateTotal();
    updateCartDetails(); // Llama a esta función para mostrar los precios en los detalles de compra
    
    // Llama a la función correcta para agregar cantidades predeterminadas
    addDefaultQuantities(cartItems);

    updateItemInCart(itemName, value, itemPrice);
});

function addDefaultQuantities(cartItems) {
    var items = document.querySelectorAll('.item');
    for (var itemName in cartItems) {
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            var nameElement = item.querySelector('h3');
            if (nameElement.textContent === itemName) {
                var quantityElement = item.querySelector('.quantity');
                quantityElement.setAttribute('data-quantity', cartItems[itemName].quantity); // Set the data-quantity attribute to the default value
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
    updateCartDetails(); // Llama a la función para actualizar el resumen de compra
}

function updateItemInCart(itemName, quantity, itemPrice) {
    cartItems[itemName] = {
        price: itemPrice,
        quantity: quantity
    };
    localStorage.setItem('cart', JSON.stringify(cartItems)); // Actualiza el almacenamiento local
}

function addItemToSummary(name, quantity, unitPrice) {
    var cartDetails = document.getElementById('cart-details');
    var cartItems = cartDetails.children;
    var found = false;

    for (var i = 0; i < cartItems.length; i++) {
        if (cartItems[i].textContent.includes(name)) {
            var currentItem = cartItems[i];
            var currentQuantity = parseInt(currentItem.textContent.split('x')[1], 10);
            currentQuantity += quantity; // Update the quantity of the existing item
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
    var totalItems = calculateTotalQuantity(); // Calcula la cantidad total
    var totalPrice = calculateTotalPrice(); // Calcula el precio total

    // Actualiza la cantidad total de productos
    document.getElementById('total-items').textContent = totalItems;

    // Verifica si el contenido de totalPrice es NaN
    if (isNaN(totalPrice)) {
        totalPrice = 0; // Establece el precio total en 0 si es NaN
    }

    // Actualiza el precio total
    document.getElementById('total-price').textContent = '$' + totalPrice.toFixed(0);
}

function updateTotalItems(quantity) {
    var totalItemsElement = document.getElementById('total-items');
    var currentQuantity = parseInt(totalItemsElement.textContent, 10);

    // Verifica si el contenido de totalItemsElement es NaN
    if (isNaN(currentQuantity)) {
        currentQuantity = 0;
    }

    currentQuantity += quantity;
    totalItemsElement.textContent = currentQuantity;
}

function updateLocalStorage() {
    // Obtén el carrito actual del almacenamiento local (si existe)
    var currentCart = JSON.parse(localStorage.getItem('cart')) || {};

    // Ahora, actualiza el carrito con los cambios (en tu caso, cartItems)
    currentCart = cartItems; // Esto reemplaza el carrito actual con el nuevo carrito

    // Guarda el carrito actualizado en el almacenamiento local
    localStorage.setItem('cart', JSON.stringify(currentCart));
}