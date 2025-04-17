import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InfoproductService {

  private apiUrl = 'https://usersgloxideployment-production.up.railway.app/api/Infoproduct';



  constructor(private http: HttpClient, private router: Router) {}


  uploadInfoproduct(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/upload`, formData, {
      reportProgress: true,
      observe: 'events' 
    });
  }
  




}
