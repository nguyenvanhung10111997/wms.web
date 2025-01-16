import { Injectable } from "@angular/core";
import { URL_CONSTANTS } from "src/app/config/url.constants";
import { Observable } from "rxjs";
import { BaseService } from "~src/app/services/base.service";
import { WeatherForecastRes } from "./models";
@Injectable()
export class WeatherForecastService extends BaseService {
  url = URL_CONSTANTS.lines;

  public getList(): Observable<WeatherForecastRes[]> {
    return this._apiService.get<WeatherForecastRes[]>(
      `${this.url}`
    );
  }
}
