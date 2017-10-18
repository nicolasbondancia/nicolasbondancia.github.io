// Funciones 

// Constructor de objeto tarea
var ConstructorObjetoTarea = function(tituloTarea, descripcionTarea){
	this.id = Date.now()
	this.momentoDeCreacion = new Date(this.id).toLocaleString()
	this.titulo = tituloTarea
	this.descripcion = descripcionTarea
	this.completado = false
}

// Array donde se van a guardar todas las tareas
var listadoDeTareas = []

// Funcion para agregar una tarea y guardarla dentro del array ejecutando el constructor
var agregarTarea = function (tituloTarea, descripcionTarea){
	var nuevaTarea = new ConstructorObjetoTarea (tituloTarea, descripcionTarea)
	listadoDeTareas.push(nuevaTarea)
	actualizarLocalStorage(listadoDeTareas, true)
	return nuevaTarea
}

// Funcion para editar titulo y descripcion de una tarea
var editarTarea = function (idTarea, nuevoTituloTarea, nuevaDescripcionTarea, array){
//recorrer las tareas hasta encontrar la que corresponde al mismo id para asi saber cual editar, si no existe dar error
	for (var i = 0; i < array.length; i++) {
		//reemplazar el titulo viejo y la descripcion vieja por las nuevas cuando encuentra que tarea es y despues terminar la ejecución
		if (array[i].id == idTarea){
			array[i].titulo = nuevoTituloTarea
			array[i].descripcion = nuevaDescripcionTarea
			break
		}
	}
	actualizarLocalStorage(array, true)
	return array[i]
}

// Funcion para eliminar una tarea
var eliminarUnaTarea = function (idTarea, array){
// recorrer todas las tareas hasta encontrar la que corresponde al id insertado por parametro, asi se cual eliminar
	for (var i = 0; i < array.length; i++) {
		if (array[i].id == idTarea){
		// eliminar la tarea, guardarla en una variable que voy a devolver (para tener el dato de la tarea que elimino) y finalizar la función
			var elementoEliminado = array.splice(i,1)
			break
		}	
	}
	actualizarLocalStorage(array, true)
	return elementoEliminado
}

// Función para eliminar todas las tareas dentro de un grupo de tareas
var eliminarTodasLasTareas = function (){
	listadoDeTareas = []
	actualizarLocalStorage(listadoDeTareas, true)
	return listadoDeTareas
}

// Funcion para ordenar A-z. Selection Sort
var ordenarAz = function(tareasAOrdenar){
	for (var a = 1; a < tareasAOrdenar.length; a++) { //a inicia en la segunda posición porque empieza a comparar desde ahí para la izquierda
		for (var b = 0; b<a; b++) { // recorre el array interno desde una posicion previa 
			if (tareasAOrdenar[a].titulo<tareasAOrdenar[b].titulo){ // si el numero en el for general (el segundo) es menor que el del for interno los tiene que cambiar de lugar
				var arrayTemporal = tareasAOrdenar.splice(a,1) //saca el numero menor y lo guarda en una variable temporal
				tareasAOrdenar.splice(b, 0, arrayTemporal[0]) // le agrega (sin borrar por eso 0) el elemento que guardo en el array temporal
			}
		}
	}
	actualizarLocalStorage(tareasAOrdenar, true)
	return tareasAOrdenar
}

// Funcion para ordenar Z-a. Selection Sort
var ordenarZa = function(tareasAOrdenar){
	for (var a = 1; a < tareasAOrdenar.length; a++) { //a inicia en la segunda posición porque empieza a comparar desde ahí para la izquierda
		for (var b = 0; b<a; b++) { // recorre el array interno desde una posicion previa 
			if (tareasAOrdenar[a].titulo>tareasAOrdenar[b].titulo){ // si el numero en el for general (el segundo) es menor que el del for interno los tiene que cambiar de lugar
				var arrayTemporal = tareasAOrdenar.splice(a,1) //saca el numero mayor y lo guarda en una variable temporal
				tareasAOrdenar.splice(b, 0, arrayTemporal[0]) // le agrega (sin borrar por eso 0) el elemento que guardo en el array temporal
			}
		}
	}
	actualizarLocalStorage(tareasAOrdenar, true)
	return tareasAOrdenar
}

// Funcion para ordenar por Id menor primero. Selection Sort
var ordenarIdMenor = function(tareasAOrdenar){
	for (var a = 1; a < tareasAOrdenar.length; a++) { //a inicia en la segunda posición porque empieza a comparar desde ahí para la izquierda
		for (var b = 0; b<a; b++) { // recorre el array interno desde una posicion previa 
			if (tareasAOrdenar[a].id<tareasAOrdenar[b].id){ // si el numero en el for general (el segundo) es menor que el del for interno los tiene que cambiar de lugar
				var arrayTemporal = tareasAOrdenar.splice(a,1) //saca el numero mayor y lo guarda en una variable temporal
				tareasAOrdenar.splice(b, 0, arrayTemporal[0]) // le agrega (sin borrar por eso 0) el elemento que guardo en el array temporal
			}
		}
	}
	actualizarLocalStorage(tareasAOrdenar, true)
	return tareasAOrdenar
}

// Funcion para ordenar por Id mayor primero. Selection Sort
var ordenarIdMayor = function(tareasAOrdenar){
	for (var a = 1; a < tareasAOrdenar.length; a++) { //a inicia en la segunda posición porque empieza a comparar desde ahí para la izquierda
		for (var b = 0; b<a; b++) { // recorre el array interno desde una posicion previa 
			if (tareasAOrdenar[a].id>tareasAOrdenar[b].id){ // si el numero en el for general (el segundo) es menor que el del for interno los tiene que cambiar de lugar
				var arrayTemporal = tareasAOrdenar.splice(a,1) //saca el numero mayor y lo guarda en una variable temporal
				tareasAOrdenar.splice(b, 0, arrayTemporal[0]) // le agrega (sin borrar por eso 0) el elemento que guardo en el array temporal
			}
		}
	}
	actualizarLocalStorage(tareasAOrdenar, true)
	return tareasAOrdenar
}

// Funcion que cambia el estado de una tarea de hecho a no hecho o al reves
var cambioDeEstado = function (idTarea, array){
// recorrer todas las tareas hasta encontrar la que corresponde al id insertado por parametro, asi se cual eliminar
	for (var i = 0; i < array.length; i++) {
		// Si es el id correcto ejecutar
		if (array[i].id == idTarea){
			// cambiar el estado de completado por el que no es actual
			if (array[i].completado){
				array[i].completado = false
				break
			} else{
				array[i].completado = true
				break
			}
		}
	}
	actualizarLocalStorage(array, true)
	return array[i].completado
}

// Funcion filtro tareas hechas
var filtroDeTareasHechas = function (tareasAFiltrar){
	var tareasHechas = []
	for (var i = 0; i < tareasAFiltrar.length; i++){
		if (tareasAFiltrar[i].completado){
			tareasHechas.push(tareasAFiltrar[i])
		}
	}
	return tareasHechas
}

// Funcion filtro tareas sin realizar
var filtroDeTareasSinRealizar = function (tareasAFiltrar){
	var TareasSinRealizar = []
	for (var i = 0; i < tareasAFiltrar.length; i++){
		if (!tareasAFiltrar[i].completado){
			TareasSinRealizar.push(tareasAFiltrar[i])
		}
	}
	return TareasSinRealizar
}

//Funcion que formatee el texto, sacando puntos signos de exclamación y comas, llevando a minuscula y guardando cada palabra en un array particular
var formatearTexto = function (textoAFormatear){
	var textoEnMinuscula = textoAFormatear.toLowerCase() //primero lo paso a minuscula
	textoSinSignos = textoEnMinuscula.replace(/[.*+?^${}()|[\]\\¿?;:,.¡!]/g, "")//Se le pasa entre "/" el caracter a reemplazar y entre[si son varios] la "g" es para que lo haga global y no busque un solo caracter y si ademas se pone una "i" lo hace independiente de si es mayuscula o minúscula, después de la , viene el caracter por el que reemplazamos en este caso un array vacio
	textoSinAcentos = textoSinSignos.latinize() //Archivo externo que convierte cualquier letra con signo raro o tilde a la correspondiente Ej: ü a u
	textoFormateadoFinal = textoSinAcentos.trim() //Saca espacios al principio y al final
	arrTextoFormateadoFinalConEspacios = textoFormateadoFinal.split(" ") // guardar en un array
	arrTextoFormateadoFinal = borrarEspacios(arrTextoFormateadoFinalConEspacios)
	return arrTextoFormateadoFinalConEspacios
}

//Funcion de formateo auxiliar que elimina espacios
var borrarEspacios = function (textoABorrarEspacios){
	for (var i = 0; i <arrTextoFormateadoFinalConEspacios.length; i++) {
		if (arrTextoFormateadoFinalConEspacios[i]==""){
			arrTextoFormateadoFinalConEspacios.splice(i,1)
			i=0
		}
	}
}

//Funcion buscador de tareas
var buscadorDeTareas = function (palabrasABuscar, tareasDondeBuscar){
	arrayDePalabrasFormateadas = formatearTexto (palabrasABuscar)
	var tareasEncontradas = [] //primero formatea el texto de la busqueda y lo pone en un array de palabras
	for (var a = 0; a < tareasDondeBuscar.length; a++) { //recorre la tarea donde buscar [a] y guarda titulo y descripcion en un array que formatea
		var palabrasTemporales = tareasDondeBuscar[a].titulo +" "+ tareasDondeBuscar[a].descripcion
		var arrPalabrasTemporales = formatearTexto (palabrasTemporales)
		for (var b = 0; b<arrPalabrasTemporales.length; b++){ //recore todas las palabras de esa primera tarea tanto de titulo como descripcion
			for (var c = 0; c<arrayDePalabrasFormateadas.length; c++){ //recorre todas las palabras de la busqueda
				if (arrPalabrasTemporales[b] == arrayDePalabrasFormateadas[c]){ //compara los dos recorridos anteriores
					var existe = false //resetea la variabla a falso 
					for (d = 0; d<arrPalabrasTemporales.length; d++){ //recorre el array donde se estan guardando las coincidencias
						if (tareasEncontradas[d]==tareasDondeBuscar[a]){ //si el nuevo elemento a añadir existe en los ya añadidos pone true
							existe=true 
						}
					}
					if (existe===false){ //solo agrega el elemento si no existe
						tareasEncontradas.push (tareasDondeBuscar[a])
					}
				}	
			}
		}
	}
	return tareasEncontradas
}

// Buscador de tarea por ID
var buscarPorId = function (id){
	for ( var i = 0; i<listadoDeTareas.length; i++){
		if (listadoDeTareas[i].id == id){
			break
		}
	}
	return listadoDeTareas[i]
}

//Enviar por local Storage un array objeto por objeto numerado
var enviarLocalStorage = function(array, arrOriginal){
	if(arrOriginal){
		for (var i=0; i<array.length; i++){
		var nombreObjeto = "tarea"+[i]
		localStorage.setItem(nombreObjeto, JSON.stringify(array[i]))
		}	
	} else if (!arrOriginal){
		for (var i=0; i<array.length; i++){
		var nombreObjeto = "tareaBusqueda"+[i]
		localStorage.setItem(nombreObjeto, JSON.stringify(array[i]))
		}
		for (var i=0; i<listadoDeTareas.length; i++){
		var nombreObjeto = "tarea"+[i]
		localStorage.setItem(nombreObjeto, JSON.stringify(listadoDeTareas[i]))
		}

	}

}

//Recibir por local Storage objetos y ponerlos en un array
var recibirLocalStorage = function (arrOriginal){
	if(arrOriginal){
		var localStorageArr = []
		for (var i=0; i<localStorage.length; i++){
		var nombreObjeto = "tarea"+[i]
		var objetoObtenido = JSON.parse(localStorage.getItem(nombreObjeto))
		localStorageArr.push(objetoObtenido)
		}
		//localStorage.clear()
		return localStorageArr
	} else if(!arrOriginal){
		var localStorageArrBusqueda = []
		for (var i=0; i<localStorage.length; i++){
			var nombreObjeto = "tareaBusqueda"+[i]
			var noExiste=localStorage.getItem(nombreObjeto)==null
			if(!noExiste){
				var objetoObtenido = JSON.parse(localStorage.getItem(nombreObjeto))
				localStorageArrBusqueda.push(objetoObtenido)
			}else{
			break	
			}
		}
		var localStorageArr = []
		for (var i=0; i<localStorage.length; i++){
			var nombreObjeto = "tarea"+[i]
			var noExiste = localStorage.getItem(nombreObjeto)==null
			if(!noExiste){
				var objetoObtenido = JSON.parse(localStorage.getItem(nombreObjeto))
				localStorageArr.push(objetoObtenido)
			}
		}
		//localStorage.clear()
		return [
		localStorageArrBusqueda,
		localStorageArr
		]
	}
}

//Funcion para actualizar local storage
var actualizarLocalStorage = function (arrAActualizar, arrOriginal){
	if(arrOriginal){
		localStorage.clear()
		for (var x=0; x<arrAActualizar.length; x++){
			var nombreObjeto = "tarea"+[x]
			//console.log(arrAActualizar[x])
			localStorage.setItem(nombreObjeto, JSON.stringify(arrAActualizar[x]))
			//console.log(localStorage)
		}	
	} else{
		alert("no es arr original")
	}
	return localStorage
}