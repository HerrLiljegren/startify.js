var browserify   = require('browserify');
var gulp         = require('gulp');
var livereload   = require('gulp-livereload');
var concat       = require('gulp-concat');
var streamify    = require('gulp-streamify');
var uglify       = require('gulp-uglify');
var handleErrors = require('../util/handleErrors');
var source       = require('vinyl-source-stream');
var bower        = require('wiredep')({ directory: 'app_root/src/vendor/bower_components'});




gulp.task('browserify', function(){
	var bundle = browserify('./app_root/src/main.js');

	bower.js.forEach(function(file) {
		bundle.external(file);
	});
		//.require('backbone/node_modules/underscore', { expose: 'underscore' })
	bundle.bundle({debug: true})
		.on('error', handleErrors)
		.pipe(source('app.js'))
		.pipe(gulp.dest('./app_root/build/'))
		.pipe(livereload());
});

// Third-party libraries
gulp.task('vendor', function() {
	var b = browserify();
	bower.js.forEach(function(file) {
		console.log("./" + file);
		b.require("./" + file);
	})


	b.transform('debowerify')
	.bundle({debug: false})

	.pipe(source('vendor.js'))
	.pipe(streamify(uglify()))
	.pipe(gulp.dest('./app_root/build'));


	return b;
});