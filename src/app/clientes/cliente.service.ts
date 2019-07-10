import { Injectable } from "@angular/core";
import { CLIENTES } from "./clientes.json";
import { Cliente } from "./cliente";
import { Observable, of } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable()
export class ClienteService {
    // tslint:disable-next-line:no-inferrable-types
    private urlEndpoint: string = "http://localhost:8080/api/clientes";

    // Creamos atributos con las cabezeras
    private httpHeaders = new HttpHeaders({
        "Content-Type": "application/json"
    });

    constructor(private http: HttpClient) {}

    getClientes(): Observable<Cliente[]> {
        // return of(CLIENTES);

        // return this.http.get<Cliente[]>(this.urlEndpoint);

        return this.http
            .get(this.urlEndpoint)
            .pipe(map(response => response as Cliente[]));
    }

    create(cliente: Cliente): Observable<Cliente> {
        return this.http.post<Cliente>(this.urlEndpoint, cliente, {
            headers: this.httpHeaders
        });
    }

    getCliente(id): Observable<Cliente> {
      return this.http.get<Cliente>(`${this.urlEndpoint}/${id}`);
    }

    update(cliente: Cliente): Observable<Cliente> {
      return this.http.put<Cliente>(`${this.urlEndpoint}/${cliente.id}`, cliente, {headers: this.httpHeaders} );
    }


}
