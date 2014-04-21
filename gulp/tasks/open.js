var gulp = require('gulp');
var open = require("gulp-open");
var config = require('../config');

gulp.task('open', function() {

	var options = {
		url: "http://localhost:" + config.port,
		app: "chrome"
	};

	return gulp.src("./app_root/index.html").pipe(open("", options));
});
