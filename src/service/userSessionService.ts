import {Injectable} from 'angular2/core';
import {Router} from 'angular2/router';

@Injectable()
export class UserSessionService {
  sessionKey:string;

  constructor(private router: Router) {
    var sessionKey = localStorage.getItem('sessionKey');
    this.sessionKey = sessionKey;
  }

  setUserSession(sessionKey) {
    localStorage.setItem("sessionKey", sessionKey);

    this.sessionKey = sessionKey;
  }

  logOut() {
    localStorage.setItem("sessionKey", null);

    this.sessionKey = null;
    this.router.navigate(['Home', {}]);
  }
}
