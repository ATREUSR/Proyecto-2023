document.addEventListener("DOMContentLoaded", function () {
    const settingOptions = document.querySelectorAll(".setting-option");
    const settingContents = document.querySelectorAll(".setting-content");

    settingOptions[1].classList.add("active");

    settingContents[1].classList.add("active");

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













