import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { TranslateModule } from "@ngx-translate/core";

@Component({
    selector: "app-mobile-message",
    templateUrl: "./mobile-message.component.html",
    styleUrls: ["./mobile-message.component.scss"],
    standalone: true,
    imports: [TranslateModule],
})
export class MobileMessageComponent implements OnInit {
  constructor(private title: Title) {}

  ngOnInit() {
    this.title.setTitle(
      "Cateli Smart Platform | Télechargez l'application mobile",
    );
  }
}
