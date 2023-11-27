var input = document.getElementById("search_id");

function buscar() {
  // Obtener el valor del input
  var query = document.getElementById("search_id").value;
  // Verificar que el valor no esté vacío
  if (query) {
    // Redirigir a la página Buscar-productos.html pasando el valor como parámetro
    window.location.href = "http://localhost/Proyecto2023/Proyecto-2023/Frontend/Buscar-productos/Buscar-productos.html?=" + query;
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

function filtrar() {
    // Obtener el valor buscado desde la URL
    var url = window.location.href;
    var query = url.split("=")[1]; // El valor buscado está después del signo =
    // Obtener la lista de items desde la base de datos
    fetch("http://localhost:3000/search?q=" + query, { // Usar la URL correcta
      method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
      // Filtrar los items que coincidan con el valor buscado
      var itemsFiltrados = data.filter(item => item.title.includes(query));
      // Mostrar los items filtrados en la página
      mostrar(itemsFiltrados);
    })
    .catch(error => console.error('Error:', error));    
}

function mostrar(items) {
    // Obtener el elemento section que tiene la lista de items
    var lista = document.getElementById("lista");
    // Vaciar el contenido del section
    lista.innerHTML = "";
    // Crear un elemento div con la clase items
    var divItems = document.createElement("div");
    divItems.className = "items";
    // Agregar el div al section
    lista.appendChild(divItems);
    // Recorrer cada item del array
    items.forEach(item => {
      // Crear un elemento div con la clase item
      var div = document.createElement("div");
      div.className = "item";
      // Asignar el ID de cada item al atributo de datos item_id del div
      div.dataset.item_id = item.id;
      // Crear el contenido del div usando los datos del item
      div.innerHTML = `
        <div class="item-image"><img src="${item.image}"></div>
        <div class="item-info">
          <div class="item-name"><h2>${item.title}</h2></div>
          <div class="item-desc"><p>${item.description}</p></div>
          <div class="item-price"><h2>$${item.price}</h2></div>
        </div>
      `;
      // Agregar el div al div de items
      divItems.appendChild(div);
    });

    let itemsClick = document.querySelectorAll(".item");
    // Agregar el evento de clic a cada item
    for (let item of itemsClick) {
      item.addEventListener("click", abrirPublicacion);
    }
}

document.addEventListener('DOMContentLoaded', filtrar);
  
function abrirPublicacion(event) {
    // Obtener el elemento al que se le agregó el evento de clic
    let item = event.currentTarget; // Cambiar event.target por event.currentTarget
  
    // Obtener el ID del item usando el atributo de datos item_id
    let item_id = item.dataset.item_id;
  
    // Abrir una nueva ventana con la URL de la página de publicación y el ID del item como parámetro
    window.location.href = "../Buscar-productos/Buscar-productos.html=" + query;
}