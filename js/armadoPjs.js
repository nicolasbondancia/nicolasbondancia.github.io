//SUPER HEROES

//Inicializacion de JQuery
$(document).ready(function() {
})

// Crear "fabrica" de personajes

function Personaje (usuario, nombre, vida, golpe, turno){
    this.usuario = usuario
    this.nombre = nombre
    this.vida = vida
    this.golpe = golpe
    this.turno = turno // true false
    this.defensa = 500
}

// ---- FORM JUGADOR 1 ----

var vidaHeroe1 = 0
var golpeHeroe1 = 0
var restoDePuntosAAsignar1 = 0
var jugador1={}

$('#golpeHeroe1').change(function(){
    vidaHeroe1 = Number($('#vidaHeroe1').val())
    golpeHeroe1 = Number($('#golpeHeroe1').val())
    restoDePuntosAAsignar1 = 10 - golpeHeroe1 
    $('#vidaHeroe1').val(restoDePuntosAAsignar1)
})

$('#vidaHeroe1').change(function(){
    golpeHeroe1 = Number($('#golpeHeroe1').val())
    vidaHeroe1 = Number($('#vidaHeroe1').val())
    restoDePuntosAAsignar1 = 10 - vidaHeroe1 
    $('#golpeHeroe1').val(restoDePuntosAAsignar1)
})

$('#formJugador1').submit(function(event){
    event.preventDefault()
    var usuario1= $('#nombreJugador1').val()
    var nombreHeroe1 = $('#nombreHeroe1').val()
    golpeHeroe1 = Number($('#golpeHeroe1').val())
    vidaHeroe1 = Number($('#vidaHeroe1').val())
    if (usuario1==""|nombreHeroe1==""|golpeHeroe1==""|vidaHeroe1==""){
        $('#mensajeDeError').text("Debe completar todos los campos");
    }else{
        $('#mensajeDeError').text("")
        jugador1 = new Personaje(usuario1, nombreHeroe1, vidaHeroe1 * 1000, golpeHeroe1*300, false)
        localStorage.setItem("jugador1", JSON.stringify(jugador1))
        document.location.href = "jugador2.html"
    }
})

// ---- FORM JUGADOR 2 ----

var vidaHeroe2 = 0
var golpeHeroe2 = 0
var restoDePuntosAAsignar2 = 0
var jugador2={}

$('#golpeHeroe2').change(function(){
    vidaHeroe2 = Number($('#vidaHeroe2').val())
    golpeHeroe2 = Number($('#golpeHeroe2').val())
    restoDePuntosAAsignar2 = 10 - golpeHeroe2 
    $('#vidaHeroe2').val(restoDePuntosAAsignar2)
})

$('#vidaHeroe2').change(function(){
    golpeHeroe2 = Number($('#golpeHeroe2').val())
    vidaHeroe2 = Number($('#vidaHeroe2').val())
    restoDePuntosAAsignar2 = 10 - vidaHeroe2
    $('#golpeHeroe2').val(restoDePuntosAAsignar2)
})

$('#formJugador2').submit(function(event){
    var jugador1 = JSON.parse(localStorage.getItem("jugador1"))
    event.preventDefault()
    var usuario2= $('#nombreJugador2').val()
    var nombreHeroe2 = $('#nombreHeroe2').val()
    golpeHeroe2 = Number($('#golpeHeroe2').val())
    vidaHeroe2 = Number($('#vidaHeroe2').val())
    if (usuario2==""|nombreHeroe2==""|golpeHeroe2==""|vidaHeroe2==""){
        $('#mensajeDeError').text("Debe completar todos los campos")
    }else{
        $('#mensajeDeError').text("")
        jugador2 = new Personaje(usuario2, nombreHeroe2, vidaHeroe2 * 1000, golpeHeroe2*300, false)
        localStorage.setItem("jugador2", JSON.stringify(jugador2))
        document.location.href = "index.html"
    }
})
