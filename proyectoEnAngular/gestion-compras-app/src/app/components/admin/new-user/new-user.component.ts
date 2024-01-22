import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../models/user';
import { UsersService } from '../../../services/users.service';
import Swal from 'sweetalert2';
import { auto } from '@popperjs/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.css'
})
export class NewUserComponent implements OnInit{
  submitForm!: FormGroup;
  user!: User;

  constructor(private fb: FormBuilder,
              private router: Router,
              private userService: UsersService){}

  ngOnInit(): void {
    const validatorUser = /^[a-zA-Z]+_[a-zA-Z]+_\d+$/;
    this.submitForm = this.fb.group({
      user_name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50), Validators.pattern(validatorUser)]],
      password: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(20)]]
    });

    this.user = this.userService.inicUser();
  }

  public submitUser(){
    //valido si el usuario existe
    this.userService.userExists(this.user.userName).subscribe(
      exists => {
        if (!exists) {
          this.userService.addUser(this.user).subscribe(
            user => {
              //muestro en un alert que se agrego correctamente el usuario
              Swal.fire({
                text: 'Se agrego correctamente al usuario: ' + this.user.userName,
                imageUrl: "./assets/succesImg.jpg",
                imageWidth: 400,
                imageHeight: auto,
                imageAlt: "Custom image"
              });
            
              //lo redirijo a la pagina anterior
              this.router.navigate(['/admin']);
            },
            error => {
              console.error('Error al agregar usuario:', error);
            }
          );
        } else {
          //si existe informo con un alert que el usuario ya esta registrado
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: 'Ya existe el usuario ' + this.user.userName + ' en el sistema',
          });
          this.submitForm.reset();
        }
      },
      error => {
        console.error('Error al verificar si el usuario existe:', error);
      }
    );    
  }
}
