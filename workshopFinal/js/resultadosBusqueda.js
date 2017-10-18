//Ejecutar la funcion que recibe un array de los objetos del local storage
var resultadosDeBusquedaLocalArr = recibirLocalStorage(false)
var resultadosDeBusquedaLocal = resultadosDeBusquedaLocalArr[0]
var listadoDeTareas = resultadosDeBusquedaLocalArr[1]
//Poner cuantos resultados se encontraron en el span
var cantidadDeTareas = document.getElementById("numeroDeResultados")
cantidadDeTareas.innerText=resultadosDeBusquedaLocal.length


//------DEFINICION DE VARIABLES IMPORTANTES -------
// Generar una Variable con el contenedor de tareas 
var listadoDeTareasDOM = document.getElementsByClassName("listadoDeTareas")
//Defino tarea de limpieza de dom
var limpiarDom = function (){
	listadoDeTareasDOM[0].innerHTML = ""
}
//Definir una variable para ir variando el orden Az o Za
var ordenDeTareasAz = false
//Definir una variable para ir variando el orden 09 o 90
var ordenDeTareas09 = false





// --------- MARCAR TAREAS CHECKEADAS ----------
var checkedBoxTarea = function (event){
	//Guardar el id del clic en una variable
	var idCheckedTotal = event.currentTarget.id
	var IdCheckedTarea = idCheckedTotal.substring(7)
	//Guardar la div en una variable
	var divSeleccionadaClic = document.getElementById(IdCheckedTarea)
	//Guardar el objeto en una variable
	var tareaIdClic = buscarPorId (IdCheckedTarea)
	if(!tareaIdClic.completado){
		cambioDeEstado(tareaIdClic.id, listadoDeTareas)
		cambioDeEstado(tareaIdClic.id, resultadosDeBusquedaLocal)
		divSeleccionadaClic.getElementsByTagName("span")[0].classList.remove("fa-square-o")
		divSeleccionadaClic.getElementsByTagName("span")[0].classList.remove("unCheckedBox")
		divSeleccionadaClic.getElementsByTagName("span")[0].classList.add("fa-check-square-o")
		divSeleccionadaClic.getElementsByTagName("span")[0].classList.add("CheckedBox")
		divSeleccionadaClic.classList.add("elementoDeListaHecho")

	} else{
		cambioDeEstado(tareaIdClic.id, listadoDeTareas)
		cambioDeEstado(tareaIdClic.id, resultadosDeBusquedaLocal)
		divSeleccionadaClic.getElementsByTagName("span")[0].classList.remove("fa-check-square-o")
		divSeleccionadaClic.getElementsByTagName("span")[0].classList.remove("CheckedBox")
		divSeleccionadaClic.getElementsByTagName("span")[0].classList.add("fa-square-o")
		divSeleccionadaClic.getElementsByTagName("span")[0].classList.add("unCheckedBox")
		divSeleccionadaClic.classList.add("elementoDeListaNoHecho")
	}
	document.getElementById("selectMostrarTareas").value = "mostrarTodas"
	mostrarSegunEstadoFiltro (resultadosDeBusquedaLocal)	
	//cambiar estado de hecho a no hecho en listado de tareas
	// cambiar iconito
	//cambiar clase de la caja
}



// --------- MOSTRAR TODAS/CHECK/UNCHECKED ----------
var selectMostrarTareas = document.getElementById("selectMostrarTareas");

var mostrarSegunEstadoFiltro = function (tareasAFiltrar){
    if(selectMostrarTareas.value=="mostrarTodas"){
		//borra todas las tareas viejas que se veian en el DOM
 		limpiarDom()
	 	//muestra todas las tareas disponibles incluyendo la que se acaba de agregar
 		mostrarTareasEnDom (tareasAFiltrar)
		//cierra el modal
    } else if(selectMostrarTareas.value=="mostrarCheck"){
    	//borra todas las tareas viejas que se veian en el DOM
    	limpiarDom()
    	//ejecuta una funcion que devuelve las tareas hechas y las guarda en un array
    	var tareasHechas = filtroDeTareasHechas (tareasAFiltrar)
    	// muestra este array
    	mostrarTareasEnDom (tareasHechas)
    } else if (selectMostrarTareas.value=="mostrarUnCheck"){
    	//borra todas las tareas viejas que se veian en el DOM
    	limpiarDom()
    	//ejecuta una funcion que devuelve las tareas hechas y las guarda en un array
    	var tareasNoHechas = filtroDeTareasSinRealizar (tareasAFiltrar)
    	// muestra este array
    	mostrarTareasEnDom (tareasNoHechas)
    }
}

selectMostrarTareas.onchange = function() {
	mostrarSegunEstadoFiltro (resultadosDeBusquedaLocal)
}






// --------- ELIMINAR UNA TAREA ----------
var eliminarUnaTareaAlClic = function (event){
	var idAEliminarTotal = event.currentTarget.id
	var idAEliminar = idAEliminarTotal.substring(7)
	var element = document.getElementsByClassName(idAEliminar);
	element[0].remove()
	eliminarUnaTarea (idAEliminar, listadoDeTareas)
	eliminarUnaTarea (idAEliminar, resultadosDeBusquedaLocal)
}




// --------- EDITAR UNA TAREA ----------
//Abrir modal box editar elemento
var abrirModalEditarElemento = function(){
	document.getElementById('modalBoxEditar').style.display='block'
}
//Cerrar Modal Box editar elemento
var cerrarModalEditarElemento = function (){
	document.getElementById('modalBoxEditar').style.display='none'
}
document.getElementById("closeModalEditar").addEventListener("click", cerrarModalEditarElemento)
document.getElementById("cancelModalEditar").addEventListener("click", cerrarModalEditarElemento)
// Editar el elemento en el que hago clic
var editarUnElementoAlClic = function (event){
	abrirModalEditarElemento()
	var mensajeDeErrorEditar = document.getElementById("mensajeDeErrorEditar")
	mensajeDeErrorEditar.innerText=""
	var idAEditarTotal = event.currentTarget.id
	var idAEditar = idAEditarTotal.substring(7)
	var objetoId = buscarPorId(idAEditar)
	var formEditarTarea = document.getElementById("formEditarTarea")
	formEditarTarea[1].value = objetoId.titulo
    formEditarTarea[2].value = objetoId.descripcion
    formEditarTarea[4].value = objetoId.id	
}
// Ejecutar el editar elemento y mostrar el resultado en el DOM
formEditarTarea.onsubmit = function (event){
	if (formEditarTarea[1].value=="" ||formEditarTarea[2].value=="" ){
	 	mensajeDeErrorEditar.innerText="Debe ingresar un texto"
	} else{
		mensajeDeErrorEditar.innerText=""
		editarTarea (formEditarTarea[4].value, formEditarTarea[1].value, formEditarTarea[2].value, listadoDeTareas)
		editarTarea (formEditarTarea[4].value, formEditarTarea[1].value, formEditarTarea[2].value, resultadosDeBusquedaLocal)
		var tituloAModificar = document.getElementsByClassName (formEditarTarea[4].value)[0].getElementsByTagName("h2")[0]
		var descripcionAModificar = document.getElementsByClassName (formEditarTarea[4].value)[0].getElementsByTagName("p")[1]
		tituloAModificar.innerText = formEditarTarea[1].value
		descripcionAModificar.innerText = formEditarTarea[2].value
		cerrarModalEditarElemento()
	}
	event.preventDefault();
}


// ---------- FUNCION PARA MOSTRAR COSAS -----------
var mostrarTareasEnDom = function (tareasAMostrar){
	for (var i = 0; i<tareasAMostrar.length; i++){
		// crea la div donde se va a ver el elemtno y le agrega id y clases
	 	var divDeElemento = document.createElement('div')
	 	divDeElemento.classList.add("elementoDeLista");
	 	divDeElemento.classList.add(tareasAMostrar[i].id);
	 	divDeElemento.id = tareasAMostrar[i].id
	 	//llena la div de contenido (poniendo el titulo y la descripcion cargadas anteriormente en el form y poniendole id al boton de editar y de borrar)
	 	divDeElemento.innerHTML = "<span class='control fa-3x' id='checked"+tareasAMostrar[i].id+"'></span>\
				<h2 class='tituloElemento'>"+tareasAMostrar[i].titulo+"</h2> \
				<p class='horarioDeCreacion'>"+tareasAMostrar[i].momentoDeCreacion+"</p>\
				<p class='descripcionElemento'>"+tareasAMostrar[i].descripcion+"</p>\
				<div class='botonesElemento'>\
					<i class='fa fa-pencil  fa-2x' id='editar-"+tareasAMostrar[i].id+"'></i>\
					<i class='fa fa-minus-circle -o fa-2x' id='borrar-"+tareasAMostrar[i].id+"'></i>\
				</div>"
		// inserta el elemento en el DOM
		listadoDeTareasDOM[0].appendChild(divDeElemento)
		// Asignar las clases correspondientes al span segun corresponda
		if(!tareasAMostrar[i].completado){
			divDeElemento.getElementsByTagName("span")[0].classList.remove("fa-check-square-o")
			divDeElemento.getElementsByTagName("span")[0].classList.remove("CheckedBox")
			divDeElemento.getElementsByTagName("span")[0].classList.add("fa-square-o")
			divDeElemento.getElementsByTagName("span")[0].classList.add("unCheckedBox")
			divDeElemento.classList.add("elementoDeListaNoHecho")
		} else{
			divDeElemento.getElementsByTagName("span")[0].classList.remove("fa-square-o")
			divDeElemento.getElementsByTagName("span")[0].classList.remove("unCheckedBox")
			divDeElemento.getElementsByTagName("span")[0].classList.add("fa-check-square-o")
			divDeElemento.getElementsByTagName("span")[0].classList.add("CheckedBox")
			divDeElemento.classList.add("elementoDeListaHecho")
		}
		//guarda en una variable el id de cada boton que asigné antes
		var IdChecked = "checked"+tareasAMostrar[i].id
		var IdEditar = "editar-"+tareasAMostrar[i].id
		var IdEliminar = "borrar-"+tareasAMostrar[i].id
		//guarda los botones en variables y les añade event listener
		var botonChecked = document.getElementById(IdChecked)
		botonChecked.addEventListener('click', checkedBoxTarea)
		var botonEditar = document.getElementById(IdEditar)
		botonEditar.addEventListener('click', editarUnElementoAlClic)
		var botonBorrar = document.getElementById(IdEliminar)
		botonBorrar.addEventListener('click', eliminarUnaTareaAlClic)
	}
}

//mostrar los resultados
mostrarTareasEnDom(resultadosDeBusquedaLocal)

// --------- ORDENAR ALFABETICAMENTE ----------
//Definir funcion de orden alfabetico
var OrdenarAlfabeticamente = function (){
	//tareasActuales = []
	//arrayDeElementosActuales = listadoDeTareasDOM[0].getElementsByClassName("elementoDeLista")
	//for (i=0; i<algo.length; i++){

	//}
	if (ordenDeTareasAz == false) {
		ordenarAz (resultadosDeBusquedaLocal)
		ordenDeTareasAz = true
	} else {
		ordenarZa (resultadosDeBusquedaLocal)
		ordenDeTareasAz = false
	}
	mostrarSegunEstadoFiltro (resultadosDeBusquedaLocal)
	ordenDeTareas09 = false
}
//Ponerle event listener al boton
var botonOrdenarAz = document.getElementById("ordenarAz")
botonOrdenarAz.addEventListener('click', OrdenarAlfabeticamente)




// --------- ORDENAR POR ID ----------
//Definir funcion de orden por ID
var OrdenarPorOrdenDeCreacion = function (){
	//tareasActuales = []
	//arrayDeElementosActuales = listadoDeTareasDOM[0].getElementsByClassName("elementoDeLista")
	//for (i=0; i<algo.length; i++){

	//}
	if (ordenDeTareas09 == false) {
		ordenarIdMenor (resultadosDeBusquedaLocal)
		ordenDeTareas09 = true
	} else {
		ordenarIdMayor (resultadosDeBusquedaLocal)
		ordenDeTareas09 = false
	}
	mostrarSegunEstadoFiltro (resultadosDeBusquedaLocal)
	ordenDeTareasAz = false
}
//Ponerle event listener al boton
var botonOrdenar09 = document.getElementById("ordenar09")
botonOrdenar09.addEventListener('click', OrdenarPorOrdenDeCreacion)





// ------------ VOLVER AL INDEX, SALIR DE LA BÚSQUEDA -------------

var volverAlIndex = function(){
	actualizarLocalStorage(listadoDeTareas, true)
	document.location.href = "index.html";
}
//Ponerle event listener al boton
var botonVolver = document.getElementById("volver")
botonVolver.addEventListener('click', volverAlIndex)
