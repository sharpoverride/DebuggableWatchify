var gulp = require('gulp'),
    source = require("vinyl-source-stream"),
    browserify = require('browserify'),
    watchify = require('watchify'),
    mold = require('mold-source-map'),
    path = require('path');

gulp.task('watchify', function () {
  var bundler = browserify({
    cache: {},
    packageCache: {},
    fullPaths: true,
    debug: true
  });

  bundler = watchify(bundler);
  bundler.on('update', function () {
    writeApplicationBundle(bundler);
  });
  
  bundler.add('./src/main.js');
  writeApplicationBundle(bundler);
});

gulp.task('tests', function () {
  var bundler = browserify({
    cache: {},
    packageCache: {},
    fullPaths: true,
    debug: true
  });

  bundler = watchify(bundler);
  bundler.on('update', function () {
    writeTestBundle(bundler);
  });
  
  bundler.add('./specs/simple_spec.js');
  bundler.external('main');
  writeTestBundle(bundler);
});


function writeApplicationBundle(bundler) {
  bundler
  .require('./src/main.js', {expose: 'main'})
  .bundle()
    .pipe(mold.transform(relativePathForApp))
    .pipe(source('application.browserify.js'))
    .pipe(gulp.dest('./dist'));
}

function relativePathForApp(sourcemap, cb) {
  var fs = require('fs'),
      bundlePath = path.join(__dirname, 'dist', 'application.browserify.js'),
      jsRoot =  path.join(__dirname, 'specs'),
      mapFilePath =  bundlePath +  '.map';
  // make source files appear under the following paths:
  // /src
  //    TypeDescriptor.js
  //    main.js

  sourcemap.sourceRoot('file://' + jsRoot);
  sourcemap.mapSources(mold.mapPathRelativeTo(jsRoot));
  // write map file and return a sourceMappingUrl that points to it
  fs.writeFile(mapFilePath, sourcemap.toJSON(2), 'utf-8', function (err) {
    if (err) return console.error(err);
    // Giving just a filename instead of a path will cause the browser to look for the map file
    // right next to where it loaded the bundle from.
    // Therefore this way the map is found no matter if the page is served or opened from the filesystem.
    cb('//# sourceMappingURL=' + path.basename(mapFilePath));
  });
}

function writeTestBundle(bundler) {
  bundler.bundle()
    .pipe(mold.transform(relativePathForTests))
    .pipe(source('application.specs.js'))
    .pipe(gulp.dest('./dist'));
}

function relativePathForTests(sourcemap, cb) {
  var fs = require('fs'),
      bundlePath = path.join(__dirname, 'dist', 'application.specs.js'),
      specsRoot =  path.join(__dirname, 'specs'),
      mapFilePath =  bundlePath +  '.map';

  sourcemap.sourceRoot('file://' + specsRoot);
  sourcemap.mapSources(mold.mapPathRelativeTo(specsRoot));
  // write map file and return a sourceMappingUrl that points to it
  fs.writeFile(mapFilePath, sourcemap.toJSON(2), 'utf-8', function (err) {
    if (err) return console.error(err);
    // Giving just a filename instead of a path will cause the browser to look for the map file
    // right next to where it loaded the bundle from.
    // Therefore this way the map is found no matter if the page is served or opened from the filesystem.
    cb('//# sourceMappingURL=' + path.basename(mapFilePath));
  });
}

