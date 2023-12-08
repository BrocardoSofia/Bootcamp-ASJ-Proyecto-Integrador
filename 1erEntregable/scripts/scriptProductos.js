function crearProducto(pProveedor,pCodigo, pCategoria, pNombre, pDescripcion, pPrecio){
    let producto = {
        proveedor: pProveedor,
        codigo: pCodigo,
        categoria: pCategoria,
        nombre: pNombre,
        descripcion: pDescripcion,
        precio: pPrecio
    }

    return producto;
}

function submitProducto(){
    cargarProducto();

    //lo redirijo a productos.html
       
}

function cargarProducto(){
    //obtengo los datos
    let proveedor = document.getElementById("proveedorInput").value; 
    let codigo = document.getElementById("SKUInput").value; 
    let categoria = document.getElementById("categoriaInput").value; 
    let nombre = document.getElementById("nombreProductoInput").value; 
    let descripcion = document.getElementById("descInput").value; 
    let precio = document.getElementById("precioInput").value; 

    let producto = crearProducto(proveedor, codigo, categoria, nombre, descripcion, precio);

    //obtener la info del LocalStorage "productos"
    let productos = JSON.parse(window.localStorage.getItem("productos"));

    //si es null creo un nuevo arreglo 
    if(productos === null)
    {
        productos = [producto];
    }else{
        //si no es null hago un push del producto actual y vuelvo a guardar el LocalStorage
        productos.push(producto);
    }

    //guardo todo en el LocalStorage denuevo
    window.localStorage.setItem("productos", JSON.stringify(productos));
    
}

console.log(JSON.parse(window.localStorage.getItem("productos")));