'use strict';

// Prequisites
var gulp        = require('gulp');
var debug       = require('gulp-debug');
var inject      = require('gulp-inject');
var tsc         = require('gulp-typescript');
var tslint      = require('gulp-tslint');
var sourcemaps  = require('gulp-sourcemaps');
var del         = require('del');
var Config      = require('./gulpfile.config');
var tsProject   = tsc.createProject('tsconfig.json');
var browserSync = require('browser-sync').create();
var superstatic = require( 'superstatic' );
var sass        = require('gulp-sass');
var concat      = require('gulp-concat');
var gutil       = require('gulp-util');
var uglify      = require('gulp-uglify');
// Create config
var config      = new Config();

gulp.task('vendor', function() {
  gulp.src('./vendor/**/*')
    .pipe(gulp.dest('./dist/vendor/'));
});

// Gulp CSS Compiling
gulp.task('styles', function() {
    gulp.src('./src/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist/css/'));
});

// Gulp HTML Compiling
gulp.task('views', function() {
    gulp.src([config.listFilesHTML])
        .pipe(gulp.dest('./dist'));
});

// Gulp TypeScript Linter
gulp.task('ts-lint', function () {
	return gulp.src(config.listFilesTS).pipe(tslint()).pipe(tslint.report('prose'));
});

// Gulp TypeScript Compiler
gulp.task('compile-ts', function () {
	var sourceTsFiles = [
		'./src/**/*.ts'
	];

	var tsResult = gulp.src(sourceTsFiles)
		               .pipe(tsc(tsProject));

	return tsResult.js.pipe(uglify()).pipe(gulp.dest('./dist/js/'));

});

// Gulp Cleaner
gulp.task('clean-ts', function (cb) {
	var typeScriptGenFiles = [
		config.tsOutputPath +'/**/*.js',    // path to all JS files auto gen'd by editor
		config.tsOutputPath +'/**/*.js.map', // path to all sourcemap files auto gen'd by editor
		'!' + config.tsOutputPath + '/lib'
	];

	// delete the files
	del(typeScriptGenFiles, cb);
});

var reload = browserSync.reload;
var reloadBrowser = function() {
  gutil.log('a reload would be nice');
  reload();
}
// Gulp Watcher
gulp.task('watch', function() {
	gulp.watch([config.listFilesTS],   ['ts-lint', 'compile-ts']).on("change", reloadBrowser);
	gulp.watch([config.listFilesSCSS], ['styles']).on("change", reloadBrowser);
	gulp.watch([config.listFilesHTML], ['views']).on("change", reloadBrowser);
});

gulp.task('serve', ['watch'], function() {
  var watchFiles = [
    '**/*.html',
    '**/*.scss',
    '**/*.js'
  ];

  gutil.log('watchFiles', watchFiles);
  browserSync.init({
		port 			: 3000,
    files 			: watchFiles,
		injectChanges 	: true,
		logFileChanges 	: false,
		logLevel 		: 'silent',
		logPrefix 		: 'angular2typescript',
		notify 			: true,
		reloadDelay 	: 500,
		server 			: {
			baseDir: './dist',
			middleware: superstatic({
				debug: true
			})
		}
	});
});
// Serve task
gulp.task('default', ['vendor', 'compile-ts', 'styles', 'views', 'serve'], function() {

});
