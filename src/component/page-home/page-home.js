System.register(['angular2/core', '../codemirror'], function(exports_1) {
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
    var core_1, codemirror_1;
    var HomePageComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (codemirror_1_1) {
                codemirror_1 = codemirror_1_1;
            }],
        execute: function() {
            HomePageComponent = (function () {
                function HomePageComponent() {
                }
                HomePageComponent = __decorate([
                    core_1.Component({
                        templateUrl: 'dist/component/page-home/page-home.html',
                        directives: [codemirror_1.CodeMirror]
                    }), 
                    __metadata('design:paramtypes', [])
                ], HomePageComponent);
                return HomePageComponent;
            })();
            exports_1("HomePageComponent", HomePageComponent);
        }
    }
});
//# sourceMappingURL=page-home.js.map