import { Injectable } from '@angular/core';
import { Http, HttpResponse } from '@capacitor-community/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LogeoService {

  constructor(private router: Router) { }

  Logearse = async (email: string, password: string) => {
    const options = {
      url: environment.backend + "users/login",
      headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
      
      data: { email: email, password: password },
    };
  
    const response: HttpResponse = await Http.post(options);
    
    if (response.status === 200) {
      this.router.navigate(['/decision']);
    }

    return response;

    

};

  Quien = async (token: string) => {
  const options = {
    url: environment.backend + 'whoAmI',
      headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    }

};

const response: HttpResponse = await Http.get(options);
return response;

};


}

