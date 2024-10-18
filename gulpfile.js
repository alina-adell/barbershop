'use strict';

const {src, dest, watch, series,} = require("gulp");
const sass = require('gulp-sass')(require('sass'));
const cssmin = require('gulp-concat');
const rename = require('gulp-rename');
const browserSync = require("browser-sync");
const sourcemaps = require("gulp-sourcemaps");
const notify = require("gulp-notify");



function SASS() {
    return src('./styles/*.scss', { style: './' })
        .pipe(sourcemaps.init())
        .pipe(sass().on("error", notify.onError()))
        .pipe(cssmin('bundle.min.css'))
        .pipe(sourcemaps.write("."))
        .pipe(dest('dist/styles/')) //// выгружаем результат
        .pipe(browserSync.stream());
}

exports.SASS = SASS;

function html() {
    return src('./*.html')
        .pipe(dest('dist/'))
        .pipe(browserSync.stream());
}

exports.html = html;

function fonts() {
    return src('./fonts/*')
        .pipe(dest('dist/fonts'))
        .pipe(browserSync.stream());
}

exports.fonts = fonts;

function images() {
    return src('./images/*')
        .pipe(dest('dist/images'))
        .pipe(browserSync.stream());
}

exports.images = images;

function scripts() {
    return src('./scripts/*')
        .pipe(dest('dist/scripts'))
        .pipe(browserSync.stream());
}

exports.scripts = scripts;

function myServer() {
    browserSync.init({
        server: {
            baseDir: "./dist" // папка для локального сервера
        },
        notify: false
    });

    watch('./styles/*.scss', {usePolling: true}, SASS) // следим за SASS
    watch('./*.html', series('html'))
    watch('./fonts/*', series('fonts'))
    watch('./images/*', series('images'))
    watch('./scripts/*', series('scripts'))
}

exports.default = series(SASS, html, fonts, images, scripts, myServer);