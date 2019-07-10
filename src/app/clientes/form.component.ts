import { Component, OnInit } from "@angular/core";
import { Cliente } from "./cliente";
import { ClienteService } from "./cliente.service";
import { Router } from "@angular/router";
import swal from "sweetalert2";

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
        private routes: Router
    ) {}

    ngOnInit() {}

    public create(): void {
        console.log("clicked");
        console.log(this.cliente);
        this.clienteService.create(this.cliente).subscribe(cliente => {
            this.routes.navigate(["/clientes"]);
            swal.fire(
                "Nuevo Cliente",
                `Cliente ${cliente.nombre} ha sido creado correctamente`,
                "success"
            );
        });
    }
}
