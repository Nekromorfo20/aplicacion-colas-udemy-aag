const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control')

//instancia del Ticket control
const ticketControl = new TicketControl()

//Se prueba la conexion
io.on('connection', (client) => {

    //Funcion para regresar el siguiente ticket que tomara cada escritorio
    client.on('siguienteTicket', (data, callback) => {
        let siguiente = ticketControl.siguiente()
        console.log(siguiente)
        callback(siguiente)
    })

    //Emitir el eveto para el siguiente ticket y los ultimos4
    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()
    })

    //Escuchar la peticion de un ticket
    client.on('atenderTicket', (data, callback) => {
        if(!data.escritorio){
            return callback({
                error: true,
                mensaje: 'El escritorio es necesario'
            })
        }

        //En envia el escritorio
        let atenderTicket = ticketControl.atenderTicket(data.escritorio)
        callback(atenderTicket)

        //Se emite el evento de los ultimos 4 a todos los usuarios
        client.broadcast.emit('ultimos4', {
            ultimos4: ticketControl.getUltimos4()
        })
    })
});