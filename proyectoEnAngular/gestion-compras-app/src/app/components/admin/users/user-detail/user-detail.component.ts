import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../../services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../../models/user';
import { Chart, ChartType} from 'chart.js/auto';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent implements OnInit{
  idParam!:number;
  user!:User;
  seePassword: boolean = true;
  public chart: any;

  constructor(
    private usersService: UsersService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(): void {
    this.activeRoute.queryParamMap.subscribe((params) => {
      let param = params.get('user') || null;

      if (param !== null) {
        this.idParam = parseInt(param);
        this.usersService.getUserById(this.idParam).subscribe((user)=>{

          if(user === null){
            //si no encontro el usuario lo redirijo a userList
            this.router.navigate(['/users']);
          }else{
            this.user = user;
          }
          
        });
      }
    });

    // datos
    const data = {
      labels: [
        'Creados',
        'Eliminados',
        'Modificados'
      ],
      datasets: [{
        label: 'User history',
        data: [11, 16, 7],
        backgroundColor: [
          'rgb(75, 192, 192)',
          'rgb(255, 99, 132)',
          'rgb(255, 205, 86)'
        ]
      }]
    };
 
     // Creamos la gráfica
    this.chart = new Chart("chart", {
      type: 'pie' as ChartType, // tipo de la gráfica 
      data: data, // datos 
    });
  
  }

  togglePassword() {
    const password = document.getElementById("password") as HTMLInputElement;
    
    if (this.seePassword) {
      password.innerHTML = ' '+this.user.password;
      this.seePassword = false;
    } else {
      password.innerHTML = ' *******'
      this.seePassword = true;
    }
  }

}

const data = {
  labels: [
    'Red',
    'Blue',
    'Yellow'
  ],
  datasets: [{
    label: 'My First Dataset',
    data: [300, 50, 100],
    backgroundColor: [
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)'
    ],
    hoverOffset: 4
  }]
};