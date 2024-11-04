const corte = prompt("Cuanto tenes para pagarme");

if (corte == "6000") {
    console.log("Tu corte está pagado, pronto te llegará tu turno con fecha");
} else if (corte == "3000") {
    console.log("El precio del corte es más elevado"); 
} else if (corte == "7000") {
    console.log("Ese sería el precio con corte de barba")
} else {
    console.log("Hablame por privado, y arreglamos el precio")
}