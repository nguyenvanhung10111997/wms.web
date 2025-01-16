import { APP_BASE_HREF } from "@angular/common";
import { bootstrapApplication } from "@angular/platform-browser";
import { config as browserConfig } from "./app/app.config.browser";
import { AppComponent } from "./app/app.component";
import { ApplicationConfig, mergeApplicationConfig } from "@angular/core";
import * as moment from "moment-timezone";

// Cấu hình múi giờ mặc định cho toàn bộ ứng dụng
moment.tz.setDefault("Asia/Ho_Chi_Minh");

const getBaseUrl = () => {
  return document.getElementsByTagName("base")[0].href.slice(0, -1);
};

const config: ApplicationConfig = {
  providers: [
    { provide: APP_BASE_HREF, useFactory: getBaseUrl },
    { provide: "MESSAGE", useValue: "Message from the client" }
  ]
};

const mergedConfig = mergeApplicationConfig(browserConfig, config);

bootstrapApplication(AppComponent, mergedConfig).catch(err =>
  console.error(err)
);
