var slides = document.querySelectorAll('.slide');
var btns = document.querySelectorAll('.btn');
/*var slideId = button.dataset.postId;*/
let currentSlide = 0;

let items = document.querySelectorAll(".item-container");

/*fetch('http://localhost:3000/user/${id}/home'),{
    method : 'GET',
    headers : {
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify({
      id: id
    })
    .then(response => response.json())
    .then(data => {
      console.log(data.message);
    })
  }
  .then(response => response.json())
  .then(data => {
  console.log(data.message);
});
*/

/*itemContainer.forEach((itemContainer, index) => {
    itemContainer.addEventListener("click", () => {
        // Obtén el ID del producto (puedes usar el índice actual como ejemplo)
        const productId = index + 1; // Puedes ajustar esto según tus necesidades

        // Redirige a la página de publicación con el ID en la URL
        window.location.href = `http://localhost/Proyecto2023/Proyecto-2023/Frontend/Publicacion/Publicacion.html${productId}`;
    });
});
*/


//Toda las pusblicaciones van a tener una variable id. Por aca voy a hacer un foreach que va a pasar por todas las variables y se les va a asignar un id de la base de datos}. Les tiene que poner un id random, y si detecta, con un if, que un id es igual a otro, vuelve a cambiarlo por uno random. Luego se va a poner en cada variable del nombre, precio y demas el valor que guarda el id.

document.addEventListener('DOMContentLoaded', () => {
    /*
        let data = [
            {
              id: 1,
              name: "iPhone 13",
              desc: "Iphone con pixeles muertos",
              price: "4000"
            },
            {
                id: 2,
                name: "Samsung Galaxy S21",
                desc: "Smamsung con bateria defectuosa",
                price: "$3000"
              },
              // Más objetos con los datos de otros ítems
            ];
            */

            fetch('http://localhost:3000/random/2', {

            //el numero al final, despue se la barra, e: "/2" indica la cantidad de post que devuelve el fetch, ponerle la misma cantidad de productos que hagan falta en la pagina de inicio
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json'
                }
              })
              .then(response => response.json())
              .then(data => {
                console.log(data.message);
                for (let i = 0; i < data.length; i++) {
                  // Asignar el ID de cada objeto al atributo de datos item_id de cada elemento item-container
                  items[i].dataset.item_id = data[i].id;
              
                  // Seleccionar los elementos hijos de cada item-container que tienen las clases item-name, item-info y item-price
                  let name = items[i].querySelector(".item-name h3");
                  let info = items[i].querySelector(".item-info p");
                  let price = items[i].querySelector(".item-price h3");
              
                  // Asignarles los valores correspondientes de cada objeto usando el dataset
                  name.textContent = data[i].title;
                  info.textContent = data[i].description;
                  price.textContent = data[i].price;
                }
              })
              .catch(error => console.error('Error:', error));
});


var manualNav = function (manual) {
    slides.forEach((slide) => {
        slide.classList.remove('active');

        btns.forEach((btn) => {
            btn.classList.remove('active');
        });
    });

    slides[manual].classList.add('active');
    btns[manual].classList.add('active');
}

btns.forEach((btn, i) => {
    btn.addEventListener("click", () => {
        manualNav(i);
        currentSlide = i;
    });
});

slides[currentSlide].classList.add('active');
btns[currentSlide].classList.add('active');

var repeat = function (activeClass) {
    let active = document.getElementsByClassName('active')
    let i = 0;

    var repeater = () => {
        setTimeout(function () {
            [...active].forEach((activeSlide) => {
                activeSlide.classList.remove('active');
                btns[i].classList.remove('active');
            });

            i++;

            if (slides.length == i) {
                i = 0;
            }
            if (i >= slides.length) {
                return;
            }

            slides[i].classList.add('active');
            /*slides[1].addEventListener('click', ()=>{
                const url = "http://localhost:3000/post/${post.id}";
            });*/
            repeater();
        }, 5000);
    }
    repeater();
}
repeat();

