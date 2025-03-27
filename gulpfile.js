const gulp = require("gulp");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const nunjucksRender = require("gulp-nunjucks-render");
const axios = require("axios");
const fs = require('fs');
const path = require('path');
const { rimraf } = require('rimraf');

const { Transform } = require("stream");
const File = require("vinyl");
const { existsSync } = require("fs");
const workingGroups = require('./config/working-groups');
const specialInterestGroups = require('./config/special-interest-groups');
const userGroups = require('./config/user-groups');

// Update structure to include SIGs and user groups
var structure = {
  index: ["index.html"],
  events: ["index.html"],
  education: ["index.html"],
  schemas: ["index.html"],
  "working-groups": ["index.html"],
  "special-interest-groups": ["index.html"],
  "user-groups": ["index.html"]  // Add user groups section
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

// Add SIG pages to structure
for (const [id, group] of Object.entries(specialInterestGroups.activeSIGs)) {
  const slug = normalizeSlug(id);
  structure["special-interest-groups"].push(`${slug}.html`);
}

// Add user group pages to structure
for (const [id, group] of Object.entries(userGroups.activeUserGroups)) {
  const slug = normalizeSlug(id);
  structure["user-groups"].push(`${slug}.html`);
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
    "assets/js/jquery-3.2.1.min.js",
    "assets/js/jquery-migrate-3.0.0.min.js",
    "assets/plugins/bootstrap/js/popper.min.js",
    "assets/plugins/bootstrap/js/bootstrap.min.js",
    "assets/js/custom.js",
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

// Update templates task to include SIG data
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
  
  // Create SIG navigation data structure
  const activeSIGs = [];
  const archivedSIGs = [];
  
  // Sort SIGs into active and archived
  for (const [id, group] of Object.entries(specialInterestGroups.activeSIGs)) {
    const navItem = {
      id: id,
      name: group.name,
      slug: id,
      url: group.externalUrl || group.url || `/special-interest-groups/${normalizeSlug(id)}.html`,
      isExternal: !!group.externalUrl
    };
    activeSIGs.push(navItem);
  }
  
  for (const [id, group] of Object.entries(specialInterestGroups.archivedSIGs || {})) {
    const slug = normalizeSlug(id);
    const navItem = {
      id: id,
      name: group.name,
      slug: slug,
      url: `/special-interest-groups/${slug}.html`
    };
    archivedSIGs.push(navItem);
  }
  
  // Sort alphabetically
  activeSIGs.sort((a, b) => a.name.localeCompare(b.name));
  archivedSIGs.sort((a, b) => a.name.localeCompare(b.name));
  
  // Create user group navigation data structure
  const activeUGs = [];
  const archivedUGs = [];
  
  // Sort user groups into active and archived
  for (const [id, group] of Object.entries(userGroups.activeUserGroups)) {
    const navItem = {
      id: id,
      name: group.name,
      slug: id,
      url: group.url || `/user-groups/${normalizeSlug(id)}.html`
    };
    activeUGs.push(navItem);
  }
  
  for (const [id, group] of Object.entries(userGroups.archivedUserGroups || {})) {
    const slug = normalizeSlug(id);
    const navItem = {
      id: id,
      name: group.name,
      slug: slug,
      url: `/user-groups/${slug}.html`
    };
    archivedUGs.push(navItem);
  }
  
  // Sort alphabetically
  activeUGs.sort((a, b) => a.name.localeCompare(b.name));
  archivedUGs.sort((a, b) => a.name.localeCompare(b.name));
  
  return gulp
    .src(["templates/pages/**/*.html.njk", "templates/pages/**/*.html"])
    .pipe(
      nunjucksRender({
        path: ["templates", "templates/partials", "templates/pages"],
        data: {
          repos: compiledRepos || (await compileRepos()),
          workingGroups: workingGroups,
          specialInterestGroups: specialInterestGroups,
          userGroups: userGroups,
          navigation: {
            activeWorkingGroups: activeWGs,
            archivedWorkingGroups: archivedWGs,
            activeSpecialInterestGroups: activeSIGs,
            archivedSpecialInterestGroups: archivedSIGs,
            activeUserGroups: activeUGs,
            archivedUserGroups: archivedUGs
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

// Modify the generate-sig-templates task
gulp.task("generate-sig-templates", function(done) {
  const templateDir = './templates/pages/special-interest-groups';
  
  if (!fs.existsSync(templateDir)) {
    fs.mkdirSync(templateDir, { recursive: true });
  }
  
  // Generate template for each SIG
  for (const [id, group] of Object.entries(specialInterestGroups.activeSIGs)) {
    // Skip template generation for external URLs
    if (group.externalUrl) {
      console.log(`Skipping template generation for external SIG: ${group.name}`);
      continue;
    }
    
    const slug = normalizeSlug(id);
    
    // Main content template (goes in the new location)
    const mainContent = `{% extends "sig_base.html.njk" %}
{% set sig_id = "${id}" %}
{% set name = specialInterestGroups.activeSIGs[sig_id].name %}
{% set logo = specialInterestGroups.activeSIGs[sig_id].logo %}
{% set logoImage = specialInterestGroups.activeSIGs[sig_id].logoImage %}
{% set logoSize = specialInterestGroups.activeSIGs[sig_id].logoSize %}
{% set title = specialInterestGroups.activeSIGs[sig_id].title %}
{% set scope = specialInterestGroups.activeSIGs[sig_id].scope %}
{% set shortform = specialInterestGroups.activeSIGs[sig_id].shortform %}
{% set charters = specialInterestGroups.activeSIGs[sig_id].charters %}
{% set projects = specialInterestGroups.activeSIGs[sig_id].projects %}
{% set chairs = specialInterestGroups.activeSIGs[sig_id].chairs %}
{% set type = specialInterestGroups.activeSIGs[sig_id].type %}
{% set meeting = specialInterestGroups.activeSIGs[sig_id].meeting %}`;

    // Redirect template (goes in the old location)
    const redirectContent = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Redirecting...</title>
    <meta http-equiv="refresh" content="0; URL=/special-interest-groups/${slug}.html">
    <link rel="canonical" href="/special-interest-groups/${slug}.html">
  </head>
  <body>
    <p>Redirecting to <a href="/special-interest-groups/${slug}.html">/special-interest-groups/${slug}.html</a>...</p>
  </body>
</html>`;
    
    // Write main content at new location
    fs.writeFileSync(path.join(templateDir, `${slug}.html.njk`), mainContent);
    
    // If group has a custom URL, write redirect at old location
    if (group.url && group.url !== `/special-interest-groups/${slug}.html`) {
      const relativePath = group.url.replace(/^\//, '');
      // Prevent overwriting root index
      if (relativePath === 'index.html' || relativePath === '') {
        console.warn(`Skipping redirect generation for root path: ${group.url}`);
        continue;
      }
      
      const oldPath = path.join('templates/pages', relativePath);
      const dirPath = oldPath.endsWith('.html') ? 
        path.dirname(oldPath) : 
        oldPath;
      
      const fullPath = path.join(dirPath, 'index.html.njk');
      
      // Extra check to prevent overwriting root index
      if (fullPath === 'templates/pages/index.html.njk') {
        console.warn('Attempted to overwrite root index.html.njk, skipping...');
        continue;
      }
      
      fs.mkdirSync(path.dirname(fullPath), { recursive: true });
      fs.writeFileSync(fullPath, redirectContent);
      
      console.log(`Created redirect at ${fullPath}`);
    }
    
    console.log(`Generated template for ${group.name}`);
  }
  
  done();
});

// Add Jekyll config generation
gulp.task("generate-jekyll-config", function(done) {
  const jekyllConfig = `
plugins:
  - jekyll-redirect-from

# Keep files from being cleaned by Jekyll
keep_files: [js, css, images, assets]

# Handle redirects
redirect_from:
  # Add any additional redirects here if needed
`;
  
  fs.writeFileSync('docs/_config.yml', jekyllConfig);
  console.log('Generated Jekyll config');
  done();
});

gulp.task('clean', function(cb) {
  return rimraf('docs/**/*', { preserveRoot: true }).then(() => cb());
});

// Update generate-ug-templates task with the same approach
gulp.task("generate-ug-templates", function(done) {
  const templateDir = './templates/pages/user-groups';
  
  // Create the directory if it doesn't exist
  if (!fs.existsSync(templateDir)) {
    fs.mkdirSync(templateDir, { recursive: true });
  }
  
  // Generate template for each user group
  for (const [id, group] of Object.entries(userGroups.activeUserGroups)) {
    const slug = normalizeSlug(id);
    
    // Main content template
    const mainContent = `{% extends "ug_base.html.njk" %}
{% set ug_id = "${id}" %}
{% set name = userGroups.activeUserGroups[ug_id].name %}
{% set logo = userGroups.activeUserGroups[ug_id].logo %}
{% set title = userGroups.activeUserGroups[ug_id].title %}
{% set scope = userGroups.activeUserGroups[ug_id].scope %}
{% set shortform = userGroups.activeUserGroups[ug_id].shortform %}
{% set charters = userGroups.activeUserGroups[ug_id].charters %}
{% set type = userGroups.activeUserGroups[ug_id].type %}
{% set meeting = userGroups.activeUserGroups[ug_id].meeting %}`;

    // HTML redirect template
    const redirectContent = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Redirecting...</title>
    <meta http-equiv="refresh" content="0; URL=/user-groups/${slug}.html">
    <link rel="canonical" href="/user-groups/${slug}.html">
  </head>
  <body>
    <p>Redirecting to <a href="/user-groups/${slug}.html">/user-groups/${slug}.html</a>...</p>
  </body>
</html>`;
    
    // Write main content at new location
    fs.writeFileSync(path.join(templateDir, `${slug}.html.njk`), mainContent);
    
    // If group has a custom URL, write redirect at old location
    if (group.url && group.url !== `/user-groups/${slug}.html`) {
      const relativePath = group.url.replace(/^\//, '');
      // Prevent overwriting root index
      if (relativePath === 'index.html' || relativePath === '') {
        console.warn(`Skipping redirect generation for root path: ${group.url}`);
        continue;
      }
      
      const oldPath = path.join('templates/pages', relativePath);
      const fullPath = oldPath.endsWith('.html') ? 
        oldPath : 
        path.join(path.dirname(oldPath), 'index.html.njk');
      
      // Extra check to prevent overwriting root index
      if (fullPath === 'templates/pages/index.html.njk') {
        console.warn('Attempted to overwrite root index.html.njk, skipping...');
        continue;
      }
      
      fs.mkdirSync(path.dirname(fullPath), { recursive: true });
      fs.writeFileSync(fullPath, redirectContent);
    }
    
    console.log(`Generated template for ${group.name} User Group`);
  }
  
  done();
});

// Then define the build task
gulp.task(
  "build",
  gulp.series(
    "clean",
    "generate-wg-templates",
    "generate-sig-templates",
    "generate-ug-templates",
    "generate-jekyll-config",
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
