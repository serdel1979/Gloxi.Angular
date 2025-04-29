import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InfoproductService {

  //private apiUrl = 'https://usersgloxideployment-production.up.railway.app/api/Infoproduct';
  private apiUrl = 'https://localhost:7052/api/Infoproduct';



  constructor(private http: HttpClient, private router: Router) {}


  uploadInfoproduct(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/upload`, formData, {
      reportProgress: true,
      observe: 'events' 
    });
  }
  


  getInfoproducts(page: number = 1, pageSize: number = 9) {
    return this.http.get<any>(`${this.apiUrl}/list?page=${page}&pageSize=${pageSize}`);
  }



  // uploadInfoproduct(formData: FormData): Observable<any> {
  //   const token = localStorage.getItem('authToken');
  //   const headers = new HttpHeaders({
  //     Authorization: `Bearer ${token}`
  //   });
  
  //   return this.http.post(`${this.apiUrl}/upload`, formData, {
  //     headers,
  //     reportProgress: true,
  //     observe: 'events'
  //   });
  // }
  




}
