var slides = document.querySelectorAll('.slide');
var btns = document.querySelectorAll('.btn');
/*var slideId = button.dataset.postId;*/
let currentSlide = 0;

const itemContainer = document.querySelectorAll('item-container');
const nameElements = document.querySelectorAll('.item-name[data-name]');
const descElements = document.querySelectorAll('.item-info[data-desc]');
const priceElements = document.querySelectorAll('.item-price[data-price]');

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

itemContainer.forEach((itemContainer, index) => {
    itemContainer.addEventListener("click", () => {
        // Obtén el ID del producto (puedes usar el índice actual como ejemplo)
        const productId = index + 1; // Puedes ajustar esto según tus necesidades

        // Redirige a la página de publicación con el ID en la URL
        window.location.href = `http://localhost/Proyecto2023/Proyecto-2023/Frontend/Publicacion/Publicacion.html${productId}`;
    });
});



//en el html tieve que haber una variable como las de precio que va a guardar un id. El atributo de este id va a ser asignado aca. Ylos valkores de nombre y demas van a ser los que encuentre en ese id. Osea que el valor de los atributos sera el del valor que tenga el id de esos atributos. Va a habr un for que revise cada item preguntado por su id y rellenando los valors con sus id values.

document.addEventListener('DOMContentLoaded', () => {

    const specificPriceElement = document.querySelector('.item-price[data-price="5000"]');
    const specificNameElement = document.querySelector('.item-name[data-name="Iphone 14"]');
    const specificDescElement = document.querySelector('.item-info[data-desc="Iphone 14 con pixeles muertos"]');

    priceElements.forEach(function (priceElement) {
        var unitPrice = parseFloat(priceElement.getAttribute('data-price'));
        priceElement.querySelector('h3').innerText = '$' + unitPrice.toFixed(0);
    });  

    nameElements.forEach(function (nameElement){
        var uniteName = nameElement.getAttribute('data-name');
        nameElement.querySelector('h3').innerText = uniteName;
    });

    descElements.forEach(function (descElement){
        var uniteDesc = descElement.getAttribute('data-desc');
        descElement.querySelector('p').innerText = uniteDesc;
    });

    if (specificPriceElement) {
        // Cambia el valor del data-price
        specificPriceElement.setAttribute('data-price', '6000');

        // Obtiene el nuevo valor y lo muestra en el elemento
        var newUnitPrice = parseFloat(specificPriceElement.getAttribute('data-price'));
        specificPriceElement.querySelector('h3').innerText = '$' + newUnitPrice.toFixed(0);
    }

    if (specificNameElement) {
        // Cambia el valor del data-price
        specificNameElement.setAttribute('data-name', 'samsung');

        // Obtiene el nuevo valor y lo muestra en el elemento
        var newUnitName = specificNameElement.getAttribute('data-name')
        specificNameElement.querySelector('h3').innerText = newUnitName;
    }

    if (specificDescElement) {
        // Cambia el valor del data-price
        specificDescElement.setAttribute('data-desc', 'S21 con pantalla rota');

        // Obtiene el nuevo valor y lo muestra en el elemento
        var newUnitDesc = specificDescElement.getAttribute('data-desc')
        specificDescElement.querySelector('p').innerText = newUnitDesc;
    }
});

function changeInfo(item)
{
    item = document.querySelectorAll('item-container');
}

var manualNav = function(manual){
    slides.forEach((slide) => {
        slide.classList.remove('active');

        btns.forEach((btn) =>{
            btn.classList.remove('active');
        });
    });

    slides[manual].classList.add('active');
    btns[manual].classList.add('active');
}

btns.forEach((btn, i) =>{
    btn.addEventListener("click", () =>{
        manualNav(i);
        currentSlide = i;
    });
});

slides[currentSlide].classList.add('active');
btns[currentSlide].classList.add('active');

var repeat = function(activeClass){
    let active = document.getElementsByClassName('active')
    let i = 0;

    var repeater = () => {
        setTimeout(function(){
            [...active].forEach((activeSlide) =>{
                activeSlide.classList.remove('active');
                btns[i].classList.remove('active');
            });

            i++;

            if(slides.length == i){
                i = 0;
            }
            if(i >= slides.length){
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

