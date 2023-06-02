import { Component, OnInit } from '@angular/core';
import { FormGroup, 
  FormControl, 
  Validators, 
  FormBuilder } from '@angular/forms';
import { RegistrarseService } from '../services/registrarse.service';
import { Preferences } from '@capacitor/preferences';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.page.html',
  styleUrls: ['./registrarse.page.scss'],
})
export class RegistrarsePage implements OnInit {

  public email: string="";
  public password: string = "";
  constructor ( public registrarseService: RegistrarseService, private toastController: ToastController){}
  
    ngOnInit() {
    }
  
  
    async onRegistrarse() {
      if (this.email.length >= 8 && this.password.length >= 8) {
        this.registrarseService.Registrarse(this.email, this.password).then(async (res) => {
          console.log("Data:", res.data.token);
          
          await Preferences.set({
            key: 'token',
            value: res.data.token,
          });
    
          const toast = await this.toastController.create({
            message: 'Registro exitoso',
            duration: 3000, // Duración del mensaje en milisegundos
            position: 'top' // Posición del mensaje en la pantalla
          });
    
          toast.present();
        });
      } else {
        const toast = await this.toastController.create({
          message: 'El email (sin contar dominio) y la contraseña deben tener al menos 8 caracteres',
          duration: 2000,
          position: 'top'
        });
    
        toast.present();
      }
    }
    

  }
