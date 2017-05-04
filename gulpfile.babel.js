/*jshint esversion: 6 */

import gulp from 'gulp';
import babel from 'gulp-babel';
import browserSync from 'browser-sync';
import del from 'del';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import runSequence from 'run-sequence';
import useref from 'gulp-useref';
import gulpif from 'gulp-if';

browserSync.create();

const dir = {
    src: "src",
    dist: "dist"
};

gulp.task("watch", () => {

    gulp.watch( [`${dir.src}/*.html`, `${dir.src}/js/**/*.js`], browserSync.reload);
    gulp.watch(`${dir.src}/sass/**/*.scss`, ['css']);

});

gulp.task('start-server', ['watch'], () => {
    browserSync.init({
        server: {
            baseDir: `${dir.src}`
        }
    });
});

gulp.task('css', () => {

    return gulp.src(`${dir.src}/sass/**/*.scss`)
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(`${dir.src}/css`))
        .pipe(browserSync.stream());

});

gulp.task('build', () => {
    runSequence('clean-dist', 'html', 'copy');  
});

gulp.task('clean-dist', () => {
    del(`${dir.dist}/*`);
});

gulp.task("copy",() => {

    return gulp.src([`${dir.src}/css/**/*.css`, `${dir.src}/js/*.js`, ], {
        base: `${dir.src}`
    })
    .pipe(gulp.dest(`${dir.dist}/`));

});

gulp.task('html', () => {
    return gulp.src(`${dir.src}/*.html`)
        .pipe(useref())
        .pipe(gulpif('*.js', babel({
            presets: ['es2015'],
            minified: true
        }) ))
        .pipe(gulpif('*.js', gulp.dest(`${dir.src}`)))
        .pipe(gulp.dest(`${dir.dist}`));
});

gulp.task('default', ['start-server']);