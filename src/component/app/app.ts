import {Component} from 'angular2/angular2';

@Component({
	selector: 'supergut',
	template: `<div>I'm the app</div>`
})
export class App {
	constructor() {
		console.log('I has been called');
	}
}