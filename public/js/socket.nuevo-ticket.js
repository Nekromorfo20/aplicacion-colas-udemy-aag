//Comando para establecer la conexion
var socket = io()

var label = $('#lblNuevoTicket') //Relacion a el laber con el id nuevoTicket

socket.on('connect', function(){
    console.log('Bienvenido, Conectado al servidor')
})

socket.on('disconnect', function(){
    console.log('Se ha perdido la conexion con el server')
})

//Colocar el ultimo ticket guardado
socket.on('estadoActual', function(resp){
    label.text(resp.actual)
})

//Ejecutar el evento de nuevo ticket
$('button').on('click', function(){
    socket.emit('siguienteTicket', null, function(siguienteTicket){
        label.text(siguienteTicket)
    })
})