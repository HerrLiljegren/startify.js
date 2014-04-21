var browserify   = require('browserify');
var gulp         = require('gulp');
var livereload   = require('gulp-livereload');
var concat       = require('gulp-concat-sourcemap');
var handleErrors = require('../util/handleErrors');
var source       = require('vinyl-source-stream');

gulp.task('browserify', function(){
	return browserify('./app_root/src/main.js')
		//.require('backbone/node_modules/underscore', { expose: 'underscore' })
		.bundle({debug: true})
		.on('error', handleErrors)
		.pipe(source('app.js'))
		.pipe(gulp.dest('./app_root/build/'))
		.pipe(livereload());
});

// Third-party libraries
gulp.task('libs', function() {
	console.log("ok");
	gulp.src(['./app_root/src/vendor/**/*.js'])
	.pipe(concat('libs.js'))
	.pipe(gulp.dest('./app_root/build'));
});