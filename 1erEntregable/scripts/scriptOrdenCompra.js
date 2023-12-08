function crearOrden(pNumero, pFechaEmision, pFechaEntrega, pInfoRecepcion, pProveedor, pProducto, pCantidad,
    pTotal){
    let producto = {
        numero: pNumero,
        fechaEmision: pFechaEmision,
        fechaEntrega: pFechaEntrega,
        infoRecepcion: pInfoRecepcion,
        proveedor: pProveedor,
        producto: pProducto,
        cantidad: pCantidad,
        total: pTotal
    }

    return producto;
}

function submitOrden(){
    cargarOrden();

    //lo redirijo a productos.html
       
}

function cargarOrden(){
    //obtengo los datos
    let numero = document.getElementById("numInput").value; 
    let fechaEmision = document.getElementById("fechaEmisionInput").value; 
    let fechaEntrega = document.getElementById("fechaEntregaInput").value; 
    let dir = document.getElementById("dirInput").value; 
    let proveedor = document.getElementById("proveedorInput").value; 
    let producto = document.getElementById("productoInput").value; 
    let cantidad = document.getElementById("cantInput").value; 
    let precio = document.getElementById("precioInput").value; 

    let orden = crearOrden(numero, fechaEmision, fechaEntrega, dir, proveedor, producto, cantidad, precio);

    //obtener la info del LocalStorage "productos"
    let ordenesCompra = JSON.parse(window.localStorage.getItem("ordenesCompra"));

    //si es null creo un nuevo arreglo 
    if(ordenesCompra === null)
    {
        ordenesCompra = [orden];
    }else{
        //si no es null hago un push del producto actual y vuelvo a guardar el LocalStorage
        ordenesCompra.push(orden);
    }

    //guardo todo en el LocalStorage denuevo
    window.localStorage.setItem("ordenesCompra", JSON.stringify(ordenesCompra));
    
}

console.log(JSON.parse(window.localStorage.getItem("ordenesCompra")));