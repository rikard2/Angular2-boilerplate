// Libraries
import {Injectable} from 'angular2/core';
import {Http, Response, BaseRequestOptions, RequestMethod, Request, RequestOptions} from "angular2/http";
import 'rxjs/add/operator/map';

@Injectable()
export class HttpService {
  baseUrl: string = 'http://xxx.azurewebsites.net/api/service/';

  constructor(private http: Http) {
    http['_defaultOptions'].headers.set('Content-Type', 'application/json');
  }

  post(url: string, model) {
    return this.http.post(url, JSON.stringify(model));
  }

  parseResponse(url, response) {
    var body = JSON.parse(response['_body'].toString())

    if (body.ExceptionMessage) {
      console.error('List Error (' + url + '): ' + body.ExceptionMessage);
    }

    return body;
  }

  list(action: string, model) {
    var url = this.baseUrl + 'list/' + action;
    model = {
      Model: model
    };

    var post =  this.http.post(url, JSON.stringify(model));

    return post.map((response) => this.parseResponse(url, response));
  }
}
