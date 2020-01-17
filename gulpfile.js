const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const nunjucksRender = require('gulp-nunjucks-render');
const axios = require('axios');

var assets = {
  js: [
    'js/jquery-3.2.1.min.js',
    'js/jquery-migrate-3.0.0.min.js',
    'plugins/bootstrap/js/popper.min.js',
    'plugins/bootstrap/js/bootstrap.min.js',
    'js/custom.js'
  ]
};

var structure = {
  'index': [
    'index.html'
  ],
  'events': [
    'index.html'
  ],
  'schemas': [
    'index.html'
  ],
  'working-groups': [
    'identifiers-names-discovery.html',
    'storage-compute.html',
    'claims-credentials.html',
    'authentication.html'
  ]
};

var repos = null;
const repoTopics = {
  'wg-auth': 1,
  'wg-cc': 1,
  'wg-id': 1,
  'wg-sc': 1
}

const getRepos = async () => {
  if (repos) return repos;
  try {
    // https://api.github.com/search/topics?q='':featured
    const response = await axios.get('https://api.github.com/users/decentralized-identity/repos?type=public&per_page=100', {
      headers: { Accept: 'application/vnd.github.mercy-preview+json' }
    })
    repos = {};
    if (response.data) response.data.forEach(repo => {
      if (repo.topics) repo.topics.forEach(topic => {
        if (repoTopics[topic]) {
          let list = repos[topic] || (repos[topic] = []);
          list.push(repo);
        }
      })
    });
    return repos;
  } catch (error) {
    console.log(error);
    return repos = {};
  }
};

var repoFetch = getRepos();

gulp.task('assets', function() {
  return gulp.src(assets.js)
    .pipe(uglify())
    .pipe(concat('base.js'))
    .pipe(gulp.dest('js'));
});

gulp.task('templates', async function() {
  //console.log(repos || await getRepos())
  return gulp.src('templates/pages/**/*.html')
    .pipe(nunjucksRender({
      path: ['templates', 'templates/partials', 'templates/pages'],
      data: {
        repos: repos || await getRepos()
      }
    }))
    .pipe(gulp.dest('.'))
});

gulp.task('build', gulp.parallel('assets', 'templates'));

gulp.task('watch', () => gulp.watch(['templates/**/*', 'js/**/*', '!js/base.js'], ['build']));

repoFetch.then(r => gulp.parallel('build')());