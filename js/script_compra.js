const PRECIO = 20;
const PORCENTAJE_IVA = 0.13;

function nameU(inputNombre) {
    var nombre = inputNombre.value;
    var labelNombre = document.getElementById("nombre");

    if (nombre != "") {
        labelNombre.innerHTML = "Nombre: " + nombre;
    }else{
        labelNombre.innerHTML = "No hay datos ingresados";
    }
}

function correoU(inputCorreo) {
    var labelCorreo = document.getElementById("correo");
    var correo = inputCorreo.value;

    if (correo != "") {
        labelCorreo.innerHTML = "Correo del titular: " + correo;
    }else{
        labelCorreo.innerHTML = "No hay datos ingresados.";
    }
}

function cotizacion(inputCantidad) {
    var cantidad = inputCantidad.value;
    var subtotal, iva, total;
    var inputSubtotal = document.getElementById("subtotal");
    var inputIva = document.getElementById("iva");
    var inputTotal = document.getElementById("total");
    var btnComprar = document.getElementById("btnComprar");

    subtotal = cantidad * PRECIO;
    iva = subtotal * PORCENTAJE_IVA;
    total = subtotal + iva;
    if (!isNaN(cantidad)) {
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
    var cantidad = document.getElementById("txtCantidad").value;
    var texto;
    var plataformaSeleccionada = document.getElementById("slctPlataforma").value;

    if ( plataformaSeleccionada == "Steam" ) {
        texto = cantidadSteam.innerHTML - cantidad;
        cantidadSteam.innerHTML = texto; 
    }
    alert("Su pedido se ha registrado con exito.");
}