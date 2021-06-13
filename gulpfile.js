
// --------------------------------------------
// Dependencies
// --------------------------------------------

const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const images = require('gulp-imagemin');
const minifycss = require('gulp-minify-css');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
// const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();

// --------------------------------------------
// Paths
// --------------------------------------------

const styleSrc = 'src/scss/**/*.scss';
const styleDest = 'build/css/';

const scriptsSrc = 'src/js/*.js';
const scriptsDest = 'build/js/';

const vendorsSrc = 'src/js/vendors/*.js';
const vendorsDest = 'build/js/';

// --------------------------------------------
// Tasks
// --------------------------------------------

gulp.task('sass', () => {
  gulp.src(styleSrc)
    .pipe(plumber())
    .pipe(sass({ style : 'compressed' }))
    .pipe(autoprefixer({
      browsers: ['last 2 versions']    
    }))
    // .pipe(minifycss())
    .pipe(rename({
      basename: 'index',
      suffix: '.min'
    }))
    .pipe(gulp.dest(styleDest));
});

gulp.task('images', () => {
  gulp.src('src/img/*')
    .pipe(images())
    .pipe(gulp.dest('build/img'));
})

gulp.task('scripts', () => {
  gulp.src(scriptsSrc)
    .pipe(plumber())
    // .pipe(sourcemaps.init())
    // .pipe(uglify())
    .pipe(babel())
    // .pipe(sourcemaps.write())
    .pipe(gulp.dest(scriptsDest))
});

gulp.task('vendors', () => {
  gulp.src(vendorsSrc)
    .pipe(plumber())
    .pipe(concat('vendors.js'))
    .pipe(uglify())
    .pipe(gulp.dest(scriptsDest));
});

gulp.task('watch', () => {
  browserSync.init({
    server: { baseDir: './build' },
    notify: true
  })

  gulp.watch(styleSrc, ['sass']);
  gulp.watch(scriptsSrc, ['scripts']);
  gulp.watch(vendorsSrc, ['vendors']);

  gulp.watch([
    'build/*.html',
    'build/css/*css',
    'build/js/*.js'
  ]).on('change', browserSync.reload);
});

gulp.task('default', ['sass', 'scripts', 'vendors', 'watch'], () => {});