const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnPopup = document.querySelector('.btnLogin-popup');
const iconClose = document.querySelector('.icon-close')
const emailInput = document.querySelectorAll('.input-box')[0].querySelector('input');
const passwordInput = document.querySelectorAll('.input-box')[1].querySelector('input');
const logIn = document.querySelectorAll('.btn')[0].querySelector('button');
const register = document.querySelectorAll('.btn')[1].querySelector('button');


registerLink.addEventListener('click', () => {
  wrapper.classList.add('active');
});

loginLink.addEventListener('click', () => {
  wrapper.classList.remove('active');
});

btnPopup.addEventListener('click', () => {
  wrapper.classList.add('active-popup');
});

iconClose.addEventListener('click', () => {
  wrapper.classList.remove('active-popup');
})
register.addEventListener('click', (e) => {
  e.preventDefault();
  e.stopPropagation();
  fetch('http://localhost:3000/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: 'nombre',
      surname: 'apellido',
      email: 'email',
      password: 'password',
      pfp_url: 'url de la foto de perfil',
      phone: 'telefono',
      address: 'direccion',
      company: 'true/false',
    })
  })
    .then(response => {
      return response.json()
    })
    .then(data => {
      console.log(data)
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
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: emailInput.value,
      password: passwordInput.value
    })
  })
    .then(response => {
      return response.json()
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
});