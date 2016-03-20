import {Component}                      from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {AboutPageComponent}  from '../pages/about/about';
import {HomePageComponent}  from '../pages/home/home';
import {WebapiPageComponent} from '../pages/webapi/webapi';
import {SignupPageComponent} from '../pages/signup/signup';
import {LoginPageComponent} from '../pages/login/login';
import {UserSessionService} from '../../service/userSessionService';
import {CUSTOM_DIRECTIVES} from './customDirectives';
@Component({
    selector    : 'my-app',
    templateUrl : 'dist/component/app/app.html',
	directives  : [ROUTER_DIRECTIVES]
})
@RouteConfig([
  {
		path      : '/',
		name      : 'Home',
		component : HomePageComponent
	},
  {
		path      : '/webapi',
		name      : 'Webapi',
		component : WebapiPageComponent
	},
	{
		path      : '/signup',
		name      : 'Signup',
		component : SignupPageComponent
	},
  {
		path      : '/login',
		name      : 'Login',
		component : LoginPageComponent
	},
	{
		path      : '/about',
		name      : 'About',
		component : AboutPageComponent
	}
])
export class AppComponent
{
  constructor(private userSessionService: UserSessionService) {

  }

  logout() {
    this.userSessionService.logOut();
  }
}
