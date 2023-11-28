let liked_container = document.querySelector(".liked-items");

var input = document.getElementById("search_id");


function buscar() {
  var query = document.getElementById("search_id").value;

  if (query) {
    window.location.href = "../Buscar-productos/Buscar-productos.html?=" + query;
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

document.addEventListener('DOMContentLoaded', () => {
  fetch('http://localhost:3000/liked', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response=> response.json())
    .then(data => {
      console.log(data.message);
      for (let i = 0; i < data.length; i++) {
        let item = data[i];
        let item_element = `
          <div class="liked-item" data-id="${item.id}">
            <img src="${item.Image}" alt="">
            <div class="item-info">
              <h3>${item.title}</h3>
              <p>${item.description}</p>
              <h3>$${item.price}</h3>
            </div>
            <div class="like-button">
              <ion-icon name="heart"></ion-icon>
            </div>
          </div>
        `;
        liked_container.insertAdjacentHTML('beforeend', item_element);  

        
        let likeButtons = document.querySelectorAll('.like-button');

        likeButtons.forEach(button => {
          button.addEventListener('click', () => {
          console.log("yeah");
          const likedItem = button.closest('.liked-item' );
          // Esta es la línea que hay que cambiar
          let item_id = button.parentElement.dataset.id;
          console.log(item_id);

          fetch('http://localhost:3000/dislike/' + item_id , {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json'
                }
              })
              .then(response => response.json())
              .then(data => {
                console.log(data.message);
                likedItem.remove();
                
              })
              .catch(error => console.error('Error:', error));    
      });
    })
      }
      
    })
    .catch(error => console.error('Error:', error));  
});