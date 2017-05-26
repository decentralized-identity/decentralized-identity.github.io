

(function(){

  var titles = {
    '/': 'Home',
    '/wg': 'Working Groups',
    '/membership': 'Membership'
  };

  window.routeUpdate = function routeUpdate(href, push) {
    var title = titles[location.pathname];
    document.title = 'DIF - ' + title;
    if (push !== false) {
      history.pushState(null, 'DIF - ' + title, href);
      ga('send', 'pageview', location.pathname);
    }
    document.body.setAttribute('path', location.pathname);   
  }
  
  var redirect = sessionStorage.redirect;
  delete sessionStorage.redirect;
  if (redirect && redirect != location.href) {
    history.replaceState(null, null, redirect);
    routeUpdate(redirect, false);
    // REMOVE THIS - just showing the redirect route in the UI
    document.documentElement.setAttribute('message', 'This page was redirected by 404.html, from the route: ' + redirect);
  }
  else {
    // REMOVE THIS - just showing the redirect route in the UI
    document.documentElement.setAttribute('message', 'This page was loaded directly from the index.html file');
  }

})();