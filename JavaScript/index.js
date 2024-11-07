function calcularIMC(peso, altura) {
    return peso / (altura * altura);
}

function clasificarIMC(imc) {
    if (imc < 18.5) {
        return "Bajo peso";
    } else if (imc >= 18.5 && imc < 24.9) {
        return "Peso normal";
    } else if (imc >= 25 && imc < 29.9) {
        return "Sobrepeso";
    } else {
        return "Obesidad";
    }
}

function iniciarCalculoIMC() {
    const peso = parseFloat(prompt("Ingresa tu peso en kg:"));
    const altura = parseFloat(prompt("Ingresa tu altura en metros (por ejemplo, 1.75):"));

    if (isNaN(peso) || isNaN(altura) || peso <= 0 || altura <= 0) {
        console.log("Por favor, ingresa valores válidos para peso y altura.");
        return;
    }

    const imc = calcularIMC(peso, altura);
    const clasificacion = clasificarIMC(imc);

    
    console.log(`Tu IMC es ${imc.toFixed(2)}`);
    console.log(`Clasificación: ${clasificacion}`);


    switch (clasificacion) {
        case "Bajo peso":
            console.log("Es recomendable que ganes un poco de peso para mejorar tu salud.");
            break;
        case "Peso normal":
            console.log("Tienes un peso saludable. ¡Sigue así!");
            break;
        case "Sobrepeso":
            console.log("Considera adoptar un estilo de vida saludable para mejorar tu IMC.");
            break;
        case "Obesidad":
            console.log("Es importante que consultes a un profesional para mejorar tu salud.");
            break;
        default:
            console.log("Error en la clasificación.");
    }
}

iniciarCalculoIMC();