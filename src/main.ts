// Libraries
import {bootstrap}        from 'angular2/platform/browser'
import {provide} from "angular2/core";
import {HTTP_BINDINGS, HTTP_PROVIDERS} from "angular2/http";

import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from 'angular2/router';
// Custom Components
import {AppComponent}     from './component/app/app'

bootstrap(AppComponent, [
	ROUTER_PROVIDERS, HTTP_BINDINGS, HTTP_PROVIDERS,
	provide(LocationStrategy, {useClass: HashLocationStrategy })
]);
