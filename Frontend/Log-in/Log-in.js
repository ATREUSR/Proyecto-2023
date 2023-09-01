const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnPopup = document.querySelector('.btnLogin-popup');
const iconClose = document.querySelector('.icon-close')
const emailInput = document.querySelectorAll('.input-box')[0].querySelector('input');
const passwordInput = document.querySelectorAll('.input-box')[1].querySelector('input');

registerLink.addEventListener('click', ()=>{
    wrapper.classList.add('active');
});

loginLink.addEventListener('click', ()=>{
    wrapper.classList.remove('active');
});

btnPopup.addEventListener('click', ()=>{
    wrapper.classList.add('active-popup');
    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body:({
            email: emailInput.value,
            password: passwordInput.value
        })
    })
})

iconClose.addEventListener('click', ()=>{
    wrapper.classList.remove('active-popup');
})