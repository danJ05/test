import { Component, OnInit } from "@angular/core";
import { NavigationEnd, Router, RouterOutlet } from "@angular/router";
import { ToggleService } from "./components/common/header/toggle.service";
import { filter } from "rxjs/operators";
import { TranslateService } from "@ngx-translate/core";
import { LoadingBarModule } from "@ngx-loading-bar/core";
import { LoaderComponent } from "./shared/component/loader/loader.component";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"],
    standalone: true,
    imports: [
        LoaderComponent,
        LoadingBarModule,
        RouterOutlet,
    ],
})
export class AppComponent implements OnInit {
  public title =
    "SoleadR - Plongez dans l'univers du financement collaboratif avec SOLEADR, l'application qui donne vie à vos idées.";

  public isToggled = false;
  public previousUrl: string = null;
  public currentUrl: string = null;
  // @ts-ignore
  constructor(
    public router: Router,
    private toggleService: ToggleService,
    private translate: TranslateService,
  ) {
    this.translate.setDefaultLang("fr"); // langue par défaut
    this.toggleService.isToggled$.subscribe((isToggled) => {
      this.isToggled = isToggled;
    });
  }

  public ngOnInit(): void {
    this.detectNavigator();
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
      });
  }
  detectNavigator() {
    const ua = navigator.userAgent;
    if (
      /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(
        ua,
      )
    )
      this.router.navigate(["/mobile-message"]);
  }
}
