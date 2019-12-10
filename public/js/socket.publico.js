var socket = io()

//Se obtiene los label del publico.html
var lblTicket1 = $('#lblTicket1')
var lblTicket2 = $('#lblTicket2')
var lblTicket3 = $('#lblTicket3')
var lblTicket4 = $('#lblTicket4')

var lblEscritorio1 = $('#lblEscritorio1')
var lblEscritorio2 = $('#lblEscritorio2')
var lblEscritorio3 = $('#lblEscritorio3')
var lblEscritorio4 = $('#lblEscritorio4')

//Los label obtenidos se almacenan como un array
var lblTickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4]
var lblEscritorios = [lblEscritorio1, lblEscritorio2, lblEscritorio3, lblEscritorio4]

//Funcion de los sockets para obtener el ticket actual y el arreglo de los ultimos 4
socket.on('estadoActual', function(data){
    //console.log(data)
    actualizaHTML(data.ultimos4)
})

//Se obtiene el arreglo con los ultimos 4, es una funcion broadcast
socket.on('ultimos4', function(data){
    //console.log(data)
    var audio = new Audio('audio/new-ticket.mp3')
    audio.play()
    actualizaHTML(data.ultimos4)
})

//Recorrer el arreglo de los label almacenados e insertar text actualizado
function actualizaHTML(ultimos4){
    for(var i=0; i<= ultimos4.length -1; i++){
        lblTickets[i].text('Ticket ' + ultimos4[i].numero)
        lblEscritorios[i].text('Escritorio ' + ultimos4[i].escritorio)
    }
}