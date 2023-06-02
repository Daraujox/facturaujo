import { Component, OnInit } from '@angular/core';
import { HistorialService } from '../services/historial.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {

  formData: any[]=[];

  constructor(private historialService: HistorialService) { }

  ngOnInit() {
    this.historialService.getFormData().subscribe(data => {
      this.formData = data;
    });
  }
}
