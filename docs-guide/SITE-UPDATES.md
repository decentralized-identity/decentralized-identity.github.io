# DIF Website Update Guide

This guide explains how to update the DIF website for common tasks.

## Table of Contents

- [Adding Associate Member Logos](#adding-associate-member-logos)
- [Adding Contributors](#adding-contributors)
- [Working Groups (WGs)](#working-groups)
- [Special Interest Groups (SIGs)](#special-interest-groups)
- [User Groups (UGs)](#user-groups)
- [Build and Deploy](#build-and-deploy)

---

## Adding Associate Member Logos

Associate members have their logos displayed on the homepage. Contributors do
not get logos (see [Adding Contributors](#adding-contributors)).

### Steps

1. **Add the logo file** to `assets/images/logos/`

   - Preferred formats: PNG, SVG
   - Recommended size: ~200px width, transparent background
   - Use lowercase, hyphenated names (e.g., `company-name.png`)

2. **Edit the homepage template** at `templates/pages/index.html.njk`

   Find the `<div class="member-list">` section (around line 182) and add a new
   entry:

   ```html
   <a href="https://company-website.com"
     ><img
       alt="Company Name"
       title="Company Name"
       src="/images/logos/company-name.png"
   /></a>
   ```

3. **Build and test locally** before pushing:
   ```bash
   npm run build
   npx serve docs
   ```

### Logo Guidelines

- Include `alt` and `title` attributes for accessibility
- Link to the company's main website

---

## Adding Contributors

Contributors (free tier members) are listed by name only, not with logos.

### Steps

1. **Edit the homepage template** at `templates/pages/index.html.njk`

2. Find the Contributors section (around line 372-777), which contains a
   comma-separated list of company names inside a `<p>` tag.

3. **Add the new contributor name** in alphabetical order:

   ```html
   Company A, Company B, NEW COMPANY NAME, Company C,
   ```

4. **Build and test locally** before pushing.

### Notes

- Contributors are plain text, not linked
- Maintain alphabetical order for easier maintenance
- Remove companies when they are no longer contributors

---

## Working Groups

Working Groups are DIF's primary technical groups that produce specifications
under IPR protection.

### Configuration File

Edit `config/working-groups.js`

### Adding a New Working Group

1. Add an entry to `activeWorkingGroups`:

```javascript
"group-slug": {
  name: "Group Display Name",
  logo: "icon_name",           // SVG icon from /images/icons.svg
  title: "Full Group Title",
  type: "wg",
  shortform: "Abbreviation",   // Optional, e.g., "CC WG"
  repoTag: "wg-xyz",           // GitHub topic tag for repo filtering
  scope: "Description of the group's purpose and focus...",
  meetingSchedule: [
    {
      key: "Meeting Type",     // Optional label
      value: "Occurs every week on Monday at 18:00:00 UTC"
    }
  ],
  discussionChannels: [
    {
      text: "Mailing list",
      href: "https://lists.identity.foundation/g/group-name"
    },
    {
      key: "Slack",            // For non-linked items
      value: "#channel-name"
    }
  ],
  charters: {
    "WG documentation": {
      links: [
        {
          text: "WG Charter",
          href: "https://github.com/decentralized-identity/org/..."
        }
      ]
    }
  },
  projects: {
    "Project Name": {
      desc: "Project description...",
      links: [
        {
          text: "Specification",
          type: "doc",         // Optional: "doc" or "app"
          href: "https://..."
        }
      ]
    }
  },
  chairs: {
    "Chair Name": {
      title: "Role @ Company",
      photo: "/images/photos/chair-name.jpg",
      linkedin: "linkedin-username",
      twitter: "twitter-handle",   // Optional
      bluesky: "handle.bsky.social" // Optional
    }
  },
  url: "/working-groups/group-slug.html"
}
```

2. **Add chair photos** to `assets/images/photos/`

3. **Tag GitHub repositories** with the `repoTag` value (e.g., `wg-xyz`) to have
   them appear on the group page.

4. **Run the build** - templates are auto-generated:
   ```bash
   npm run build
   ```

### Archiving a Working Group

Move the group entry from `activeWorkingGroups` to `archivedWorkingGroups`.

### Available Icons

Common icon names for the `logo` field:

- `validate_user` - Checkmark with user
- `blueprint` - Document/spec
- `communicate_user` - Speech bubbles
- `user_graph` - Network/connections
- `crypto` - Lock/security
- `flask` - Labs/experimental
- `box` - Storage
- `key` - Keys/authentication
- `wallet` - Wallet
- `network` - Network diagram
- `signature` - Signing
- `ai-agent` - AI/Agent

---

## Special Interest Groups

SIGs focus on regional coordination and industry verticals. They are open,
non-IPR protected groups.

### Configuration File

Edit `config/special-interest-groups.js`

### Adding a New SIG

1. Add an entry to `activeSIGs`:

```javascript
"sig-slug": {
  name: "SIG Display Name",
  logo: "biz_discussion",      // Icon name
  shortform: null,             // Optional abbreviation
  status: "active",
  url: "/special-interest-groups/sig-slug",
  scope: "Description of SIG focus...",
  type: "sig",
  meetingSchedule: [
    {
      key: "",
      value: "Occurs every month on Wednesday at 11:00:00 UTC"
    }
  ],
  discussionChannels: [
    {
      text: "Discord: #channel-name",
      href: "https://discord.gg/invite-code"
    },
    {
      text: "Mailing List",
      href: "https://lists.identity.foundation/g/sig-name"
    }
  ],
  charters: {
    "SIG Documentation": {
      links: [
        {
          text: "Group Charter",
          href: "https://github.com/decentralized-identity/SIG-Name/..."
        }
      ]
    }
  },
  chairs: {
    "Chair Name": {
      title: "Role @ Company",     // Optional
      photo: "/images/photos/chair-name.jpg",
      linkedin: "linkedin-username"
    }
  }
}
```

2. **Add chair photos** to `assets/images/photos/`

3. **Run the build**:
   ```bash
   npm run build
   ```

### External SIGs

For SIGs hosted externally (e.g., on Notion), use `externalUrl`:

```javascript
"external-sig": {
  name: "External SIG Name",
  type: "sig",
  externalUrl: "https://www.notion.so/dif/..."
}
```

### Archiving a SIG

Move the entry from `activeSIGs` to `archivedSIGs`.

---

## User Groups

User Groups provide forums for implementers of specific DIF technologies. They
are open, non-IPR groups.

### Configuration File

Edit `config/user-groups.js`

### Adding a New User Group

1. Add an entry to `activeUserGroups`:

```javascript
"group-slug": {
  name: "Group Name",
  logo: "validate_user",
  shortform: null,
  status: "active",
  repoTag: "group-tag",        // For GitHub repo filtering
  url: "/user-groups/group-slug",
  scope: "Description of the user group's purpose...",
  type: "ug",
  meetingSchedule: [
    {
      key: "EU Timezone",
      value: "Occurs every month on second Thursday at 13:00:00 UTC"
    }
  ],
  discussionChannels: [
    {
      text: "Discord",
      href: "https://discord.gg/invite-code"
    }
  ],
  charters: {
    "User Group documentation": {
      links: [
        {
          text: "Charter",
          href: "https://github.com/decentralized-identity/group-repo/..."
        }
      ]
    }
  },
  chairs: {
    "Chair Name": {
      title: "Role @ Company",
      photo: "/images/photos/chair-name.jpeg",
      linkedin: "linkedin-username"
    }
  }
}
```

2. **Add chair photos** to `assets/images/photos/`

3. **Run the build**:
   ```bash
   npm run build
   ```

### Archiving a User Group

Move the entry from `activeUserGroups` to `archivedUserGroups`.

---

## Build and Deploy

### Local Development

```bash
# Install dependencies (first time only)
npm install

# Build the site
npm run build

# Serve locally
npx serve docs

# Auto-rebuild on changes
gulp watch
```

### Build Process

The build (`npm run build`) runs these gulp tasks in sequence:

1. `clean` - Removes old files from `/docs`
2. `generate-wg-templates` - Creates WG page templates from config
3. `generate-sig-templates` - Creates SIG page templates from config
4. `generate-ug-templates` - Creates UG page templates from config
5. `repoCompilation` - Fetches repo data from GitHub API
6. `assets` - Compiles and minifies JavaScript
7. `assetsCopy` - Copies static assets to `/docs`
8. `templates` - Renders Nunjucks templates to HTML

### Deployment

The site is deployed via GitHub Pages.

For minor changes, push to the `master` branch to deploy:

```bash
git add .
git commit -m "Description of changes"
git push origin master
```

For non-trivial changes, create a new branch and submit a PR for review (using
standard git techniques)

The `/docs` directory is served automatically by GitHub Pages.

### Troubleshooting

**Build errors**: Check for syntax errors in config files (missing commas,
quotes, etc.)

**Missing group page**: Ensure the group has a valid `url` field and no
`externalUrl` set

**Repos not showing**: Verify GitHub repos are tagged with the correct topic
(e.g., `wg-cc`)

**Images not appearing**: Check file paths are correct and files exist in
`assets/images/`
