const colorLabels = [...document.querySelectorAll('.input-group label')]; // nodelist des labels genre #FF5F3D
const colorPickerInputs = [...document.querySelectorAll("input[type='color']")]; // nodelist des inputs de type color
const rangeLabelValue = document.querySelector('.orientation-value'); // input range pour l'orientation

const gradientData = { angle: 90, colors: ["#111111", "#2FC371"] }; // données de base pour le gradient


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

    adaptInputsColor();
}
populateUI();


// FUNC 2 CHANGER LA COULEUR DU TEXTE EN FUNC DU BG
// formule du YIQ : (red*299 + green*587 + blue*144) / 1000; luminosité
function adaptInputsColor(){
    colorLabels.forEach(label => {
        const hexColor = label.textContent.replace("#", ""); //on prends le txt du label sans le #
        const red = parseInt(hexColor.slice(0,2),16); // les 2 prem lettres du rouge et on les met de b16 à b10
        const green = parseInt(hexColor.slice(2,4),16);
        const blue = parseInt(hexColor.slice(4,6),16);

        const yiq = (red*299 + green*587 + blue*144) / 1000;

        if(yiq >= 128){
            label.style.color = "#111"; // si lumineux, lettres en noir
        }else {
            label.style.color = "#F1F1F1"; // sinon lettre en blanc
        }

    })
}

const rangeInput = document.querySelector(".inp-range");
rangeInput.addEventListener("input", handleOrientation);


// FUNC 3 GÉRER LE RANGE
function handleOrientation(){
    gradientData.angle = rangeInput.value;
    rangeLabelValue.textContent = `${gradientData.angle}°`;
    populateUI(); // pour modifier l'orientation
}


colorPickerInputs.forEach(input => input.addEventListener("input",colorInputModification));


// FUNC 4 MODIFIER LES COULEURS
function colorInputModification(e){
    const currentInput = e.target; // input qui a déclenché l'event
    const currentIndex = colorPickerInputs.indexOf(currentInput); // index de l'input trigger = 1 ou 2
    gradientData.colors[currentIndex] = currentInput.value.toUpperCase(); // maj de la couleur dans le tableau
    populateUI();
}


const copyBtn = document.querySelector(".copy-btn");
copyBtn.addEventListener("click", handleGradientCopy);
let lock = false;


// FUNC 5 COPIER LE GRAD
function handleGradientCopy(){
    const gradient = `linear-gradient(${gradientData.angle}deg,${gradientData.colors[0]},${gradientData.colors[1]}))`;
    navigator.clipboard.writeText(gradient); // meth pour copier dans le clipboard
}


const randomGradientBtn = document.querySelector(".random-btn");
randomGradientBtn.addEventListener("click", createRandomGradient);

// FUNC 6 CRÉER UN GRADIENT RANDOM
function createRandomGradient(){
    // avec une boucle for on 
    for(let i=0; i< colorLabels.length; i++) {
        // console.log(colorLabels.length);
        randomColor = `#${Math.floor(Math.random()* 16777215).toString(16)}`;
        gradientData.colors[i] = randomColor.toUpperCase();
    }
    populateUI();
}
// avec Math.random() entre 0 et 1, on multiplie par 16777215 pour avoir un nb entre 0 et FFFFFF.
// on prends la partie ent et on convertit en hexa.
// on met a jour les 2 couleurs et le tout.