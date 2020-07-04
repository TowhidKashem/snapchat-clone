# gulp-terser

Gulp plugin, compressed es6+ code.

## Install

```
$ npm install gulp-terser --save-dev
```
or
```
$ yarn add gulp-terser --dev
```

## How to use

```javascript
const gulp = require('gulp');
const terser = require('gulp-terser');

function es(){
  return gulp.src('./src/index.js')
    .pipe(terser())
    .pipe(gulp.dest('./build'));
}

exports.default = es;
```

## Options

Terser configuration can be viewed [https://github.com/terser-js/terser#minify-options](https://github.com/terser-js/terser#minify-options).

```javascript
const gulp = require('gulp');
const terser = require('gulp-terser');

function es(){
  return gulp.src('./src/index.js')
    .pipe(terser({
      keep_fnames: true,
      mangle: false
    }))
    .pipe(gulp.dest('./build'));
}

exports.default = es;
```

## Use sourcemaps

You can use sourcemaps like this:

```javascript
const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const terser = require('gulp-terser');

function es(){
  return gulp.src('./src/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(terser())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./build'));
}

exports.default = es;
```