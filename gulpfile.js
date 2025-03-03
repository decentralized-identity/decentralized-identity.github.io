const gulp = require("gulp");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const nunjucksRender = require("gulp-nunjucks-render");
const axios = require("axios");
const fetch = require('node-fetch');

const { Transform } = require("stream");
const File = require("vinyl");
const { existsSync } = require("fs");

const workingGroups = require('./config/working-groups');

var assets = {
  js: [
    "docs/js/jquery-3.2.1.min.js",
    "docs/js/jquery-migrate-3.0.0.min.js",
    "docs/plugins/bootstrap/js/popper.min.js",
    "docs/plugins/bootstrap/js/bootstrap.min.js",
    "docs/js/custom.js",
  ],
};

var structure = {
  index: ["index.html"],
  events: ["index.html"],
  education: ["index.html"],
  schemas: ["index.html"],
  "working-groups": [
    "identifiers-discovery.html",
    "storage-compute.html",
    "claims-credentials.html",
    "authentication.html",
    "did-comm.html",
    "sidetree.html",
    "secure-data-storage.html",
  ],
};

var compiledRepos = null;
const repoTopics = {
  "wg-auth": 1,
  "wg-cc": 1,
  "wg-id": 1,
  "wg-sc": 1,
  "wg-didcomm": 1,
  "wg-crypto": 1,
  "wg-keri": 1,
  "wg-sidetree": 1,
  "wg-ws": 1,
};

async function iterateRepos(fn, page = 1) {
  return axios
    .get(
      `https://api.github.com/users/decentralized-identity/repos?type=public&per_page=100&page=${
        page || 1
      }`,
      {
        headers: { Accept: "application/vnd.github.mercy-preview+json" },
      }
    )
    .then((response) => {
      let repos = response.data;
      if (repos && repos.length) {
        fn(repos);
        if (repos.length === 100) {
          return iterateRepos(fn, ++page);
        }
      }
    })
    .catch((e) => console.log(e));
}

async function compileRepos() {
  if (compiledRepos) return compiledRepos;
  compiledRepos = {};
  try {
    await iterateRepos((repos) => {
      repos.forEach((repo) => {
        if (repo.topics)
          repo.topics.forEach((topic) => {
            if (repoTopics[topic]) {
              let list = compiledRepos[topic] || (compiledRepos[topic] = []);
              list.push(repo);
            }
          });
      });
    });
    return compiledRepos;
  } catch (error) {
    return compiledRepos;
  }
}

const repoCompilation = compileRepos();

gulp.task("assets", function () {
  return gulp
    .src(assets.js)
    .pipe(uglify())
    .pipe(concat("base.js"))
    .pipe(gulp.dest("docs/js"));
});

gulp.task("assetsCopy", () => {
  return gulp.src([
    "assets/**/*",
    "assets/favicon.ico",
    "assets/favicon.png",
    "static/docs/**/*",
    ".well-known/**/*",
    "CNAME"
  ]).pipe(gulp.dest("docs"));
});

async function fetchRepositories() {
  const repos = {};
  
  try {
    const response = await fetch('https://api.github.com/orgs/decentralized-identity/repos?per_page=100');
    const allRepos = await response.json();
    
    // For each working group with a repoTag, filter the repositories
    for (const [key, group] of Object.entries(workingGroups)) {
      if (group.repoTag) {
        repos[key] = allRepos.filter(repo => 
          repo.name.includes(group.repoTag) || 
          (repo.topics && repo.topics.includes(group.repoTag))
        );
      }
    }
  } catch (error) {
    console.error('Error fetching repositories:', error);
  }
  
  return repos;
}

gulp.task("templates", async function() {
  const repositories = await fetchRepositories();
  
  return gulp.src('templates/pages/**/*.html')
    .pipe(nunjucksRender({
      path: ['templates', 'templates/partials', 'templates/layouts'],
      data: {
        workingGroups: workingGroups,
        repositories: repositories
      }
    }))
    .pipe(gulp.dest('docs'));
});

gulp.task("repoCompilation", (done) => {
  repoCompilation.then((z) => done());
});

gulp.task(
  "build",
  gulp.series(
    "repoCompilation",
    gulp.parallel("assets", "assetsCopy", "templates")
  )
);

gulp.task("watch", () =>
  gulp.watch(
    ["templates/**/*", "docs/js/**/*", "!docs/js/base.js"],
    gulp.parallel("build")
  )
);
