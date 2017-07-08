const gulp = require('gulp');
const extender = require('gulp-html-extend');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const del = require('del');

gulp.task('clean', function() {
    del('dist/**/*');
});

gulp.task('extend', function() {
    gulp.src('src/templates/pages/*.html')
        .pipe(extender({annotations: false, verbose: false}))
        .pipe(gulp.dest('./dist'));
});

gulp.task('sass', function() {
    gulp.src('src/scss/main.scss')
        .pipe(sourcemaps.init())
            .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });

    gulp.watch('src/**/*', ['extend', 'sass']).on('change', reload);
});

gulp.task('default', ['clean', 'extend', 'sass', 'serve']);
