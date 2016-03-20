System.register(['angular2/core', 'angular2/router', '../navigation/navigation', '../exercise/exercise', '../page-about/page-about'], function(exports_1) {
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
    var core_1, router_1, navigation_1, exercise_1, page_about_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (navigation_1_1) {
                navigation_1 = navigation_1_1;
            },
            function (exercise_1_1) {
                exercise_1 = exercise_1_1;
            },
            function (page_about_1_1) {
                page_about_1 = page_about_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                }
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        templateUrl: 'dist/component/app/app.html',
                        directives: [navigation_1.NavigationComponent, router_1.ROUTER_DIRECTIVES]
                    }),
                    router_1.RouteConfig([
                        {
                            path: '/',
                            name: 'Home',
                            component: page_about_1.AboutPageComponent
                        },
                        {
                            path: '/course/:courseId',
                            name: 'Course',
                            component: exercise_1.ExerciseComponent
                        },
                        {
                            path: '/chapter/:courseId/:chapterId',
                            name: 'Chapter',
                            component: exercise_1.ExerciseComponent
                        },
                        {
                            path: '/exercise/:courseId/:chapterId/:exerciseId',
                            name: 'Exercise',
                            component: exercise_1.ExerciseComponent
                        },
                        {
                            path: '/about',
                            name: 'About',
                            component: page_about_1.AboutPageComponent
                        }
                    ]), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            })();
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.js.map