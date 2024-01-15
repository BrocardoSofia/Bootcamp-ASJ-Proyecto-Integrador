import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  user?: string;
  password?: string;
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
    let valid: boolean;
    if(this.user==='admin' && this.password!==undefined){
      //si es un admin valido para admin
      valid = this.loginService.validAdmin(this.password);

      if(valid){
        //si es valido lo redirigo a el component admin/user-list
        this.router.navigate(['/admin']);
      }else{
        //si no es valido le mando un alert de error
        this.loginError();
      }
    }else{
      //sino valido para user
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

}
