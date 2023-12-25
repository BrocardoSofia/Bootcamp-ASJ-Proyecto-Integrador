import { Component} from '@angular/core';
import { Address, BusinessContact, ContactData, Supplier, TaxData } from '../../models/suppliers';
import { SuppliersService } from '../../services/suppliers.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-suppliers-create',
  templateUrl: './suppliers-create.component.html',
  styleUrl: './suppliers-create.component.css'
})
export class SuppliersCreateComponent{

  code!: string;
  businessName!: string;
  category!: string;
  businessemail!: string;
  webPage!: string;
  buisnessphone!: number;
  streetName!: string;
  streetNumber!: number;
  cp!:string;
  city!:string;
  province!: string;
  country!:string;
  ciut!:number;
  ivaCondition!:string;
  name!:string;
  lastName!:string;
  contactPhone!:number;
  contactEmail!:string;
  rol!:string;

  validatedCode:boolean = false;


  constructor(private suppliersService: SuppliersService, private router: Router){}

  submitSupplier(){
    //validar datos
    if(this.validateInputs()){
      //crear el proveedor
      let contactData:ContactData = this.suppliersService.createContactData(this.name, this.lastName, 
        this.contactPhone, this.contactEmail, this.rol);

      let taxData:TaxData = this.suppliersService.createTaxData(this.ciut, this.ivaCondition);

      let address:Address = this.suppliersService.createAddress(this.streetName, this.streetNumber, this.cp, 
        this.city, this.province, this.country);

      let businessContact:BusinessContact = this.suppliersService.createBusinessContact(this.webPage, 
        this.businessemail, this.buisnessphone);

      let supplier:Supplier = this.suppliersService.createSupplier(this.code, this.businessName, this.category, 
        businessContact, address, taxData, contactData);

      //enviarlo a la base de datos
      this.suppliersService.addSupplier(supplier);

      alert("Proveedor "+this.businessName+" agregado");//esto iria en el subscribe

      //lo redirijo a la ventana de proveedores
      this.router.navigate(['/suppliers']);

    }else{
      alert("Datos invalidos");//esto despues es un toast
    }

  }

  validateInputs(){
    let valid = true;
    //validar codigo con el servicio
    if(this.suppliersService.existsCode(this.code)){
      valid = false;
      alert("El codigo ya existe");
    }

    //validar que el email termine con .com
    if(!this.businessemail.includes('.com')){
      valid = false;
      alert("El email debe contener un .com");
    }

    //validar que la pagina web termine con .com
    if(!this.webPage.includes('.com')){
      valid = false;
      alert("La pagina debe contener un .com");
    }

    //validar que el telefono tenga como minimo 8 digitos
    if(this.buisnessphone.toString().length <= 8){
      valid = false;
      alert("El telefono debe tener mas de 8 digitos");
    }

    //verificar que el cuit tenga 11 cifras
    if(this.ciut.toString().length !== 11){
      valid = false;
      alert("El CUIT debe tener 11 digitos");
    }

    //validar que el telefono tenga como minimo 8 digitos
    if(this.contactPhone.toString().length <= 8){
      valid = false;
      alert("El telefono debe tener mas de 8 digitos");
    }

    //validar que el email termine con .com
    if(!this.contactEmail.includes('.com')){
      valid = false;
      alert("El email debe contener un .com");
    }

    return valid;
  }

  validateCode(){
    //veo si existe el codigo
    let codeExists = this.suppliersService.existsCode(this.code);

    //si no existe habilito para seguir ingresando datos
    if(!codeExists){
      this.validatedCode = true;
    }else if(this.suppliersService.verifyDeletedSupplier(this.code)){
      //si ya existe veo si esta eliminado, y si lo esta pregunto si lo quiere reingresar
      let reInsertSupplier = confirm(`El proveedor con el codigo ${this.code} ya existe \n¿desea reingresarlo?`)
      
      if(reInsertSupplier){
        //si lo confirma reingresa el proveedor
        if(this.suppliersService.reInsertSupplier(this.code)){
          //informo al usuario que se reingreso el proveedor
          alert(`Se reingreso el proveedor codigo: ${this.code}`);
        }

        //redirijo al usuario a proveedores
        this.router.navigate(['/suppliers']);
      }else{
        //sino limpio el codigo
        this.code = '';

      }

    }
  }

}

// this.supplier = {
    //   code: this.code,
    //   businessName: this.businessName,
    //   category: this.category,
    //   businessContact: {
    //     webPage: this.webPage,
    //     email: this.businessemail,
    //     phone: this.buisnessphone
    //   },
    //   address: {
    //     streetName: this.streetName,
    //     number: this.streetNumber,
    //     cp: this.cp,
    //     city: this.city,
    //     province: this.province,
    //     country: this.country
    //   },
    //   taxData: {
    //     cuit: this.ciut,
    //     ivaCondition: this.ivaCondition
    //   },
    //   contactData: {
    //     name: this.name,
    //     lastName: this.lastName,
    //     phone: this.contactPhone,
    //     email: this.contactEmail,
    //     rol: this.rol
    //   }
    //   this.suppliersService.addSupplier(this.supplier);