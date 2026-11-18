# DIF Website Development Guide

Technical documentation for developers working on the DIF website.

## Technology Stack

- **Static Site Generator**: Custom Gulp-based build
- **Templating**: [Nunjucks](https://mozilla.github.io/nunjucks/)
- **Hosting**: GitHub Pages (serves `/docs` directory)
- **CSS Framework**: Bootstrap 4

## Project Structure

```
decentralized-identity.github.io/
├── config/                          # JavaScript config files
│   ├── working-groups.js            # WG definitions
│   ├── special-interest-groups.js   # SIG definitions
│   └── user-groups.js               # UG definitions
│
├── templates/
│   ├── base.html                    # Legacy base template
│   ├── default.html.njk             # Main base template
│   ├── group_base.html.njk          # Base for WG/SIG/UG pages
│   │
│   ├── partials/                    # Reusable components
│   │   ├── head.html.njk            # <head> section
│   │   ├── nav.html.njk             # Navigation
│   │   ├── footer.html.njk          # Footer
│   │   ├── chairs.html.njk          # Chair cards
│   │   ├── projects.html.njk        # Project listings
│   │   ├── group-card.html.njk      # Group preview card
│   │   ├── group-details-card.html.njk
│   │   └── ...
│   │
│   └── pages/                       # Page templates
│       ├── index.html.njk           # Homepage
│       ├── join/
│       ├── events/
│       ├── education/
│       ├── schemas/
│       ├── working-groups/          # WG pages (auto-generated)
│       ├── special-interest-groups/ # SIG pages (auto-generated)
│       └── user-groups/             # UG pages (auto-generated)
│
├── assets/
│   ├── css/
│   ├── js/
│   │   ├── base.js                  # Compiled JS bundle
│   │   ├── index.js                 # Homepage scripts
│   │   └── ...
│   ├── images/
│   │   ├── logos/                   # Member company logos
│   │   ├── photos/                  # People photos
│   │   └── icons.svg                # SVG icon sprite
│   └── plugins/
│       └── bootstrap/
│
├── docs/                            # Generated output (DO NOT EDIT)
├── static/docs/                     # Static PDF documents
│
├── gulpfile.js                      # Build configuration
├── package.json
└── CNAME                            # Custom domain config
```

## Gulp Build Tasks

### Main Tasks

| Task | Description |
|------|-------------|
| `build` | Full site build (clean + generate + compile) |
| `watch` | Watch for changes and auto-rebuild |
| `clean` | Remove all files from `/docs` |

### Sub-Tasks

| Task | Description |
|------|-------------|
| `generate-wg-templates` | Generate WG page templates from config |
| `generate-sig-templates` | Generate SIG page templates from config |
| `generate-ug-templates` | Generate UG page templates from config |
| `repoCompilation` | Fetch repo data from GitHub API |
| `templates` | Render Nunjucks templates to HTML |
| `assets` | Compile/minify JS bundle |
| `assetsCopy` | Copy static assets to `/docs` |

### Build Order

```
clean
  └── generate-wg-templates
      └── generate-sig-templates
          └── generate-ug-templates
              └── repoCompilation
                  └── [parallel]
                      ├── assets
                      ├── assetsCopy
                      └── templates
```

## Template System

### Base Templates

**`default.html.njk`** - Main page layout:
- Includes head, nav, footer partials
- Provides `content` and `scripts` blocks

**`group_base.html.njk`** - WG/SIG/UG page layout:
- Extends `default.html.njk`
- Includes group-specific partials (details, projects, chairs)
- Expects variables: `name`, `logo`, `type`, `scope`, etc.

### Auto-Generated Templates

Group pages are generated at build time from config files. The generated templates look like:

```nunjucks
{% extends "group_base.html.njk" %}
{% set wg_id = "claims-credentials" %}
{% set name = workingGroups.activeWorkingGroups["claims-credentials"].name %}
{% set logo = workingGroups.activeWorkingGroups["claims-credentials"].logo %}
...
```

**Do not manually edit files in:**
- `templates/pages/working-groups/*.html.njk`
- `templates/pages/special-interest-groups/*.html.njk`
- `templates/pages/user-groups/*.html.njk`

Edit the config files instead.

### Template Data

The `templates` task passes these data objects to Nunjucks:

```javascript
{
  repos: compiledRepos,           // GitHub repo data by topic
  workingGroups: workingGroups,   // From config/working-groups.js
  specialInterestGroups: specialInterestGroups,
  userGroups: userGroups,
  navigation: {
    activeWorkingGroups: [...],   // Sorted nav items
    activeSpecialInterestGroups: [...],
    activeUserGroups: [...]
  }
}
```

## GitHub Repository Integration

### How It Works

1. Repos in the `decentralized-identity` org are fetched via GitHub API
2. Repos are filtered by topic tags (e.g., `wg-cc`, `wg-didcomm`)
3. Matching repos appear on the corresponding group page

### Adding Repos to a Group

1. Add the topic tag to your repo on GitHub
2. The tag must match the `repoTag` in the group's config

Example: For Claims & Credentials WG (`repoTag: "wg-cc"`), tag repos with `wg-cc`

### Rate Limits

The build fetches repos via unauthenticated GitHub API:
- 60 requests/hour limit
- Pagination handles orgs with 100+ repos

## SVG Icons

Icons are stored in `assets/images/icons.svg` as a sprite sheet.

### Usage in Templates

```html
<svg><use xlink:href="/images/icons.svg#icon-name"></use></svg>
```

### Available Icons

View all icons by opening `assets/images/icons.svg` in a browser, or check the `<symbol>` elements in the file.

Common icons:
- `validate_user`, `blueprint`, `communicate_user`
- `user_graph`, `crypto`, `flask`, `box`
- `key`, `wallet`, `network`, `signature`

## Adding New Pages

1. Create `templates/pages/your-page/index.html` or `templates/pages/your-page.html.njk`

2. Extend the base template:

```nunjucks
{% extends "default.html.njk" %}

{% block content %}
  <section class="page-title theme-bg">
    <div class="container">
      <h1>Page Title</h1>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <!-- Your content -->
    </div>
  </section>
{% endblock %}

{% block scripts %}
{{ super() }}
<script src="/js/your-page.js"></script>
{% endblock %}
```

3. Update `gulpfile.js` if needed (for new directories with special handling)

## CSS Classes

### Layout Classes

- `.section` - Standard section padding
- `.gray-bg` - Gray background section
- `.theme-bg` - Blue theme background
- `.page-title` - Page header section

### Grid

Bootstrap 4 grid system:
- `.container` - Centered container
- `.row` - Flex row
- `.col-*` - Column sizing

### Components

- `.member-list` - Logo grid
- `.feature-box-01` - Icon + text feature
- `.section-title` - Section headers with border

## Deployment

### Automatic (GitHub Pages)

Push to `master` branch:
```bash
git push origin master
```

GitHub Pages serves the `/docs` directory automatically.

### Manual Build

If you need to build without pushing:
```bash
npm run build
```

Then commit the updated `/docs` directory.

## Troubleshooting

### "Template not found" Error

- Check file extension (`.html.njk` vs `.html`)
- Verify path in `gulpfile.js` template task

### "Cannot read property of undefined"

- Check config file syntax (commas, quotes)
- Verify the group ID matches between config and template

### Styles Not Updating

- Clear browser cache
- Run `gulp clean && npm run build`

### GitHub Repos Not Appearing

- Verify topic tags on GitHub repos
- Check `repoTag` matches in config
- GitHub API may be rate-limited (wait 1 hour)

### Build Hangs

- May be waiting for GitHub API
- Check network connectivity
- Try running with `DEBUG=* npm run build`
