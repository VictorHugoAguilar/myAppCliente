import { Injectable } from '@angular/core';
import { CLIENTES } from './clientes.json';
import { Cliente } from './cliente';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http'; 
import { map } from 'rxjs/operators';

@Injectable()
export class ClienteService {

  // tslint:disable-next-line:no-inferrable-types
  private urlEndpoint: string = 'http://localhost:8080/api/clientes';
  constructor(private http: HttpClient) { }

  getClientes(): Observable<Cliente[]> {

    // return of(CLIENTES);

    // return this.http.get<Cliente[]>(this.urlEndpoint);

    return this.http.get(this.urlEndpoint).pipe(
      map(response => response as Cliente[])
    );
  }
}
