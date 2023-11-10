// Obtén el botón "Añadir al carrito" desde tu página de publicación
const addToCartButton = document.querySelector('.add-to-cart-button');

// Agrega un evento de clic al botón "Añadir al carrito"
addToCartButton.addEventListener('click', addToCart);



// Función para manejar el evento de clic en "Añadir al carrito"
function addToCart(event) {
    // Obtén la información del producto desde la página de publicación
    const productName = document.querySelector('.item-name').textContent;
    const productPrice = parseFloat(document.querySelector('.price').textContent.replace('$', ''));

    // Crea un objeto representando el producto
    const product = {
        name: productName,
        price: productPrice,
        quantity: 1, // Puedes ajustar esto según tus necesidades
    };

    // Obtén el carrito actual del almacenamiento local (si existe)
    const currentCart = JSON.parse(localStorage.getItem('cart')) || {};

    // Agrega el producto al carrito actual o actualiza la cantidad si ya existe
    if (currentCart[productName]) {
        currentCart[productName].quantity += 1;
    } else {
        currentCart[productName] = product;
    }

    // Guarda el carrito actualizado en el almacenamiento local
    localStorage.setItem('cart', JSON.stringify(currentCart));

    // Opcional: Puedes mostrar un mensaje de éxito o realizar otras acciones
    alert('Producto añadido al carrito');

    // Nota: Si deseas redirigir al usuario a la página del carrito, puedes hacerlo así:
    // window.location.href = 'ruta-a-tu-pagina-de-carrito.html';
}


