import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiciohttpService {

  

  constructor(private http: HttpClient) { }

   headers = new HttpHeaders({
    'Access-Control-Allow-Origin': '*'
  });

  options = { headers: this.headers };

  Post(ruta: string, condicion: any = null): Observable<any> {

    return this.http.post<any>("https://localhost:44348/" + ruta, condicion);
  }

  Get(ruta: string): Observable<any> {

    return this.http.get<any>("https://localhost:44348/" + ruta, this.options ) ;
  } 
}
