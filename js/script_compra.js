const PRECIO = 20;
const PORCENTAJE_IVA = 0.13;

function nameU(inputNombre) {
    var nombre = inputNombre.value;
    var labelNombre = document.getElementById("nombre");
    var inputPlataforma = document.getElementById("slctPlataforma");
    var inputCantidad = document.getElementById("txtCantidad");
    var inputCorreo = document.getElementById("txtCorreo");
    var btnCerrar = document.getElementById("btnComprar");

    if (nombre != "") {
        labelNombre.innerHTML = "Nombre: " + nombre;
        if ( nombre != "" && inputCorreo.value != "" ) {
            inputPlataforma.disabled = false;
            inputCantidad.disabled = false;
        }
    }else{
        labelNombre.innerHTML = "Nombre: No ingresado";
        inputPlataforma.disabled = true;
        inputCantidad.disabled = true;
        inputCantidad.value = 0;
        cotizacion(cantidad);
        btnCerrar.disabled = true;
    }
}

function correoU(inputCorreo) {
    var labelCorreo = document.getElementById("correo");
    var inputPlataforma = document.getElementById("slctPlataforma");
    var inputCantidad = document.getElementById("txtCantidad");
    var inputNombre = document.getElementById("txtCliente");
    var btnCerrar = document.getElementById("btnComprar");
    var correo = inputCorreo.value;

    if (correo != "") {
        labelCorreo.innerHTML = "Correo del titular: " + correo;
        if ( correo != "" && inputNombre != "" ) {
            inputPlataforma.disabled = false;
            inputCantidad.disabled = false;
        }
    }else{
        labelCorreo.innerHTML = "Correo del titular: No ingresado";
        inputPlataforma.disabled = true;
        inputCantidad.disabled = true;
        inputCantidad.value = 0;
        cotizacion(cantidad);
        btnCerrar.disabled = true;
    }
}

function disableCantidad(inputPlataforma) {
    var cantidad = document.getElementById("txtCantidad");
    var btnComprar = document.getElementById("btnComprar");
    var plataforma = inputPlataforma.value;

    if (plataforma != "") {
        cantidad.disabled = false;
        cantidad.value = 0;
        cotizacion(cantidad);
    }else{
        cantidad.disabled = true;
        cantidad.value = 0;
        cotizacion(cantidad);
        btnComprar.disabled = true;
    }
}

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
                errores = true;
            break;
        }
    }else{
        errores = true;
    }

    if (errores) {
        alert("Error: Has ingresado cantidades no validas a la existencia.");
        inputCantidad.value = 0;
        cotizacion(inputCantidad);
        btnComprar.disabled = true;
    }else{
        inputSubtotal.innerHTML = "Subtotal: " + subtotal.toFixed(2);
        inputIva.innerHTML = "Iva aplicado: " + iva.toFixed(2);
        inputTotal.innerHTML = "Total: " + total.toFixed(2);
        btnComprar.disabled = false;
    }
}

function compra() {
    var cantidadSteam = document.getElementById("existencias_steam");
    var cantidadEpic = document.getElementById("existencias_epic");
    var cantidadEshop = document.getElementById("existencias_nintendo");
    var cantidadTotal = document.getElementById("existencias_total");
    var Inputcantidad = document.getElementById("txtCantidad");
    var cantidad = Inputcantidad.value;
    var texto;
    var plataformaSeleccionada = document.getElementById("slctPlataforma").value;

    if ( plataformaSeleccionada == "Steam" ) {
        texto = cantidadSteam.innerHTML - cantidad;
        cantidadSteam.innerHTML = texto; 
    }else if( plataformaSeleccionada == "Epic Game Store" ){
        texto = cantidadEpic.innerHTML - cantidad;
        cantidadEpic.innerHTML = texto;
    }else if( plataformaSeleccionada == "Nintendo eShop" ){
        texto = cantidadEshop.innerHTML - cantidad;
        cantidadEshop.innerHTML = texto;
    }
    Inputcantidad.value = 0;
    cotizacion(Inputcantidad);
    alert("Su pedido se ha registrado con exito.");
}