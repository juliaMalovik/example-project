import {HttpClient, HttpParams} from '@angular/common/http';
import {apiUrl, apiKey, apiLanguage} from '../constants';
import {Injectable} from "@angular/core";

export function mapObject<T>(dtoType: new (...args: any[]) => T, dto: any): T {
  return new dtoType(dto);
}

export function mapArray<T>(dtoType: new (...args: any[]) => T, dtoArray: any[]): T[] {
  return dtoArray.map((dto: any) => {
    return mapObject(dtoType, dto);
  });
}

@Injectable({
  providedIn: 'root'
})
export class HttpBaseService {

    constructor(private httpClient: HttpClient) {
    }

    public get<T>(
        url: string,
        params: HttpParams = new HttpParams()) {
        const requestParams: HttpParams = this.setStaticParams(params);
        return this.httpClient.get(apiUrl + url, {params: requestParams});
    }

    private setStaticParams(params: HttpParams): HttpParams {
        params = params.append('api_key', apiKey);
        params = params.append('language', apiLanguage);
        return params;
    }
}
