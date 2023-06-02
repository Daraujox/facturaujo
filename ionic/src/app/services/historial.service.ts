import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistorialService {
  private formDataList: any[] = [];

  private formDataSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(this.formDataList);

  constructor() {}

  getFormData(): Observable<any[]> {
    return this.formDataSubject.asObservable();
  }

  updateFormData(data: any) {
    const formDataCopy = { ...data }; // Crear una copia independiente del objeto data
    this.formDataList.push(formDataCopy); // Agregar la copia al array formDataList
    this.formDataSubject.next(this.formDataList);
  }
}
