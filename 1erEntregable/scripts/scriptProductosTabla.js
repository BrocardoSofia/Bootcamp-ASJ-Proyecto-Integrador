function cargarProductosTabla(){
    let tabla = document.getElementById("listaProductos");
    let arrayProductos = JSON.parse(window.localStorage.getItem("productos"));
    let contadorTD = 0;
    let row = document.createElement("section");
    row.className="row";

    for(let i=0; i<arrayProductos.length; i++){
        
        let producto = crearTdProducto(arrayProductos[i], i);
        if(contadorTD == 3)
        {
            //si el contador es igual a 3 tengo que cargar la fila anterior y crear una nueva
            tabla.appendChild(row);
            row = document.createElement("section");
            row.className="row";
            contadorTD = 0;
        }
        
        row.appendChild(producto);
        contadorTD++;
    }
    tabla.appendChild(row);
}

//devuelve un td
function crearTdProducto(producto, posicion){
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
    card.style.backgroundColor = "#fffdf8";

    let proveedor = document.createElement("h5");
    proveedor.appendChild(document.createTextNode("Proveedor "+producto.proveedor));

    let codigo = document.createElement("p");
    codigo.appendChild(document.createTextNode("Código / SKU: "+producto.codigo));

    let categoria = document.createElement("p");
    categoria.appendChild(document.createTextNode("Categoría: "+producto.categoria));

    let nombre = document.createElement("p");
    nombre.appendChild(document.createTextNode("Nombre: "+producto.nombre));

    let descripcion = document.createElement("p");
    descripcion.appendChild(document.createTextNode("Descripcion: "+producto.descripcion));

    let precio = document.createElement("p");
    precio.appendChild(document.createTextNode("Precio: $"+producto.precio));

    let line = document.createElement("hr");

    let boton = crearBoton(posicion);

    //agrego los elementos al card
    cardBody.appendChild(proveedor);
    cardBody.appendChild(line);
    cardBody.appendChild(codigo);
    cardBody.appendChild(categoria);
    cardBody.appendChild(nombre);
    cardBody.appendChild(descripcion);
    cardBody.appendChild(precio);
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
        eliminarItem(posicion);        
    
        //vuelvo a cargar la pagina para mostrar los cambios
        location.href = "productos.html";
    });

    return boton;
}

function eliminarItem(posicion){
    let arrayProductos = JSON.parse(window.localStorage.getItem("productos"));
    let nuevoArray = [];

    //guardo todos los elementos en un nuevo array menos el de la posicion a eliminar
    for(let i=0; i<arrayProductos.length; i++){
        if(i !== posicion)
        {
            nuevoArray.push(arrayProductos[i]);
        }
    }

    //guardo el array en el localStorage
    window.localStorage.setItem("productos", JSON.stringify(nuevoArray));
}

/*
producto = {
        proveedor: pProveedor,
        codigo: pCodigo,
        categoria: pCategoria,
        nombre: pNombre,
        descripcion: pDescripcion,
        precio: pPrecio
    }
 */

cargarProductosTabla();