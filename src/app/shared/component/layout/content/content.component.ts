import { Component } from "@angular/core";
import { ToggleService } from "@/components/common/header/toggle.service";
import { FooterComponent } from "../../../../components/common/footer/ui/footer.component";
import { RouterModule, RouterOutlet } from "@angular/router";
import { HeaderComponent } from "../../../../components/common/header/ui/header.component";
import { CommonModule, NgClass } from "@angular/common";
import { SidebarComponent } from "../../../../components/common/sidebar/sidebar.component";

@Component({
    selector: "app-content",
    templateUrl: "./content.component.html",
    styleUrls: ["./content.component.scss"],
    standalone: true,
    imports: [
        SidebarComponent,
        NgClass,
        HeaderComponent,
        RouterOutlet,
        FooterComponent,
        CommonModule, 
        RouterModule
    ],
})
export class ContentComponent {
  public isToggled = false;
  public user: any;
  public active: number = 1;
  constructor(private toggleService: ToggleService) {
    this.toggleService.isToggled$.subscribe((isToggled) => {
      this.isToggled = isToggled;
    });
  }
}
