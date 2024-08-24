import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CommonApiService } from "@/core/common/common-api.service";
import { EndPointUrl } from "@/pages/dashboard/data-access/api.enum";

@Injectable({
  providedIn: "root",
})
// @ts-ignore
export class DashboardService {
  constructor(private http: CommonApiService) {}

  getAllInfoDashboard(): Observable<any> {
    const url: string = <string>EndPointUrl.GET_INFO_DASHBOARD;
    return this.http.get(`${url}`);
  }
}
