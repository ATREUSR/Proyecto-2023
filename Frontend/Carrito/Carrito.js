// get all the buttons
const deleteButtons = document.querySelectorAll('.delete');
const buyButtons = document.querySelectorAll('.buy');
const decreaseButtons = document.querySelectorAll('.buttons button:first-of-type');
const increaseButtons = document.querySelectorAll('.buttons button:last-of-type');
const priceElements = document.querySelectorAll('.price[data-unitPrice]'); // Seleccionar todos los elementos de precio con data-unitPrice
const priceElementsArray = Array.from(document.querySelectorAll('.price[data-unitPrice]'));
const unitPrices = priceElements.map((priceElement) => parseFloat(priceElement.getAttribute('data-unitPrice')));

// add event listeners to the buttons
for (var i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener('click', deleteItem);
}

for (var i = 0; i < buyButtons.length; i++) {
    buyButtons[i].addEventListener('click', buyItem);
}

for (var i = 0; i < increaseButtons.length; i++) {
    increaseButtons[i].addEventListener('click', increaseQuantity);
}

for (var i = 0; i < decreaseButtons.length; i++) {
    decreaseButtons[i].addEventListener('click', decreaseQuantity);
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

// function to decrease the quantity
function decreaseQuantity(event) {
    var button = event.target;
    var item = button.parentElement.parentElement;
    var quantity = item.querySelector('.quantity');
    var value = parseInt(quantity.innerText, 10);

    value--;
    if (value < 1) {
        value = 1;
    }
    quantity.innerText = value;

    // Get the price unit from data-unitPrice attribute
    var unitPrice = parseFloat(item.querySelector('.price').getAttribute('data-unitPrice'));

    // Calculate and update the total price
    var totalPrice = unitPrice * value;
    item.querySelector('.price').innerText = '$' + totalPrice.toFixed(0);
}

// function to increase the quantity
function increaseQuantity(event) {
    var button = event.target;
    var item = button.parentElement.parentElement;
    var quantity = item.querySelector('.quantity');
    var value = parseInt(quantity.innerText, 10);

    value++;
    quantity.innerText = value;

    // Get the price unit from data-unitPrice attribute
    var unitPrice = parseFloat(item.querySelector('.price').getAttribute('data-unitPrice'));

    // Calculate and update the total price
    var totalPrice = unitPrice * value;
    item.querySelector('.price').innerText = '$' + totalPrice.toFixed(0);
}

document.addEventListener('DOMContentLoaded', function () {
    // Obtén todos los elementos de precio
    var priceElements = document.querySelectorAll('.price');

    // Recorre cada elemento de precio
    priceElements.forEach(function (priceElement) {
        // Obtén el precio unitario del atributo data-unitPrice
        var unitPrice = parseFloat(priceElement.querySelector('span').getAttribute('data-unitPrice'));

        // Establece el contenido del div de precio en el formato deseado (por ejemplo, $3000)
        priceElement.querySelector('span').innerText = '$' + unitPrice.toFixed(0);
    });
});


