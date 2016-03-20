// Libraries
import {Component, ElementRef, Input} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';

@Component({
    selector: 'chapters',
    template: `<table class="table" style="font-size: 14px;">
      <tbody>
        <tr [class.selected]="isSelected(c)" *ngFor="#c of model" class="clickable" (click)="navigateToChapter(c)">
          <td>
            {{ c.ChapterTitle }}
          </td>
          <td style="width: 150px;height: 1px;">
            <div class="progress progress-xs margin-bottom-0">
              <div class="progress-bar progress-bar-success bg-blue-600" role="progressbar" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100" style="width: 90%">
              </div>
            </div>
          </td>
          <td style="width:50px;">
            90%
          </td>
        </tr>
      </tbody>
    </table>`
})
export class Chapters {
  @Input() model;

  currentChapterId;

  constructor(private router: Router, private routeParams: RouteParams) {
    this.currentChapterId = routeParams.get('chapterId');
  }

  isSelected(chapter) {
    return this.currentChapterId == chapter.ChapterId;
  }

  navigateToChapter(chapter) {
    var courseId = this.routeParams.get('courseId');

    this.router.navigate( ['Chapter', {
        courseId: courseId,
        chapterId: chapter.ChapterId
      }]
    );
  }
}
