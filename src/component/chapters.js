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
    var Chapters;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            Chapters = (function () {
                function Chapters(router, routeParams) {
                    this.router = router;
                    this.routeParams = routeParams;
                    this.currentChapterId = routeParams.get('chapterId');
                }
                Chapters.prototype.isSelected = function (chapter) {
                    return this.currentChapterId == chapter.ChapterId;
                };
                Chapters.prototype.navigateToChapter = function (chapter) {
                    var courseId = this.routeParams.get('courseId');
                    this.router.navigate(['Chapter', {
                            courseId: courseId,
                            chapterId: chapter.ChapterId
                        }]);
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], Chapters.prototype, "model", void 0);
                Chapters = __decorate([
                    core_1.Component({
                        selector: 'chapters',
                        template: "<table class=\"table\" style=\"font-size: 14px;\">\n      <tbody>\n        <tr [class.selected]=\"isSelected(c)\" *ngFor=\"#c of model\" class=\"clickable\" (click)=\"navigateToChapter(c)\">\n          <td>\n            {{ c.ChapterTitle }}\n          </td>\n          <td style=\"width: 150px;height: 1px;\">\n            <div class=\"progress progress-xs margin-bottom-0\">\n              <div class=\"progress-bar progress-bar-success bg-blue-600\" role=\"progressbar\" aria-valuenow=\"90\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: 90%\">\n              </div>\n            </div>\n          </td>\n          <td style=\"width:50px;\">\n            90%\n          </td>\n        </tr>\n      </tbody>\n    </table>"
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, router_1.RouteParams])
                ], Chapters);
                return Chapters;
            })();
            exports_1("Chapters", Chapters);
        }
    }
});
//# sourceMappingURL=chapters.js.map