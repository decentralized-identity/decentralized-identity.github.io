# The DIF Website

Code for DIF main site, located at: https://identity.foundation

## Quick Start

```bash
npm install          # Install dependencies
npm run build        # Build the site
npx serve docs       # Serve locally at http://localhost:3000
```

For development with auto-rebuild: `gulp watch`

## Documentation

- [Site Update Guide](docs-guide/SITE-UPDATES.md) - How to update members, contributors, and groups
- [Development Guide](docs-guide/DEVELOPMENT.md) - Technical details for developers

## Site Structure Overview

```
├── config/                    # Group configurations (WGs, SIGs, User Groups)
├── templates/
│   ├── pages/                 # Page templates
│   │   ├── index.html.njk     # Homepage (member logos, contributors)
│   │   ├── working-groups/    # WG page templates
│   │   ├── special-interest-groups/
│   │   └── user-groups/
│   └── partials/              # Reusable template components
├── assets/
│   └── images/
│       ├── logos/             # Member company logos
│       └── photos/            # Chair/person photos
├── docs/                      # Generated site (served via GitHub Pages)
└── gulpfile.js               # Build configuration
```

## Common Tasks

| Task | Where to Edit |
|------|---------------|
| Add Associate Member logo | `templates/pages/index.html.njk` + `assets/images/logos/` |
| Add Contributor name | `templates/pages/index.html.njk` |
| Add/Edit Working Group | `config/working-groups.js` |
| Add/Edit SIG | `config/special-interest-groups.js` |
| Add/Edit User Group | `config/user-groups.js` |

See [Site Update Guide](docs-guide/SITE-UPDATES.md) for detailed instructions.
