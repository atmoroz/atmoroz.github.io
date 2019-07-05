"use strict";
var gulp = require('gulp'),
    gp = require('gulp-load-plugins')(),
    browserSync = require('browser-sync').create();
    // pug = require('gulp-pug'),
    // scss = require("gulp-scss");

gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: "./build"
        }
    });
    browserSync.watch('build',browserSync.reload)
});

gulp.task('pug', function buildHTML() {
  return gulp.src('developer/*.pug')
  .pipe(gp.pug({
    pretty: true //отменяет minifited
  }))
  .pipe(gulp.dest('build/'))
  .on('end',browserSync.reload);
});

gulp.task('sass', function buildHTML() {
  return gulp.src('developer/style.scss')
  .pipe(gp.sourcemaps.init())
  .pipe(gp.sass({
    //pretty: true //отменяет minifited
  }))
  .pipe(gp.autoprefixer({
      overrideBrowserslist: ['last 2 versions'],
      cascade: false
  }))
  .on("error", gp.notify.onError({
    message: "Error: <%= error.message %>",
    title: "style"
  }))
  //.pipe(gp.csso())//оптимизирует css
  .pipe(gp.sourcemaps.write())
  .pipe(gulp.dest('build/css'))
  .pipe(browserSync.reload({
        stream:true
  }));
});

gulp.task('icons', function() {
    return gulp.src([
            'node_modules/@fortawesome/fontawesome-free/**',
            '!node_modules/@fortawesome/fontawesome-free/**/*.map',
            '!node_modules/@fortawesome/fontawesome-free/.npmignore',
            '!node_modules/@fortawesome/fontawesome-free/*.txt',
            '!node_modules/@fortawesome/fontawesome-free/*.md',
            '!node_modules/@fortawesome/fontawesome-free/*.json'
        ])
        .pipe(gulp.dest('build/libs/webfonts/'));
});
// gulp.task('fonts', function() {
//   return gulp.src('node_modules/@fortawesome/fontawesome-free/webfonts/*')
//     .pipe(gulp.dest('build/fonts'))
// });
gulp.task('watch', function() {
  gulp.watch('developer/**/*.pug', gulp.series('pug'))
  gulp.watch('developer/**/*.scss', gulp.series('sass'))
  gulp.watch('node_modules/@fortawesome/font-awesome/**.*', gulp.series('icons'))
});

gulp.task('default', gulp.series(
  gulp.parallel('pug', 'sass'),
  gulp.parallel('watch', 'serve'),
));