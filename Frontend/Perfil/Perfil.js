const pfpInput = document.getElementById('profile-pfp-input_id');
const profileImage = document.getElementById('profile-image');

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

pfpInput.addEventListener('change', function () {
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









