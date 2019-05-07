# The DIF Website

Code for DIF main site, located at: https://identity.foundation

### Development and Contribution

If you're interested in making a commit to the site, or are forking the repo to use it for something else, the following will provide an overview of how to get started, build the site, and run it.

#### Structure and Approach

The site was intended to be as easy as possible for folks to extend and contribute to, so we selected a simple approach that requires as little experience with frameworks and build configurations:

- The site was designed to run on GitHub Pages, to maximize ease of deployment. You can deploy as you would any GH Pages site: push a change to master.
- The site is a series of (mostly) static pages that are generated via a build script
- The pages are coded with the aid of the Nunjucks templating library, the docs of which are here: https://mozilla.github.io/nunjucks/

#### Adding Pages

1. If you want to add a page, create an HTML file in the `/templates/pages` directory.
2. Next, use the following block that inherits from the base page template, as so:

```
{% extends "base.html" %}

{% block content %}
  // YOUR CONTENT HERE
{% endblock %}

{% block scripts %}
  // PAGE-SPECIFIC SCRIPTS HERE
{% endblock %}
```
#### Modifying Templates/Parials

The site's base file is composed of a handful of page skeletons and partial templates that are shared across all pages. Each pertains to a given part of the base template (i.e. head, nav, footer, etc.), and editing them will change their content across all pages that include them. The partial templates can be found the directory `/templates`.

#### Building and running the site

1. Run `npm install`, to setup dependencies.
2. Run `gulp watch`, which will compile changes every time you save a file and output the completed static pages.
3. Run `serve`, assuming you've install the npm `serve` package globally (if not, do that). This will start a server that allows you to view the site via a `localhost` port.


