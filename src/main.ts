/// <reference path="../node_modules/angular2/typings/browser.d.ts" />

import {bootstrap} from 'angular2/platform/browser'
import {provide} from "angular2/core";
import {HTTP_BINDINGS, HTTP_PROVIDERS} from "angular2/http";
import {HttpService} from './service/httpservice';
import {UserSessionService} from './service/userSessionService';

import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from 'angular2/router';
import {AppComponent}     from './component/app/app'

bootstrap(AppComponent, [
	ROUTER_PROVIDERS, HTTP_BINDINGS, HTTP_PROVIDERS,
	HttpService,
	UserSessionService,
	provide(LocationStrategy, {useClass: HashLocationStrategy })
]);
