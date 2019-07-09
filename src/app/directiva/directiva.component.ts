import { Component, OnInit } from "@angular/core";

@Component({
    templateUrl: "./directiva.component.html",
    selector: "app-directiva",
    styleUrls: ["./directiva.component.css"]
})
export class DirectivaComponent implements OnInit {
    listaCursos: string[] = ["Typescript", "Java", "PHP", "C#", "Javascript"];

    // tslint:disable-next-line: no-inferrable-types
    habilitar: boolean = true;

    constructor() {}

    ngOnInit() {}

    setHabilitar(): void {
        this.habilitar = !this.habilitar;

        if (this.habilitar === true) {
            console.log("Mostrar");
        } else {
            console.log("Ocultar");
        }
    }
}
