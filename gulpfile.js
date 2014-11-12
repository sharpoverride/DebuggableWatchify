var gulp = require('gulp'),
    source = require("vinyl-source-stream"),
    browserify = require('browserify'),
    watchify = require('watchify'),
    mold = require('mold-source-map'),
    path = require('path'),
    bundlePath = path.join(__dirname, 'dist', 'application.browserify.js'),
    jsRoot =  path.join(__dirname, 'src');

gulp.task('watchify', function(){
  var bundler = browserify({
    cache: {},
    packageCache: {},
    fullPaths: true,
    debug: true
  });

  bundler = watchify(bundler);
  bundler.on('update', function () {
    writeBundle(bundler);
  });
  
  bundler.add('./src/main.js');
  writeBundle(bundler);
});


function writeBundle(bundler) {
  bundler.bundle()
    .pipe(mold.transform(mapFileUrlComments))
    .pipe(source('application.browserify.js'))
    .pipe(gulp.dest('./dist'));
}

function mapFileUrlComments(sourcemap, cb) {
  var mapFilePath =  bundlePath +  '.map',
      fs = require('fs');
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

