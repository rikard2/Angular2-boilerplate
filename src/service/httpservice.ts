// Libraries
import {Injectable} from 'angular2/core';
import {Http, Response, BaseRequestOptions, RequestMethod, Request, RequestOptions} from "angular2/http";
import 'rxjs/add/operator/map';

import {UserSessionService} from './userSessionService';

@Injectable()
export class HttpService {
  baseUrl: string = 'https://xxx.azurewebsites.net/api/service/';

  constructor(private http: Http, private userSessionService: UserSessionService) {
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

  save(action: string, model) {
    model.sessionKey = this.userSessionService.sessionKey;
    var url = this.baseUrl + 'save/' + action;
    model = {
      Model: model
    };

    var post =  this.http.post(url, JSON.stringify(model));

    return post.map((response) => this.parseResponse(url, response));
  }

  list(action: string, model) {
    model.sessionKey = this.userSessionService.sessionKey;
    var url = this.baseUrl + 'list/' + action;
    model = {
      Model: model
    };

    var post =  this.http.post(url, JSON.stringify(model));

    return post.map((response) => this.parseResponse(url, response));
  }
}
