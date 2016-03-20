// Libraries
import {Component} from 'angular2/core';
import {Router} from 'angular2/router'

import {HttpService} from '../../../service/httpservice';
import {UserSessionService} from '../../../service/userSessionService';
import {CUSTOM_DIRECTIVES} from '../../app/customDirectives';

@Component({
    templateUrl: 'dist/component/pages/login/login.html',
    directives: [CUSTOM_DIRECTIVES]
})
export class LoginPageComponent {
  loginModel;
  validationErrorMessage;

  constructor(
    private router: Router,
    private userSessionService: UserSessionService,
    private httpService: HttpService) {
    this.loginModel = {
      Email: null,
      Password: null
    };

  }

  submitLogin() {
    var component = this;
    component.validationErrorMessage = null;
    this.httpService.save('loginuser_authenticate', this.loginModel)
    .subscribe(result => {
      if (result.ValidationErrorMessage) {
        component.validationErrorMessage = result.ValidationErrorMessage;
        return;
      }

      var sessionKey = result.Result.SessionKey;

      component.router.navigate(["Home", { }]);

      this.userSessionService.setUserSession(sessionKey);
    });
  }
}
