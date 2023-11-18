// Obtén el botón "Añadir al carrito" desde tu página de publicación
const addToCartButton = document.querySelector('.add-to-cart-button');

const home = document.getElementById("img-container_id");

home.addEventListener('click', () => {
    window.location.href = "http://localhost/Proyecto2023/Proyecto-2023/Frontend/Pagina-inicial/Pagina-inicial.html"
});

let urlParams = new URLSearchParams(window.location.search);
let item_id = urlParams.get("item_id");

document.addEventListener('DOMContentLoaded', () => {
    fetch("http://localhost:3000/post/" + item_id, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    })
    .then(response => response.json())
    .then(data => {
        // Obtener los elementos de la página de publicación que tienen los ID publicacion-name, publicacion-info, publicacion-price y publicacion-img
        let name = document.getElementById("publicacion-name");
        //let info = document.getElementById("publicacion-info");
        let price = document.getElementById("publicacion-price");
        //let img = document.getElementById("publicacion-img");

        // Asignarles los valores correspondientes de los datos del item
        name.textContent = data.title;
        //info.textContent = data.description;
        price.textContent = data.price;
        //img.src = data.image;
    })
    .catch(error => console.error("Error:", error));
});

// Agrega un evento de clic al botón "Añadir al carrito"
addToCartButton.addEventListener('click', addToCart);

function changeImage(event) {
    if (event.target.tagName === 'IMG') {
        var mainImage = document.querySelector('.image img');
        mainImage.src = event.target.src;
    }
}


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


