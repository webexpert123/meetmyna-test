require('dotenv').config()
const { parallel, series, src, dest, watch } = require('gulp');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const image = require('gulp-image');
const clean = require('gulp-clean');
const serve = require('gulp-webserver');
const babel = require('gulp-babel');
const template = require('gulp-template');

//build the css and js, inject into the html.
function html() {
  return src('./src/*.html')
    .pipe(dest('./dist'))
}

function fonts() {
  return src('./src/fonts/*')
    .pipe(dest('./dist/fonts'))
}

function buildJS() {
  return src('./src/js/config.js.template')
    .pipe(template({
      apiServer: `${process.env.apiServer}`,
      appServer: `${process.env.appServer}`,
      stripePK: `${process.env.stripePK}`,
      cognitoUserPool: `${process.env.cognitoUserPool}`,
      cognitoClientId: `${process.env.cognitoClientId}`,
    }))
    .pipe(src('./src/js/*.js'))
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(concat('main.js'))
    .pipe(dest('./dist'))
}

function buildCss() {
  var tailwindcss = require('tailwindcss');

  return src('./src/scss/index.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      tailwindcss('./tailwind.config.js'),
      require('autoprefixer'),
    ]))
    .pipe(concat('styles.css'))
    .pipe(dest('./dist'))
}

function images() {
  return src('./src/images/*')
    .pipe(image())
    .pipe(dest('./dist/images/'))
}

function watchFiles() {
  watch('./src/*.html', html);
  watch('./src/fonts/*', fonts);
  watch('./src/js/*', buildJS);
  watch('./src/images/*', images);
  watch('./src/scss/**.scss', buildCss);
}

function server() {
  src('./dist')
    .pipe(serve({
      livereload: true,
      open: true,
      port: 5000
    }));
}

function prodServe() {
  src('./dist')
    .pipe(serve());
}

function cleanDist() {
  return src('./dist', { allowEmpty: true }).pipe(clean());
}

exports.build = series(cleanDist, html, parallel(buildCss, buildJS, images, fonts));

exports.default = series(cleanDist, html, parallel(buildCss, buildJS, images, fonts), parallel(server, watchFiles));

exports.serve = prodServe;