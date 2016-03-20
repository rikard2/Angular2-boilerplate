// Libraries
import {Component} from 'angular2/core';
import {HttpService} from '../../../service/httpservice';
import {CUSTOM_DIRECTIVES} from '../../app/customDirectives';

@Component({
    templateUrl: 'dist/component/pages/webapi/webapi.html',
    directives: [CUSTOM_DIRECTIVES]
})
export class WebapiPageComponent {
  testResult;
  loginUser;

  constructor(private httpService: HttpService) {
    httpService.list('test', { })
    .subscribe(result => {
      this.testResult = result.Result;
    });

    httpService.list('loginuser_info', { })
    .subscribe(result => {
      this.loginUser = result.Result;
    });
  }
}
