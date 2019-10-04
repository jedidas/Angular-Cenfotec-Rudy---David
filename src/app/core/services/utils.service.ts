import { Injectable } from "@angular/core";
import { HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class UtilsService {
  constructor() { }

  public generateParams(params: any = {}): HttpParams {
    let httpParams: HttpParams = new HttpParams();

    Object.keys(params).forEach(key => {
      const param = params[key];
      if (Array.isArray(param)) {
        param.forEach(value => {
          httpParams = httpParams.append(key, value);
        });
      } else {
        httpParams = httpParams.set(key, param);
      }
    });

    return httpParams;
  }

  public extractData(data: any): any {
    return {
      body: data.body,
      totalElements: data.headers.get("X-Total-Count")
    }
  }
}
