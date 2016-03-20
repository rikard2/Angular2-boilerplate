import {Component, ElementRef, Input} from 'angular2/core';

@Component({
    template: `<div class="panel">
      <h5 class="panel-title" *ngIf="title">{{ title }}</h5>
      <div class="panel-body">
        <ng-content></ng-content>
      </div>
    </div>`,
    selector: 'content-panel'
})
export class ContentPanel {
  @Input() title;
}
