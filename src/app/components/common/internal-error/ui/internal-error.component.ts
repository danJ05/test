import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { TranslateModule } from "@ngx-translate/core";
import { MatButtonModule } from "@angular/material/button";

@Component({
    selector: "app-internal-error",
    templateUrl: "./internal-error.component.html",
    styleUrls: ["./internal-error.component.scss"],
    standalone: true,
    imports: [MatButtonModule, TranslateModule],
})
export class InternalErrorComponent implements OnInit {
  public title =
    "Erreur 500 - An innovative employee appraisal platform designed to help companies optimize their performance management and foster the professional development of their teams.";

  constructor(private titleService: Title) {}
  public ngOnInit() {
    this.titleService.setTitle(`${this.title}`);
  }
}
