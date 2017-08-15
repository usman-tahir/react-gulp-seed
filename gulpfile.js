var gulp = require('gulp'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    gutil = require('gulp-util'),
    babelify = require('babelify'),
    uglify = require('gulp-uglify'),
    taskRefireCount = 0;

// External dependencies not rebundled while developing,
// but included in the application deployment
var dependencies = ['react', 'react-dom'];

// Gulp Tasks
gulp.task('scripts', function() {
  bundleApp(false);
});

gulp.task('deploy', function() {
  bundleApp(true);
});

gulp.task('uglify', function() {
  gulp.src('./dist/**/*.js')
    .uglify()
    .pipe(gulp.dest('./dist/min/js/'));
});

gulp.task('watch', function() {
  gulp.watch(['./app/**/*.js'], ['scripts']);
});

// Default Gulp task
gulp.task('default', ['scripts', 'watch']);
gulp.task('production', ['scripts', 'uglify']);


// Private functions called within the Gulp tasks
function bundleApp(isProduction) {
  taskRefireCount += 1;

  var appBundler = browserify({
    entries: './app/app.js',
    debug: true
  });

  if (!isProduction && taskRefireCount === 1) {
    // Create a vendors.js file for the development environment, so that
    // dependencies like react are not rebundled every time there's a change
    // in a *.js file
    browserify({
      require: dependencies,
      debug: true
    })
      .bundle()
      .on('error', gutil.log)
      .pipe(source('vendors.js'))
      .pipe(gulp.dest('./dist/js/'));
  }

  if (!isProduction) {
    // Externalize the dependencies so they do not get bundled by the app
    // bundler. Dependencies are already bundled in the vendors.js file,
    // for development environments
    dependencies.forEach(function(dependency) {
      appBundler.external(dependency);
    });
  }

  appBundler
    .transform('babelify', { presets: ['es2015', 'react'] })
    .bundle()
    .on('error', gutil.log)
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./dist/js/'));
}
