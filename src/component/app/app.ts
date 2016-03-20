// Libraries
import {Component}                      from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

// Custom Components
import {NavigationComponent} from '../navigation/navigation';
import {ExerciseComponent}  from '../exercise/exercise';
import {AboutPageComponent}  from '../page-about/page-about';

@Component({
    selector    : 'my-app',
    templateUrl : 'dist/component/app/app.html',
	directives  : [NavigationComponent, ROUTER_DIRECTIVES]
})
@RouteConfig([
  {
		path      : '/',
		name      : 'Home',
		component : AboutPageComponent
	},
	{
		path      : '/course/:courseId',
		name      : 'Course',
		component : ExerciseComponent
	},
  {
		path      : '/chapter/:courseId/:chapterId',
		name      : 'Chapter',
		component : ExerciseComponent
	},
  {
		path      : '/exercise/:courseId/:chapterId/:exerciseId',
    name: 'Exercise',
		component : ExerciseComponent
	},
	{
		path      : '/about',
		name      : 'About',
		component : AboutPageComponent
	}
])
export class AppComponent { }
