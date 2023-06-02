import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistrarService {

  private apiUrl = environment.backend + "y"; // backend URL

  constructor(private http: HttpClient) { }

  enviarFormulario(data: any) {
    return this.http.post(`${this.apiUrl}`, data);
  }
}

