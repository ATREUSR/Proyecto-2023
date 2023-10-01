var deleteButtons = document.querySelectorAll('.delete');
var buyButtons = document.querySelectorAll('.buy');
var decreaseButtons = document.querySelectorAll('.quantity button:first-of-type');
var increaseButtons = document.querySelectorAll('.quantity button:last-of-type');

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
    var quantity = item.querySelector('.quantity input');
    var value = parseInt(quantity.value, 10);

    value--;
    if (value < 1) {
        value = 1;
    }
    quantity.value = value;
}

// function to increase the quantity
function increaseQuantity(event) {
    var button = event.target;
    var item = button.parentElement.parentElement;
    var quantity = item.querySelector('.quantity input');
    var value = parseInt(quantity.value, 10);

    value++;
    quantity.value = value;
}