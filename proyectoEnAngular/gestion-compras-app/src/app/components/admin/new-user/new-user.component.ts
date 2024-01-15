import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../models/user';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.css'
})
export class NewUserComponent implements OnInit{
  submitForm!: FormGroup;
  user!: User;

  constructor(private fb: FormBuilder,
              private userService: UsersService){}

  ngOnInit(): void {
    this.submitForm = this.fb.group({
      user_name: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

    this.user = this.userService.inicUser();
  }

  public submitUser(){}
}
