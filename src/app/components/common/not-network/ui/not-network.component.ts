import { Component } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { TranslateModule } from "@ngx-translate/core";
import { MatButtonModule } from "@angular/material/button";

@Component({
    selector: "app-not-network",
    templateUrl: "./not-network.component.html",
    styleUrls: ["./not-network.component.scss"],
    standalone: true,
    imports: [MatButtonModule, TranslateModule],
})
export class NotNetworkComponent {
  public title =
    "Problème de réseau - An innovative employee appraisal platform designed to help companies optimize their performance management and foster the professional development of their teams.";

  constructor(private titleService: Title) {}
  public ngOnInit() {
    this.titleService.setTitle(`${this.title}`);
  }
}
