System.register(['angular2/core'], function(exports_1) {
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
    var core_1;
    var CodeMirror;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            CodeMirror = (function () {
                function CodeMirror(element) {
                    var nativeElement = element.nativeElement;
                    console.log('nativeElement2', nativeElement);
                    loadEditor(nativeElement);
                }
                CodeMirror = __decorate([
                    core_1.Component({
                        template: "<div></div>",
                        selector: 'codemirror'
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef])
                ], CodeMirror);
                return CodeMirror;
            })();
            exports_1("CodeMirror", CodeMirror);
        }
    }
});
//# sourceMappingURL=codemirror.js.map