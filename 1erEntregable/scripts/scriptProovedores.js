//FUNCIONES PARA CREAR LOS OBJETOS
function crearProovedor(pCodigo,pRazonSocial,pRubro,pEmail,pDireccion,pDatosFiscales,pDatosContacto){
    let proveedor = {
        codigo: pCodigo,
        razonSocial: pRazonSocial,
        rubro: pRubro,
        email: pEmail,
        direccion: pDireccion,
        datosFiscales: pDatosFiscales,
        datosContacto: pDatosContacto
    }

    return proveedor;
}

function crearDireccion(pCalle,pCodigoPostal, pLocalidad, pProvincia, pPais){
    let direccion = {
        calle: pCalle,
        codigoPostal: pCodigoPostal,
        localidad: pLocalidad,
        provincia: pProvincia,
        pais: pPais
    };

    return direccion;
}

function crearDatosFiscales(pCUIT, pCondicionIVA){
    let datosFiscales = {
        CUIT: pCUIT,
        condicionIVA: pCondicionIVA
    };

    return datosFiscales;
}

function crearDatosContacto(pNombre, pApellido, pTelefono, pEmail, pRol){
    let datosContacto = {
        nombre: pNombre,
        apellido: pApellido,
        telefono: pTelefono,
        email: pEmail,
        rol: pRol
    };

    return datosContacto;
}

function submitProveeror(){
    cargarProveedor();
    //lo redirijo
    location.href = "./proveedores.html";//no funciona por el form de bootstrap    
}

//funcion que toma los datos del form, los convierte en objetos y los guarda en el LocalStorage
function cargarProveedor(){
    //crear objeto direccion
    let calle = document.getElementById("calleInput").value; 
    let codigoPostal = document.getElementById("cpInput").value; 
    let localidad = document.getElementById("localidadInput").value; 
    let provincia = document.getElementById("provinciaInput").value; 
    let pais = document.getElementById("paisInput").value; 

    let direccion = crearDireccion(calle,codigoPostal,localidad,provincia,pais);

    //crear objeto datosFiscales
    let CUIT = document.getElementById("ciutInput").value;
    let condicioniva = document.getElementById("condicionivaInput").value; 

    let datosFiscales = crearDatosFiscales(CUIT, condicioniva);

    //crear objeto datosContacto
    let nombre = document.getElementById("nombreInput").value; 
    let apellido = document.getElementById("apellidoInput").value; 
    let telefono = document.getElementById("telefonoInput").value; 
    let emailContacto = document.getElementById("emailContactoInput").value; 
    let rol = document.getElementById("rolInput").value; 

    let datosContacto = crearDatosContacto(nombre, apellido, telefono, emailContacto, rol);

    //tomar datos de proovedor
    let codigo = document.getElementById("codigoInput").value; 
    let razonSocial = document.getElementById("razonSocialInput").value; 
    let rubro = document.getElementById("rubroInput").value;
    let email = document.getElementById("emailInput").value;

    //crear objeto proveedor
    let proovedor = crearProovedor(codigo, razonSocial, rubro, email, direccion, 
        datosFiscales, datosContacto);

    //obtener la info del LocalStorage "proveedores"
    let proveedores = JSON.parse(window.localStorage.getItem("proveedores"));

    //si es null creo un nuevo arreglo 
    if(proveedores === null)
    {
        proveedores = [proovedor];
    }else{
        //si no es null hago un push del proveedor actual y vuelvo a guardar el LocalStorage
        proveedores.push(proovedor);
    }

    //guardo todo en el LocalStorage denuevo
    window.localStorage.setItem("proveedores", JSON.stringify(proveedores));
    
}

console.log(JSON.parse(window.localStorage.getItem("proveedores")));