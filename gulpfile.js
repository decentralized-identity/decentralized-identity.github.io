const gulp = require("gulp");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const nunjucksRender = require("gulp-nunjucks-render");
const axios = require("axios");
const fs = require('fs');
const path = require('path');

const { Transform } = require("stream");
const File = require("vinyl");
const { existsSync } = require("fs");
const workingGroups = require('./config/working-groups');

// Dynamically generate working group structure and repo topics
var structure = {
  index: ["index.html"],
  events: ["index.html"],
  education: ["index.html"],
  schemas: ["index.html"],
  "working-groups": ["index.html"]
};

// Helper function to normalize slugs
function normalizeSlug(id) {
  // Handle both hyphenated and underscore formats
  return id.replace(/_/g, '-').replace(/\s+/g, '-').toLowerCase();
}

// Dynamically add working group pages to structure
for (const [id, group] of Object.entries(workingGroups)) {
  const slug = normalizeSlug(id);
  structure["working-groups"].push(`${slug}.html`);
}

// Dynamically generate repoTopics from working group repoTags
var repoTopics = {};
for (const [id, group] of Object.entries(workingGroups)) {
  if (group.repoTag) {
    repoTopics[group.repoTag] = 1;
  }
}

var assets = {
  js: [
    "docs/js/jquery-3.2.1.min.js",
    "docs/js/jquery-migrate-3.0.0.min.js",
    "docs/plugins/bootstrap/js/popper.min.js",
    "docs/plugins/bootstrap/js/bootstrap.min.js",
    "docs/js/custom.js",
  ],
};

var compiledRepos = null;

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

// Add this new function to determine if a working group is archived
function isArchived(group) {
  // Check for explicit archived flag first
  if (group.archived === true) return true;
  return false;
}

// Add this to your "templates" task to make working group navigation data available
gulp.task("templates", async () => {
  // Create working group navigation data structure
  const activeWGs = [];
  const archivedWGs = [];
  
  // Sort working groups into active and archived
  for (const [id, group] of Object.entries(workingGroups)) {
    const slug = normalizeSlug(id);
    const navItem = {
      id: id,
      name: group.name,
      slug: slug,
      url: `/working-groups/${slug}.html`
    };
    
    if (isArchived(group)) {
      archivedWGs.push(navItem);
    } else {
      activeWGs.push(navItem);
    }
  }
  
  // Sort alphabetically by name
  activeWGs.sort((a, b) => a.name.localeCompare(b.name));
  archivedWGs.sort((a, b) => a.name.localeCompare(b.name));
  
  return gulp
    .src(["templates/pages/**/*.html.njk", "templates/pages/**/*.html"])
    .pipe(
      nunjucksRender({
        path: ["templates", "templates/partials", "templates/pages"],
        data: {
          repos: compiledRepos || (await compileRepos()),
          workingGroups: workingGroups,
          navigation: {
            activeWorkingGroups: activeWGs,
            archivedWorkingGroups: archivedWGs
          }
        },
      }).on("error", (e) => {
        console.log(
          `Error in ${
            e.fileName ? e.fileName : "(filename not available)"
          }: ${e.message.toString()}`
        );
      })
    )
    .pipe(
      new Transform({
        objectMode: true,

        transform(file, enc, callback) {
          if (file instanceof File) {
            if (file.path.endsWith(".html.html")) {
              file.path = file.path.slice(0, -5);
            }
            callback(null, file);
          } else {
            console.log(file);
            callback(
              new Error("Error, unexpected type received in pipe"),
              null
            );
          }
        },
      })
    )
    .pipe(gulp.dest("./docs"));
});

gulp.task("repoCompilation", (done) => {
  repoCompilation.then((z) => done());
});

// Generate working group template files from config
gulp.task("generate-wg-templates", function(done) {
  // Load the working groups config
  const templateDir = './templates/pages/working-groups';
  
  // Create the directory if it doesn't exist
  if (!fs.existsSync(templateDir)) {
    fs.mkdirSync(templateDir, { recursive: true });
  }
  
  // Generate index file
  const indexTemplate = `{% extends "default.html.njk" %}
{% set title = "Working Groups" %}
{% set css = ['directory'] %}

{% block content %}
<section class="page-title theme-bg">
  <div class="container">
    <h1>Working Groups</h1>
  </div>
</section>

<section>
  <div class="container">
    <!-- Active Working Groups -->
    <div class="row mb-5">
      <div class="col-md-12">
        <h2>Active Working Groups</h2>
        <div class="row">
        {% for id, group in workingGroups %}
          {% if group.status != "archived" %}
          <div class="col-md-6 mb-4">
            <div class="card h-100">
              <div class="card-body">
                <div class="d-flex align-items-center mb-3">
                  <svg class="me-3"><use xlink:href="/images/icons.svg#{{ group.logo }}"></use></svg>
                  <h3 class="card-title mb-0">{{ group.name }}</h3>
                </div>
                {% if group.shortform %}
                <p class="text-muted">{{ group.shortform }}</p>
                {% endif %}
                <p>{{ group.scope | truncate(150) }}</p>
                <a href="/working-groups/{{ id | replace("_", "-") }}.html" class="btn btn-primary">Learn More</a>
              </div>
            </div>
          </div>
          {% endif %}
        {% endfor %}
        </div>
      </div>
    </div>

    <!-- Archived Working Groups -->
    <div class="row">
      <div class="col-md-12">
        <h2>Completed or Archived Working Groups</h2>
        <div class="row">
        {% for id, group in workingGroups %}
          {% if group.status == "archived" %}
          <div class="col-md-6 mb-4">
            <div class="card h-100 bg-light">
              <div class="card-body">
                <div class="d-flex align-items-center mb-3">
                  <svg class="me-3"><use xlink:href="/images/icons.svg#{{ group.logo }}"></use></svg>
                  <h3 class="card-title mb-0">{{ group.name }}</h3>
                </div>
                {% if group.shortform %}
                <p class="text-muted">{{ group.shortform }}</p>
                {% endif %}
                <p>{{ group.scope | truncate(150) }}</p>
                <a href="/working-groups/{{ id | replace("_", "-") }}.html" class="btn btn-secondary">View Archive</a>
              </div>
            </div>
          </div>
          {% endif %}
        {% endfor %}
        </div>
      </div>
    </div>
  </div>
</section>
{% endblock %}
`;
  
  fs.writeFileSync(path.join(templateDir, `index.html.njk`), indexTemplate);
  console.log('Generated working groups index page');
  
  // Generate a template file for each working group
  for (const [id, group] of Object.entries(workingGroups)) {
    const slug = normalizeSlug(id);
    
    // Simply set the ID to be used to look up the data
    const templateContent = `{% extends "wg_base.html.njk" %}
{% set wg_id = "${id}" %}
{% set name = workingGroups[wg_id].name %}
{% set logo = workingGroups[wg_id].logo %}
{% set title = workingGroups[wg_id].title %}
{% set scope = workingGroups[wg_id].scope %}
{% set shortform = workingGroups[wg_id].shortform %}
{% set charters = workingGroups[wg_id].charters %}
{% set projects = workingGroups[wg_id].projects %}
{% set chairs = workingGroups[wg_id].chairs %}
{% set liaison = workingGroups[wg_id].liaison %}
{% set editors = workingGroups[wg_id].editors %}
{% set status = workingGroups[wg_id].status %}
{% set type = workingGroups[wg_id].type %}
{% set repoTag = workingGroups[wg_id].repoTag %}
{% set repoTopics = workingGroups[wg_id].repoTopics %}
{% set meetings = workingGroups[wg_id].meetings %}
`;
    
    fs.writeFileSync(path.join(templateDir, `${slug}.html.njk`), templateContent);
    console.log(`Generated template for ${group.name}`);
  }
  
  done();
});

gulp.task(
  "build",
  gulp.series(
    "generate-wg-templates",
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
