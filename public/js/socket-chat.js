var socket = io();

var params = new URLSearchParams( window.location.search );

if (!params.has('nombre') || !params.has( 'sala' )) {
    window.location = 'index.html';
    throw new Error('El nombre y sala son necesarios')
}

var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
}

socket.on('connect', function () {
    
    console.log('conectado al servidor');

    socket.emit('paseDeEntradaAlChat', usuario, function(resp) {
        console.log('Usuarios Conectados',resp);
    });

});
//escuchar
socket.on('disconnect', function () {

    console.log('Perdimos conexion con el servidor');

});

// //emit sirve para emitir mensajes
// socket.emit('crearMensaje', {
// 
// mensaje: 'Hola mundo'
// }, function (resp) {
// console.log('Respuesta del SERVER:', resp);
// });
//Escuchar mensaje
socket.on('crearMensaje', function (mensajes) {
console.log('Info del servidor', mensajes);
});

//escuchar cuándo un usuario entra y sale del chat.
socket.on('listaPersonas', function (personas) {
    console.log(personas);
});

//mensajes privados
socket.on('mensajePrivado', function(mensaje){
    console.log('mensaje privado', mensaje);
})