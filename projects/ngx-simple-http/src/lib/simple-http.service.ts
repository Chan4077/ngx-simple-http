import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SimpleHttpService {
  constructor(private http: HttpClient) { }
  /**
   * Generates the query parameters to be used for a HTTP DELETE request
   * @param apiEndpoint The API endpoint
   * @param apiParams Parameters to append to the API endpoint
   * @param apiHeaders HTTP headers to append to the request
   * @return A `HttpClient` instance
   */
  createHttpDelete<P extends any, R extends any>(apiEndpoint: string, apiParams: P, apiHeaders: HttpHeaders = null): Observable<R> {
    let params = new HttpParams();
    for (const prop in apiParams) {
      if (prop in apiParams && typeof apiParams[prop] !== undefined && apiParams[prop] !== null) {
        params = params.append(prop, apiParams[prop]);
      }
    }
    if (apiHeaders) {
      return this.http.delete<R>(
        apiEndpoint,
        {
          params: params,
          headers: apiHeaders
        }
      );
    } else {
      return this.http.delete<R>(
        apiEndpoint,
        {
          params: params
        }
      );
    }
  }
  /**
   * Generates the query parameters to be used for a HTTP GET request
   * @param apiEndpoint The API endpoint
   * @param apiParams Parameters to append to the API endpoint
   * @param apiHeaders HTTP headers to append to the request
   * @return A `HttpClient` instance
   */
  createHttpGet<P extends any, R extends any>(apiEndpoint: string, apiParams: P, apiHeaders: HttpHeaders = null): Observable<R> {
    let params = new HttpParams();
    for (const prop in apiParams) {
      if (prop in apiParams && typeof apiParams[prop] !== undefined && apiParams[prop] !== null) {
        params = params.append(prop, apiParams[prop]);
      }
    }
    if (apiHeaders) {
      return this.http.get<R>(
        apiEndpoint,
        {
          params: params,
          headers: apiHeaders
        }
      );
    } else {
      return this.http.get<R>(
        apiEndpoint,
        {
          params: params
        }
      );
    }
  }
  /**
   * Generates the query parameters to be used with the API endpoint
   * @param apiEndpoint The API endpoint
   * @param apiParams Parameters to append to the API endpoint
   * @param apiBody The request body
   * @param apiHeaders HTTP headers to append to the request
   * @return A `HttpClient` instance
   */
  createHttpPost<
    B extends any,
    P extends any,
    R extends any>(apiEndpoint: string, apiParams: P, apiBody: B = null, apiHeaders: HttpHeaders = null): Observable<R> {
    let params = new HttpParams();
    for (const prop in apiParams) {
      if (prop in apiParams && typeof apiParams[prop] !== undefined && apiParams[prop] !== null) {
        params = params.append(prop, apiParams[prop]);
      }
    }
    if (apiHeaders) {
      if (apiBody) {
        return this.http.post<R>(
          apiEndpoint,
          apiBody,
          {
            params: params,
            headers: apiHeaders
          }
        );
      } else {
        return this.http.post<R>(
          apiEndpoint,
          apiBody,
          {
            params: params,
            headers: apiHeaders
          }
        );
      }
    } else {
      if (apiBody) {
        return this.http.post<R>(
          apiEndpoint,
          apiBody,
          {
            params: params
          }
        );
      } else {
        return this.http.post<R>(
          apiEndpoint,
          {
            params: params
          }
        );
      }
    }
  }
  /**
   * Generates the query parameters to be used with the API endpoint
   * @param apiEndpoint The API endpoint
   * @param apiParams Parameters to append to the API endpoint
   * @param apiBody The request body
   * @param apiHeaders HTTP headers to append to the request
   * @return A `HttpClient` instance
   */
  createHttpPut<
    B extends any,
    P extends any,
    R extends any>(
      apiEndpoint: string,
      apiParams: P,
      apiBody: B,
      apiHeaders: HttpHeaders = null): Observable<R> {
    let params = new HttpParams();
    for (const prop in apiParams) {
      if (prop in apiParams && typeof apiParams[prop] !== undefined && apiParams[prop] !== null) {
        params = params.append(prop, apiParams[prop]);
      }
    }
    if (apiHeaders) {
      return this.http.put<R>(
        apiEndpoint,
        apiBody,
        {
          params: params,
          headers: apiHeaders
        }
      );
    } else {
      return this.http.put<R>(
        apiEndpoint,
        apiBody,
        {
          params: params
        }
      );
    }
  }
}
