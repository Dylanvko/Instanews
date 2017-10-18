var gulp = require('gulp'); // Load Gulp!
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync'),
    eslint = require('gulp-eslint');

gulp.task('scripts', ['lint'], function () {
  gulp.src('./js/*.js') // What files do we want gulp to consume?
    .pipe(uglify()) // Call the uglify function on these files
    .pipe(rename({ extname: '.min.js' })) // Rename uglified file
    .pipe(gulp.dest('./build/js')) // Where do we put the result?
});

gulp.task('watch', function () {
  gulp.watch('js/*.js', ['scripts']);
});

gulp.task('browser-sync', function () {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });

  gulp.watch(['index.html', 'build/css/*.css', 'build/js/*.js']).on('change', browserSync.reload);
});

gulp.task('default', ['watch', 'browser-sync']);

gulp.task('lint', function () {
  return gulp.src(['./js/*.js','!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});


