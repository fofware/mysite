const gulp = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const cleanCSS = require('gulp-clean-css');

gulp.task( 'sass', () => {
	return gulp.src('./src/scss/main.scss')
		.pipe( sourcemaps.init() )
		.pipe(sass().on('error', sass.logError))
		.pipe( rename('all-styles.css' ))
		.pipe(cleanCSS({compatibility: 'ie8'}))
		.pipe( sourcemaps.write() )
		.pipe( gulp.dest('./dist/css'));
});

gulp.task( 'default', ['sass']);