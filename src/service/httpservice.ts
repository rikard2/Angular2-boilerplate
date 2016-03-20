// Libraries
import {Injectable} from 'angular2/core';
import {Http, Response, BaseRequestOptions, RequestMethod, Request, RequestOptions} from "angular2/http";
import 'rxjs/add/operator/map';

@Injectable()
export class HttpService {
    constructor(private http: Http) {
      http['_defaultOptions'].headers.set('Content-Type', 'application/json');
    }

    list(type: string, action: string, model) {
      console.log('lis4');
      model = {
        'Model': model
      };

      var url = 'http://adaptkiller.azurewebsites.net/api/service/' + type + '/' + action;
      var post =  this.http.post(url, JSON.stringify(model));

      return post.map((response) => JSON.parse(response['_body'])['Result']);
    }
}
