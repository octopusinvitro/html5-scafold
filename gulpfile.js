var
  autoprefixer = require('gulp-autoprefixer'),
  browsersync  = require('browser-sync').create(),
  concat       = require('gulp-concat'),
  del          = require('del'),
  gulp         = require('gulp'),
  imagemin     = require('gulp-imagemin'),
  sass         = require('gulp-sass'),
  sourcemaps   = require('gulp-sourcemaps'),
  uglify       = require('gulp-uglify'),

  dev = {
    files: [
      './img/',
      './*.ico',
      './*.txt',
      './*.html',
      './*.png',
      './*.xml'
    ],
    css: './scss/main.scss',
    vendor: [
      './js/vendor/*.js'
    ],
    js: [
      './js/plugins.js',
      './js/main.js'
    ],
    img: './img/**'
  },

  dist = {
    root:  './site/',
    files: distFiles,
    css:   './site/css/',
    vendor:'./site/js/vendor',
    js:    './site/js/',
    img:   './site/img/'
  };

function distFiles() {
  return dev.files.map(function(file) {
    return dist.root + file.substr(2);
  });
}

gulp.task('scss', async function() {
  gulp
    .src(dev.css)
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(dist.css));
});

gulp.task('js', async function() {
  gulp
    .src(dev.js)
    .pipe(sourcemaps.init())
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(dist.js));
});

gulp.task('img', async function() {
  gulp
    .src(dev.img)
    // .pipe(cache(imagemin()))
    .pipe(imagemin())
    .pipe(gulp.dest(dist.img));
});

gulp.task('clean', async function () {
  del.sync(dist.files());
});

gulp.task('dist', gulp.series(['clean'], async function () {
  gulp
    .src(dev.files)
    .pipe(gulp.dest(dist.root));
}));

gulp.task('vendor', async function () {
  gulp
    .src(dev.vendor)
    .pipe(gulp.dest(dist.vendor));
});

gulp.task('watch', async function() {
  gulp.watch('./scss/**', gulp.series('scss'));
  gulp.watch(dev.js,      gulp.series('js'));
  gulp.watch(dev.img,     gulp.series('img'));
  gulp.watch(dev.files,   gulp.series('dist'));
  gulp.watch('./scss/**', browsersync.reload);
  gulp.watch(dev.js,      browsersync.reload);
  gulp.watch(dev.img,     browsersync.reload);
  gulp.watch(dev.files,   browsersync.reload);
});

gulp.task('server', async function() {
  browsersync.init({
    server: {
      baseDir: dist.root,
      routes: {
        '/test': 'js'
      }
    },
    port:   4000,
    notify: false,
    open:   false
  });
});

gulp.task('default', gulp.parallel('scss', 'js', 'img', 'dist', 'vendor', 'watch', 'server'));
