var browserify   = require('browserify');
var gulp         = require('gulp');
var livereload   = require('gulp-livereload');
var concat       = require('gulp-concat');
var handleErrors = require('../util/handleErrors');
var source       = require('vinyl-source-stream');
var bower        = require('wiredep')({ directory: 'app_root/src/vendor/bower_components'});




gulp.task('browserify', ['vendor'], function(){
	return browserify('./app_root/src/main.js')
		//.require('backbone/node_modules/underscore', { expose: 'underscore' })
		.bundle({debug: true})
		.on('error', handleErrors)
		.pipe(source('app.js'))
		.pipe(gulp.dest('./app_root/build/'))
		.pipe(livereload());
});

// Third-party libraries
gulp.task('vendor', function() {
	bower.js.forEach(function(val) {
		console.log("Adding external shim library: " + val);
	});
	return gulp.src(bower.js)	
	.pipe(concat('vendor.js',  {prefix: 0 }))
	.pipe(gulp.dest('./app_root/build'));
});