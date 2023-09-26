alert("Este simulador es para calcular el precio de un locker para un edificio,con el 20% de dscto");

const locker = 210000;
const dscto = 0.2;
let numero;

function preciolocker() {
    while (isNaN(numero) || (numero === 0)) {
        let numlocker = prompt("Ingresa el número de locker que quieres cotizar");
        numero = parseInt(numlocker);

        if (isNaN(numero) || (numero === 0)){
            alert("Ingrese un número válido");
        }
    }

    let preciofinal = numero * locker * (1 -dscto);
    alert("El precio final de " + numero + " lockers menos el 20% de descuento es de: $ " + preciofinal);
}

preciolocker();

