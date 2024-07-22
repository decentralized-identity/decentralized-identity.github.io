# The DIF Website

Code for DIF main site, located at: https://identity.foundation

### Development and Contribution

If you're interested in making a commit to the site, or are forking the repo to
use it for something else, the following will provide an overview of how to get
started, build the site, and run it.

#### Structure and Approach

The site was intended to be as easy as possible for folks to extend and
contribute to, so we selected a simple approach that requires as little
experience with frameworks and build configurations:

- The site was designed to run on GitHub Pages, to maximize ease of deployment.
  You can deploy as you would any GH Pages site: push a change to master.
- The site is a series of (mostly) static pages that are generated via a build
  script
- The pages are coded with the aid of the Nunjucks templating library, the docs
  of which are here: https://mozilla.github.io/nunjucks/

#### Adding Pages

1. If you want to add a page, create an HTML file in the `/templates/pages`
   directory.
2. Next, use the following block that inherits from the base page template, as
   so:

```
{% extends "base.html" %}

{% block content %}
  // YOUR CONTENT HERE
{% endblock %}

{% block scripts %}
  // PAGE-SPECIFIC SCRIPTS HERE
{% endblock %}
```

#### Modifying Templates/Partials

The site's base file is composed of a handful of page skeletons and partial
templates that are shared across all pages. Each pertains to a given part of the
base template (i.e. head, nav, footer, etc.), and editing them will change their
content across all pages that include them. The partial templates can be found
the directory `/templates`.

#### Including repos in Working Group pages

In order to include a list of active repos in your Working Group pages (see the
"All Repositories" section here for an example:
[DID Comms WG](https://identity.foundation/working-groups/did-comm.html)), you
need to add tags (e.g. `wg-<wg_name_here>`) in GitHub for all the repos you want
included in the list. After that, ensure the tag you used is included in Gulp
file list of tags the renderer uses to pull in content from:
[Gulp file tag list](https://github.com/decentralized-identity/decentralized-identity.github.io/blob/master/gulpfile.js#L48).

#### Rendered Files

Site content is rendered to the `/docs` directory, which is served via GH Pages.

#### Building and running the site

1. Run `npm install`, to setup dependencies.
2. Run `npm run build` to build the site
3. Run `gulp watch`, which will compile changes every time you save a file and
   output the completed static pages.
4. If you don't already have the NPM `serve` package installed, install it
   globally with `npm -g install serve`.
5. CD into the `/docs` directory (`cd docs`) and run the `npx serve` command.
   This will start a local server that allows you to view the site via a
   `localhost` port.
