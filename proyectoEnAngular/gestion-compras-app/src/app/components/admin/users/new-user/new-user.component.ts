import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../../models/user';
import { UsersService } from '../../../../services/users.service';
import Swal from 'sweetalert2';
import { auto } from '@popperjs/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.css'
})
export class NewUserComponent implements OnInit{
  submitForm!: FormGroup;
  user!: User;
  edit: boolean = false;
  idParam: number = 0;
  seePassword: boolean = true;
  oldUserName!: string;

  constructor(private fb: FormBuilder,
              private router: Router,
              private userService: UsersService,
              private activeRoute: ActivatedRoute,){}

  ngOnInit(): void {
    const validatorUser = /^[a-zA-Z]+_[a-zA-Z]+_\d+$/;
    this.submitForm = this.fb.group({
      user_name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50), Validators.pattern(validatorUser)]],
      password: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(20)]]
    });

    const togglePassword = document.querySelector('#togglePassword');
      const password = document.querySelector('#password');
      
      if(togglePassword !== null && password !== null){
        togglePassword.addEventListener('click', () => {
          // Toggle the type attribute using
          // getAttribure() method
          const type = password
              .getAttribute('type') === 'password' ?
              'text' : 'password';
          password.setAttribute('type', type);
          // Toggle the eye and bi-eye icon
          // this.classList.toggle('bi-eye');
        });
      }

    this.user = this.userService.inicUser();

    this.activeRoute.queryParamMap.subscribe((params) => {
      let param = params.get('user') || null;

      if (param !== null) {
        this.idParam = parseInt(param);

        this.userService.getUserById(this.idParam).subscribe(response => {

          if(response !== null){
            this.user = response;
            this.edit = true;
            this.oldUserName = this.user.userAlias;
          }else{
            //lo redirijo a la pagina anterior
            this.router.navigate(['/users']);
          }
          
        });
      }
    });
  }

  public submitUser(){
        if(!this.edit){
          //si no estoy en modo edicion se agrega un nuevo usuario
          this.createUser();
        }else{
          //si estamos en modo edicion se debe modificar el usuario
          this.modifyUser();
        }
  }

  private modifyUser(){
    if(this.user.userAlias === this.oldUserName){
      //si el nombre de usuario coincide con el viejo no lo valido, ya lo modifico
      this.userService.updateUser(this.user).subscribe(
        data => {
          this.userLoadedSuccessfully('Se modifico correctamente al usuario: ' + this.user.userAlias);
        }
      )
      
    }else{
      //si el nombre de usuario cambio debo verificar que no exista
      this.userService.userExists(this.user.userAlias).subscribe(
        exists => {
          if (!exists) {
            this.userService.updateUser(this.user).subscribe(
              data => {
                this.userLoadedSuccessfully('Se modifico correctamente al usuario: ' + this.user.userAlias);
              }
            )            
          } else {
            this.alertUserExist()
          }
        }
      );
    }
  }

  private createUser(){
    //valido si el usuario existe
    this.userService.userExists(this.user.userAlias).subscribe(
      exists => {
        if (!exists) {
          this.userService.addUser(this.user).subscribe(
            user => {
              this.userLoadedSuccessfully('Se agrego correctamente al usuario: ' + this.user.userAlias);
            }
          );
        } else {
          this.alertUserExist()
        }
      }
    );
  }

  private userLoadedSuccessfully(textInfo: string){
    //muestro en un alert que se agrego correctamente el usuario
    Swal.fire({
      text: textInfo,
      imageUrl: "./assets/succesImg.jpg",
      imageWidth: 400,
      imageHeight: auto,
      imageAlt: "Custom image"
    });
  
    //lo redirijo a la pagina anterior
    this.router.navigate(['/users']);
  }

  private alertUserExist(){
    //si existe informo con un alert que el usuario ya esta registrado
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: 'Ya existe el usuario ' + this.user.userAlias + ' en el sistema',
    });

    if(this.edit){
      this.user.userAlias = this.oldUserName;
    }else{
      this.submitForm.reset();
    }
    
  }
}
