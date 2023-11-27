const pfpInput = document.getElementById('profile-pfp-input_id');
const profileImage = document.getElementById('profile-image');
const deletebtn = document.getElementById('delete-button_id');
const confirmationBox = document.querySelector('.confirmation-box');
const cancelBtn = document.querySelector('.cancel-button');
const deleteBtnConfirmation = document.querySelector('.delete-button-confrimation');
const mypost = document.querySelector('.my-post');
var input = document.getElementById("search_id");


function buscar() {
  var query = document.getElementById("search_id").value;

  if (query) {
    window.location.href = "../Buscar-productos/Buscar-productos.html=" + query;
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

document.addEventListener("DOMContentLoaded", function () {
    const settingOptions = document.querySelectorAll(".setting-option");
    const settingContents = document.querySelectorAll(".setting-content");

    settingOptions[0].classList.add("active");

    settingContents[0].classList.add("active");

    settingOptions.forEach((option, index) => {
        option.addEventListener("click", () => {
            // Oculta todos los contenidos de ajustes
            settingContents.forEach(content => content.classList.remove("active"));

            // Resalta la opción seleccionada
            settingOptions.forEach(opt => opt.classList.remove("active"));
            option.classList.add("active");

            // Muestra solo el contenido correspondiente a la opción seleccionada
            settingContents[index].classList.add("active");
        });
    });
});

deletebtn.addEventListener('click', () => {
    confirmationBox.classList.add('active');
});

cancelBtn.addEventListener('click', () => {
    confirmationBox.classList.remove('active');
});

deleteBtnConfirmation.addEventListener('click', () => {
    mypost.remove();
    confirmationBox.classList.remove('active');
});

pfpInput.addEventListener('change', () => {
    const selectedFile = pfpInput.files[0];

    if (selectedFile) {
        // Lee el contenido del archivo como un objeto de datos URL
        const reader = new FileReader();

        reader.onload = function (e) {
            // Cambia la fuente de la imagen de perfil
            profileImage.src = e.target.result;
        };

        // Lee el contenido del archivo como un objeto de datos URL
        reader.readAsDataURL(selectedFile);
    }
});