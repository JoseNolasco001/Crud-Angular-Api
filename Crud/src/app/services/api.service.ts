import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Custom, Customers } from '../Interfaces/customer';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {}

  getAll(){
    return this.http.get<Customers>('http://localhost:5003/api/customer/GetList').pipe(
      map(customers => {
        return customers.response
      })
    )
  }

  getByIdCustomer(id:number){
    return this.http.get<Customers>(`http://localhost:5003/api/customer/${id}`).pipe(
      map(customers => {
        return customers.response
      })
    )
  }

  deleteCustomer(id:number){
    return this.http.delete<Customers>(`http://localhost:5003/api/customer/Delete/${id}`).pipe(
      map(customers => {
        return customers.response
      })
    )
  }

  saveCustomer(customer:Custom){
    return this.http.post<Custom>('http://localhost:5003/api/customer/Save',customer).pipe(
      map(customers => {
        return customers
      })
    )
  }

  updateCustomer(customer:Custom){
    return this.http.put<Custom>('http://localhost:5003/api/customer/Update',customer).pipe(
      map(customers => {
        return customers
      })
    )
  }
}
