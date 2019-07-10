import { Component, OnInit } from "@angular/core";
import { Cliente } from "./cliente";
import { ClienteService } from "./cliente.service";
import { Router, ActivatedRoute } from "@angular/router";
import swal from "sweetalert2";
import { Observable } from "rxjs";
import { HttpBackend } from "@angular/common/http";

@Component({
    selector: "app-form",
    templateUrl: "./form.component.html"
})
export class FormComponent implements OnInit {
    // tslint:disable-next-line: no-inferrable-types
    private titulo: string = "Crear cliente";
    private cliente: Cliente = new Cliente();

    constructor(
        private clienteService: ClienteService,
        private routes: Router,
        private activateRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.cargarCliente();
    }

    public cargarCliente(): void {
        this.activateRoute.params.subscribe(params => {
            let id: any = params["id"];
            if (id) {
                this.clienteService
                    .getCliente(id)
                    .subscribe(cliente => (this.cliente = cliente));
            }
        });
    }

    public create(): void {
        console.log("clicked");
        console.log(this.cliente);
        this.clienteService.create(this.cliente).subscribe(cliente => {
            swal.fire({
                title: "Nuevo Cliente",
                text: `Cliente ${cliente.nombre} ha sido creado correctamente`,
                type: "success"
            });
            this.routes.navigate(["/clientes"]);
        });
    }

    public update(): void {
        console.log("Actualiza");
        this.clienteService.update(this.cliente)
          .subscribe(cliente => {
            this.routes.navigate(["/clientes"])
            swal.fire({ title: "Cliente Actualizado", text: `Cliente ${ cliente.nombre } ha sido actualizado correctamente`,type: "success" })
          });
    }
}
