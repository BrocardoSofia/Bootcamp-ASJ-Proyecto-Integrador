import { Component, OnInit } from '@angular/core';
import { Supplier } from '../../models/suppliers';
import { SuppliersService } from '../../services/suppliers.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-suppliers-create',
  templateUrl: './suppliers-create.component.html',
  styleUrl: './suppliers-create.component.css',
})
export class SuppliersCreateComponent implements OnInit {
  supplier!: Supplier;
  cuitForm!: FormGroup;
  submitForm!: FormGroup;

  originalCuit:string = '';
  originalBusinessName = '';

  validatedCUIT: boolean = false;
  validatedSupplier: boolean = false;
  editSupplier: boolean = false;
  reInsertSupplierMode: boolean = false;

  validCuit: boolean = true;
  validBusinessName: boolean = true;

  constructor(
    private suppliersService: SuppliersService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    let urlPattern = /^(https:\/\/www\.|www\.)[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.com$/;
    let lettersNumbersPattern = /^[A-Za-z0-9]+$/;
    let lettersPattern = /^[A-Za-z\s]+$/;
    let phonePattern = /^[\d\-\+\(\)]+$/;

    this.cuitForm = this.fb.group({
      cuit: ['', [Validators.required, Validators.min(10000000000), Validators.max(99999999999)]],
      businessName: ['', [Validators.required]]
    });

    this.submitForm = this.fb.group({
      ivaCondition: ['', [Validators.required]],
      category: ['', [Validators.required]],
      businessemail: ['', [Validators.required, Validators.email]],
      webPage: ['', [Validators.pattern(urlPattern)]],
      buisnessphone: ['', [Validators.required, Validators.pattern(phonePattern)]],
      streetName: ['', [Validators.required, Validators.pattern(lettersPattern)]],
      streetNumber: ['', [Validators.required]],
      cp: ['', [Validators.required, Validators.pattern(lettersNumbersPattern)]],
      city: ['', [Validators.required, Validators.pattern(lettersPattern)]],
      province: ['', [Validators.required, Validators.pattern(lettersPattern)]],
      country: ['', [Validators.required, Validators.pattern(lettersPattern)]],
      name: ['', [Validators.required, Validators.pattern(lettersPattern)]],
      lastName: ['', [Validators.required, Validators.pattern(lettersPattern)]],
      contactPhone: ['', [Validators.required, Validators.pattern(phonePattern)]],
      contactEmail: ['', [Validators.required, Validators.email]],
      rol: ['', [Validators.required, Validators.pattern(lettersNumbersPattern)]],
    });

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

  verifyData(form: FormGroup) {
    console.log("Formulario valido: "+form.valid);
    console.log("Cuit invalido: "+form.get('cuit')?.invalid);
    if(form.valid){

      if(this.suppliersService.existsCUIT(this.supplier.taxData.cuit) && 
        (this.originalCuit !== this.supplier.taxData.cuit)){
        this.validCuit = false;
      }
      
      if(this.suppliersService.existsbusinessName(this.supplier.businessName)&& 
      (this.originalBusinessName !== this.supplier.businessName)){
        this.validBusinessName = false;
      }
      
      if(this.validCuit && this.validBusinessName){
        this.validatedCUIT = true;
      }else if(!this.editSupplier && 
        this.suppliersService.verifyDeletedSupplier(this.supplier.taxData.cuit)){
        //si el cuit y razon social son invalidos y si no estoy en modo edicion
        //veo si el cuit es de un dato eliminado
        //obtengo el dato
        let deletedSupplier = this.suppliersService.getSupplierByCuit(this.supplier.taxData.cuit);

        //y si es de un dato eliminado veo si la razon social coincide
        if(deletedSupplier!=null){
          if(deletedSupplier.businessName.toLowerCase() === this.supplier.businessName.toLowerCase()){
            //cargo los datos del supplier e ingreso en modo reingresar proveedor
            this.supplier = deletedSupplier;
            this.reInsertSupplierMode = true;

            this.validatedCUIT = true;
            this.validCuit = true;
            this.validBusinessName = true;
          }
        }
        
      }
      
    }
  }

  onSubmit(form: FormGroup) {
    console.log("Formulario valido: "+form.valid);
    if(form.valid){
      //si el formulario es valido guardo agrego el proveedor o lo guardo depende en cual modo estoy
      this.validatedSupplier = true;

      if(this.editSupplier){
        this.modifySupplier();
      }else if(this.reInsertSupplierMode){
        this.reInsertSupplier();
      }else{
        this.submitSupplier();
      }
    }
  }

  private reInsertSupplier(){
    this.suppliersService.reInsertSupplier(this.supplier.code, this.supplier);

    alert('Proveedor ' + this.supplier.businessName + ' reingresado'); //esto iria en el subscribe

    //lo redirijo a la ventana de proveedores
    this.router.navigate(['/suppliers']);
  }

  private fillSupplierForm(code: number) {
    let supplier = this.suppliersService.getSupplier(code);

    if (supplier !== null) {
      this.supplier = supplier;
      this.originalCuit = this.supplier.taxData.cuit;
      this.originalBusinessName = this.supplier.businessName;
    }
  }

  submitSupplier() {
    let valid = true;
    
    //validar los inputs
    if (this.validateInputs() && valid === true) {
      //agrego el codigo al supplier buscando el ultimo guardado
      this.supplier.code = this.suppliersService.getLastCode()+1;

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
    //verificar que no este vacio
    if (this.supplier.taxData.cuit !== '') {

      //verificar que el cuit tenga 11 cifras
      if (this.supplier.taxData.cuit.toString().length !== 11) {
        alert('El CUIT debe tener 11 digitos');
      } else {
        //veo si existe el codigo
        let cuitExists = this.suppliersService.existsCUIT(
          this.supplier.taxData.cuit
        );

        //si no existe habilito para seguir ingresando datos
        if (!cuitExists) {
          this.validatedCUIT = true;
        } else if (
          this.suppliersService.verifyDeletedSupplier(
            this.supplier.taxData.cuit
          )
        ) {
          //si ya existe veo si esta eliminado, y si lo esta pregunto si lo quiere reingresar
          let reInsertSupplier = confirm(
            `El proveedor con el codigo ${this.supplier.code} ya existe \n¿desea reingresarlo?`
          );

        }
      }
    } else {
      alert('Debe ingresar un cuit!');
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
