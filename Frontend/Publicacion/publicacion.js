// Obtén el botón "Añadir al carrito" desde tu página de publicación
const addToCartButton = document.querySelector('.add-to-cart-button');

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


addToCartButton.addEventListener('click', () => {
    alert("Añadido al carrito");
});

function changeImage(event) {
    if (event.target.tagName === 'IMG') {
        var mainImage = document.querySelector('.image img');
        mainImage.src = event.target.src;
    }
}





