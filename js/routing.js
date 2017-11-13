/* global ga */
(function() {
  var titles = {
    '/': 'Decentralized Identity Foundation',
    '/working-groups': 'Working Groups',
    '/membership': 'Membership'
  };
  var state = {
    previous: 0,
    current: 0
  };

  var routeUpdate = window.routeUpdate = function routeUpdate(pathname, push) {
    if (!pathname) {
      throw new Error('Must pass a pathname as the first parameter to `routeUpdate`');
    }
    pathname = pathname.replace(/.html$/, '');
    var title = 'DIF - ' + (titles[pathname] || titles['/']);
    document.title = title;
    if (push !== false) {
      historyPush(title, pathname);
    }
    if (push === false) {
      historyReplace(title, pathname);
    }
    document.body.setAttribute('path', location.pathname);
  };

  function historyPush(title, pathname) {
    window.scrollTo(0, 0);  // Ignore `history.scrollRestoration`.
    state = {
      previous: state.current,
      current: state.current + 1
    };
    history.pushState({sequence: state}, null, pathname);
    if ('ga' in window) {
      ga('set', {
        page: location.pathname,
        title: title
      });
      ga('send', 'pageview');
    }
  }

  function historyReplace(title, pathname) {
    history.replaceState({sequence: state}, null, pathname);
    if ('ga' in window) {
      ga('set', {
        page: location.pathname,
        title: title
      });
      ga('send', 'pageview');
    }
  }

  function handleNavBack() {
    return routeUpdate(location.pathname, false);
  }

  function handleNavForward() {
    return routeUpdate(location.pathname, false);
  }

  function handleNav() {
    var to = history.state ? history.state.sequence : false;
    var from = state;
    if (!to || from.previous === to.current) {
      handleNavBack();
    }
    if (from.current === to.previous) {
      handleNavForward();
    }
    state = to;
  }

  var redirect = null;
  try {
    redirect = window.sessionStorage.redirect;
    delete window.sessionStorage.redirect;
  } catch (err) {
  }
  if (redirect && redirect !== location.href) {
    routeUpdate(redirect, false);
    // REMOVE THIS - just showing the redirect route in the UI
    document.documentElement.setAttribute('message', 'This page was redirected by 404.html, from the route: ' + redirect);
  }
  else {
    routeUpdate(location.pathname, true);
    // REMOVE THIS - just showing the redirect route in the UI
    document.documentElement.setAttribute('message', 'This page was loaded directly from the index.html file');
  }

  window.onpopstate = function() {
    handleNav();
  };
})();
