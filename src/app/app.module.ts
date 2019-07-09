import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

// Modulo para conexiones http
import { HttpClientModule } from '@angular/common/http';

// Modulo para las routas
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { DirectivaComponent } from "./directiva/directiva.component";
import { ClientesComponent } from "./clientes/clientes.component";
import { ClienteService } from "./clientes/cliente.service";

const ROUTES: Routes = [
    { path: "", redirectTo: "/clientes", pathMatch: "full" },
    { path: "directivas", component: DirectivaComponent },
    { path: "clientes", component: ClientesComponent }
];

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        DirectivaComponent,
        ClientesComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        RouterModule.forRoot(ROUTES)
    ],
    providers: [ClienteService],
    bootstrap: [AppComponent]
})
export class AppModule {}
