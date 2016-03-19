// Libraries
import {Component, ElementRef} from 'angular2/core';

@Component({
    template: `<div></div>`,
    selector: 'codemirror'
})
export class CodeMirror {
  constructor(element: ElementRef) {
    var nativeElement = element.nativeElement;
    console.log('nativeElement2', nativeElement);
    loadEditor(nativeElement);

  }
}
