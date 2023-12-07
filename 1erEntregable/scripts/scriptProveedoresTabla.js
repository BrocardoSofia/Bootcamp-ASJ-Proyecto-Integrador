function cargarProveedoresTabla(){
    let tabla = document.getElementById("listaProveedores");
    let arrayProveedores = JSON.parse(window.localStorage.getItem("proveedores"));
    let contadorTD = 0;
    let row = document.createElement("section");
    row.className="row";

    for(let i=0; i<arrayProveedores.length; i++){
        
        let proovedor = crearTdProveedor(arrayProveedores[i]); console.log(proovedor);
        if(contadorTD == 4)
        {
            //si el contador es igual a 4 tengo que cargar la fila anterior y crear una nueva
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
    col.className = "col-md-3";

    let card = document.createElement("div");
    card.className = "card";
    card.style.border = "solid rgb(171, 171, 171) 0.05em";
    card.style.borderRadius = "1em";
    card.style.padding = "1em";
    card.style.margin = "1em";

    let cardBody = document.createElement("div");
    card.className = "card-body";

    let titulo = document.createElement("h5");
    titulo.innerHTML = "Codigo: "+proveedor.codigo;

    let razonSocial = document.createElement("p");
    razonSocial.innerHTML = "Razon Social: "+proveedor.razonSocial;

    let rubro = document.createElement("p");
    rubro.innerHTML = "Rubro: "+proveedor.rubro;

    let email = document.createElement("p");
    email.innerHTML = "Email: "+proveedor.email;

    let line = document.createElement("hr");

    //agrego los elementos al card
    cardBody.appendChild(titulo);
    cardBody.appendChild(line);
    cardBody.appendChild(razonSocial);
    cardBody.appendChild(rubro);
    cardBody.appendChild(email);

    card.appendChild(cardBody);
    col.appendChild(card);

    return col;
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