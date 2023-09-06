var slides = document.querySelectorAll('.slide');
var btns = document.querySelectorAll('.btn');
/*var slideId = button.dataset.postId;*/
let currentSlide = 0;

fetch('http://localhost:3000/user/${id}/home'),{
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

