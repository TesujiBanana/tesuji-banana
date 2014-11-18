'use strict';

var browserify = require('browserify');
var gulp = require('gulp');
var gutil = require('gulp-util');
var connect = require('gulp-connect');
var reactify = require('reactify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var mocha = require('gulp-mocha');
var mochify = require('mochify');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var concat = require('gulp-concat');

gulp.task('build', function() {
  
});

gulp.task('watch', function() {
  var bundler = browserify({
    entries: ['./src/js/app.js'],
    transform: [reactify],
    debug: true,
    cache: {}, packageCache: {}, fullPaths: true
  })
  
  var watcher = watchify(bundler);
  
  bundler.on('update', rebundle);
  
  function rebundle() {
    return watcher.bundle()
      .on('error', gutil.log.bind(gutil, 'Browserify Error'))
      .pipe(source('bundle.js'))
      .pipe(gulp.dest('./dist/js'));
  }
  
  gulp.watch('./src/sass/**/*.scss', ['sass']);
  
  return rebundle();
});

gulp.task('sass', function() {
  gulp.src('./src/sass/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./tmp/css'))
    .pipe(concat('app.css'))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('serve', function() {
  connect.server({
    root: 'dist',
    port: 3030,
    livereload: true
  });
  
  gulp.watch('./dist/**', function() {
    gulp.src('./dist/**').
      pipe(connect.reload());
  });
});

gulp.task('mocha', function() {
  gulp.src(['./test/**/*.js'], { read: false })
    .pipe(mocha({ reporter: 'spec' }))
    .on('error', gutil.log);
});

gulp.task('watch-mocha', function() {
    gulp.watch(['src/**', 'test/**'], ['mocha']);
});

gulp.task('default', ['serve', 'watch', 'sass']);
