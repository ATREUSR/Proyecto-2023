const wrapper = document.querySelector('.wrapper'); //Declaro una variable en la que voy a guardar el wrapper
const loginLink = document.querySelector('.login-link'); //Declaro una variable para guardar el boton/link que hara que cambia el wrapper de la pestaña de registrar a la de iniciar sesion
const registerLink = document.querySelector('.register-link'); //Declaro una variable para guardar el boton/link que hara que cambia el wrapper de la pestaña de iniciar sesion a la de registrar
const btnPopup = document.querySelector('.btnLogin-popup'); //Declaro una variable para guardar el boton que hara que aparezca el wrapper
const iconClose = document.querySelector('.icon-close') //Declaro una variable para guardar el boton que cerrara el wrapper
const email = document.querySelectorAll('.input-box')[0].querySelector('input'); //Declaro una variable para guardar lo puesto en el espacio de gmail del log in
const password = document.querySelectorAll('.input-box')[1].querySelector('input'); //Declaro una variable para guardar lo puesto en el espacio de contraseña del log in
const logIn = document.querySelectorAll('.btn')[0]; //Declaro una variable para guardar el boton que confiramara el logueo
const register = document.querySelectorAll('.btn')[1] //Declaro una variable para guardar el boton que confirmara el registro
const nameInput = document.querySelectorAll('.input-box')[2].querySelector('input'); //Declaro una variable para guardar lo puesto en el espacio de nombre del Registro
const surnameInput = document.querySelectorAll('.input-box')[3].querySelector('input'); //Declaro una variable para guardar lo puesto en el espacio de apellido del Registro
const emailInput = document.querySelectorAll('.input-box')[4].querySelector('input'); //Declaro una variable para guardar lo puesto en el espacio de email del Registro
const passwordInput = document.querySelectorAll('.input-box')[5].querySelector('input'); //Declaro una variable para guardar lo puesto en el espacio de contraseña del Registro
const confirmPasswordInput = document.querySelectorAll('.input-box')[6].querySelector('input'); //Declaro una variable para guardar lo puesto en el espacio de confirmar contraseña del Registro

registerLink.addEventListener('click', () => {
  wrapper.classList.add('active'); //funcion que al clickear el boton para cambiar al registro, este efectivamente cambia a la pestaña de registro
});

loginLink.addEventListener('click', () => {
  wrapper.classList.remove('active'); //funcion que al clickear el boton para cambiar al log ig, este efectivamente cambia a la pestaña de log in
});

btnPopup.addEventListener('click', () => {
  wrapper.classList.add('active-popup'); //funcion que al tocar el boton de log in arriba a la derecha acriva el wrapper
});

iconClose.addEventListener('click', () => {
  wrapper.classList.remove('active-popup'); //boton que saca el wrapper
})

register.addEventListener('click', async (e) => {
  console.log("yeah register");

  if (passwordInput.value != confirmPasswordInput.value) {
    console.log('click');
    alert('Las contraseñas no coinciden');
    return;
  }
  e.preventDefault();
  e.stopPropagation();

  await fetch('http://localhost:3000/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: nameInput.value,
      surname: surnameInput.value,
      email: emailInput.value,
      password: passwordInput.value,
    })
  }).then(response => response.json())
    .then(data => { 
    console.log(data); 
    if (data.success) {
      window.location.href = "http://localhost:3000/pagina-inicial"; } } ) .catch( error => console.error( 'Error:', error ) );
})

logIn.addEventListener('click', async (e) => {
  console.log("yeah login");
  e.preventDefault();
  e.stopPropagation();

  await fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email.value,
      password: password.value,
    })
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      if (data.success) {
        window.location.href = "http://localhost:3000/pagina-inicial"; } } ).catch( error => console.error( 'Error:', error ) );
});
