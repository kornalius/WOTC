'use strict'

const gulp = require('gulp')
const source = require('vinyl-source-stream')
const browserify = require('browserify')
const glob = require('glob')
const es = require('event-stream')
const babel = require('gulp-babel')
const sass = require('gulp-sass')
const cssmin = require('gulp-cssmin')
const eslint = require('gulp-eslint')
const rename = require('gulp-rename')
const useref = require('gulp-useref')
const replace = require('gulp-replace')
const electron = require('electron-connect').server.create()
const electronPackager = require('gulp-atom-electron')
const symdest = require('gulp-symdest')
const zip = require('gulp-vinyl-zip')

const electronVersion = require('electron-prebuilt/package.json').version

/* These are the building tasks! */

gulp.task('build-client-bundles', (done) => {
  glob('./app/js/*.{js,jsx}', (err, files) => {
    if (err) done(err)

    let tasks = files.map((entry) => {
      return browserify({
          entries: [entry],
          ignoreMissing: true,
          detectGlobals: false
        })
        .transform('babelify', { presets: [ 'es2015', 'react' ] })
        .bundle()
        .pipe(source(entry))
        .pipe(rename({
          dirname: 'js',
          extname: '.js'
        }))
        .pipe(gulp.dest('./build'))
    })
    if (tasks.length === 0) {
      done();
    }
    es.merge(tasks).on('end', done)
  })
})

gulp.task('build-client-scss', (done) => {
  glob('./app/styles/*.scss', (err, files) => {
    if (err) done(err)

    let tasks = files.map((entry) => {
      return gulp.src(entry)
        .pipe(sass())
        .pipe(rename({
          dirname: 'css'
        }))
        .pipe(gulp.dest('./build'))
    })
    if (tasks.length === 0) {
      done();
    }
    es.merge(tasks).on('end', done)
  })
})

gulp.task('build-client-css', (done) => {
  glob('./app/styles/*.css', (err, files) => {
    if (err) done(err)

    let tasks = files.map((entry) => {
      return gulp.src(entry)
        .pipe(cssmin())
        .pipe(rename({
          dirname: 'css'
        }))
        .pipe(gulp.dest('./build'))
    })
    if (tasks.length === 0) {
      done();
    }
    es.merge(tasks).on('end', done)
  })
})

gulp.task('build-client-html', (done) => {
  glob('./app/*.html', (err, files) => {
    if (err) done(err)

    let tasks = files.map((entry) => {
      return gulp.src(entry)
        .pipe(gulp.dest('./build'))
    })
    if (tasks.length === 0) {
      done();
    }
    es.merge(tasks).on('end', done)
  })
})

gulp.task('build-client-html-production', (done) => {
  glob('./app/*.html', (err, files) => {
    if (err) done(err)

    let tasks = files.map((entry) => {
      return gulp.src(entry)
        .pipe(useref())
        .pipe(gulp.dest('./build'))
    })
    if (tasks.length === 0) {
      done();
    }
    es.merge(tasks).on('end', done)
  })
})

gulp.task('build-client-assets', (done) => {
  glob('./app/assets/**/*', (err, files) => {
    if (err) done(err)

    let tasks = files.map((entry) => {
      console.log(entry)
      return gulp.src(entry)
        .pipe(rename({
          dirname: 'assets'
        }))
        .pipe(gulp.dest('./build'))
    })
    if (tasks.length === 0) {
      done();
    }
    es.merge(tasks).on('end', done)
  })
})

gulp.task('build-client', ['build-client-bundles', 'build-client-scss', 'build-client-css', 'build-client-html', 'build-client-assets'])

gulp.task('build-client-production', ['build-client-bundles', 'build-client-scss', 'build-client-css', 'build-client-html-production', 'build-client-assets'])

gulp.task('build-server', (done) => {
  glob('./src/*.js', (err, files) => {
    if (err) done(err)

    let tasks = files.map((entry) => {
      return gulp.src(entry)
        .pipe(babel({ presets: ['es2015'] }))
        .pipe(gulp.dest('./build'))
    })
    if (tasks.length === 0) {
      done();
    }
    es.merge(tasks).on('end', done)
  })
})

gulp.task('build', ['build-client', 'build-server'])

gulp.task('build-production', ['build-client-production', 'build-server'], () => {
  gulp.src('./package.json')
    .pipe(replace('build/index.js', 'index.js'))
    .pipe(gulp.dest('./build'))
})

/* These are the watch tasks! */

gulp.task('watch-client', () => {
  gulp.watch('./app/**/*', ['build-client'], (e) => {
    console.log('Client file ' + e.path + ' was ' + e.type + ', rebuilding...')
  })
})

gulp.task('watch-server', () => {
  gulp.watch('./src/**/*', ['build-server'], (e) => {
    console.log('Server file ' + e.path + ' was ' + e.type + ', rebuilding...')
  })
})

gulp.task('watch', ['watch-client', 'watch-server'])

/* These are the linting tasks! */

gulp.task('lint-client', (done) => {
  glob('./app/**/*.{js,jsx}', (err, files) => {
    if (err) done(err)

    let tasks = files.map((entry) => {
      return gulp.src(entry)
        .pipe(eslint())
        .pipe(eslint.format())
    })
    if (tasks.length === 0) {
      done();
    }
    es.merge(tasks).on('end', done)
  })
})

gulp.task('lint-server', (done) => {
  glob('./src/**/*.js', (err, files) => {
    if (err) done(err)

    let tasks = files.map((entry) => {
      return gulp.src(entry)
        .pipe(eslint())
        .pipe(eslint.format())
    })
    if (tasks.length === 0) {
      done();
    }
    es.merge(tasks).on('end', done)
  })
})

gulp.task('lint', ['lint-client', 'lint-server'])

/* This is the serve task! */

gulp.task('serve', ['build', 'watch'], () => {
  electron.start()
  gulp.watch('./build/index.js', electron.restart)
  gulp.watch(['./build/{js,css}/**/*'], { interval: 2500 }, electron.reload)
})

/* These are the packaging tasks! */

gulp.task('package-osx', ['build-production'], () => {
  return gulp.src('./build/**')
    .pipe(electronPackager({ version: electronVersion, platform: 'darwin' }))
    .pipe(symdest('release'))
})

gulp.task('package-windows', ['build-production'], () => {
  return gulp.src('./build/**')
    .pipe(electronPackager({ version: electronVersion, platform: 'win32' }))
    .pipe(zip.dest('./release/windows.zip'))
})

gulp.task('package-linux', ['build-production'], () => {
  return gulp.src('./build/**')
    .pipe(electronPackager({ version: electronVersion, platform: 'linux' }))
    .pipe(zip.dest('./release/linux.zip'))
})

gulp.task('package', ['build-production', 'package-windows', 'package-osx', 'package-linux'])