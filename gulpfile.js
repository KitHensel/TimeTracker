var gulp = require('gulp'),
		gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    babel = require('gulp-babel'),
    sourcemaps = require('gulp-sourcemaps'),
    git = require('gulp-git');

//add the watch task as default
gulp.task('default', ['watch']);

//compile scss
gulp.task('build-css', function() {
  return gulp.src('source/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('public/assets/stylesheets'));
});

//compile JS
gulp.task('build-js', function() {
  return gulp.src('source/javascript/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('bundle.js'))
    .pipe(babel())
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/assets/javascript'));
});

//push to git
gulp.task('git-add', function(){
  return gulp.src('*')
    .pipe(git.add())
});

gulp.task('git-push', function(){
  git.push('origin', 'master', function (err) {
    if (err) throw err;
  });
});

//push to QuickBase App
gulp.task('quickbase-push', function() {
  
});

//configure tasks to run on file changes
gulp.task('watch', function() {
  gulp.watch("*", ['git-push', 'quickbase-push']);
  gulp.watch('source/javascript/**/*.js', ['build-js', 'git-add', 'quickbase-push']);
  gulp.watch('source/scss/**/*.scss', ['build-css', 'git-add', 'quickbase-push']);
});