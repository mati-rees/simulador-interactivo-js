alert("¡Bienvenido al sistema de arriendo de canchas!");

const reservas = {};

function mostrarMenu() {
    let opcion;
    do {
        opcion = prompt(
            "Selecciona una opción:\n\n1. Reservar canchas\n2. Mostrar reservas\n3. Modificar reserva\n4. Cancelar reserva\n5. Salir"
        );

        switch (opcion) {
            case "1":
                reservarCanchas();
                break;
            case "2":
                mostrarReservas();
                break;
            case "3":
                modificarReserva();
                break;
            case "4":
                cancelarReserva();
                break;
            case "5":
                alert("¡Hasta luego! Vuelve pronto.");
                break;
            default:
                alert("Por favor selecciona una opción válida");
        }
    } while (opcion !== "5");
}

function mostrarHorarios() {
    const horarios = [
        "09:00 a 10:00",
        "11:00 a 12:00",
        "13:00 a 14:00",
        "15:00 a 16:00",
        "17:00 a 18:00",
        "19:00 a 20:00",
        "21.00 a 22:00"
    ];

    let horariosListado = "Selecciona un horario:\n\n";
    for (let i = 0; i < horarios.length; i++) {
        horariosListado += `${i + 1}. ${horarios[i]}\n`;
    }

    const seleccionHorario = parseInt(prompt(horariosListado));
    if (seleccionHorario >= 1 && seleccionHorario <= horarios.length) {
        return horarios[seleccionHorario - 1];
    } else {
        alert("Opción de horario inválida. Por favor, selecciona un horario válido.");
        return mostrarHorarios();
    }
}

function reservarCanchas() {
    const horarioSeleccionado = mostrarHorarios();
    const numeroReserva = Object.keys(reservas).length + 1;
    reservas[numeroReserva] = horarioSeleccionado;
    alert(`Has reservado una cancha para el horario ${horarioSeleccionado}. Número de reserva: ${numeroReserva}`);
}

function mostrarReservas() {
    let listaReservas = "Reservas:\n\n";
    for (const numeroReserva in reservas) {
        listaReservas += `Reserva #${numeroReserva}: ${reservas[numeroReserva]}\n`;
    }
    alert(listaReservas);
}

function modificarReserva() {
    mostrarReservas();
    const numeroReservaModificar = parseInt(prompt("Introduce el número de reserva que deseas modificar:\n"));

    if (reservas[numeroReservaModificar]) {
        const nuevoHorario = mostrarHorarios();
        reservas[numeroReservaModificar] = nuevoHorario;
        alert(`Reserva #${numeroReservaModificar} modificada. Nuevo horario: ${nuevoHorario}`);
    } else {
        alert("Número de reserva inválido. Por favor, introduce un número de reserva válido.");
    }
}

function cancelarReserva() {
    mostrarReservas();
    const numeroReservaCancelar = parseInt(prompt("Introduce el número de reserva que deseas cancelar:\n"));

    if (reservas[numeroReservaCancelar]) {
        delete reservas[numeroReservaCancelar];
        alert(`Reserva #${numeroReservaCancelar} cancelada correctamente.`);
    } else {
        alert("Número de reserva inválido. Por favor, introduce un número de reserva válido.");
    }
}

mostrarMenu();