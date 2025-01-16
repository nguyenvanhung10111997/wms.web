import { ApplicationConfig, importProvidersFrom } from "@angular/core";
import {
  InMemoryScrollingOptions,
  provideRouter,
  withInMemoryScrolling,
  withPreloading
} from "@angular/router";
import {
  provideHttpClient,
  withInterceptors,
  withNoXsrfProtection
} from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FlagBasedPreloadingStrategy } from "~src/preloading-strategy";
import { NgrxConfig } from "./stored/ngrx.config";

const scrollConfig: InMemoryScrollingOptions = {
  scrollPositionRestoration: "disabled",
  anchorScrolling: "enabled"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withNoXsrfProtection()),
    provideRouter(
      [
        {
          path: "",
          loadChildren: () => import("./pages/pages.config").then(m => m.ROUTES)
        }
      ],
      withPreloading(FlagBasedPreloadingStrategy),
      withInMemoryScrolling(scrollConfig)
    ),
    importProvidersFrom(BrowserAnimationsModule),
    NgrxConfig.providers
  ]
};
