

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
//Guardo en una variable los contadores
var contadorDeTareasTotal = document.getElementById("contadorTareasTotal")
var contadorDeTareasHechas = document.getElementById("contadorTareasHechas")
var emojiContadorDeTareas = document.getElementById("emojiContadorDeTareas")
var tareasHechasTexto = document.getElementById("tareasHechasTexto")




// --------- CREAR Y MOSTRAR ELEMENTOS ----------
//Abrir modal box agregar elemento
var abrirModalAgregarElemento = function(){
	document.getElementById('modalBoxAgregar').style.display='block'
	mensajeDeErrorAgregar.innerText=""
	}
document.getElementById("openModalAgregar").addEventListener("click", abrirModalAgregarElemento)

//Cerrar Modal Box agregar elemento
var cerrarModalAgregarElemento = function (){
	document.getElementById('modalBoxAgregar').style.display='none'
	formAgregarTarea[1].value = ""
   	formAgregarTarea[2].value = ""
}
document.getElementById("closeModalAgregar").addEventListener("click", cerrarModalAgregarElemento)
document.getElementById("cancelModalAgregar").addEventListener("click", cerrarModalAgregarElemento)
var formAgregarTarea = document.getElementById("formAgregarTarea")
var mensajeDeErrorAgregar = document.getElementById("mensajeDeErrorAgregar")
formAgregarTarea.onsubmit = function (event){
	//Guarda los datos que inserte en el form en variables
	var elementoTitulo = formAgregarTarea[1].value
    var elementoDescripcion = formAgregarTarea[2].value
    //Si no puse nada muestra error
	if (elementoTitulo=="" || elementoDescripcion=="" ){
	 	mensajeDeErrorAgregar.innerText="Debe ingresar un texto"
	} else{
		//limpia el mensaje de error
	 	mensajeDeErrorAgregar.innerText=""
	 	//agrega el elemento al array
	 	agregarTarea(elementoTitulo, elementoDescripcion)
	 	//borra todas las tareas viejas que se veian en el DOM
	 	limpiarDom()
	 	//muestra todas las tareas disponibles incluyendo la que se acaba de agregar
	 	mostrarTareasEnDom (listadoDeTareas)
	 	//cambia el valor seleccionado en el selec a "Todas" ya que por defecto cuando se crea una tarea no esta checkeada y sino no se vería
		document.getElementById("selectMostrarTareas").value = "mostrarTodas"
		//cierra el modal
	 	cerrarModalAgregarElemento()
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
	actualizarContadorDeTareas()
}



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
		divSeleccionadaClic.getElementsByTagName("span")[0].classList.remove("fa-square-o")
		divSeleccionadaClic.getElementsByTagName("span")[0].classList.remove("unCheckedBox")
		divSeleccionadaClic.getElementsByTagName("span")[0].classList.add("fa-check-square-o")
		divSeleccionadaClic.getElementsByTagName("span")[0].classList.add("CheckedBox")
		divSeleccionadaClic.classList.add("elementoDeListaHecho")

	} else{
		cambioDeEstado(tareaIdClic.id, listadoDeTareas)
		divSeleccionadaClic.getElementsByTagName("span")[0].classList.remove("fa-check-square-o")
		divSeleccionadaClic.getElementsByTagName("span")[0].classList.remove("CheckedBox")
		divSeleccionadaClic.getElementsByTagName("span")[0].classList.add("fa-square-o")
		divSeleccionadaClic.getElementsByTagName("span")[0].classList.add("unCheckedBox")
		divSeleccionadaClic.classList.add("elementoDeLista", "elementoDeListaNoHecho")
	}
	document.getElementById("selectMostrarTareas").value = "mostrarTodas"
	mostrarSegunEstadoFiltro (listadoDeTareas)
	actualizarContadorDeTareas()
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
	mostrarSegunEstadoFiltro (listadoDeTareas)
}






// --------- ELIMINAR UNA TAREA ----------
var eliminarUnaTareaAlClic = function (event){
	var idAEliminarTotal = event.currentTarget.id
	var idAEliminar = idAEliminarTotal.substring(7)
	var element = document.getElementsByClassName(idAEliminar);
	element[0].remove()
	eliminarUnaTarea (idAEliminar, listadoDeTareas)
	actualizarContadorDeTareas()
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
		var tituloAModificar = document.getElementsByClassName (formEditarTarea[4].value)[0].getElementsByTagName("h2")[0]
		var descripcionAModificar = document.getElementsByClassName (formEditarTarea[4].value)[0].getElementsByTagName("p")[1]
		tituloAModificar.innerText = formEditarTarea[1].value
		descripcionAModificar.innerText = formEditarTarea[2].value
		cerrarModalEditarElemento()
	}
	event.preventDefault();
}




// --------- ELIMINAR TODAS LAS TAREAS ----------
//Abrir modal box editar elemento
var abrirModalEliminarTodo = function(){
	document.getElementById('modalBoxEliminarTodo').style.display='block'
}
//Cerrar Modal Box editar elemento
var cerrarModaleEliminarTodo = function (){
	document.getElementById('modalBoxEliminarTodo').style.display='none'
}
document.getElementById("closeModalEliminarTodo").addEventListener("click", cerrarModaleEliminarTodo)
document.getElementById("cancelModalEliminarTodo").addEventListener("click", cerrarModaleEliminarTodo)
var eliminarTodoAlClic = function (event){
	if (listadoDeTareas==""){
		alert("no tenes tareas para eliminar")
	} else{
	abrirModalEliminarTodo()
}	}
formEliminarTodo.onsubmit = function (event){
	eliminarTodasLasTareas()
	limpiarDom()
	actualizarContadorDeTareas()
	event.preventDefault();
	ordenDeTareasAz = false
	//cambia el valor seleccionado en el selec a "Todas" ya que no tiene ninguna tarea
	document.getElementById("selectMostrarTareas").value = "mostrarTodas"
	cerrarModaleEliminarTodo ()
}
//Ponerle event listener al boton
var botonEliminarTodo = document.getElementById("eliminarTodo")
botonEliminarTodo.addEventListener('click', eliminarTodoAlClic)





// --------- ORDENAR ALFABETICAMENTE ----------
//Definir funcion de orden alfabetico
var OrdenarAlfabeticamente = function (){
	//tareasActuales = []
	//arrayDeElementosActuales = listadoDeTareasDOM[0].getElementsByClassName("elementoDeLista")
	//for (i=0; i<algo.length; i++){

	//}
	if (ordenDeTareasAz == false) {
		ordenarAz (listadoDeTareas)
		ordenDeTareasAz = true
	} else {
		ordenarZa (listadoDeTareas)
		ordenDeTareasAz = false
	}
	mostrarSegunEstadoFiltro (listadoDeTareas)
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
		ordenarIdMenor (listadoDeTareas)
		ordenDeTareas09 = true
	} else {
		ordenarIdMayor (listadoDeTareas)
		ordenDeTareas09 = false
	}
	mostrarSegunEstadoFiltro (listadoDeTareas)
	ordenDeTareasAz = false
}
//Ponerle event listener al boton
var botonOrdenar09 = document.getElementById("ordenar09")
botonOrdenar09.addEventListener('click', OrdenarPorOrdenDeCreacion)




// --------- BUSCADOR DE TAREAS ----------
//Guardar el formulario de busqueda en una variable
var formBusqueda = document.getElementById("formBusqueda")
//Armar funcion para cierre de busqueda
var cerrarBusqueda = function (){
	limpiarDom()
	mostrarTareasEnDom (listadoDeTareas)
}
var inputFormBusqueda = document.getElementById("inputFormBusqueda")
//Generar Acciones cuando se aprieta la lupa
formBusqueda.onsubmit = function (event){
	//Guarda las palabras que inserto en el buscador
	var palabrasABuscar = formBusqueda[0].value
    //Si no pone nada muestra error
	var mensajeDeErrorBusqueda = document.getElementById("mensajeDeErrorBusqueda")
	if (palabrasABuscar==""){
	 	inputFormBusqueda.placeholder="Debe ingresar un texto"
	} else{
		//limpia el mensaje de error
	 	mensajeDeErrorBusqueda.innerText=""
	 	//agrega el elemento al array
	 	var tareasEncontradas = buscadorDeTareas (palabrasABuscar, listadoDeTareas)
	 	/*//borra todas las tareas viejas que se veian en el DOM
	 	limpiarDom()
	 	// Agregar en el Dom un texto para aclarar que se esta en resultado de busqueda y la opcion de cerrar la busqueda
	 	var divDeBusqueda = document.createElement('div')
	 	divDeBusqueda.classList.add("resultadoDeBusqueda");
	 	divDeBusqueda.id = "resultadoDeBusqueda"
	 	//llena la div de contenido (poniendo el titulo y la descripcion cargadas anteriormente en el form y poniendole id al boton de editar y de borrar)
	 	divDeBusqueda.innerHTML = "<h4 class='tituloResultadoBusqueda'> Resultados de busqueda: </h4>\
									<i class='fa fa-times' aria-hidden='true' id='cerrarResultadoDeBusqueda'></i>"
		// inserta el elemento en el DOM
		listadoDeTareasDOM[0].appendChild(divDeBusqueda)
		// darle funcionalidad al cierre de la busqueda
		var botonCerrarBusqueda = document.getElementById("cerrarResultadoDeBusqueda")
		botonCerrarBusqueda.addEventListener('click', cerrarBusqueda)
	 	//muestra las tareas encontradas y si no hay un msj*/
	 	if (tareasEncontradas==""){
	 		inputFormBusqueda.placeholder="No hay coincidencia"
	 		inputFormBusqueda.value=""
	 	}else{
	 		enviarLocalStorage(tareasEncontradas, false)
            document.location.href = "resultadosBusqueda.html";
	 	}
	}
	event.preventDefault();
}

//Cargo si hay tareas en LocalStorage y las muestro en el DOM
var listadoDeTareas = recibirLocalStorage(true)

//Funcion para actualizar el contador de tareas hechas y totales
var actualizarContadorDeTareas = function(){
	contadorDeTareasTotal.innerText=listadoDeTareas.length 
	var cantidadDeTareasHechas = filtroDeTareasHechas(listadoDeTareas)
	contadorDeTareasHechas.innerText=cantidadDeTareasHechas.length+ "/"
	var porcentajeCompletado = cantidadDeTareasHechas.length/listadoDeTareas.length
	tareasHechasTexto.innerText = "tareas hechas"
	//console.log(porcentajeCompletado)
	if (porcentajeCompletado>=0 && porcentajeCompletado<=0.2555555555555){
		emojiContadorDeTareas.src="img/iconos/unsure.svg"
		//console.log("mayor a 0 y menor o igual que 0.33")
	} else if(porcentajeCompletado>0.2555555555555 && porcentajeCompletado<= 0.499999999999999){
		emojiContadorDeTareas.src="img/iconos/meh.svg"
		//console.log("mayor a 0.33 y menor o igual que 0.66")
	} else if ( porcentajeCompletado>0.499999999999999 && porcentajeCompletado<1){
		emojiContadorDeTareas.src="img/iconos/happy.svg"
		//console.log("mayor a 0.66 y menor a 1")
	} else if (porcentajeCompletado==1){
		emojiContadorDeTareas.src="img/iconos/awesome.svg"
		//console.log("1")
	} else{
		emojiContadorDeTareas.src="img/iconos/sad.svg"
		//console.log("no hay tareas")
		contadorDeTareasHechas.innerText=""
		contadorDeTareasTotal.innerText=""
		tareasHechasTexto.innerText = "carga una tarea!"
	}
}

mostrarTareasEnDom (listadoDeTareas)

