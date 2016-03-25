var gulp = require('gulp'),
	rename = require('gulp-rename'),
	concat = require('gulp-concat'),
	lint = require('gulp-jshint'),
	uglify = require('gulp-uglify'),
	optim = require('gulp-imageoptim'),
	psi = require('psi'),
	ngrok = require('ngrok'),
	replace = require('gulp-replace');

gulp.task('process-html', function(){
	return gulp.src('src/*.html').pipe(gulp.dest('dist/'));
});

gulp.task('process-images', function() {
	return gulp.src('src/img/*')
		.pipe(optim.optimize())
		.pipe(gulp.dest('dist/img'))
});
gulp.task('process-scripts', function() {
	return gulp.src(['src/js/*'])
		.pipe(lint())
		.pipe(lint.reporter())
		.pipe(concat('main.js'))
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'));
});
// gulp.task('psi-mobile', function(){
// 	ngrok.connect(function (err, url) {
// 		console.log("RUNNING!");
// 		return psi(url + '/src',{
// 			nokey: 'true',
// 			strategy: 'mobile',
// 		})
// 		.then(function (data) {
// 			console.log('Speed score: ' + data.ruleGroups.SPEED.score);
// 			console.log('Usability score: ' + data.ruleGroups.USABILITY.score);
// 		});
// 	});
// });

gulp.task('default', ['process-images', 'process-scripts'], function() {});