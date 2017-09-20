"use strict";

const gulp  = require('gulp'),
    uglify    = require('gulp-uglify'),
    useref    = require('gulp-useref'),
    gulpIf    = require('gulp-if'),
    del       = require('del'),
    imagemin  = require('gulp-imagemin'),
    csso      = require('gulp-csso'),
    // gzip      = require('gulp-gzip'),
    inlineSource = require('gulp-inline-source');

const options = {
    src: 'src',
    dist: 'dist'
};

gulp.task('inlineSource',["useref"],function(){
    return gulp.src(options.dist+'/index.html')
        .pipe(inlineSource())
        .pipe(gulp.dest(options.dist));
});

// Useref task + minifying CSS and JS
gulp.task('useref',["images"], function(){
    return gulp.src(options.src +'/*.html')
        .pipe(useref())
        // Minifies only if it's a JS file
        .pipe(gulpIf('*.js', uglify()))
        // Minifies only if it's a CSS file
        .pipe(gulpIf('*.css', csso()))
        // .pipe(gzip())
        .pipe(gulp.dest(options.dist));
});


//Images task, compression and moving
gulp.task('images',[], function() {
    return gulp.src(options.src + '/img/**/*+(png|jpg|gif|svg)')
        .pipe(imagemin())
        .pipe(gulp.dest(options.dist + '/img'))
});
gulp.task('clean', function() {
  del([options.dist, options.src+'/css/styles.min.css',options.src+'/js/main.min.js',]);
});

gulp.task("build", ['inlineSource'], function() {
  return gulp.src([],{ base: './'}).
  pipe(gulp.dest(options.dist));
});

gulp.task("default", ["clean"], ()=>{
  gulp.start('build');
});
