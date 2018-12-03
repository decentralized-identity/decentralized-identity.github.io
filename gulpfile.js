const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const nunjucksRender = require('gulp-nunjucks-render');
const gulpSequence = require('gulp-sequence');
const del = require('del');
const connect = require('gulp-connect');

var assets = {
  js: [
    'js/jquery-3.2.1.min.js',
    'js/jquery-migrate-3.0.0.min.js',
    'plugins/bootstrap/js/popper.min.js',
    'plugins/bootstrap/js/bootstrap.min.js',
    'plugins/owl-carousel/js/owl.carousel.min.js',
    'plugins/magnific/jquery.magnific-popup.min.js',
    'js/custom.js'
  ]
};

var structure = {
  '': 'index.html',
  'working-groups': [
    'identifiers-names-discovery.html',
    'storage-compute.html',
    'claims-credentials.html',
    'test-wg.html'
  ]
};

gulp.task('assets', function() {
  return gulp.src(assets.js)
    .pipe(uglify())
    .pipe(concat('base.js'))
    .pipe(gulp.dest('js'));
});

gulp.task('templates', function() {
  return gulp.src('templates/pages/*.html')
    .pipe(nunjucksRender({
      path: ['templates', 'templates/partials', 'templates/pages']
    }))
    .pipe(gulp.dest('tmp'))
});

gulp.task('structure', function() {
  for (let z in structure) {
    (Array.isArray(structure[z]) ? structure[z] : [structure[z]]).forEach(file => {
      gulp.src('tmp/' + file).pipe(gulp.dest(z));
    });
  }
});

gulp.task('cleanup', function() {
  del('tmp/**');
});

gulp.task('connect', function() {
  connect.server({
    root: '.',
    livereload: true
  })
});

gulp.task('build', gulpSequence('assets', 'templates', 'structure', 'cleanup'));