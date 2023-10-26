<<<<<<< HEAD
// Recuperar reservas almacenadas en localStorage al iniciar la aplicación
const reservasJSON = localStorage.getItem("reservas");
const reservas = reservasJSON ? JSON.parse(reservasJSON) : {};

let reservasMostradas = false;
let horariosMostrados = false;
let menuDiv; // Variable para almacenar el contenedor del menú

function limpiarMenu() {
    // Remover el contenedor del menú si existe
    if (menuDiv) {
        document.body.removeChild(menuDiv);
    }
}

function mostrarMensaje(mensaje) {
    // Limpiar contenido anterior
    document.body.innerHTML = '';
    const mensajeDiv = document.createElement("div");
    mensajeDiv.textContent = mensaje;
    document.body.appendChild(mensajeDiv);
}

function mostrarmenu() {
    // Limpiar el menú anterior si existe
    limpiarMenu();

    // Crear el contenedor del menú
    menuDiv = document.createElement("div");
    menuDiv.innerHTML = `
        <p>Selecciona una opción:</p>
        <button onclick="reservarcanchas()">1. Reservar canchas</button>
        <button onclick="mostrarreservas()">2. Mostrar reservas</button>
        <button onclick="modificarreserva()">3. Modificar reserva</button>
        <button onclick="cancelarreserva()">4. Cancelar reserva</button>
        <button onclick="salir()">5. Salir</button>`;
    document.body.appendChild(menuDiv);
}

async function mostrarhorarios() {
    return new Promise(resolve => {
        const horarios = ['09:00 a 10:00', '11:00 a 12:00', '13:00 a 14:00', '15:00 a 16:00', '17:00 a 18:00', '19:00 a 20:00', '21:00 a 22:00'];

        const horariosDiv = document.createElement("div");
        horariosDiv.innerHTML = "<p>Selecciona un horario:</p>";

        for (let i = 0; i < horarios.length; i++) {
            const button = document.createElement("button");
            button.textContent = `${i + 1}. ${horarios[i]}`;
            button.onclick = function() {
                const seleccionhorario = horarios[i];
                // Cerrar el contenedor de horarios
                horariosDiv.style.display = "none";
                // Mostrar nuevamente el contenedor del menú
                menuDiv.style.display = "block";
                resolve(seleccionhorario);
            };
            horariosDiv.appendChild(button);
        }

        document.body.appendChild(horariosDiv);
    });
}

async function reservarcanchas() {
    // Mostrar los horarios solo si no se han mostrado antes
    if (!horariosMostrados) {
        // Ocultar el contenedor del menú temporalmente
        menuDiv.style.display = "none";
        const nuevoHorario = await mostrarhorarios(); // Esperar la selección del horario
        horariosMostrados = true;
        if (nuevoHorario) {
            const numeroreserva = Object.keys(reservas).length + 1;
            reservas[numeroreserva] = nuevoHorario;
            mostrarMensaje(`Has reservado una cancha para el horario ${nuevoHorario}. Número de reserva: ${numeroreserva}`);
            // Almacenar las reservas en localStorage después de la modificación
            almacenarReservas();
            // Mostrar el menú nuevamente
            menuDiv.style.display = "block";
        }
    }
}

async function mostrarreservas() {
    // Verificar si las reservas ya han sido mostradas
    if (!reservasMostradas) {
        let listareservas = "Reservas:\n\n";
        for (const numeroreserva in reservas) {
            listareservas += `Reserva #${numeroreserva}: ${reservas[numeroreserva]}\n`;
        }
        mostrarMensaje(listareservas);
        // Actualizar la variable reservasMostradas para indicar que las reservas han sido mostradas
        reservasMostradas = true;
    } else {
        mostrarMensaje("Las reservas ya han sido mostradas.");
    }
}

async function modificarreserva() {
    // Mostrar las reservas
    mostrarreservas();
    
    // Crear un contenedor para la selección de reserva
    const seleccionDiv = document.createElement("div");
    seleccionDiv.innerHTML = "<p>Introduce el número de reserva que deseas modificar:</p>";
    
    // Crear un input para ingresar el número de reserva
    const inputReserva = document.createElement("input");
    inputReserva.type = "number";
    inputReserva.min = "1";
    
    // Crear un botón para confirmar la selección
    const botonConfirmar = document.createElement("button");
    botonConfirmar.textContent = "Confirmar";
    botonConfirmar.onclick = async function() {
        const reservaAModificar = parseInt(inputReserva.value);
        // Verificar si la reserva existe
        if (reservas[reservaAModificar]) {
            // Esperar la selección del nuevo horario
            const nuevoHorario = await mostrarhorarios();
            if (nuevoHorario) {
                // Modificar la reserva
                reservas[reservaAModificar] = nuevoHorario;
                mostrarMensaje(`Reserva #${reservaAModificar} modificada. Nuevo horario: ${nuevoHorario}`);
                // Almacenar las reservas en localStorage después de la modificación
                almacenarReservas();
            } else {
                mostrarMensaje("Reserva no modificada.");
            }
        } else {
            mostrarMensaje("Número de reserva inválido. Por favor, introduce un número de reserva válido.");
        }
        // Eliminar el contenedor de selección
        seleccionDiv.remove();
    };
    
    // Agregar elementos al contenedor de selección
    seleccionDiv.appendChild(inputReserva);
    seleccionDiv.appendChild(botonConfirmar);
    
    // Mostrar el contenedor de selección en el cuerpo del documento
    document.body.appendChild(seleccionDiv);
}

async function cancelarreserva() {
    // Mostrar las reservas
    mostrarreservas();
    
    // Crear un contenedor para la selección de reserva a cancelar
    const seleccionDiv = document.createElement("div");
    seleccionDiv.innerHTML = "<p>Introduce el número de reserva que deseas cancelar:</p>";
    
    // Crear un input para ingresar el número de reserva a cancelar
    const inputReserva = document.createElement("input");
    inputReserva.type = "number";
    inputReserva.min = "1";
    
    // Crear un botón para confirmar la selección de reserva a cancelar
    const botonConfirmar = document.createElement("button");
    botonConfirmar.textContent = "Confirmar";
    botonConfirmar.onclick = function() {
        const reservaACancelar = parseInt(inputReserva.value);
        // Verificar si la reserva existe
        if (reservas[reservaACancelar]) {
            // Eliminar la reserva
            delete reservas[reservaACancelar];
            mostrarMensaje(`Reserva #${reservaACancelar} cancelada correctamente.`);
            // Almacenar las reservas en localStorage después de la modificación
            almacenarReservas();
        } else {
            mostrarMensaje("Número de reserva inválido. Por favor, introduce un número de reserva válido.");
        }
        // Eliminar el contenedor de selección
        seleccionDiv.remove();
    };
    
    // Agregar elementos al contenedor de selección
    seleccionDiv.appendChild(inputReserva);
    seleccionDiv.appendChild(botonConfirmar);
    
    // Mostrar el contenedor de selección en el cuerpo del documento
    document.body.appendChild(seleccionDiv);
}

// Almacenar las reservas en localStorage cada vez que se modifiquen
function almacenarReservas() {
    const reservasJSON = JSON.stringify(reservas);
    localStorage.setItem("reservas", reservasJSON);
}

// Al iniciar la aplicación, mostrar el menú
mostrarmenu();
=======
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
>>>>>>> ff81f8e692c62cf154938c3104c4202aa4eb20e0
