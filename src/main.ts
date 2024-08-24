import { enableProdMode, ErrorHandler, APP_INITIALIZER, LOCALE_ID } from "@angular/core";
import { BrowserModule, bootstrapApplication } from "@angular/platform-browser";
import { provideAnimations } from "@angular/platform-browser/animations";
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { provideRouter, Routes } from "@angular/router";
import { importProvidersFrom } from "@angular/core";
import { DecimalPipe, DatePipe, registerLocaleData } from "@angular/common";
import localeFr from '@angular/common/locales/fr';

import { environment } from "./environments/environment";
import { AppComponent } from "./app/app.component";

// Imports Firebase
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import {AngularFireModule} from '@angular/fire/compat'
import { provideAuth, getAuth } from '@angular/fire/auth';



// Modules
import { TableModule } from "primeng/table";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { NgxsModule } from "@ngxs/store";
import { SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";
import { ScrollingModule } from "@angular/cdk/scrolling";
import { LoadingBarHttpClientModule } from "@ngx-loading-bar/http-client";
import { NgxWebstorageModule } from "ngx-webstorage";
import { CoreModule } from "./app/core/core.module";

// Services
import { NotyfService } from "./app/shared/services/notyf.service";
import { GlobalErrorHandlerService } from "./app/shared/services/global-error-handler.service";
import { GlobalHttpInterceptorService } from "./app/shared/services/global-http-interceptor.service";
import { EnvServiceProvider } from "./app/shared/services/env.service.provider";
import { DateFormatService } from "./app/shared/utils/date-format.service";
import { ExcelService } from "./app/shared/services/excel.service";
import { EncodingDataService } from "./app/shared/services/encoding-data.service";
import { SentryService } from "./app/shared/services/sentry.service"; 
// Components
import { FullComponent } from "./app/shared/component/layout/full/full.component";
import { ContentComponent } from "./app/shared/component/layout/content/content.component";

// Routes
import { full } from "./app/shared/routes/full.routes";
import { content } from "./app/shared/routes/routes";

// Enregistrement de la locale
registerLocaleData(localeFr);

// Factory pour TranslateHttpLoader
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

const routes: Routes = [
  { path: "", redirectTo: "auth/sign-in", pathMatch: "full" },
  { 
    path: "mobile-message",
    loadComponent: () => import("src/app/shared/component/mobile-message/ui/mobile-message.component")
      .then((m) => m.MobileMessageComponent)
  },
  { 
    path: "not-network",
    loadComponent: () => import("./app/components/common/not-network/ui/not-network.component")
      .then(m => m.NotNetworkComponent)
  },
  { 
    path: "error-500",
    loadComponent: () => import("./app/components/common/internal-error/ui/internal-error.component")
      .then(m => m.InternalErrorComponent)
  },
  {
    path: "",
    component: ContentComponent,
    providers: [DecimalPipe, DateFormatService, ExcelService],
    children: content
  },
  {
    path: "",
    component: FullComponent,
    children: full
  },
  { 
    path: "**",
    loadComponent: () => import("./app/components/common/not-found/ui/not-found.component")
      .then(m => m.NotFoundComponent)
  }
];

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    importProvidersFrom(
      BrowserModule,
      HttpClientModule,
      AngularFireModule.initializeApp(environment.firebase),

      CoreModule,
      NgxWebstorageModule.forRoot(),
      LoadingBarHttpClientModule,
      ScrollingModule,
      SweetAlert2Module.forRoot(),
      NgxsModule.forRoot([]),
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
      }),
      TableModule
    ),
    provideAnimations(),
    provideRouter(routes),
    EncodingDataService,
    ExcelService,
    EnvServiceProvider,
    NotyfService,
    DatePipe,
    { provide: LOCALE_ID, useValue: "fr-FR" },
    { provide: ErrorHandler, useClass: GlobalErrorHandlerService },
    { provide: HTTP_INTERCEPTORS, useClass: GlobalHttpInterceptorService, multi: true },
    {
      provide: APP_INITIALIZER,
      useFactory: (sentryService: SentryService) => () => sentryService.init(),
      deps: [SentryService],
      multi: true
    }
  ]
}).catch((err) => console.error(`Main:bootstrapApplication: Application bootstrap error is ${err}`));