import { Injectable } from "@angular/core";
import {formatDate, DatePipe, registerLocaleData} from "@angular/common";
import { CLIENTES } from "./clientes.json";
import { Cliente } from "./cliente";
import { Observable, of, throwError } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map, catchError, tap } from "rxjs/operators";
import Swal from "sweetalert2";
import { Router } from "@angular/router";


@Injectable()
export class ClienteService {
    // tslint:disable-next-line:no-inferrable-types
    private urlEndpoint: string = "http://localhost:8080/api/clientes";

    // Creamos atributos con las cabezeras
    private httpHeaders = new HttpHeaders({
        "Content-Type": "application/json"
    });

    constructor(private http: HttpClient, private router: Router) {}

    getClientes(page: number): Observable<any> {
        // return of(CLIENTES);

        // return this.http.get<Cliente[]>(this.urlEndpoint);

        return this.http.get(this.urlEndpoint + '/page/' + page).pipe(
            tap((response: any) => {
                // tslint:disable-next-line: prefer-const
                let clientes = response as Cliente[];
                (response.content as Cliente[]).forEach(
                    cliente => {
                        console.log(cliente.nombre);
                    });
            }),
            // como trae un objeto hashMap tenemos  que convertirlo con el map en un
            // objeto del tipo cliente de la siguiente manera
            map( (response: any) => {
                (response.content as Cliente[]).map(cliente => {
                    cliente.nombre = cliente.nombre.toUpperCase();
                    // utilizando formatDate
                    // cliente.createAt = formatDate(cliente.createAt, 'dd-MM-yyyy', 'en-US');
                    // utilizando DatePipe que mas por debajo si utiliza formaDate
                    // tslint:disable-next-line: prefer-const
                    let datePipe = new DatePipe('es');
                    cliente.createAt = datePipe.transform(cliente.createAt, 'EEEE dd, MMMM yyyy');
                    return cliente;
               });
                return response;
            })
        );
    }

    create(cliente: Cliente): Observable<Cliente> {
        return this.http
            .post(this.urlEndpoint, cliente, {
                headers: this.httpHeaders
            })
            .pipe(
                // como trae un objeto hashMap tenemos  que convertirlo con el map en un
                // objeto del tipo cliente de la siguiente manera
                map((response: any) => response.cliente as Cliente),
                catchError(e => {
                    if (e.status === 400) {
                        return throwError(e);
                    }
                    console.error(e.error.mensaje);
                    Swal.fire(e.error.mensaje, e.error.error, "error");
                    return throwError(e);
                })
            );
    }

    getCliente(id): Observable<Cliente> {
        return this.http.get<Cliente>(`${this.urlEndpoint}/${id}`).pipe(
            catchError(e => {
                this.router.navigate(["/clientes"]);
                console.error(e.error.mensaje);
                Swal.fire("Error al buscar cliente", e.error.mensaje, "error");
                return throwError(e);
            })
        );
    }

    update(cliente: Cliente): Observable<Cliente> {
        return this.http
            .put<Cliente>(`${this.urlEndpoint}/${cliente.id}`, cliente, {
                headers: this.httpHeaders
            })
            .pipe(
                // como trae un objeto hashMap tenemos  que convertirlo con el map en un
                // objeto del tipo cliente de la siguiente manera
                map((response: any) => response.cliente as Cliente),
                catchError(e => {
                    if (e.status === 400) {
                        return throwError(e);
                    }
                    console.error(e.error.mensaje);
                    Swal.fire(e.error.mensaje, e.error.error, "error");
                    return throwError(e);
                })
            );
    }

    delete(id: number): Observable<Cliente> {
        return this.http
            .delete<Cliente>(`${this.urlEndpoint}/${id}`, {
                headers: this.httpHeaders
            })
            .pipe(
                // como trae un objeto hashMap tenemos  que convertirlo con el map en un
                // objeto del tipo cliente de la siguiente manera
                map((response: any) => response.cliente as Cliente),
                catchError(e => {
                    console.error(e.error.mensaje);
                    Swal.fire(e.error.mensaje, e.error.error, "error");
                    return throwError(e);
                })
            );
    }
}
