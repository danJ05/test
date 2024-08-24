import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterModule, RouterOutlet } from "@angular/router";

@Component({
    selector: "app-full",
    templateUrl: "./full.component.html",
    standalone: true,
    imports: [RouterOutlet , CommonModule, RouterModule],
})
export class FullComponent {}
