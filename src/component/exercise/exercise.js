System.register(['angular2/core', '../codemirror', '../panel', '../chapters', '../exercises', 'angular2/router', "angular2/http"], function(exports_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, codemirror_1, panel_1, chapters_1, exercises_1, router_1, http_1;
    var ExerciseComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (codemirror_1_1) {
                codemirror_1 = codemirror_1_1;
            },
            function (panel_1_1) {
                panel_1 = panel_1_1;
            },
            function (chapters_1_1) {
                chapters_1 = chapters_1_1;
            },
            function (exercises_1_1) {
                exercises_1 = exercises_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }],
        execute: function() {
            ExerciseComponent = (function () {
                function ExerciseComponent(http, routeParams) {
                    var _this = this;
                    this.http = http;
                    this.routeParams = routeParams;
                    this.courseId = routeParams.get('courseId');
                    this.chapterId = routeParams.get('chapterId');
                    this.exerciseId = routeParams.get('exerciseId');
                    console.log('routeParams', routeParams);
                    http._defaultOptions.headers.set('Content-Type', 'application/json');
                    var url = 'http://adaptkiller.azurewebsites.net/api/service/list/chapter_list';
                    var data = {
                        'Model': {
                            CourseId: 1
                        }
                    };
                    http
                        .post(url, JSON.stringify(data))
                        .subscribe(function (response) {
                        var body = JSON.parse(response._body);
                        var validationErrorMessage = body.ValidationErrorMessage;
                        var exceptionMessage = body.ExceptionMessage;
                        var result = body.Result;
                        _this.chapters = result;
                    });
                    if (this.chapterId) {
                        http.post('http://adaptkiller.azurewebsites.net/api/service/list/exercise_list', JSON.stringify({
                            'Model': {
                                ChapterId: this.chapterId
                            }
                        }))
                            .subscribe(function (response) {
                            var body = JSON.parse(response._body);
                            var result = body.Result;
                            _this.exercises = result;
                        });
                    }
                    if (this.exerciseId) {
                        http.post('http://adaptkiller.azurewebsites.net/api/service/single/exercise_get', JSON.stringify({
                            'Model': {
                                ExerciseId: this.exerciseId
                            }
                        }))
                            .subscribe(function (response) {
                            var body = JSON.parse(response._body);
                            var result = body.Result;
                            _this.exercise = result;
                        });
                    }
                }
                ExerciseComponent = __decorate([
                    core_1.Component({
                        templateUrl: 'dist/component/exercise/exercise.html',
                        directives: [codemirror_1.CodeMirror, panel_1.Panel, chapters_1.Chapters, exercises_1.Exercises]
                    }), 
                    __metadata('design:paramtypes', [http_1.Http, router_1.RouteParams])
                ], ExerciseComponent);
                return ExerciseComponent;
            })();
            exports_1("ExerciseComponent", ExerciseComponent);
        }
    }
});
//# sourceMappingURL=exercise.js.map