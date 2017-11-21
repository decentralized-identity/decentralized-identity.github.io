/* global ga */
(function() {
  var titles = {
    '/': 'Decentralized Identity Foundation',
    '/working-groups': 'Working Groups',
    '/membership': 'Membership'
  };
  try {
    localStorage.titles = JSON.stringify(titles);
  } catch (err) {
  }

  var state = {pathname: location.pathname};

  var routeUpdate = window.routeUpdate = function routeUpdate(pathname, push) {
    if (!pathname) {
      throw new Error('Must pass a pathname as the first parameter to `routeUpdate`');
    }
    pathname = pathname.replace(/.html$/, '');
    var title = 'DIF - ' + (titles[pathname] || titles['/']);
    document.title = title;
    if (push === true) {
      historyPush(title, pathname);
    } else if (push === false) {
      historyReplace(title, pathname);
    }
    document.body.setAttribute('path', location.pathname);
  };

  function historyPush(title, pathname) {
    window.scrollTo(0, 0);  // Ignore `history.scrollRestoration`.
    state = {pathname: pathname};
    history.pushState(state, null, pathname);
    gaSendPageview(title, location.pathname);
  }

  function historyReplace(title, pathname) {
    state = {pathname: pathname};
    history.replaceState(state, null, pathname);
    gaSendPageview(title, location.pathname);
  }

  function gaSendPageview(title, pathname) {
    if ('ga' in window) {
      ga('set', {
        page: pathname,
        title: title
      });
      ga('send', 'pageview');
    }
  }

  var redirect = null;
  try {
    redirect = window.sessionStorage.redirect;
    delete window.sessionStorage.redirect;
  } catch (err) {
  }
  if (redirect && redirect !== location.pathname) {
    routeUpdate(redirect, false);
    // REMOVE THIS - just showing the redirect route in the UI
    document.documentElement.setAttribute('message', 'This page was redirected by 404.html, from the route: ' + redirect);
  }
  else {
    // console.log(`[2] routeUpdate(pathname=${location.pathname}, push=true)`);
    // routeUpdate(location.pathname, true);
    // REMOVE THIS - just showing the redirect route in the UI
    document.documentElement.setAttribute('message', 'This page was loaded directly from the index.html file');
  }

  window.onpopstate = function(e) {
    if (e.state && e.state.pathname) {
      routeUpdate(e.state.pathname);
    }
  };

  routeUpdate(location.pathname, false);
})();
