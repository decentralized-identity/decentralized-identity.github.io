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
for (const [id, group] of Object.entries(workingGroups.activeWorkingGroups)) {
  const slug = normalizeSlug(id);
  structure["working-groups"].push(`${slug}.html`);
}
for (const [id, group] of Object.entries(workingGroups.archivedWorkingGroups)) {
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
for (const [id, group] of Object.entries(workingGroups.activeWorkingGroups)) {
  if (group.repoTag) {
    repoTopics[group.repoTag] = 1;
  }
}
for (const [id, group] of Object.entries(workingGroups.archivedWorkingGroups)) {
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

// Update templates task to include SIG data
gulp.task("templates", async () => {
  // Create working group navigation data structure
  const activeWGs = Object.entries(workingGroups.activeWorkingGroups).map(([id, group]) => ({
    id,
    name: group.name,
    slug: normalizeSlug(id),
    url: group.url || `/working-groups/${normalizeSlug(id)}.html`
  }));

  const archivedWGs = Object.entries(workingGroups.archivedWorkingGroups).map(([id, group]) => ({
    id,
    name: group.name,
    slug: normalizeSlug(id),
    url: group.url || `/working-groups/${normalizeSlug(id)}.html`
  }));
  
  // Sort alphabetically
  activeWGs.sort((a, b) => a.name.localeCompare(b.name));
  archivedWGs.sort((a, b) => a.name.localeCompare(b.name));
  
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
  const templateDir = './templates/pages/working-groups';
  
  if (!fs.existsSync(templateDir)) {
    fs.mkdirSync(templateDir, { recursive: true });
  }

  // Generate index page for working groups
  const indexContent = `{% extends "default.html.njk" %}
{% set title = "Working Groups" %}

{% block content %}
<section class="page-title theme-bg">
  <div class="container">
    <h1>Working Groups</h1>
  </div>
</section>

<section>
  <div class="container">
    <h2>Active Working Groups</h2>
    <div class="row">
      {% for wg in navigation.activeWorkingGroups %}
        <div class="col-md-6 mb-4">
          <div class="card h-100">
            <div class="card-body">
              <h3 class="card-title h4">{{ wg.name }}</h3>
              <p class="card-text">{{ workingGroups.activeWorkingGroups[wg.id].scope | truncate(150) }}</p>
              <a href="{{ wg.url }}" class="btn btn-primary">Learn More</a>
            </div>
          </div>
        </div>
      {% endfor %}
    </div>

    {% if navigation.archivedWorkingGroups.length > 0 %}
      <h2 class="mt-5">Completed or Archived Working Groups</h2>
      <div class="row">
        {% for wg in navigation.archivedWorkingGroups %}
          <div class="col-md-6 mb-4">
            <div class="card h-100">
              <div class="card-body">
                <h3 class="card-title h4">{{ wg.name }}</h3>
                <p class="card-text">{{ workingGroups.archivedWorkingGroups[wg.id].scope | truncate(150) }}</p>
                <a href="{{ wg.url }}" class="btn btn-primary">Learn More</a>
              </div>
            </div>
          </div>
        {% endfor %}
      </div>
    {% endif %}
  </div>
</section>
{% endblock %}`;

  fs.writeFileSync(path.join(templateDir, 'index.html.njk'), indexContent);

  // Generate templates for active working groups
  for (const [id, group] of Object.entries(workingGroups.activeWorkingGroups)) {
    if (group.externalUrl) {
      console.log(`Skipping template generation for external working group: ${group.name}`);
      continue;
    }

    const slug = normalizeSlug(id);
    const mainContent = `{% extends "wg_base.html.njk" %}
{% set wg_id = "${id}" %}
{% set name = workingGroups.activeWorkingGroups["${id}"].name %}
{% set logo = workingGroups.activeWorkingGroups["${id}"].logo %}
{% set title = workingGroups.activeWorkingGroups["${id}"].title %}
{% set scope = workingGroups.activeWorkingGroups["${id}"].scope %}
{% set shortform = workingGroups.activeWorkingGroups["${id}"].shortform %}
{% set charters = workingGroups.activeWorkingGroups["${id}"].charters %}
{% set projects = workingGroups.activeWorkingGroups["${id}"].projects %}
{% set chairs = workingGroups.activeWorkingGroups["${id}"].chairs %}
{% set liaison = workingGroups.activeWorkingGroups["${id}"].liaison %}
{% set editors = workingGroups.activeWorkingGroups["${id}"].editors %}
{% set type = workingGroups.activeWorkingGroups["${id}"].type %}`;

    fs.writeFileSync(path.join(templateDir, `${slug}.html.njk`), mainContent);
  }

  // Generate templates for archived working groups
  for (const [id, group] of Object.entries(workingGroups.archivedWorkingGroups)) {
    if (group.externalUrl) {
      console.log(`Skipping template generation for external archived working group: ${group.name}`);
      continue;
    }

    const slug = normalizeSlug(id);
    const mainContent = `{% extends "wg_base.html.njk" %}
{% set wg_id = "${id}" %}
{% set name = workingGroups.archivedWorkingGroups["${id}"].name %}
{% set logo = workingGroups.archivedWorkingGroups["${id}"].logo %}
{% set title = workingGroups.archivedWorkingGroups["${id}"].title %}
{% set scope = workingGroups.archivedWorkingGroups["${id}"].scope %}
{% set shortform = workingGroups.archivedWorkingGroups["${id}"].shortform %}
{% set charters = workingGroups.archivedWorkingGroups["${id}"].charters %}
{% set projects = workingGroups.archivedWorkingGroups["${id}"].projects %}
{% set chairs = workingGroups.archivedWorkingGroups["${id}"].chairs %}
{% set type = workingGroups.archivedWorkingGroups["${id}"].type %}`;

    fs.writeFileSync(path.join(templateDir, `${slug}.html.njk`), mainContent);
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

// Add to your existing gulp tasks
gulp.task("generate-work-overview", function(done) {
  const templateDir = './templates/pages/work';
  
  if (!fs.existsSync(templateDir)) {
    fs.mkdirSync(templateDir, { recursive: true });
  }
  
  // The template content is already defined in work/index.html.njk
  
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
    "generate-work-overview",
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

// Update the navigation data generation
function generateNavigationData() {
  return {
    activeWorkingGroups: Object.entries(workingGroups.activeWorkingGroups).map(([id, wg]) => ({
      id,
      name: wg.name,
      url: wg.url || `/working-groups/${id}.html`,
      isExternal: !!wg.externalUrl
    })),
    archivedWorkingGroups: Object.entries(workingGroups.archivedWorkingGroups).map(([id, wg]) => ({
      id,
      name: wg.name,
      url: wg.url || `/working-groups/${id}.html`,
      isExternal: !!wg.externalUrl
    })),
    // Keep existing SIG and User Group mappings
    activeSpecialInterestGroups: Object.entries(specialInterestGroups.activeSIGs).map(([id, sig]) => ({
      id,
      name: sig.name,
      url: sig.url || `/special-interest-groups/${id}.html`,
      isExternal: !!sig.externalUrl
    })),
    archivedSpecialInterestGroups: Object.entries(specialInterestGroups.archivedSIGs).map(([id, sig]) => ({
      id,
      name: sig.name,
      url: sig.url || `/special-interest-groups/${id}.html`,
      isExternal: !!sig.externalUrl
    })),
    activeUserGroups: Object.entries(userGroups.activeUserGroups).map(([id, ug]) => ({
      id,
      name: ug.name,
      url: ug.url || `/user-groups/${id}.html`,
      isExternal: !!ug.externalUrl
    })),
    archivedUserGroups: Object.entries(userGroups.archivedUserGroups).map(([id, ug]) => ({
      id,
      name: ug.name,
      url: ug.url || `/user-groups/${id}.html`,
      isExternal: !!ug.externalUrl
    }))
  };
}
