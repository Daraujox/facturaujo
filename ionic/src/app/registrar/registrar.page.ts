import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { RegistrarService } from '../services/registrar.service';
import { HistorialService } from '../services/historial.service';
import { ToastController } from '@ionic/angular';
import { v4 as uuidv4 } from 'uuid'; 
@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {
  formData: {
    id?: string;
    fecha?: Date;
    articulos?: Array<{
      iditem: string;
      detalle: string;
      nombre: string;
      precio: number;
    }>;
    subtotal?: number;
    iva?: number;
    descuento?: number;
    total?: number;
    descuentoInput?: number;
  };

  constructor(private registrarService: RegistrarService, private historialService: HistorialService, private toastController: ToastController) {
    this.formData = {
      fecha: new Date(),
      articulos: [], 
      subtotal: 0,
      iva: 0,
      descuento: 0,
      total: 0,
      descuentoInput: 0,
    };
  }

  agregarArticulo() {
    if (!this.formData.articulos) {
      this.formData.articulos = []; // Verificar si está undefined y asignar un array vacío
    }
    this.formData.articulos.push({
      iditem: uuidv4(),
      detalle: '',
      nombre: '',
      precio: 0
    });

   // Calcular el subtotal actualizado
   this.formData.subtotal = this.formData.articulos.reduce((total, articulo) => total + articulo.precio, 0);
  }


  enviarFormulario() {
    const formDataToSend = { ...this.formData }; // Clonar el objeto formData
  
    // Verificar si la propiedad 'articulos' existe y no es 'undefined'
    if (formDataToSend.articulos) {
      // Eliminar los campos vacíos o con valor 0
      formDataToSend.articulos = formDataToSend.articulos.filter(articulo => articulo.nombre || articulo.detalle || articulo.precio > 0);
    }
  
    if (!formDataToSend.articulos || formDataToSend.articulos.length === 0) {
      console.warn('No se enviaron los datos porque no hay información suficiente.');
      return; // Salir de la función si no hay datos suficientes
    }
  
    // Calcular el subtotal actualizado
    formDataToSend.subtotal = formDataToSend.articulos.reduce((total, articulo) => total + articulo.precio, 0);
  
    // Calcular el valor del IVA
    formDataToSend.iva = formDataToSend.subtotal * 0.19;
  
    // Calcular el valor del descuento
    const descuentoPorcentaje = formDataToSend.descuentoInput || 0;
    formDataToSend.descuento = (formDataToSend.subtotal + formDataToSend.iva) * (descuentoPorcentaje / 100);
  
    // Calcular el valor total
    formDataToSend.total = formDataToSend.subtotal + formDataToSend.iva - formDataToSend.descuento;
  
    this.registrarService.enviarFormulario(formDataToSend)
      .subscribe(
        response => {
          console.log('Formulario enviado con éxito', response);
          this.historialService.updateFormData(formDataToSend); // Actualizar la información en el servicio HistorialService
          this.formData.total = formDataToSend.total //Aqui actualizo la info de la variable total
        },
        error => {
          console.error('Error al enviar el formulario', error);
        }
      );
  }

  async aplicarDescuento() {
    if (this.formData.descuentoInput && this.formData.subtotal !== undefined && this.formData.iva !== undefined) {
      const descuentoPorcentaje = this.formData.descuentoInput / 100;
      const descuento = (this.formData.subtotal + this.formData.iva) * descuentoPorcentaje;
      this.formData.descuento = descuento;
      this.formData.descuento = this.formData.descuentoInput;
  
      const toast = await this.toastController.create({
        message: 'Descuento aplicado',
        duration: 3000, // Duración del mensaje en milisegundos
        position: 'top' // Posición del mensaje en la pantalla
      });
  
      toast.present();
    }
  }

  


    mostrarFormulario() {
      this.historialService.updateFormData(this.formData);
    }

    ngOnInit() {
    }


  }

  


