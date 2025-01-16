import { Injectable, inject } from "@angular/core";
import { ApiService } from "./api.service";
@Injectable()
export class BaseService {
  public _apiService = inject(ApiService);
}
