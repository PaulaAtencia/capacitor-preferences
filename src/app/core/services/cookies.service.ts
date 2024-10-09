import { Injectable } from '@angular/core';
import { DataService } from '../interfaces/data-service';
import { Model } from '../interfaces/model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CookiesDataService<T extends Model> extends DataService<T> {
  
  constructor() 
  {
    super();
    console.log("CookiesDataService created");
  }

  // Métodos implementados de DataService

  public override create(value: T): Observable<T> 
  {
    const existingData = this.getCookiesData();
    value.id = this.generarCodigoAlfanumerico(); // Método para generar el código alfanumérico
    existingData.push(value);
    this.saveCookiesData(existingData);

    return of(value);
  }

  public override requestAll(): Observable<T[]> 
  {
    const data = this.getCookiesData();
    return of(data);
  }

  public override requestById(id: string): Observable<T | null> 
  {
    const data = this.getCookiesData().find(item => item.id === id);
    return of(data || null);
  }

  public override update(id: string, value: T): Observable<T | null>
  {
    const data = this.getCookiesData();

    const index = data.findIndex(item => item.id === id);
    if (index === -1) return of(null);
    
    data[index] = value;
    this.saveCookiesData(data);

    return of(value);
  }

  public override delete(id: string): Observable<T | null>
  {
    let data = this.getCookiesData();

    const index = data.findIndex(item => item.id === id);
    if (index === -1) return of(null);
    
    const deletedItem = data.splice(index, 1)[0];
    this.saveCookiesData(data);

    return of(deletedItem);
  }

  // Métodos auxiliares para manejar cookies
  
  private getCookiesData(): T[] 
  {
    const data = localStorage.getItem('data') || '[]';
    return JSON.parse(data);
  }

  private saveCookiesData(data: T[]): void 
  {
    localStorage.setItem('data', JSON.stringify(data));
  }

  private generarCodigoAlfanumerico(): string 
  {
    const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let codigo = "";
    for (let i = 0; i < 10; i++) 
    {
      const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
      codigo += caracteres[indiceAleatorio];
    }
    return codigo;
  }
}
