import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { User } from '../../models/user';

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
              private fb: FormBuilder)
  {}

  ngOnInit(): void {
    this.submitForm = this.fb.group({
      user: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  public validateUser(){
    let user: User;

    this.loginService.validLogin(this.user, this.password).subscribe(
      result=>{
        if(result != null){
          this.toastSuccessfulLogin();
          this.router.navigate(['/home']);
          
        }else{
          //sino significa que el usuario no ingreso bien su contraseña o nombre de usuario
          //si no es valido le mando un alert de error
          this.loginError();
        }
      }
    )
    
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
