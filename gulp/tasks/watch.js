var gulp       = require('gulp');
var livereload = require('gulp-livereload');

gulp.task('watch', function(){
	gulp.watch('app_root/src/**', ['browserify']);	
	gulp.watch('src/images/**', ['images']);
	livereload();
});
