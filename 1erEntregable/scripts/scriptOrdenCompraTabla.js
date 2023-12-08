function cargarOrdenesCompraTabla(){
    let tabla = document.getElementById("listaProductos");
    let arrayOrdenes = JSON.parse(window.localStorage.getItem("ordenesCompra"));
    let contadorTD = 0;
    let row = document.createElement("section");
    row.className="row";

    for(let i=0; i<arrayOrdenes.length; i++){
        
        let orden = crearTdOrden(arrayOrdenes[i], i);
        if(contadorTD == 3)
        {
            //si el contador es igual a 3 tengo que cargar la fila anterior y crear una nueva
            tabla.appendChild(row);
            row = document.createElement("section");
            row.className="row";
            contadorTD = 0;
        }
        
        row.appendChild(orden);
        contadorTD++;
    }
    tabla.appendChild(row);
}

//devuelve un td
function crearTdOrden(orden, posicion){
    let col = document.createElement("div");
    col.className = "col-md-4";

    let card = document.createElement("div");
    card.className = "card text-dark bg-light";
    card.style.border = "solid rgb(171, 171, 171) 0.05em";
    card.style.borderRadius = "1em";
    card.style.padding = "1em";
    card.style.margin = "1em";

    let cardBody = document.createElement("div");
    card.className = "card-body";

    let numero = document.createElement("h5");
    numero.appendChild(document.createTextNode("N° de orden: "+orden.numero));

    let fechaEmision = document.createElement("p");
    fechaEmision.appendChild(document.createTextNode("Fecha de emisión: "+orden.fechaEmision));

    let fechaEntrega = document.createElement("p");
    fechaEntrega.appendChild(document.createTextNode("Fecha de entrega esperada: "+orden.fechaEntrega));

    let infoRecepcion = document.createElement("p");
    infoRecepcion.appendChild(document.createTextNode("Información de recepción (dirección): "+orden.infoRecepcion));

    let proveedor = document.createElement("p");
    proveedor.appendChild(document.createTextNode("Proveedor: "+orden.proveedor));

    let producto = document.createElement("p");
    producto.appendChild(document.createTextNode("Producto: "+orden.producto));
    
    let cantidad = document.createElement("p");
    cantidad.appendChild(document.createTextNode("Cantidad: "+orden.cantidad));

    let total = document.createElement("p");
    total.appendChild(document.createTextNode("Total: $"+orden.total));

    let boton = crearBoton(posicion);

    let line = document.createElement("hr");

    //agrego los elementos al card
    cardBody.appendChild(numero);
    cardBody.appendChild(line);
    cardBody.appendChild(fechaEmision);
    cardBody.appendChild(fechaEntrega);
    cardBody.appendChild(infoRecepcion);
    cardBody.appendChild(proveedor);
    cardBody.appendChild(producto);
    cardBody.appendChild(cantidad);
    cardBody.appendChild(total);
    cardBody.appendChild(boton);
    

    card.appendChild(cardBody);
    col.appendChild(card);

    return col;
}

function crearBoton(posicion){
    let boton = document.createElement("button");
    boton.type = "button";
    boton.className = "btn btn-danger btn-sm";
    boton.value = posicion;
    boton.innerHTML = "Eliminar";

    //agrego funcion para eliminar
    boton.addEventListener("click", function() {
        //elimino la orden del localStorage
        eliminarOrdenCompra(posicion);        
    
        //vuelvo a cargar la pagina para mostrar los cambios
        location.href = "ordenCompra.html";
    });

    return boton;
}

function eliminarOrdenCompra(posicion){
    let arrayOrdenes = JSON.parse(window.localStorage.getItem("ordenesCompra"));
    let nuevoArray = [];

    //guardo todos los elementos en un nuevo array menos el de la posicion a eliminar
    for(let i=0; i<arrayOrdenes.length; i++){
        if(i !== posicion)
        {
            nuevoArray.push(arrayOrdenes[i]);
        }
    }

    //guardo el array en el localStorage
    window.localStorage.setItem("ordenesCompra", JSON.stringify(nuevoArray));
}

/*
producto = {
        numero: pNumero,
        fechaEmision: pFechaEmision,
        fechaEntrega: pFechaEntrega,
        infoRecepcion: pInfoRecepcion,
        proveedor: pProveedor,
        producto: pProducto,
        cantidad: pCantidad,
        total: pTotal
 */

cargarOrdenesCompraTabla();