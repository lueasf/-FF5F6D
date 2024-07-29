const colorLabels = [...document.querySelectorAll('.input-group label')]; // nodelist des labels genre #FF5F3D
const colorPickerInputs = [...document.querySelectorAll("input[type='color']")]; // nodelist des inputs de type color
const rangeLabelValue = document.querySelector('.orientation-value'); // input range pour l'orientation

const gradientData = { angle: 90, colors: ["#FF5F6D", "#FFC371"] }; // données de base pour le gradient


// FUNC 1 METTRE LES VALS À JOUR
function populateUI() {
    // maj des labels
    colorLabels[0].textContent = gradientData.colors[0];
    colorLabels[1].textContent = gradientData.colors[1]; 

    // maj des inputs meme si on ne les voit pas
    colorPickerInputs[0].value = gradientData.colors[0];
    colorPickerInputs[1].value = gradientData.colors[1]; 

    // maj de la couleur de fond des labels/inputs
    colorLabels[0].style.background = gradientData.colors[0];
    colorLabels[1].style.background = gradientData.colors[1]; 

    // maj de la couleur du fond du body
    document.body.style.background = `linear-gradient(${gradientData.angle}deg,${gradientData.colors[0]},${gradientData.colors[1]})`;

    // maj de l'angle
    rangeLabelValue.textContent = `${gradientData.angle}°`
}
populateUI();