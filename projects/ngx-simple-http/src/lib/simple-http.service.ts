import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SimpleHttpService {
  constructor(private http: HttpClient) { }
  /**
   * Constructs and sends a HTTP DELETE request
   * @param apiEndpoint The API endpoint
   * @param apiParams Parameters to append to the API endpoint
   * @param apiHeaders HTTP headers to append to the request
   * @template P A TypeScript interface to type the HTTP request's parameters to
   * @template R A TypeScript interface to type the HTTP request's response to
   * @return A `HttpClient` instance
   * @deprecated Use {@link SimpleHttpService#sendHttpDelete}
   */
  createHttpDelete<P extends any, R extends any>(apiEndpoint: string, apiParams: P, apiHeaders: HttpHeaders = null): Observable<R> {
    return this.sendHttpDelete<P, R>(apiEndpoint, apiParams, apiHeaders);
  }
  /**
   * Constructs and sends a HTTP DELETE request
   * @param apiEndpoint The API endpoint
   * @param apiParams Parameters to append to the API endpoint
   * @param apiHeaders HTTP headers to append to the request
   * @template P A TypeScript interface to type the HTTP request's parameters to
   * @template R A TypeScript interface to type the HTTP request's response to
   * @return A `HttpClient` instance
   */
  sendHttpDelete<P extends any, R extends any>(apiEndpoint: string, apiParams: P, apiHeaders: HttpHeaders = null): Observable<R> {
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
   * Constructs and sends a HTTP GET request
   * @param apiEndpoint The API endpoint
   * @param apiParams Parameters to append to the API endpoint
   * @param apiHeaders HTTP headers to append to the request
   * @template P A TypeScript interface to type the HTTP request's parameters to
   * @template R A TypeScript interface to type the HTTP request's response to
   * @return A `HttpClient` instance
   * @deprecated Use {@link SimpleHttpService#sendHttpGet}
   */
  createHttpGet<P extends any, R extends any>(apiEndpoint: string, apiParams: P, apiHeaders: HttpHeaders = null): Observable<R> {
    return this.sendHttpGet<P, R>(apiEndpoint, apiParams, apiHeaders);
  }
  /**
   * Constructs and sends a HTTP GET request
   * @param apiEndpoint The API endpoint
   * @param apiParams Parameters to append to the API endpoint
   * @param apiHeaders HTTP headers to append to the request
   * @template P A TypeScript interface to type the HTTP request's parameters to
   * @template R A TypeScript interface to type the HTTP request's response to
   * @return A `HttpClient` instance
   */
  sendHttpGet<P extends any, R extends any>(apiEndpoint: string, apiParams: P, apiHeaders: HttpHeaders = null): Observable<R> {
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
   * Constructs and sends a HTTP POST request
   * @param apiEndpoint The API endpoint
   * @param apiParams Parameters to append to the API endpoint
   * @param apiBody The request body
   * @param apiHeaders HTTP headers to append to the request
   * @template B A TypeScript interface to type the HTTP request's body to
   * @template P A TypeScript interface to type the HTTP request's parameters to
   * @template R A TypeScript interface to type the HTTP request's response to
   * @return A `HttpClient` instance
   * @deprecated Use {@link SimpleHttpService#sendHttpPost}
   */
  createHttpPost<
    B extends any,
    P extends any,
    R extends any>(apiEndpoint: string, apiParams: P, apiBody: B = null, apiHeaders: HttpHeaders = null): Observable<R> {
    return this.sendHttpPost<B, P, R>(apiEndpoint, apiParams, apiBody, apiHeaders);
  }
  /**
   * Constructs and sends a HTTP POST request
   * @param apiEndpoint The API endpoint
   * @param apiParams Parameters to append to the API endpoint
   * @param apiBody The request body
   * @param apiHeaders HTTP headers to append to the request
   * @template B A TypeScript interface to type the HTTP request's body to
   * @template P A TypeScript interface to type the HTTP request's parameters to
   * @template R A TypeScript interface to type the HTTP request's response to
   * @return A `HttpClient` instance
   */
  sendHttpPost<
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
   * Constructs and sends a HTTP PUT request
   * @param apiEndpoint The API endpoint
   * @param apiParams Parameters to append to the API endpoint
   * @param apiBody The request body
   * @param apiHeaders HTTP headers to append to the request
   * @template B A TypeScript interface to type the HTTP request's body to
   * @template P A TypeScript interface to type the HTTP request's parameters to
   * @template R A TypeScript interface to type the HTTP request's response to
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
    return this.sendHttpPut<B, P, R>(apiEndpoint, apiParams, apiBody, apiHeaders);
  }
  /**
   * Constructs and sends a HTTP PUT request
   * @param apiEndpoint The API endpoint
   * @param apiParams Parameters to append to the API endpoint
   * @param apiBody The request body
   * @param apiHeaders HTTP headers to append to the request
   * @template B A TypeScript interface to type the HTTP request's body to
   * @template P A TypeScript interface to type the HTTP request's parameters to
   * @template R A TypeScript interface to type the HTTP request's response to
   * @return A `HttpClient` instance
   */
  sendHttpPut<
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
