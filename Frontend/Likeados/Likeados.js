// Obtiene todos los elementos "like-button"
const likeButtons = document.querySelectorAll('.like-button');

// Agrega un oyente de eventos a cada botón
likeButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Obtiene el elemento "liked-item" padre
        const likedItem = button.closest('.liked-item');

        // Obtiene el data-id del elemento "liked-item"
        const itemId = likedItem.getAttribute('data-id');

        // Realiza una acción para eliminar el elemento de la lista (aquí solo lo oculto)
        likedItem.style.display = 'none';

        // Puedes enviar una solicitud al servidor para eliminar el artículo de la lista en tu base de datos
        // o realizar cualquier otra acción que desees.
    });
})