alert("¡Bienvenido al sistema de arriendo de canchas!")
const reservas = {};

function mostrarmenu() {
    let opcion;
    do {
        opcion = prompt("Selecciona una opción:\n\n1. Reservar canchas\n2. Mostrar reservas\n3. Modificar reserva\n4. Cancelar reserva\n5. Salir");

        switch (opcion) {
            case "1":
                reservarcanchas();
                break;
            case "2":
                mostrarreservas();
                break;
            case "3":
                modificarreserva();
                break;
            case "4":
                cancelarreserva();
                break;
            case "5":
                alert("¡Hasta luego! Vuelve pronto.");
                break;
            default:
                alert("Por favor selecciona una opción válida");
        }
    } while (opcion !== "5");
}

function mostrarhorarios() {
    const horarios = ['09:00 a 10:00', '11:00 a 12:00', '13:00 a 14:00', '15:00 a 16:00', '17:00 a 18:00', '19:00 a 20:00', '21.00 a 22:00'];
    let horarioslistado = "Selecciona un horario:\n\n";
    for (let i = 0; i < horarios.length; i++) {
        horarioslistado += `${i + 1}. ${horarios[i]}\n`;
    }
    const seleccionhorario = parseInt(prompt(horarioslistado));
    if (seleccionhorario >= 1 && seleccionhorario <= horarios.length) {
        return horarios[seleccionhorario - 1];
    } else {
        alert("Opción de horario inválida. Por favor, selecciona un horario válido.");
        return mostrarhorarios();
    }
}

function reservarcanchas() {
    const horarioseleccionado = mostrarhorarios();
    const numeroreserva = Object.keys(reservas).length + 1;
    reservas[numeroreserva] = horarioseleccionado;
    alert(`Has reservado una cancha para el horario ${horarioseleccionado}. Número de reserva: ${numeroreserva}`);
}

function mostrarreservas() {
    let listareservas = "Reservas:\n\n";
    for (const numeroreserva in reservas) {
        listareservas += `Reserva #${numeroreserva}: ${reservas[numeroreserva]}\n`;
    }
    alert(listareservas);
}

function modificarreserva() {
    mostrarreservas();
    const numeroreservamodificar = parseInt(prompt("Introduce el número de reserva que deseas modificar:\n"));
    if (reservas[numeroreservamodificar]) {
        const nuevohorario = mostrarhorarios();
        reservas[numeroreservamodificar] = nuevohorario;
        alert(`Reserva #${numeroreservamodificar} modificada. Nuevo horario: ${nuevohorario}`);
    } else {
        alert("Número de reserva inválido. Por favor, introduce un número de reserva válido.");
    }
}

function cancelarreserva() {
    mostrarreservas();
    const numeroreservacancelar = parseInt(prompt("Introduce el número de reserva que deseas cancelar:\n"));

    if (reservas[numeroreservacancelar]) {
        delete reservas[numeroreservacancelar];
        alert(`Reserva #${numeroreservacancelar} cancelada correctamente.`);
    } else {
        alert("Número de reserva inválido. Por favor, introduce un número de reserva válido.");
    }
}

mostrarmenu();

