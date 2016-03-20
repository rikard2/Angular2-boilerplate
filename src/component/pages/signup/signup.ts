// Libraries
import {Component} from 'angular2/core';
import {Router} from 'angular2/router'

import {HttpService} from '../../../service/httpservice';
import {UserSessionService} from '../../../service/userSessionService';
import {CUSTOM_DIRECTIVES} from '../../app/customDirectives';

@Component({
    templateUrl: 'dist/component/pages/signup/signup.html',
    directives: [CUSTOM_DIRECTIVES]
})
export class SignupPageComponent {
  signupModel;
  validationErrorMessage;

  constructor(
    private router: Router,
    private userSessionService: UserSessionService,
    private httpService: HttpService) {
    this.signupModel = {
      Email: null,
      Password: null,
      FirstName: null,
      LastName: null
    };

  }

  submitSignup() {
    var component = this;
    this.httpService.save('loginuser_create', this.signupModel)
    .subscribe(result => {
      if (result.ValidationErrorMessage) {
        component.validationErrorMessage = result.ValidationErrorMessage;
        return;
      }
      var sessionKey = result.Result.SessionKey;
      console.log(result, sessionKey);

      component.router.navigate(["Home", { }]);
      this.userSessionService.setUserSession(sessionKey);
    });
  }
}
