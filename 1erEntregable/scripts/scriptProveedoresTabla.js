function cargarProveedoresTabla(){
    let tabla = document.getElementById("listaProveedores");
    let arrayProveedores = JSON.parse(window.localStorage.getItem("proveedores"));
    let contadorTD = 0;
    let row = document.createElement("section");
    row.className="row";

    for(let i=0; i<arrayProveedores.length; i++){
        
        let proovedor = crearTdProveedor(arrayProveedores[i]); console.log(proovedor);
        if(contadorTD == 3)
        {
            //si el contador es igual a 3 tengo que cargar la fila anterior y crear una nueva
            tabla.appendChild(row);
            row = document.createElement("section");
            row.className="row";
            contadorTD = 0;
        }
        
        row.appendChild(proovedor);
        contadorTD++;
    }
    tabla.appendChild(row);
}

//devuelve un td
function crearTdProveedor(proveedor){
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

    let titulo = document.createElement("h5");
    titulo.appendChild(document.createTextNode("Codigo: "+proveedor.codigo));

    let razonSocial = document.createElement("p");
    razonSocial.appendChild(document.createTextNode("Razon Social: "+proveedor.razonSocial));

    let rubro = document.createElement("p");
    rubro.appendChild(document.createTextNode("Rubro: "+proveedor.rubro));

    let email = document.createElement("p");
    email.appendChild(document.createTextNode("Email: "+proveedor.email));

    let line = document.createElement("hr");

    let tituloDireccion = document.createElement("h5");
    tituloDireccion.appendChild(document.createTextNode("Dirección"));

    let calle = document.createElement("p");
    calle.appendChild(document.createTextNode("Calle: "+proveedor.direccion.calle));

    let codigoPostal = document.createElement("p");
    codigoPostal.appendChild(document.createTextNode("Codigo Postal: "+proveedor.direccion.codigoPostal));

    let localidad = document.createElement("p");
    localidad.appendChild(document.createTextNode("Localidad: "+proveedor.direccion.localidad));

    let provincia = document.createElement("p");
    provincia.appendChild(document.createTextNode("Provincia: "+proveedor.direccion.provincia));

    let pais = document.createElement("p");
    pais.appendChild(document.createTextNode("Pais: "+proveedor.direccion.pais));

    let datosFiscales = document.createElement("h5");
    datosFiscales.appendChild(document.createTextNode("Datos Fiscales"));

    let CUIT = document.createElement("p");
    CUIT.appendChild(document.createTextNode("CUIT: "+proveedor.datosFiscales.CUIT));

    let condicionIVA = document.createElement("p");
    condicionIVA.appendChild(document.createTextNode("Condicion de IVA: "+
     obtenerCondicionIva(proveedor.datosFiscales.condicionIVA)));

    let datosContacto = document.createElement("h5");
    datosContacto.appendChild(document.createTextNode("Datos de Contacto"));

    let nombre = document.createElement("p");
    nombre.appendChild(document.createTextNode("Nombre: "+proveedor.datosContacto.nombre));

    let apellido = document.createElement("p");
    apellido.appendChild(document.createTextNode("Apellido: "+proveedor.datosContacto.apellido));

    let telefono = document.createElement("p");
    telefono.appendChild(document.createTextNode("Telefono: "+proveedor.datosContacto.telefono));

    let emailC = document.createElement("p");
    emailC.appendChild(document.createTextNode("Email: "+proveedor.datosContacto.email));

    let rol = document.createElement("p");
    rol.appendChild(document.createTextNode("Rol: "+proveedor.datosContacto.rol));

    //agrego los elementos al card
    cardBody.appendChild(titulo);
    cardBody.appendChild(line);
    cardBody.appendChild(razonSocial);
    cardBody.appendChild(rubro);
    cardBody.appendChild(email);
    line = document.createElement("hr");
    cardBody.appendChild(line);
    cardBody.appendChild(tituloDireccion);
    cardBody.appendChild(calle);
    cardBody.appendChild(codigoPostal);
    cardBody.appendChild(localidad);
    cardBody.appendChild(provincia);
    cardBody.appendChild(pais);
    line = document.createElement("hr");
    cardBody.appendChild(line);
    cardBody.appendChild(datosFiscales);
    cardBody.appendChild(CUIT);
    cardBody.appendChild(condicionIVA);
    line = document.createElement("hr");
    cardBody.appendChild(line);
    cardBody.appendChild(datosContacto);
    cardBody.appendChild(nombre);
    cardBody.appendChild(apellido);
    cardBody.appendChild(telefono);
    cardBody.appendChild(emailC);
    cardBody.appendChild(rol);

    card.appendChild(cardBody);
    col.appendChild(card);

    return col;
}

function obtenerCondicionIva(num){
    let condicion = "";

    switch(num)
    {
        case "1":
            condicion = "IVA Responsable Inscripto";
            break;
        
        case "2":
            condicion = "IVA Responsable no Inscripto";
            break;

        case "3":
            condicion = "IVA no Responsable";
            break;

        case "4":
            condicion = "IVA Sujeto Exento";
            break;

        case "5":
            condicion = "Responsable Monotributo";
            break;

        case "6":
            condicion = "Sujeto no Categorizado";
            break;

        case "7":
            condicion = "Proveedor del Exterior";
            break;

    }

    return condicion;
}

/*
proveedor = {
        codigo: pCodigo,
        razonSocial: pRazonSocial,
        rubro: pRubro,
        email: pEmail,
        direccion: pDireccion,
        datosFiscales: pDatosFiscales,
        datosContacto: pDatosContacto
    }

direccion = {
        calle: pCalle,
        codigoPostal: pCodigoPostal,
        localidad: pLocalidad,
        provincia: pProvincia,
        pais: pPais
    };

datosFiscales = {
        CUIT: pCUIT,
        condicionIVA: pCondicionIVA
    };

datosContacto = {
        nombre: pNombre,
        apellido: pApellido,
        telefono: pTelefono,
        email: pEmail,
        rol: pRol
    };
*/


cargarProveedoresTabla();