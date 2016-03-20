// Libraries
import {Component} from 'angular2/core';
import {CodeMirror} from '../codemirror';
import {Panel} from '../panel';
import {Chapters} from '../chapters';
import {Exercises} from '../exercises';
import {RouteParams} from 'angular2/router';
import {HttpService} from '../../service/httpservice';
import {Http, Response, BaseRequestOptions, RequestMethod, Request, RequestOptions} from "angular2/http";

@Component({
    templateUrl  : 'dist/component/course/course.html',
    directives: [CodeMirror, Panel, Chapters, Exercises]
})
export class CoursePageComponent {
  courseId;
  chapterId;
  exerciseId;

  chapters;
  exercises;
  exercise;

  constructor(private http: Http, private routeParams:RouteParams, httpService: HttpService) {
    this.courseId = routeParams.get('courseId');
    this.chapterId = routeParams.get('chapterId');
    this.exerciseId = routeParams.get('exerciseId');

    httpService.list('list', 'chapter_list', { CourseId: 1 })
      .subscribe((result) => {
        this.chapters = result;
      });

    if (this.chapterId) {
      httpService.list('list', 'exercise_list', { ChapterId: this.chapterId })
        .subscribe((result) => {
          this.exercises = result;
        });
    }

    if (this.exerciseId) {
      httpService.list('single', 'exercise_get', { ExerciseId: this.exerciseId })
        .subscribe((result) => {
          this.exercise = result;
        });
    }
  }
}
