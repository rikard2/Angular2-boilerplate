// Libraries
import {Injectable} from 'angular2/core';
import {Http, Response, BaseRequestOptions, RequestMethod, Request, RequestOptions} from "angular2/http";
import 'rxjs/add/operator/map';

@Injectable()
export class HttpService {
  baseUrl: string = '/api/service/';

  constructor(private http: Http) {
    http['_defaultOptions'].headers.set('Content-Type', 'application/json');
  }

  post(url: string, model) {
    return this.http.post(url, JSON.stringify(model));
  }
}
