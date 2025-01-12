import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private httpClient: HttpClient
  ) { }

  postEntrada(entrada: string) {
    // Cambiar la URL por la de la API en AWS
    return this.httpClient.post("http://3.17.14.89:5000/analizar", { Cmd: entrada });
  }
}
