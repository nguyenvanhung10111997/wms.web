import { APP_INITIALIZER, ApplicationConfig } from "@angular/core";
import { AppInitializeService } from "./services/app-initialize.service";
import { Observable, of } from "rxjs";

export const initializeApplication = (
  appInitialize: AppInitializeService
): (() => Observable<boolean>) => {
  appInitialize.setInitialize(true);
  return () => of(true);
};

export const initializeAppConfig: ApplicationConfig = {
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApplication,
      multi: true,
      deps: [AppInitializeService]
    }
  ]
};
