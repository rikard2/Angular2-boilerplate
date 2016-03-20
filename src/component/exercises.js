System.register(['angular2/core', 'angular2/router'], function(exports_1) {
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
    var core_1, router_1;
    var Exercises;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            Exercises = (function () {
                function Exercises(router, routeParams) {
                    this.router = router;
                    this.routeParams = routeParams;
                    this.currentExerciseId = routeParams.get('exerciseId');
                }
                Exercises.prototype.isSelected = function (exercise) {
                    return this.currentExerciseId == exercise.ExerciseId;
                };
                Exercises.prototype.navigateToExercise = function (exercise) {
                    var courseId = this.routeParams.get('courseId');
                    var chapterId = this.routeParams.get('chapterId');
                    console.log(exercise);
                    this.router.navigate(['Exercise', {
                            courseId: courseId,
                            chapterId: chapterId,
                            exerciseId: exercise.ExerciseId
                        }]);
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], Exercises.prototype, "model", void 0);
                Exercises = __decorate([
                    core_1.Component({
                        template: "<table class=\"table\" style=\"font-size: 14px;\">\n      <tr [class.selected]=\"isSelected(e)\" *ngFor=\"#e of model\" (click)=\"navigateToExercise(e)\" class=\"clickable\">\n        <td>{{ e.ExerciseOrder }}.</td>\n        <td style=\"width:90%\">{{ e.ExerciseTitle }}</td>\n        <td><i class=\"fa fa-check\" style=\"color: green;\"></i></td>\n      </tr>\n    </table>",
                        selector: 'exercises'
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, router_1.RouteParams])
                ], Exercises);
                return Exercises;
            })();
            exports_1("Exercises", Exercises);
        }
    }
});
//# sourceMappingURL=exercises.js.map