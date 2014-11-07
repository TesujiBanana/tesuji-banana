'use strict';

var browserify = require('browserify');
var gulp = require('gulp');
var gutil = require('gulp-util');
var connect = require('gulp-connect');
var reactify = require('reactify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var mocha = require('gulp-mocha');
var mochify = require('mochify');

gulp.task('build', function() {
  
});

gulp.task('watch', function() {
  var bundler = watchify(browserify('./src/app.js', watchify.args));
  
  bundler.transform(reactify);
  bundler.on('update', rebundle);
  
  function rebundle() {
    return bundler.bundle()
      .on('error', gutil.log.bind(gutil, 'Browserify Error'))
      .pipe(source('bundle.js'))
      .pipe(gulp.dest('./dist/js'));
  }
  
  return rebundle();
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

gulp.task('default', ['serve', 'watch']);
