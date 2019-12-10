const fs = require('fs')

/* Notas adicionales:
   ------------------
   .shift()     Es una funcion de javascript que permite eliminar el primer elemento de un array (con el indice 0) y lo guarda en una variable
   .unshift()   Funcion de javascript que permite agregar uno o mas lementos al inicio de un array (como se vayan declarando de izquierda a derecha)
*/

//Clase para definir tickets
class Ticket{
    constructor(numero, escritorio){
        this.numero = numero
        this.escritorio = escritorio
    }
}

//Clase para manejar tickets y almacenarlos en data/data.json
class TicketControl{
    constructor(){
        this.ultimo = 0
        this.hoy = new Date().getDate()
        this.tickets = []
        this.ultimos4 = []
        let data = require('../data/data.json') //Se manda a llamar la informacion almacenada

        //Se carga la informacion almacenada
        if(data.hoy === this.hoy){
            this.ultimo = data.ultimo
            this.tickets = data.tickets
            this.ultimos4 = data.ultimos4
        } else {
            this.reiniciarConteo()
        }
    }

    siguiente(){
        this.ultimo += 1

        let ticket = new Ticket(this.ultimo, null)
        this.tickets.push(ticket) //Insertar un ticket en el arreglo

        this.grabarArchivo()

        return `Ticket ${this.ultimo}`
    }

    getUltimoTicket(){
        return `Ticket ${this.ultimo}`
    }

    getUltimos4(){
        return this.ultimos4
    }

    atenderTicket(escritorio){
        if (this.tickets.length === 0) {
            return 'No hay tickets';
        }

        let numeroTicket = this.tickets[0].numero
        this.tickets.shift()

        let atenderTicket = new Ticket(numeroTicket, escritorio)

        this.ultimos4.unshift(atenderTicket)

        if(this.ultimos4.length > 4 ){
            this.ultimos4.splice(-1, 1) //Borrar el ultimo elenemto
        }
        console.log('Ultimos 4: ', this.ultimos4)
        this.grabarArchivo()

        return atenderTicket
    }

    //Los tickets se vuelven a iniciar
    reiniciarConteo(){
        this.ultimo = 0
        this.tickets = []
        this.ultimos4 = []
        console.log('Se ha inicializado el sistema')
        this.grabarArchivo()
    }

    //Almacenar informacion en el archivo data/data.json
    grabarArchivo(){
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        }

        let jsonDataString = JSON.stringify(jsonData)
        fs.writeFileSync('./server/data/data.json', jsonDataString)
    }
}

module.exports = {
    TicketControl
}