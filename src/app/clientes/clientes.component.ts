import { Component, OnInit } from "@angular/core";
import { Cliente } from "./cliente";
import { ClienteService } from "./cliente.service";
import swal from "sweetalert2";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: "app-clientes",
    templateUrl: "./clientes.component.html",
    styleUrls: ["./clientes.component.css"]
})
export class ClientesComponent implements OnInit {

    clientes: Cliente[];
    paginador: any;

    constructor(
        private clienteService: ClienteService,
        private activateRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.activateRoute.paramMap.subscribe(params => {
            let page: number = +params.get("page");

            if (!page) {
                page = 0;
            }

            this.clienteService
                .getClientes(page)
                .subscribe(
                  response => {
                    this.clientes = response.content as Cliente[];
                    this.paginador = response;
                  }
                );
        });
    }

    delete(cliente: Cliente): void {
        swal.fire({
            title: "¿Estas seguro de eliminar?",
            text: `Seguro de eliminar a ${cliente.nombre}`,
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonClass: "btn btn-success",
            cancelButtonClass: "btn btn-danger",
            confirmButtonText: "Si, eliminar",
            cancelButtonText: "No, cancelar"
        }).then(result => {
            if (result.value) {
                this.clienteService.delete(cliente.id).subscribe(response => {
                    this.clientes = this.clientes.filter(
                        cli => cli !== cliente
                    );

                    swal.fire(
                        "Eliminado!",
                        "Has eliminado el registro.",
                        "success"
                    );
                });
            }
        });
    }
}
