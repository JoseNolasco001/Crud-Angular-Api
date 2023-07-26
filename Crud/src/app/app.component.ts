import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import { Custom } from './Interfaces/customer';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Crud';
  Customers: Custom[] = []
  CustomersTemp: Custom[] = []
  custom?: Custom;
  form !: FormGroup;
  dblClic:boolean=false;
  selected:any;

  constructor(private api:ApiService,
              private fb:FormBuilder){}

  ngOnInit(): void {
    this.dblClic=false
    this.getAllCustomer();
    this.form = this.fb.group({
      CustomerId:[],
      NameCustomer:['',[Validators.required]],
      CustomerAge:[,[Validators.required,Validators.pattern("[0-9]*")]],
      CustomertEmail:['',[Validators.required]]
    })

  }

  getAllCustomer(){
    this.api.getAll().subscribe(
      resp => {
        this.Customers = resp
        this.CustomersTemp = resp
      }
    );
  }

  deleteCustomer(id:number){
    this.api.deleteCustomer(id).subscribe(
        resp => {
          console.log(resp)
          this.getAllCustomer();
        }
      );
  }

  saveCustomer(){
    const customer:Custom = {
      id:Number(this.form.get('CustomerId')?.value),
      nombre:String(this.form.get('NameCustomer')?.value),
      edad:Number(this.form.get('CustomerAge')?.value),
      email:String(this.form.get('CustomertEmail')?.value)
    };
    console.log(customer)
    if(this.dblClic){
      this.api.updateCustomer(customer).subscribe(
        resp =>{
          console.log(resp)
          this.getAllCustomer();
          this.newCustomer();
        }
      );
    }
    else{
      this.api.saveCustomer(customer).subscribe(
        resp =>{
          console.log(resp)
          this.getAllCustomer();
          this.newCustomer();
        }
      );
    }
  }

  buscarCustomer(){
    this.Customers =[]
    const id:number = Number(this.form.get('CustomerId')?.value);
    console.log(id)
    if(id!=0){
      this.api.getByIdCustomer(id).subscribe(
        resp =>{
          let aux:any = resp;
          this.Customers.push({id:aux.id, nombre:aux.nombre, edad:aux.edad, email:aux.email})
        }
      )
    }else{
      this.Customers=this.CustomersTemp
    }
  }

  doubleClick(customer:Custom){
    this.dblClic = true;
    this.selected = customer.id;
    this.form = this.fb.group({
      CustomerId:[customer.id],
      NameCustomer:[customer.nombre],
      CustomerAge:[customer.edad],
      CustomertEmail:[customer.email]
    })
  }

  newCustomer(){
    this.dblClic = false;
    this.form = this.fb.group({
      CustomerId:[],
      NameCustomer:[],
      CustomerAge:[],
      CustomertEmail:[]
    })
    this.getAllCustomer();
  }
}
