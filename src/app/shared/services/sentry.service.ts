import { Injectable } from '@angular/core';
import * as Sentry from "@sentry/angular-ivy";
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SentryService {
  init() {
    if (environment.production) {
      Sentry.init({
        dsn: "https://6ef2970d6a68fc1a0ca5612a145b910a@o4506076809854976.ingest.us.sentry.io/4507226172227584",
        integrations: [
          new Sentry.BrowserTracing(),
          new Sentry.Replay(),
        ],
        tracesSampleRate: 1.0,
        tracePropagationTargets: [
          "localhost",
          /^https:\/\/api-rest-distribution\.pretty-rattlesnake-77\.telebit\.io\/api\/v1/,
        ],
        replaysSessionSampleRate: 0.1,
        replaysOnErrorSampleRate: 1.0,
      });
    }
  }
}