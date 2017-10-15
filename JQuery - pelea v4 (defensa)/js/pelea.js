//SUPER HEROES

//Inicializacion de JQuery
$(document).ready(function() {
})

// Obtener los PJS desde local storage

var jugador1 = JSON.parse(localStorage.getItem("jugador1"))
var jugador2 = JSON.parse(localStorage.getItem("jugador2"))

// Determinar quien empieza - lo hago acá asi varía entre batalla y batalla a pesar de que los jugadores no se cambien
var randomBoolean = Math.random() >= 0.5
    if (randomBoolean){
       jugador1.turno=true
       jugador2.turno=false
    }else{
       jugador1.turno=false
       jugador2.turno=true
    }

// Declarar variables básicas
var vidaTotal1 = jugador1.vida
var vidaTotal2 = jugador2.vida
var golpeTurno = 99999
var widthTotal1 = 100
var widthTotal2 = 100
var huboGolpe = true


//mostrar datos básicos en pantalla
$('#nombre1').text(jugador1.nombre)
$('#nombre2').text(jugador2.nombre)
$('#usuario1').text(jugador1.usuario)
$('#usuario2').text(jugador2.usuario)
$('#vida1Barra')
$('#vida1').text(jugador1.vida + "/" + vidaTotal1)
$('#vida2Barra')
$('#vida2').text(jugador2.vida + "/" + vidaTotal2)

// Hacerlos golpear (Ej: con 1000pts de golpe va a golpear: min100-max1000)
var accionGolpear =  function (vidaOponente, golpeMax, nombreAtacante, nombreAtacado, defensaAtacado){
    var defensaOponente = defensaAtacado
    var golpeMin = golpeMax/10
    var golpeAtacante = Math.round(Math.random() * (golpeMax-golpeMin)+golpeMin)
    var defendido = accionDefender(golpeAtacante, defensaOponente)
    if(defendido){
    	huboGolpe = false
        var resto = vidaOponente
        $('#informacionPelea').text("")
        $('#informacionPelea').append('<span id="heroeAtacado"></span><span class="defensa"> defendió <span> el ataque de <span id="heroeAtacante"></span>.')
        $('#heroeAtacante').text(nombreAtacante)
        $('#heroeAtacado').text(nombreAtacado)
        console.log(nombreAtacante + " golpeo " + golpeAtacante + ". " + nombreAtacado + " defendió el golpe" )
        return resto
    }else{
    	huboGolpe = true
        golpeTurno = golpeAtacante
        var resto = vidaOponente - golpeAtacante
        $('#informacionPelea').text("")
        $('#informacionPelea').append('<span id="criticalHit"></span><span id="heroeAtacante"></span> golpeó a <span id="heroeAtacado"></span> por <span id="puntosDeAtaque"></span> puntos de ataque')
        $('#heroeAtacante').text(nombreAtacante)
        $('#heroeAtacado').text(nombreAtacado)
        $('#puntosDeAtaque').text(golpeAtacante)
        console.log(nombreAtacante + " golpeo " + golpeAtacante + ". La vida de " + nombreAtacado + " era de " + vidaOponente, " pero ahora le queda " + resto + " de vida." )
        return resto
    }
}

// Hacerlos Golpear con boost de critico (Ej: con 1000pts de golpe va a golpear: min1000-max2000)
var accionGolpearCritico =  function (vidaOponente, golpeMax, nombreAtacante, nombreAtacado){
	huboGolpe = true
    var golpeMin = golpeMax/2
    var golpeAtacante = Math.round(Math.random() * (golpeMax-golpeMin)+golpeMin)
    golpeTurno = golpeAtacante
    var resto = vidaOponente - golpeAtacante
    $('#informacionPelea').text("")
    $('#informacionPelea').append('<span id="criticalHit"></span><span id="heroeAtacante"></span> golpeó a <span id="heroeAtacado"></span> por <span id="puntosDeAtaque"></span> puntos de ataque')
    $('#heroeAtacante').text(nombreAtacante)
    $('#heroeAtacado').text(nombreAtacado)
    $('#puntosDeAtaque').text(golpeAtacante)
    console.log(nombreAtacante + " golpeo " + golpeAtacante + ". La vida de " + nombreAtacado + " era de " + vidaOponente, " pero ahora le queda " + resto + " de vida." )
    return resto
}

//Accion Defender 
var accionDefender = function (){
    var defendido=false
    var randomBooleanDf = Math.random() >= 0.9
    if (randomBooleanDf){
        defendido=true
    }else{
        defendido=false
    }
    return defendido
}

// Armar la funcionalidad del juego
var juego= function(jugador1, jugador2){
    if(jugador1.turno){
        if(widthTotal1<25){
            randomBooleanCh1 = Math.random() >= 0.5
            //console.log("menor a 25%" + randomBooleanCh1)
        } else{
            randomBooleanCh1 = Math.random() >= 0.9
            //console.log("mayor a 25%" + randomBooleanCh1)
        }
        if(randomBooleanCh1){
            jugador2.vida = accionGolpearCritico (jugador2.vida, jugador1.golpe*2, jugador1.nombre, jugador2.nombre)
            jugador2.turno = true
            jugador1.turno = false  
           // console.log("CRITICAL HIT" + randomBooleanCh1 + jugador1.golpe*2.3)
            $('#criticalHit').text("GOLPE CRÍTICO! ")
        } else{
            jugador2.vida = accionGolpear(jugador2.vida, jugador1.golpe, jugador1.nombre, jugador2.nombre, jugador2.defensa)
            jugador2.turno = true
            jugador1.turno = false    
        }
    }else{
        if(widthTotal2<25){
            randomBooleanCh2 = Math.random() >= 0.5
            //console.log("menor a 25%" + randomBooleanCh2)
        } else{
            randomBooleanCh2 = Math.random() >= 0.9
            //console.log("mayor a 25%" + randomBooleanCh2)
        }
        if(randomBooleanCh2){
            jugador1.vida = accionGolpearCritico(jugador1.vida, jugador2.golpe*2, jugador2.nombre, jugador1.nombre)
            jugador1.turno = true
            jugador2.turno = false 
           //console.log("CRITICAL HIT" + randomBooleanCh2 + jugador2.golpe*2.3)
            $('#criticalHit').text("GOLPE CRÍTICO! ")
        } else{
            jugador1.vida = accionGolpear(jugador1.vida, jugador2.golpe, jugador2.nombre, jugador1.nombre, jugador1.defensa)
            jugador1.turno = true
            jugador2.turno = false
        }
    }
}


// Hacer que se peguen (mientras tengan vida) al apretar el botón
$('#botonPegar').on('click', function() {
    if (jugador1.vida>0 && jugador2.vida>0){
        juego(jugador1, jugador2)
    }
    if (jugador1.turno){
        if (jugador1.vida<=0){
            $('#vida1').text(0 + "/" + vidaTotal1)
            $('#msjGeneral').text (jugador2.nombre + " ganó la batalla!")
            var widthARestarParcial1 = averiguarWidthARestar1 ()
            widthTotal1 = widthTotal1 - widthARestarParcial1
            var widthARestar1 = "-=" + widthARestarParcial1 + "%"
            $("#vida1Barra").animate({ 
                width: widthARestar1
            }, 1500)
            if (widthTotal1<25){
                $("#vida1Barra").css("background-color", "#b0122d")
            }
            $('#botonPegar').remove()
            $('#botonesDeAccion').append('<button id="botonVolverAJugar" class="btn btn-primary" type="">Volver A Jugar</button>')
            $('#botonVolverAJugar').on('click', function(){
                location.reload()
            })
            $('#botonesDeAccion').append('<button id="botonCrearPjs" class="btn btn-primary" type="">Crear Nuevos Personajes</button>')
            $('#botonCrearPjs').on('click', function(){
                localStorage.clear()
                document.location.href = "jugador1.html"
            })  
        }else{
            $('#vida1').text(jugador1.vida + "/" + vidaTotal1)
            var widthARestarParcial1 = averiguarWidthARestar1 ()
            widthTotal1 = widthTotal1 - widthARestarParcial1
            var widthARestar1 = "-=" + widthARestarParcial1 + "%"
            $("#vida1Barra").animate({ 
                width: widthARestar1
            }, 1500)
            if (widthTotal1<25){
                $("#vida1Barra").css("background-color", "#b0122d")
            }
        }
    } else {
        if (jugador2.vida<=0){
            $('#vida2').text(0 + "/" + vidaTotal2)
            $('#msjGeneral').text (jugador1.nombre + " ganó la batalla!")
            var widthARestarParcial2 = averiguarWidthARestar2 ()
            widthTotal2 = widthTotal2 - widthARestarParcial2
            var widthARestar2 = "-=" + widthARestarParcial2 + "%"
            $("#vida2Barra").animate({ 
            width: widthARestar2
            }, 1500)
            if (widthTotal2<25){
            $("#vida2Barra").css("background-color", "#b0122d")
            }
            $('#botonPegar').remove()
            $('#botonesDeAccion').append('<button id="botonVolverAJugar" class="btn btn-primary" type="">Volver A Jugar</button>')
            $('#botonVolverAJugar').on('click', function(){
                location.reload()
            })
            $('#botonesDeAccion').append('<button id="botonCrearPjs" class="btn btn-primary" type="">Crear Nuevos Personajes</button>')
            $('#botonCrearPjs').on('click', function(){
                localStorage.clear()
                document.location.href = "jugador1.html"
            })   
        } else{
            $('#vida2').text(jugador2.vida + "/" + vidaTotal2)
            var widthARestarParcial2 = averiguarWidthARestar2 ()
            widthTotal2 = widthTotal2 - widthARestarParcial2
            var widthARestar2 = "-=" + widthARestarParcial2 + "%"
            $("#vida2Barra").animate({ 
                width: widthARestar2
            }, 1500)
            if (widthTotal2<25){
                $("#vida2Barra").css("background-color", "#b0122d")
            }
        }
    }
})

//Funcion para calcular resto de width1
var averiguarWidthARestar1 = function (){
	if(huboGolpe){
    var numeroA1 = golpeTurno * 100
    var widthARestarParcial1 = numeroA1/vidaTotal1
    return widthARestarParcial1
    }else{
    var widthARestarParcial1 = 0
    return widthARestarParcial1
    }
}

//Funcion para calcular resto de width2
var averiguarWidthARestar2 = function (){
	if(huboGolpe){
    var numeroA2 = golpeTurno * 100
    var widthARestarParcial2 = numeroA2/vidaTotal2
    return widthARestarParcial2
    }else{
    var widthARestarParcial2 = 0
    return widthARestarParcial2
    }
}