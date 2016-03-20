// Libraries
import {Component} from 'angular2/core';
import {HttpService} from '../../../service/httpservice';
import {CUSTOM_DIRECTIVES} from '../../app/customDirectives';
@Component({
    templateUrl: 'dist/component/pages/home/home.html',
    directives: [CUSTOM_DIRECTIVES]
})
export class HomePageComponent {
  constructor(private httpService: HttpService) {
  }
}
