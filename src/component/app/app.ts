// Libraries
import {Component}                      from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

// Custom Components
import {NavigationComponent} from '../navigation/navigation';
import {CoursePageComponent}  from '../course/course';
import {CoursesPageComponent}  from '../courses/courses';
import {AboutPageComponent}  from '../about/about';
import {HomePageComponent}  from '../home/home';

@Component({
    selector    : 'my-app',
    templateUrl : 'dist/component/app/app.html',
	directives  : [NavigationComponent, ROUTER_DIRECTIVES]
})
@RouteConfig([
  {
		path      : '/',
		name      : 'Home',
		component : HomePageComponent
	},
  {
		path      : '/courses',
		name      : 'Courses',
		component : CoursesPageComponent
	},
	{
		path      : '/course/:courseId',
		name      : 'Course',
		component : CoursePageComponent
	},
  {
		path      : '/chapter/:courseId/:chapterId',
		name      : 'Chapter',
		component : CoursePageComponent
	},
  {
		path      : '/exercise/:courseId/:chapterId/:exerciseId',
    name: 'Exercise',
		component : CoursePageComponent
	},
	{
		path      : '/about',
		name      : 'About',
		component : AboutPageComponent
	}
])
export class AppComponent { }
