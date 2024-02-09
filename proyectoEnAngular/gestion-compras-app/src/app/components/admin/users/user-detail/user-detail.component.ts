import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../../services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../../models/user';
import { Chart, ChartType} from 'chart.js/auto';
import { SupplierHistory } from '../../../../models/supplier-history';
import { SuppliersService } from '../../../../services/suppliers.service';

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
  historySelected:string = 'suppliers';

  currentPageSupplier: number = 0;
  pagesSupplier:number = 1;
  maxPagesSupplier: number = 5;
  nextFiveSupplier: boolean = false;
  previousSupplier: boolean = false;
  supplierActions = {'deleted': 0, 'created': 0, 'updated': 0};

  supplierHistory: SupplierHistory[] = [];

  constructor(
    private usersService: UsersService,
    private activeRoute: ActivatedRoute,
    private supplierService: SuppliersService,
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

    this.supplierService.getAllSupplierActions(0,'', this.idParam).subscribe(
      actions=>{
        this.supplierActions = actions;
        console.log(actions);
      }
    )

    this.supplierService.getAllSupplierHistory(0,'', this.idParam).subscribe(
      data=>{
        this.supplierHistory = data.content;
      }
    )

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

  getPagesSupplier(): number[] {
    this.pagesSupplier;
    let startPage = Math.max(1, this.currentPageSupplier - Math.floor(this.maxPagesSupplier / 2));
    let endPage = Math.min(this.pagesSupplier, startPage + this.maxPagesSupplier - 1);
  
    if(this.pagesSupplier > 5){
      if(endPage-startPage != 4){
        startPage = endPage-4;
      }
    }
    let returnPages = Array.from(Array(Math.min(5, endPage - startPage + 1)), (_, i) => startPage + i);
  
    return returnPages;
  }

  selectPageSupplier(page: number){
    this.supplierService.getAllSupplierHistory(page,'', this.idParam).subscribe(data=>{
      this.pagesSupplier = data.totalPages;
      this.supplierHistory = data.content;

      if(this.pagesSupplier > 5){
        this.nextFiveSupplier = true;
      }
    })
  }

  nextPageSupplier(){
    this.currentPageSupplier++;
    this.selectPageSupplier(this.currentPageSupplier);
  }

  prevPageSupplier(){
    this.currentPageSupplier--;
    this.selectPageSupplier(this.currentPageSupplier);
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