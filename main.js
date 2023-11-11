// Recuperar reservas almacenadas en localStorage al iniciar la aplicación
const reservasJSON = localStorage.getItem("reservas");
const reservas = reservasJSON ? JSON.parse(reservasJSON) : {};
console.log(reservas);

let reservasMostradas = false;
let horariosMostrados = false;
let menuDiv; // Variable para almacenar el contenedor del menú

// Función para almacenar reservas en el servidor y localmente
async function almacenarReservas() {
    const url = 'https://tu-servidor.com/api/guardarReservas';
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservas),
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) throw new Error('Error al almacenar reservas en el servidor');

        console.log('Reservas almacenadas con éxito en el servidor');
    } catch (error) {
        console.error(error.message);
    }

    // También puedes seguir almacenando las reservas localmente
    const reservasJSON = JSON.stringify(reservas);
    localStorage.setItem('reservas', reservasJSON);
}

// Resto del código sin modificaciones significativas

function limpiarMenu() {
    // Remover el contenedor del menú si tiene un padre
    menuDiv && menuDiv.parentNode && menuDiv.parentNode.removeChild(menuDiv);
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
        <button class="boton-menu" onclick="reservarcanchas()">1. Reservar canchas</button>
        <button class="boton-menu" onclick="mostrarreservas()">2. Mostrar reservas</button>
        <button class="boton-menu" onclick="modificarreserva()">3. Modificar reserva</button>
        <button class="boton-menu" onclick="cancelarreserva()">4. Cancelar reserva</button>`;
    document.body.appendChild(menuDiv);
}

async function mostrarhorarios() {
    const horariosOptions = {
        "09:00 a 10:00": "09:00 a 10:00",
        "11:00 a 12:00": "11:00 a 12:00",
        "13:00 a 14:00": "13:00 a 14:00",
        "15:00 a 16:00": "15:00 a 16:00",
        "17:00 a 18:00": "17:00 a 18:00",
        "19:00 a 20:00": "19:00 a 20:00",
        "21:00 a 22:00": "21:00 a 22:00"
    };

    const { value: seleccionhorario } = await Swal.fire({
        title: "Selecciona un horario:",
        input: "select",
        inputOptions: horariosOptions,
        inputPlaceholder: "Selecciona un horario",
        showCancelButton: true,
        inputValidator: (value) => new Promise(resolve => value ? resolve() : resolve("Debes seleccionar un horario."))
    });

    return seleccionhorario;
}

async function reservarcanchas() {
    // Mostrar los horarios solo si no se han mostrado antes
    if (!horariosMostrados) {
        // Ocultar el contenedor del menú temporalmente
        menuDiv.style.display = "none";

        // Mostrar SweetAlert2 para seleccionar el horario
        const { value: nuevoHorario } = await Swal.fire({
            title: "Reserva tu cancha",
            input: "select",
            inputOptions: {
                Horarios: {
                    "09:00 a 10:00": "09:00 a 10:00",
                    "11:00 a 12:00": "11:00 a 12:00",
                    "13:00 a 14:00": "13:00 a 14:00",
                    "15:00 a 16:00": "15:00 a 16:00",
                    "17:00 a 18:00": "17:00 a 18:00",
                    "19:00 a 20:00": "19:00 a 20:00",
                    "21:00 a 22:00": "21:00 a 22:00"
                }
            },
            inputPlaceholder: "Selecciona un horario",
            showCancelButton: true,
            inputValidator: (value) => new Promise(resolve => value ? resolve() : resolve("Debes seleccionar un horario."))
        });

        // Mostrar el mensaje con el horario seleccionado
        if (nuevoHorario) {
            const numeroreserva = Object.keys(reservas).length + 1;
            reservas[numeroreserva] = nuevoHorario;
            mostrarMensaje(`Has reservado una cancha para el horario ${nuevoHorario}. Número de reserva: ${numeroreserva}`);

            // Crear el botón "Volver al menú principal"
            const volverButton = document.createElement("button");
            volverButton.textContent = "Volver al menu principal";
            volverButton.classList.add("boton-volver");
            volverButton.onclick = mostrarmenu; // Agregar el manejador de eventos

            // Agregar el botón al DOM
            document.body.appendChild(volverButton);

            // Almacenar las reservas en localStorage después de la modificación
            almacenarReservas();
            // Mostrar el menú nuevamente
            menuDiv.style.display = "block";
        } else {
            mostrarMensaje("Reserva no realizada.");
        }

        horariosMostrados = true;
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

        // Crear el botón "Volver al menú principal"
        const botonVolver = document.createElement("button");
        botonVolver.textContent = "Volver al menú principal";
        botonVolver.classList.add("boton-volver"); // Agrega una clase al botón
        botonVolver.addEventListener("click", mostrarmenu);
        document.body.appendChild(botonVolver);

        // Actualizar la variable reservasMostradas para indicar que las reservas han sido mostradas

    } else {
        mostrarMensaje("Las reservas ya han sido mostradas.");
    }
}

async function modificarreserva() {
    // Mostrar las reservas
    mostrarreservas();

    // Obtener todas las reservas como opciones para el usuario
    const opcionesReservas = {};
    for (const numeroreserva in reservas) {
        opcionesReservas[numeroreserva] = `Reserva #${numeroreserva}: ${reservas[numeroreserva]}`;
    }

    // Mostrar SweetAlert2 para obtener el número de reserva a modificar
    const { value: reservaAModificar } = await Swal.fire({
        title: "Selecciona una reserva a modificar:",
        input: "select",
        inputOptions: opcionesReservas,
        inputPlaceholder: "Selecciona una reserva",
        showCancelButton: true,
        inputValidator: (value) => new Promise(resolve => value ? resolve() : resolve("Debes seleccionar una reserva."))
    });

    // Convertir el número de reserva a entero
    const numeroReserva = parseInt(reservaAModificar);

    // Verificar si el número de reserva es válido y existe en las reservas
    if (numeroReserva && reservas[numeroReserva]) {
        // Mostrar SweetAlert2 para seleccionar el nuevo horario
        const { value: nuevoHorario } = await Swal.fire({
            title: "Selecciona un nuevo horario:",
            input: "select",
            inputOptions: {
                "09:00 a 10:00": "09:00 a 10:00",
                "11:00 a 12:00": "11:00 a 12:00",
                "13:00 a 14:00": "13:00 a 14:00",
                "15:00 a 16:00": "15:00 a 16:00",
                "17:00 a 18:00": "17:00 a 18:00",
                "19:00 a 20:00": "19:00 a 20:00",
                "21:00 a 22:00": "21:00 a 22:00"
            },
            inputPlaceholder: "Selecciona un horario",
            showCancelButton: true,
            inputValidator: (value) => new Promise(resolve => value ? resolve() : resolve("Debes seleccionar un horario."))
        });

        if (nuevoHorario) {
            // Modificar la reserva
            reservas[numeroReserva] = nuevoHorario;
            mostrarMensaje(`Reserva #${numeroReserva} modificada. Nuevo horario: ${nuevoHorario}`);
            // Almacenar las reservas en localStorage después de la modificación
            almacenarReservas();
        } else {
            mostrarMensaje("Reserva no modificada.");
        }
    } else {
        mostrarMensaje("Número de reserva inválido o no existe. Por favor, selecciona una reserva válida.");
    }
}

async function cancelarreserva() {
    // Mostrar las reservas
    mostrarreservas();

    // Obtener todas las reservas como opciones para el usuario
    const opcionesReservas = {};
    for (const numeroreserva in reservas) {
        opcionesReservas[numeroreserva] = `Reserva #${numeroreserva}: ${reservas[numeroreserva]}`;
    }

    // Mostrar SweetAlert2 para obtener el número de reserva a cancelar
    const { value: reservaACancelar } = await Swal.fire({
        title: "Selecciona una reserva a cancelar:",
        input: "select",
        inputOptions: opcionesReservas,
        inputPlaceholder: "Selecciona una reserva",
        showCancelButton: true,
        inputValidator: (value) => new Promise(resolve => value ? resolve() : resolve("Debes seleccionar una reserva."))
    });

    // Convertir el número de reserva a entero
    const numeroReserva = parseInt(reservaACancelar);

    // Verificar si el número de reserva es válido y existe en las reservas
    if (numeroReserva && reservas[numeroReserva]) {
        // Eliminar la reserva
        delete reservas[numeroReserva];
        mostrarMensaje(`Reserva #${numeroReserva} cancelada correctamente.`);
        // Almacenar las reservas en localStorage después de la modificación
        almacenarReservas();
    } else {
        mostrarMensaje("Número de reserva inválido o no existe. Por favor, selecciona una reserva válida.");
    }
}

// Al iniciar la aplicación, mostrar el menú
mostrarmenu();
