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

itemContainers.forEach((itemContainer, index) => {
    itemContainer.addEventListener("click", () => {
        // Obtén el ID del producto (puedes usar el índice actual como ejemplo)
        const productId = index + 1; // Puedes ajustar esto según tus necesidades

        // Redirige a la página de publicación con el ID en la URL
        window.location.href = `http://localhost/Proyecto2023/Proyecto-2023/Frontend/Publicacion/Publicacion.html${productId}`;
    });
});



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

