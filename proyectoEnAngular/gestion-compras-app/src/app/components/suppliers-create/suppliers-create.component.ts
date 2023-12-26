import { Component, OnInit } from '@angular/core';
import {
  Address,
  BusinessContact,
  ContactData,
  Supplier,
  TaxData,
} from '../../models/suppliers';
import { SuppliersService } from '../../services/suppliers.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-suppliers-create',
  templateUrl: './suppliers-create.component.html',
  styleUrl: './suppliers-create.component.css',
})
export class SuppliersCreateComponent implements OnInit {
  supplier!: Supplier;

  validatedCUIT: boolean = false;
  editSupplier: boolean = false;

  constructor(
    private suppliersService: SuppliersService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.supplier = this.suppliersService.inicSupplier();
    let codeParam;
    this.activeRoute.queryParamMap.subscribe((params) => {
      codeParam = params.get('edit') || null;

      if (codeParam !== null) {
        //la pagina pasa a modo edicion
        this.editSupplier = true;

        //lleno los parametros con los datos del proveedor
        this.fillSupplierForm(parseInt(codeParam));

        this.supplier.code = parseInt(codeParam);
      }
    });
  }

  private fillSupplierForm(code: number) {
    let supplier = this.suppliersService.getSupplier(code);

    if (supplier !== null) {
      this.supplier = supplier;
    }
  }

  submitSupplier() {
    //validar datos
    //validar codigo con el servicio
    let valid = true;
    if (this.suppliersService.existsCode(this.supplier.code)) {
      valid = false;
      alert('El codigo ya existe');
    }

    if (this.validateInputs() && valid === true) {
      //enviarlo a la base de datos
      this.suppliersService.addSupplier(this.supplier);

      alert('Proveedor ' + this.supplier.businessName + ' agregado'); //esto iria en el subscribe

      //lo redirijo a la ventana de proveedores
      this.router.navigate(['/suppliers']);
    } else {
      alert('Datos invalidos'); //esto despues es un toast
    }
  }

  validateInputs() {
    let valid = true;

    //validar que el email termine con .com
    if (!this.supplier.businessContact.email.includes('.com')) {
      valid = false;
      alert('El email debe contener un .com');
    }

    //validar que la pagina web termine con .com
    if (!this.supplier.businessContact.webPage.includes('.com')) {
      valid = false;
      alert('La pagina debe contener un .com');
    }

    //validar que el telefono tenga como minimo 8 digitos
    if (this.supplier.businessContact.phone.toString().length <= 8) {
      valid = false;
      alert('El telefono debe tener mas de 8 digitos');
    }

    //verificar que el cuit tenga 11 cifras
    if (this.supplier.taxData.cuit.toString().length !== 11) {
      valid = false;
      alert('El CUIT debe tener 11 digitos');
    }

    //validar que el telefono tenga como minimo 8 digitos
    if (this.supplier.contactData.phone.toString().length <= 8) {
      valid = false;
      alert('El telefono debe tener mas de 8 digitos');
    }

    //validar que el email termine con .com
    if (!this.supplier.contactData.email.includes('.com')) {
      valid = false;
      alert('El email debe contener un .com');
    }

    return valid;
  }

  validateCUIT() {
    console.log(this.supplier.taxData.cuit);
    if(this.supplier.taxData.cuit !== ''){
      //veo si existe el codigo
      let cuitExists = this.suppliersService.existsCUIT(
        this.supplier.taxData.cuit
      );

      //si no existe habilito para seguir ingresando datos
      if (!cuitExists) {
        this.validatedCUIT = true;
      } else if (
        this.suppliersService.verifyDeletedSupplier(this.supplier.taxData.cuit)
      ) {
        //si ya existe veo si esta eliminado, y si lo esta pregunto si lo quiere reingresar
        let reInsertSupplier = confirm(
          `El proveedor con el codigo ${this.supplier.code} ya existe \n¿desea reingresarlo?`
        );

        if (reInsertSupplier) {
          //si lo confirma reingresa el proveedor
          if (this.suppliersService.reInsertSupplier(this.supplier.code)) {
            //informo al usuario que se reingreso el proveedor
            alert(`Se reingreso el proveedor codigo: ${this.supplier.code}`);
          }

          //redirijo al usuario a proveedores
          this.router.navigate(['/suppliers']);
        }
      }
    }else{
      alert("Debe ingresar un cuit!");
    }
  }

  modifySupplier() {
    if (this.validateInputs()) {
      //enviarlo a la base de datos
      this.suppliersService.modifySupplier(this.supplier);

      alert('Proveedor ' + this.supplier.businessName + ' fue modificado'); //esto iria en el subscribe

      //lo redirijo a la ventana de proveedores
      this.router.navigate(['/suppliers']);
    } else {
      alert('Datos invalidos'); //esto despues es un toast
    }
  }
}
