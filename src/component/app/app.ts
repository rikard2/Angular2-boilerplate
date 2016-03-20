import {Component}                      from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {AboutPageComponent}  from '../pages/about/about';
import {HomePageComponent}  from '../pages/home/home';

import {CUSTOM_DIRECTIVES} from './customDirectives';

@Component({
    selector    : 'my-app',
    templateUrl : 'dist/component/app/app.html',
	directives  : [ROUTER_DIRECTIVES, CUSTOM_DIRECTIVES]
})
@RouteConfig([
  {
		path      : '/',
		name      : 'Home',
		component : HomePageComponent
	},
	{
		path      : '/about',
		name      : 'About',
		component : AboutPageComponent
	}
])
export class AppComponent { }
