(function(){
  
  var redirect = sessionStorage.redirect;
  delete sessionStorage.redirect;
  if (redirect && redirect != location.href) {
    history.replaceState(null, null, redirect);
    // REMOVE THIS - just showing the redirect route in the UI
    document.documentElement.setAttribute('message', 'This page was redirected by 404.html, from the route: ' + redirect);
  }
  else {
    // REMOVE THIS - just showing the redirect route in the UI
    document.documentElement.setAttribute('message', 'This page was loaded directly from the index.html file');
  }

})();