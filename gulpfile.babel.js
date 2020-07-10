import gulp from 'gulp';
import browserSync from 'browser-sync';
import concat from 'gulp-concat';
import sass from 'gulp-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import sourcemaps from 'gulp-sourcemaps';
import del from 'del';
import babel from 'gulp-babel';
import uglify from 'gulp-uglify';
import imagemin from 'gulp-imagemin';

browserSync.create();

const config = {
  app: {
    style: './src/style/**/*.scss',
    js: './src/js/*.js',
    jsVendor: './src/js/vendor/*.js',
    img: './src/img/*.*',
    other: './src/other/*.*',
    html: './src/*.html',
  },
  build: {
    style: './build/css/',
    js: './build/js/',
    jsVendor: './build/js/vendor/',
    img: './build/img/',
    base: './build/',
  },
};

const cssTask = (done) => {
  const plugins = [autoprefixer(), cssnano()];
  gulp
    .src(config.app.style)
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'expanded' }))
    .pipe(concat('style.css'))
    .pipe(postcss(plugins))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.build.style))
    .pipe(browserSync.stream());
  done();
};

const jsTask = (done) => {
  gulp
    .src(config.app.js)
    .pipe(
      babel({
        presets: ['@babel/preset-env'],
      })
    )
    .pipe(uglify())
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest(config.build.js));
  done();
};

const moveJsVendorFilesTask = (done) => {
  gulp.src(config.app.jsVendor).pipe(gulp.dest(config.build.jsVendor));
  done();
};

const imgTask = (done) => {
  gulp.src(config.app.img).pipe(imagemin()).pipe(gulp.dest(config.build.img));
  done();
};

const templateTask = (done) => {
  gulp.src(config.app.html).pipe(gulp.dest(config.build.base));
  done();
};

const moveOtherFilesTask = (done) => {
  gulp.src(config.app.other).pipe(gulp.dest(config.build.base));
  done();
};

const browserReload = (done) => {
  browserSync.reload();
  done();
};

const watch = () => {
  browserSync.init({
    server: {
      baseDir: config.build.base,
    },
  });

  gulp.watch(config.app.style, cssTask);
  gulp.watch(config.app.html, gulp.series(templateTask, browserReload));
  gulp.watch(config.app.js, gulp.series(jsTask, browserReload));
};

export const clean = (done) => {
  del([config.build.base]);
  done();
};

export const imageOp = imgTask;
export const build = gulp.series(
  clean,
  gulp.parallel(cssTask, jsTask, imgTask, moveOtherFilesTask, moveJsVendorFilesTask, templateTask)
);
export const dev = gulp.parallel(templateTask, cssTask, jsTask, watch);
export default dev;
