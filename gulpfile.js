const
  { dest, parallel, series, src, watch } = require('gulp'),
  browsersync  = require('browser-sync').create(),
  del          = require('del'),
  autoprefixer = require('gulp-autoprefixer'),
  concat       = require('gulp-concat'),
  eslint       = require('gulp-eslint-new'),
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
  return src(dev.scss, { sourcemaps: true })
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(autoprefixer())
    .pipe(dest(dist.css, { sourcemaps: '.' }));
}

function js() {
  del.sync(`${dist.js}**`);
  return src(dev.js)
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(terser())
    .pipe(sourcemaps.write('./'))
    .pipe(dest(dist.js));
}

function img() {
  del.sync(`${dist.img}**`);
  return src(dev.img)
    .pipe(dest(dist.img));
}

function html() {
  return src(dev.html)
    .pipe(dest(dist.root));
}

function files() {
  return src(dev.files)
    .pipe(dest(dist.root));
}

function vendor () {
  return src(dev.vendor)
    .pipe(dest(dist.vendor));
}

function cache() {
  let token = new Date().getTime();
  return src(dev.html)
    .pipe(replace(/cachebust=\d+/g, 'cachebust=' + token))
    .pipe(dest(dist.root));
}

function lintJS() {
  return _lint(src(dev.js));
}

function lintSpec() {
  return _lint(src(dev.spec));
}

function _lint(files) {
  return files
    .pipe(eslint({ overrideConfigFile: 'eslintrc.json' }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}

function watchFiles() {
  watch(dev.files, series(files, browsersync.reload));
  watch(dev.html,  series(html, browsersync.reload));
  watch(dev.img,   series(img, browsersync.reload));
  watch(dev.js,    series(lintJS, js, browsersync.reload));
  watch(dev.scss,  series(css, browsersync.reload));
  watch(dev.spec,  series(lintSpec, browsersync.reload));
}

function server() {
  browsersync.init({
    server: { routes: { '/': dist.root, '/tests': './app/js/' }},
    browser: ['firefox'],
    port:   4000,
    notify: false,
    open:   true
  });
}

const assets = parallel(cache, css, files, html, img, js, vendor);
exports.assets = assets;
exports.default = series(assets, parallel(server, watchFiles));
