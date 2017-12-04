var gulp = require('gulp'); // Load Gulp!
    uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  browserSync = require('browser-sync'),
  eslint = require('gulp-eslint'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  cssnano = require('gulp-cssnano'),
  prettyError = require('gulp-prettyerror'),
  babel = require('gulp-babel');

  const input = './js/*.js';
  const output = './js/transpiled';

gulp.task('babel', function(){
  return gulp.src(input)
  .pipe(babel())
  .pipe(gulp.dest(output));
});
  
gulp.task('sass', function () {
  gulp.src('./sass/style.scss')
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(gulp.dest('./build/css'))
    .pipe(cssnano())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('./build/css')); //destination
});

gulp.task('scripts', ['lint'], function () {
  gulp.src('./js/transpiled/*.js') // What files do we want gulp to consume?
    .pipe(prettyError())
    .pipe(uglify()) // Call the uglify function on these files
    .pipe(rename({
      extname: '.min.js'
    })) // Rename uglified file
    .pipe(gulp.dest('./build/js')) // Where do we put the result?
});

gulp.task('watch', function () {
  gulp.watch('sass/*.scss', ['sass']);
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
  return gulp.src(['./js/transpiled/*.js', '!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});
