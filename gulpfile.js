'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');

 
sass.compiler = require('node-sass');
 
//compile sass and minify
gulp.task('sass', function () {
  return gulp.src('app/src/sass/main.scss')
  .pipe(sourcemaps.init({
    loadMaps: true
  }))
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('last 2 versions'))
    
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./app/css'));
    

});


gulp.task('watch', function () {
  gulp.watch('app/src/sass/**/*.scss', gulp.series('sass'));
});

gulp.task('dev', gulp.parallel('watch'));
gulp.task('live', gulp.parallel('sass'));