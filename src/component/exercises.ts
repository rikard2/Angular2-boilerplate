// Libraries
import {Component, ElementRef, Input} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';

@Component({
    template: `<table class="table" style="font-size: 14px;">
      <tr [class.selected]="isSelected(e)" *ngFor="#e of model" (click)="navigateToExercise(e)" class="clickable">
        <td>{{ e.ExerciseOrder }}.</td>
        <td style="width:90%">{{ e.ExerciseTitle }}</td>
        <td><i class="fa fa-check" style="color: green;"></i></td>
      </tr>
    </table>`,
    selector: 'exercises'
})
export class Exercises {
  @Input() model;

  currentExerciseId;
  constructor(private router: Router, private routeParams: RouteParams) {
    this.currentExerciseId = routeParams.get('exerciseId');
  }

  isSelected(exercise) {
    return this.currentExerciseId == exercise.ExerciseId;
  }

  navigateToExercise(exercise) {
    var courseId = this.routeParams.get('courseId');
    var chapterId = this.routeParams.get('chapterId');
    this.router.navigate( ['Exercise', {
        courseId: courseId,
        chapterId: chapterId,
        exerciseId: exercise.ExerciseId
      }]
    );
  }
}
