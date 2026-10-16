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

// Add SIG pages to structure
for (const [id, group] of Object.entries(specialInterestGroups.archivedSIGs)) {
  const slug = normalizeSlug(id);
  structure["special-interest-groups"].push(`${slug}.html`);
}

// Add user group pages to structure
for (const [id, group] of Object.entries(userGroups.activeUserGroups)) {
  const slug = normalizeSlug(id);
  structure["user-groups"].push(`${slug}.html`);
}

// Add user group pages to structure
for (const [id, group] of Object.entries(userGroups.archivedUserGroups)) {
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

for (const [id, group] of Object.entries(userGroups.activeUserGroups)) {
  if (group.repoTag) {
    repoTopics[group.repoTag] = 1;
  }
}
for (const [id, group] of Object.entries(userGroups.archivedUserGroups)) {
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
    "assets/.*/**/*",
    "assets/favicon.ico",
    "assets/favicon.png",
    "static/docs/**/*",
    "CNAME",
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
            activeSpecialInterestGroups: activeSIGs,
            activeUserGroups: activeUGs
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

// Helper function to generate template variables
function generateTemplateVars(groupType, id, isArchived = false) {
  const status = isArchived ? 'archived' : 'active';
  const groupMap = {
    'wg': {
      prefix: 'wg',
      configKey: `${status === 'archived' ? 'archived' : 'active'}WorkingGroups`,
      configSource: 'workingGroups'
    },
    'sig': {
      prefix: 'sig',
      configKey: `${status === 'archived' ? 'archived' : 'active'}SIGs`,
      configSource: 'specialInterestGroups'
    },
    'ug': {
      prefix: 'ug',
      configKey: `${status === 'archived' ? 'archived' : 'active'}UserGroups`,
      configSource: 'userGroups'
    }
  };

  const group = groupMap[groupType];
  const commonFields = [
    'name', 'logo', 'title', 'scope', 'shortform', 
    'charters', 'projects', 'chairs', 'type', 'meetingSchedule', 'repoTag', 'discussionChannels'
  ];


  const fields = [...commonFields];
  
  return `{% extends "group_base.html.njk" %}
{% set ${group.prefix}_id = "${id}" %}
${fields.map(field => 
  `{% set ${field} = ${group.configSource}.${group.configKey}["${id}"].${field} %}`
).join('\n')}`;
}

// Update the template generation tasks
gulp.task("generate-wg-templates", function(done) {
  const templateDir = './templates/pages/working-groups';
  
  if (!fs.existsSync(templateDir)) {
    fs.mkdirSync(templateDir, { recursive: true });
  }

  // Generate templates for active working groups
  for (const [id, group] of Object.entries(workingGroups.activeWorkingGroups)) {
    if (group.externalUrl) {
      console.log(`Skipping template generation for external working group: ${group.name}`);
      continue;
    }

    const slug = normalizeSlug(id);
    const mainContent = generateTemplateVars('wg', id);
    fs.writeFileSync(path.join(templateDir, `${slug}.html.njk`), mainContent);
  }

  // Generate templates for archived working groups
  for (const [id, group] of Object.entries(workingGroups.archivedWorkingGroups)) {
    if (group.externalUrl) {
      console.log(`Skipping template generation for external archived working group: ${group.name}`);
      continue;
    }

    const slug = normalizeSlug(id);
    const mainContent = generateTemplateVars('wg', id, true);
    fs.writeFileSync(path.join(templateDir, `${slug}.html.njk`), mainContent);
  }

  done();
});

// Similar updates for SIG templates
gulp.task("generate-sig-templates", function(done) {
  const templateDir = './templates/pages/special-interest-groups';
  
  if (!fs.existsSync(templateDir)) {
    fs.mkdirSync(templateDir, { recursive: true });
  }
  
  for (const [id, group] of Object.entries(specialInterestGroups.activeSIGs)) {
    if (group.externalUrl) {
      console.log(`Skipping template generation for external SIG: ${group.name}`);
      continue;
    }
    
    const slug = normalizeSlug(id);
    const mainContent = generateTemplateVars('sig', id);
    fs.writeFileSync(path.join(templateDir, `${slug}.html.njk`), mainContent);
  }
  
  done();
});

// And for user group templates
gulp.task("generate-ug-templates", function(done) {
  const templateDir = './templates/pages/user-groups';
  
  if (!fs.existsSync(templateDir)) {
    fs.mkdirSync(templateDir, { recursive: true });
  }
  
  for (const [id, group] of Object.entries(userGroups.activeUserGroups)) {
    const slug = normalizeSlug(id);
    const mainContent = generateTemplateVars('ug', id);
    fs.writeFileSync(path.join(templateDir, `${slug}.html.njk`), mainContent);
  }
  
  done();
});


gulp.task('clean', function(cb) {
  return rimraf('docs/**/*', { preserveRoot: true }).then(() => cb());
});

// Then define the build task
gulp.task(
  "build",
  gulp.series(
    "clean",
    "generate-wg-templates",
    "generate-sig-templates",
    "generate-ug-templates",
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
