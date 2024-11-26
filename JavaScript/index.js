// Objeto Persona
class Persona {
    constructor(nombre, peso, altura) {
        this.nombre = nombre;
        this.peso = peso; // en kg
        this.altura = altura; // en metros
    }

    calcularIMC() {
        return (this.peso / (this.altura ** 2)).toFixed(2);
    }

    calcularKcalDiarias() {
        return (22 * this.peso).toFixed(2);
    }

    obtenerRecomendacionAlimentos() {
        const imc = this.calcularIMC();
        if (imc < 18.5) {
            return "Recomendación: Aumenta tu ingesta calórica con alimentos ricos en proteínas y carbohidratos saludables (arroz, pasta, frutas, etc.).";
        } else if (imc >= 18.5 && imc <= 24.9) {
            return "Recomendación: Mantén una dieta balanceada con frutas, verduras, proteínas magras y granos integrales.";
        } else {
            return "Recomendación: Reduce los azúcares y grasas, e incluye más verduras, proteínas magras y fibras en tu dieta.";
        }
    }
}

function obtenerDatosPersona() {
    const nombre = prompt("Ingrese su nombre");
    const peso = parseFloat(prompt("Ingrese su peso en kg"));
    const altura = parseFloat(prompt("Ingrese su altura en metros"));

    return new Persona(nombre, peso, altura);
}

function mostrarResultadosNutricionales() {
    const persona = obtenerDatosPersona();
    const imc = persona.calcularIMC();
    const kcalDiarias = persona.calcularKcalDiarias();
    const recomendacion = persona.obtenerRecomendacionAlimentos();

    alert(`Nombre: ${persona.nombre}\nIMC: ${imc}\nCalorías Diarias Recomendadas: ${kcalDiarias} kcal\n${recomendacion}`);
}

// INICIO
const opciones = "1- Calcular IMC y Calorías, 2- Salir";
let opcion = parseInt(prompt(opciones));

while (opcion !== 2) {
    if (opcion === 1) {
        mostrarResultadosNutricionales();
    } else {
        alert("Opción inválida");
    }

    opcion = parseInt(prompt(opciones));
}

alert("Gracias por usar la calculadora nutricional");
