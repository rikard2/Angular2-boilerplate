import {bootstrap, Component} from 'angular2/angular2';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {App} from './component/app/app';

@Component({
	selector   : 'my-app',
	template   : '<h1>My First Angular 2 App</h1><br><supergut>Super-Gut</supergut>',
	directives : [App]
})
class BootstrapComponent {
	constructor() {
		console.log('Component Controller is also loading');
	}
}

bootstrap(BootstrapComponent);