//Se declaran las variables
//Precio de compra
const PRECIO = 20;
//Porcentaje del IVA
const PORCENTAJE_IVA = 0.13;

//Se ocupa para verificar que el campo Nombre este completo
function nameU(inputNombre) {
    //Se extrae el valor del nombre
    var nombre = inputNombre.value;
    //Se extrae la label donde se colocara el nombre
    var labelNombre = document.getElementById("nombre");
    //Se extraen unos Input que se ocuparan
    var inputPlataforma = document.getElementById("slctPlataforma");
    var inputCantidad = document.getElementById("txtCantidad");
    var inputCorreo = document.getElementById("txtCorreo");
    //Se verifica que el nombre no este vacio
    if (nombre != "") {
        labelNombre.innerHTML = "Nombre: " + nombre;
        //Se el campo correo y nombre no estan vacios, se desbloquea el campo Plataforma
        if ( nombre != "" && inputCorreo.value != "" ) {
            inputPlataforma.disabled = false;
            desbloquearCantidadesSiPlataformaSeleccionada(inputPlataforma, inputCantidad);
        }
    }else{
        labelNombre.innerHTML = "Nombre: No ingresado";
        inputPlataforma.disabled = true;
        inputCantidad.disabled = true;
        cancelarCompra();
    }
}

//Se ocupa para verificar que el campo de correo este lleno
function correoU(inputCorreo) {
    //Se extraen los input que se ocuparan el operacion
    var labelCorreo = document.getElementById("correo");
    var inputPlataforma = document.getElementById("slctPlataforma");
    var inputCantidad = document.getElementById("txtCantidad");
    var inputNombre = document.getElementById("txtCliente");
    //Se extrae el valor del campo correo
    var correo = inputCorreo.value;
    //Se verifica que no este vacio el campo
    if (correo != "") {
        labelCorreo.innerHTML = "Correo del titular: " + correo;
        //Si los campos correo y nombres estan llenos se puede realizar el siguiente paso
        if ( correo != "" && inputNombre.value != "" ) {
            inputPlataforma.disabled = false;
            desbloquearCantidadesSiPlataformaSeleccionada(inputPlataforma, inputCantidad);
        }
    }else{
        labelCorreo.innerHTML = "Correo del titular: No ingresado";
        inputPlataforma.disabled = true;
        inputCantidad.disabled = true;
        cancelarCompra();
    }
}

//Sirve para verificar que al elegir una plataforma, se habilite la cantidad
function disableCantidad(inputPlataforma) {
    //Se extraen los input ha ocupar
    var cantidad = document.getElementById("txtCantidad");
    //Se extrae el valor de la plataforma
    var plataforma = inputPlataforma.value;
    //Se verifica que plataforma no este vacio
    if (plataforma != "") {
        cantidad.disabled = false;
        cancelarCompra();
    }else{
        cantidad.disabled = true;
        cancelarCompra();
    }
}

//+++++++++ I M P O R T A N T E ++++++++++
//Es donde se lleva a cabo la cotizacion
function cotizacion(inputCantidad) {
    //Se extrae la cantidad inicial
    var cantidad = inputCantidad.value;
    //Se declaran las variables a ocupar en el procedimiento
    var subtotal, iva, total;
    //Se extraen las label donde se colocan los datos
    var inputSubtotal = document.getElementById("subtotal");
    var inputIva = document.getElementById("iva");
    var inputTotal = document.getElementById("total");
    //Se extrae el boton de comprar
    var btnComprar = document.getElementById("btnComprar");
    //Se extrae el boton de cotizar
    var btnCotizar = document.getElementById("btnCotizar");
    //Se extrae la plataforma seleccionada
    var plataforma = document.getElementById("slctPlataforma").value;
    //Se extraen las existencias de las tiendas
    var cantidadSteam = document.getElementById("existencias_steam").innerHTML;
    var cantidadEpic = document.getElementById("existencias_epic").innerHTML;
    var cantidadEshop = document.getElementById("existencias_nintendo").innerHTML;
    //Se declaran los errores
    var errores = false;
    //Se valida si cantidad es un numero y mayor a 0
    if ( cantidad >= 0 && !isNaN(cantidad) ) {
        //Procedimiento
        subtotal = cantidad * PRECIO;
        iva = subtotal * PORCENTAJE_IVA;
        total = subtotal + iva;
        //Se validan las existencias
        switch (plataforma) {
            case "Steam":
                if ( cantidad <= parseInt(cantidadSteam) ) {
                    errores = false;
                }else{
                    errores = true;
                }
            break;
            case "Epic Game Store":
                if ( cantidad <= parseInt(cantidadEpic) ) {
                    errores = false;
                }else{
                    errores = true;
                }
            break;
            case "Nintendo eShop":
                if ( cantidad <= parseInt(cantidadEshop) ) {
                    errores = false;
                }else{
                    errores = true;
                }
            break;
            default:
                if ( cantidad == 0 ) {
                    errores = false;
                }else{
                    errores = true;
                }
            break;
        }
    }else{
        errores = true;
    }

    if (errores) {
        alert("Error: Has ingresado cantidades no validas a la existencia.");
        cancelarCompra();
    }else{
        inputSubtotal.innerHTML = "Subtotal: $" + subtotal.toFixed(2);
        inputIva.innerHTML = "Iva aplicado: $" + iva.toFixed(2);
        inputTotal.innerHTML = "Total: $" + total.toFixed(2);
        if ( cantidad == 0 ) {
            btnComprar.disabled = true;
            btnCotizar.disabled = true;
        }else{
            btnComprar.disabled = false;
            btnCotizar.disabled = false;
        }
    }
}

//Funcion para realizar la compra del producto
function compra() {
    //Se extraen las existencias de los productos
    var cantidadSteam = document.getElementById("existencias_steam");
    var cantidadEpic = document.getElementById("existencias_epic");
    var cantidadEshop = document.getElementById("existencias_nintendo");
    var cantidadTotal = document.getElementById("existencias_total");
    //Se extraen las cantidades a comprar
    var Inputcantidad = document.getElementById("txtCantidad");
    var cantidad = Inputcantidad.value;
    //Se extrae cual plataforma se esta ocupando
    var plataformaSeleccionada = document.getElementById("slctPlataforma").value;
    //Se declara una variable a ocupar
    var texto;
    //Se busca a cual plataforma comprara para poder manipular los datos y restar las existencias
    switch ( plataformaSeleccionada ) {
        case "Steam":
            texto = cantidadSteam.innerHTML - cantidad;
            cantidadSteam.innerHTML = texto;     
        break;
        case "Epic Game Store":
            texto = cantidadEpic.innerHTML - cantidad;
            cantidadEpic.innerHTML = texto;    
        break;
        case "Nintendo eShop":
            texto = cantidadEshop.innerHTML - cantidad;
            cantidadEshop.innerHTML = texto;    
        break;
        default:
            break;
    }
    //Se verifica que la compra sea de un producto mayor a 0
    if ( cantidad > 0 ) {
        alert("Su pedido se ha registrado con exito.");
        texto = cantidadTotal.innerHTML - cantidad;
        cantidadTotal.innerHTML = texto;
    }else{
        alert("La cantidad ingresada es cero, por lo tanto no se puede realizar la compra.");
    }
    //Se vuelve a poner en cero la cantidad y se bloquea la opcion de comprar
    cancelarCompra();
}

//Funcion para cancelar la compra
function cancelarCompra() {
    var inputCantidad = document.getElementById("txtCantidad");
    inputCantidad.value = 0;
    cotizacion(inputCantidad);
}

//Funcion para iniciar las cantidades si ya se escogio una plataforma
function desbloquearCantidadesSiPlataformaSeleccionada(inputPlataforma, inputCantidad) {
    if (inputPlataforma.value != "") {
        inputCantidad.disabled = false;
    }
}