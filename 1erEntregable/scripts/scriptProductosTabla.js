function cargarProductosTabla(){
    let tabla = document.getElementById("listaProductos");
    let arrayProductos = JSON.parse(window.localStorage.getItem("productos"));
    let contadorTD = 0;
    let row = document.createElement("section");
    row.className="row";

    for(let i=0; i<arrayProductos.length; i++){
        
        let producto = crearTdProducto(arrayProductos[i]);
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
function crearTdProducto(producto){
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

    //agrego los elementos al card
    cardBody.appendChild(proveedor);
    cardBody.appendChild(line);
    cardBody.appendChild(codigo);
    cardBody.appendChild(categoria);
    cardBody.appendChild(nombre);
    cardBody.appendChild(descripcion);
    cardBody.appendChild(precio);
    

    card.appendChild(cardBody);
    col.appendChild(card);

    return col;
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