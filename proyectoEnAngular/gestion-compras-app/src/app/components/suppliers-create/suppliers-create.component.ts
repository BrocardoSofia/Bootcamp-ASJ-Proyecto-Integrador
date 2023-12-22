import { Component, OnInit } from '@angular/core';
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

  constructor(private suppliersService: SuppliersService, private router: Router){}

  submitSupplier(){
    //validar datos
    if(this.validateInputs()){
      //crear objeto supplier
      let contactData:ContactData = new ContactData(this.name, this.lastName, this.contactPhone,
        this.contactEmail, this.rol);

      let taxData:TaxData = new TaxData(this.ciut, this.ivaCondition);

      let address:Address = new Address(this.streetName, this.streetNumber, this.cp, 
        this.city, this.province, this.country);

      let businessContact:BusinessContact = new BusinessContact(this.webPage, this.businessemail, 
        this.buisnessphone);

      let supplier:Supplier = new Supplier(this.code, this.businessName, this.category, businessContact,
        address, taxData, contactData);

      //enviarlo a la base de datos
      this.suppliersService.addSupplier(supplier);

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