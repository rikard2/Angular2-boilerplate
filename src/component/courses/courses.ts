// Libraries
import {Component} from 'angular2/core';
import {HttpService} from '../../service/httpservice';
import {Panel} from '../panel';
import {Router} from 'angular2/router';

@Component({
    templateUrl: 'dist/component/courses/courses.html',
    directives: [Panel]
})
export class CoursesPageComponent {
  courses;

  constructor(private router: Router, private httpService: HttpService) {
    httpService.list('list', 'course_list', { })
      .subscribe((result) => {
        this.courses = result;
      });
  }

  navigateToCourse(course) {
    this.router.navigate( ['Course', {
        courseId: course.CourseId
      }]
    );
  }
}
