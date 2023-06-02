import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { FormGroup, 
  FormControl, 
  Validators, 
  FormBuilder } from '@angular/forms';
import { LogeoService } from '../services/logeo.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

public email: string="";
public password: string = "";
constructor ( public logeoService: LogeoService){}

  ngOnInit() {
  }


  onLogin() {
    this.logeoService.Logearse(this.email, this.password).then(async (res)=>{
      console.log("Data:", res.data.token)
    
        await Preferences.set({
          key: 'token',
          value: res.data.token,
        });
        this.onQuiensoy();
    })
  }

  

 async onQuiensoy(){
    const { value } = await Preferences.get({ key: 'token' });
    if(value)
    this.logeoService.Quien(value).then((res)=>{
      console.log("Este soy yo", res);
    })
  }
}
