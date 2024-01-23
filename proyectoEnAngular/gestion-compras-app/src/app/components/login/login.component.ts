import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { NavBarService } from '../../services/nav-bar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  user: string = '';
  password: string = '';
  submitForm!: FormGroup;

  constructor(private router: Router,
              private loginService: LoginService,
              private fb: FormBuilder,
              private navBarService: NavBarService)
  {}

  ngOnInit(): void {
    this.submitForm = this.fb.group({
      user: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
    this.navBarService.setAdmin(false);
    localStorage.removeItem("token");
  }

  public validateUser(){
    let valid: boolean;
    if(this.user==='admin' && this.password!==undefined){
      //si es un admin valido para admin
      valid = this.loginService.validAdmin(this.password);

      if(valid){
        //si es valido lo redirigo a el component admin/user-list
        localStorage.setItem('token', 'token') //guardo token para guards
        this.navBarService.setAdmin(true);
        this.toastSuccessfulLogin();
        this.router.navigate(['/home']);
      }else{
        //si no es valido le mando un alert de error
        this.loginError();
      }
    }else{
      //sino valido para user
      this.loginService.validPassword(this.user, this.password).subscribe((result) => {
        valid = result;

        if(valid){
          //si es valido lo mando a la pagina principal
          this.toastSuccessfulLogin();
          
          localStorage.setItem('token', 'token') //guardo token para guards
          this.router.navigate(['/home']);
        }else{
          //si no le aviso
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: 'Usuario y/o contraseña invalidos',
          });
          this.submitForm.reset();
        }
      });
      
    }
  }

  private loginError(){
    Swal.fire({
      icon: "error",
      title: "Error: usuario y/o contraseña incorrectos",
      text: "Por favor ingrese los datos nuevamente"
    });

    this.submitForm.reset();
    this.user = '';
    this.password = '';
  }

  toastSuccessfulLogin(){
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: "success",
      title: "Ingreso exitoso"
    });
  }

}
