var gulp = require('gulp'),
	rename = require('gulp-rename'),
	concat = require('gulp-concat'),
	mincss = require('gulp-minify-css'),
	minhtml = require('gulp-htmlmin')
	lint = require('gulp-jshint'),
	uglify = require('gulp-uglify'),
	resize = require('gulp-image-resize'),
	replace = require('gulp-replace'),
	browserSync = require('browser-sync').create(),
	imagemin = require('gulp-imagemin'),
	merge = require('merge-stream'),
	pngquant = require('imagemin-pngquant'),
	sourcemaps = require('gulp-sourcemaps');

//update js to use min files
gulp.task('process-html', function() {
	return gulp.src('src/**/*.html')
		.pipe(replace('perfmatters.js','main.min.js'))
		.pipe(replace('main.js','main.min.js'))
		.pipe(gulp.dest('dist'));
});

// don't include sourcemaps in order to increase pagespeed
gulp.task('process-scripts', function() {
	var x = gulp.src(['src/js/*'])
//		.pipe(sourcemaps.init())
		.pipe(lint())
		.pipe(lint.reporter())
		.pipe(concat('main.js'))
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
//		.pipe(sourcemaps.write())
		.pipe(gulp.dest('dist/js'));
	var y = gulp.src(['src/views/js/*'])
//		.pipe(sourcemaps.init())
		.pipe(lint())
		.pipe(lint.reporter())
		.pipe(concat('main.js'))
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
//		.pipe(sourcemaps.write())
		.pipe(gulp.dest('dist/views/js'));
	return merge(x,y);
});

gulp.task('process-styles', function() {
	return gulp.src('src/**/*.css')
	.pipe(mincss())
	.pipe(gulp.dest('dist'));
});

//resize images, used for both src and dist
gulp.task('image-resize', function() {
	return gulp.src('src/views/images/*')
	.pipe(resize({
		imageMagick: true,
		width: 100,
		crop: false,
		upscale: false,
	}))
	.pipe(rename({suffix:'thumb'}))
	.pipe(gulp.dest('src/views/images'));
});

gulp.task('process-images', function(){
	var x = gulp.src('src/views/images/*')
	.pipe(imagemin({
		progressive: true,
		use: [pngquant()]
	}))
	.pipe(gulp.dest('dist/views/images'));
	var y = gulp.src('src/img/*')
	.pipe(imagemin({
		progressive: true,
		use: [pngquant()]
	}))
	.pipe(gulp.dest('dist/img'));	
	return merge(x,y);
});

gulp.task('browser-sync', function(){
	browserSync.init({
		server: "./"
	});
	return browserSync.stream();
});

gulp.task('default', ['process-scripts','process-html','process-styles','process-images'], function() {});