const wrapper = document.querySelector('.wrapper'); //Declaro una variable en la que voy a guardar el wrapper
const loginLink = document.querySelector('.login-link'); //Declaro una variable para guardar el boton/link que hara que cambia el wrapper de la pestaña de registrar a la de iniciar sesion
const registerLink = document.querySelector('.register-link'); //Declaro una variable para guardar el boton/link que hara que cambia el wrapper de la pestaña de iniciar sesion a la de registrar
const btnPopup = document.querySelector('.btnLogin-popup'); //Declaro una variable para guardar el boton que hara que aparezca el wrapper
const iconClose = document.querySelector('.icon-close') //Declaro una variable para guardar el boton que cerrara el wrapper
const email = document.querySelectorAll('.input-box')[0].querySelector('input'); //Declaro una variable para guardar lo puesto en el espacio de gmail del log in
const password = document.querySelectorAll('.input-box')[1].querySelector('input'); //Declaro una variable para guardar lo puesto en el espacio de contraseña del log in
const logIn = document.querySelectorAll('.btn')[0].querySelector('button'); //Declaro una variable para guardar el boton que confiramara el logueo
const register = document.querySelectorAll('.btn')[1].querySelector('button'); //Declaro una variable para guardar el boton que confirmara el registro
const nameInput = document.querySelectorAll('.input-box')[2].querySelector('input'); //Declaro una variable para guardar lo puesto en el espacio de nombre del Registro
const surnameInput = document.querySelectorAll('.input-box')[3].querySelector('input'); //Declaro una variable para guardar lo puesto en el espacio de apellido del Registro
const emailInput = document.querySelectorAll('.input-box')[4].querySelector('input'); //Declaro una variable para guardar lo puesto en el espacio de email del Registro
const phoneNumberInput = document.querySelectorAll('.input-box')[5].querySelector('input'); //ESTO HAY QUE SACARLO
const PasswordInput = document.querySelectorAll('.input-box')[6].querySelector('input'); //Declaro una variable para guardar lo puesto en el espacio de contraseña del Registro
const ConfirmPasswordInput = document.querySelectorAll('.input-box')[7].querySelector('input'); //ESTO NO NECECITO RECIBIRLO EN EL BACK, simplemente hace if (pasword1 != pasword2)
//agrega un dni imput.
//const passwordInput = document.querySelectorAll('.input-box')[5].querySelector('input');


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

register.addEventListener('click', (e) => {
  e.preventDefault();
  e.stopPropagation();
  fetch('http://localhost:3000/register', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      dni: dniInput.value,
      name: nameInput.value,
      surname: surnameInput.value,
      email: emailInput.value,
      password: passwordInput.value,
    })
  })
    .then(response => {
      return response.json()

    })
    .catch(error => {
      console.error(error)
    });
});

logIn.addEventListener('click', (e) => {
  e.preventDefault();
  e.stopPropagation();
  fetch('http://localhost:3000/login', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      password: password.value,
      email: email.value
    })
  })
    })
    .then(data => {
      console.log(data)
      if (data.success) {
        window.location.href = "http://localhost:3000/pagina-inicial";
      }
    })
    .catch(error => {
      console.error(error)
});

