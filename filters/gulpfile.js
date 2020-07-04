/*
Main dependencies:

jeelizFaceFilter/libs/threejs/v97/three.js                                              - 1.4mb (130kb from cdnjs)
jeelizFaceFilter/dist/jeelizFaceFilter.js                                               - 75kb
jeelizFaceFilter/helpers/JeelizResizer.js                                               - 11kb
jeelizFaceFilter/helpers/JeelizThreejsHelper.js                                         - 16kb

Dog dependencies:

jeelizFaceFilter/libs/tween/v16_3_5/Tween.min.js                                        - 6kb (2.1kb from cdnjs)
jeelizFaceFilter/libs/threejs/customMaterials/FlexMaterial/ThreeFlexMaterial.js         - 5kb
jeelizFaceFilter/demos/threejs/dog_face/libs/glfx.js                                    - 28kb

Dog and bees dependency:

jeelizFaceFilter/helpers/addDragEventListener.js                                        - 5kb
*/
const gulp = require('gulp');
const { watch } = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const terser = require('gulp-terser');

exports.watchJS = () => {
  watch('src/*.js', { ignoreInitial: false }, (cb) => {
    defaultTask();
    cb();
  });
};

const defaultTask = (cb) => {
  return gulp
    .src([
      // Main dependencies
      'jeelizFaceFilter/dist/jeelizFaceFilter.js',
      'jeelizFaceFilter/helpers/JeelizResizer.js',
      'jeelizFaceFilter/helpers/JeelizThreejsHelper.js',
      // Dog dependencies
      'jeelizFaceFilter/libs/threejs/customMaterials/FlexMaterial/ThreeFlexMaterial.js',
      'jeelizFaceFilter/demos/threejs/dog_face/libs/glfx.js',
      // Dog and bees dependency
      'jeelizFaceFilter/helpers/addDragEventListener.js',
      // Filters
      'src/dog.js',
      'src/bees.js',
      'src/halloween.js',
      'src/deform.js',
      'src/liberty.js'
    ])
    .pipe(concat('filters.min.js'))
    .pipe(
      babel({
        presets: ['@babel/preset-env']
      })
    )
    .pipe(terser())
    .pipe(gulp.dest('build'));
  cb();
};

exports.default = defaultTask;
