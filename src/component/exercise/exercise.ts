// Libraries
import {Component} from 'angular2/core';
import {CodeMirror} from '../codemirror';
import {Panel} from '../panel';
import {Chapters} from '../chapters';
import {Exercises} from '../exercises';
import {RouteParams} from 'angular2/router';
import {Http, Response, BaseRequestOptions, RequestMethod, Request, RequestOptions} from "angular2/http";

@Component({
    templateUrl  : 'dist/component/exercise/exercise.html',
    directives: [CodeMirror, Panel, Chapters, Exercises]
})
export class ExerciseComponent {
  courseId;
  chapterId;
  exerciseId;

  chapters;
  exercises;
  exercise;

  constructor(private http: Http, private routeParams:RouteParams) {
    this.courseId = routeParams.get('courseId');
    this.chapterId = routeParams.get('chapterId');
    this.exerciseId = routeParams.get('exerciseId');
    console.log('routeParams', routeParams);

    http._defaultOptions.headers.set('Content-Type', 'application/json');
    var url = 'http://adaptkiller.azurewebsites.net/api/service/list/chapter_list'
    var data = {
      'Model': {
        CourseId: 1
      }
    };

    http
    .post(url, JSON.stringify(data))
    .subscribe((response) => {
      var body = JSON.parse(response._body);

      var validationErrorMessage = body.ValidationErrorMessage;
      var exceptionMessage = body.ExceptionMessage;

      var result = body.Result;

      this.chapters = result;
    });

    if (this.chapterId) {
      http.post(
        'http://adaptkiller.azurewebsites.net/api/service/list/exercise_list',
        JSON.stringify({
          'Model': {
            ChapterId: this.chapterId
          }
        }))
      .subscribe((response) => {
        var body = JSON.parse(response._body);

        var result = body.Result;

        this.exercises = result;
      });
    }

    if (this.exerciseId) {
      http.post(
        'http://adaptkiller.azurewebsites.net/api/service/single/exercise_get',
        JSON.stringify({
          'Model': {
            ExerciseId: this.exerciseId
          }
        }))
      .subscribe((response) => {
        var body = JSON.parse(response._body);

        var result = body.Result;

        this.exercise = result;
      });
    }

  }
}
