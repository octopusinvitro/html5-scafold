const
  browsersync  = require('browser-sync').create(),
  del          = require('del'),
  gulp         = require('gulp'),
  autoprefixer = require('gulp-autoprefixer'),
  concat       = require('gulp-concat'),
  eslint       = require('gulp-eslint'),
  // imagemin     = require('gulp-imagemin'),
  replace      = require('gulp-replace'),
  sass         = require('gulp-sass')(require('sass')),
  sourcemaps   = require('gulp-sourcemaps'),
  terser       = require('gulp-terser'),

  dev = {
    scss: './app/scss/**',
    files: [
      './app/browserconfig.xml',
      './app/robots.txt',
      './app/site.webmanifest'
    ],
    img: './app/img/**',
    html: './app/index.html',
    js: [
      './app/js/src/example.js',
      './app/js/src/app.js'
    ],
    spec: './app/js/spec/**',
    vendor: './app/js/vendor/**'
  },

  dist = {
    css:   './site/css/',
    img:   './site/img/',
    js:    './site/js/',
    root:  './site/',
    vendor:'./site/js/vendor'
  };

function css() {
  del.sync(`${dist.css}**`);
  return gulp
    .src(dev.scss)
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(dist.css));
};

function js() {
  del.sync(`${dist.js}**`);
  return gulp
    .src(dev.js)
    .pipe(sourcemaps.init())
    .pipe(concat('main.js'))
    .pipe(terser())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(dist.js));
};

function img() {
  del.sync(`${dist.img}**`);
  return gulp
    .src(dev.img)
    // .pipe(cache(imagemin()))
    // .pipe(imagemin())
    .pipe(gulp.dest(dist.img));
};

function html() {
  return gulp
    .src(dev.html)
    .pipe(gulp.dest(dist.root));
};

function files() {
  return gulp
    .src(dev.files)
    .pipe(gulp.dest(dist.root));
};

function vendor () {
  return gulp
    .src(dev.vendor)
    .pipe(gulp.dest(dist.vendor));
};

function cache() {
  let token = new Date().getTime();
  return gulp
    .src('./app/index.html')
    .pipe(replace(/cachebust=\d+/g, 'cachebust=' + token))
    .pipe(gulp.dest(dist.root));
}

function lintJS() {
  return _lint(gulp.src(dev.js));
}

function lintSpec() {
  return _lint(gulp.src(dev.spec));
}

function _lint(files) {
  return files
    .pipe(eslint({ configFile: 'eslintrc.json' }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}

function watch() {
  gulp.watch(dev.files, gulp.series(files, browsersync.reload));
  gulp.watch(dev.html,  gulp.series(html, browsersync.reload));
  gulp.watch(dev.img,   gulp.series(img, browsersync.reload));
  gulp.watch(dev.js,    gulp.series(js, browsersync.reload));
  gulp.watch(dev.scss,  gulp.series(css, browsersync.reload));
};

function server() {
  browsersync.init({
    server: { baseDir: dist.root, routes: { '/': './site/', '/tests': './app/js/' }},
    port:   4000,
    notify: false,
    open:   true
  });
};

const assets = gulp.parallel(cache, css, html, files, img, js, vendor);
exports.assets = assets;
exports.default = gulp.parallel(assets, watch, server);
