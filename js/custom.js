
(function() {

  router = Object.assign({
    change: function(){},
    parse: function(){ return {} }
  }, window.router || {});

  var navFilter = function(event) {
    var match,
        target = event.target,
        root = event.currentTarget;
    while (!match && target && target != root) {
      if (target.tagName && target.matches('a[href]')) match = target;
      target = target.parentNode;
    }
    if (!match && root.tagName && root.matches('a[href]')) match = root;
    if (match && match.href.match(router.filter)) {
      event.preventDefault();
      routeUpdate(new URL(match.href).pathname, true);
    }
  }

  window.onpopstate = router.change;
  if (router.filter) {
    document.addEventListener('click', navFilter);
    // document.addEventListener('pointerup', navFilter);
  }
  
  var state = { pathname: location.pathname };
  var routeUpdate = window.routeUpdate = function routeUpdate(pathname) {
    if (!pathname) {
      throw new Error('Must pass a pathname as the first parameter to `routeUpdate`');
    }
    var path = pathname.replace(/.html$/, '');
    var segments = path.split('?')[0].match(/(\w+)/g) || [];
    var route = router.parse(segments);
    var title = 'DIF - ' + (route.title || 'Decentralized Identity Foundation')
    document.title = title;
    path = route.path || path;

    if (path !== location.pathname) {
      historyPush(title, path);
    }
    else {
      historyReplace(title, path);
    }
  };

  function historyPush(title, pathname) {
    window.scrollTo(0, 0);  // Ignore `history.scrollRestoration`
    state = {pathname: pathname};
    history.pushState(state, null, pathname);
    router.change();
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

  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-100027201-1', 'auto');

  var redirect = null;
  try {
    redirect = sessionStorage.redirect;
    delete sessionStorage.redirect;
  } catch (err) {}
  if (redirect && redirect !== location.pathname) {
    console.log('redirect:', redirect, location.pathname);
    routeUpdate(redirect);
  }
  else {
    gaSendPageview(document.title, location.href);
  }

  
})();


(function($){
    "use strict"
    var LITE = {};

    /*--------------------
        * Header Class
    ----------------------*/
    LITE.HeaderSticky = function(){
        $(".navbar-toggler").on("click", function(a) {
            a.preventDefault(), 
            $(".navbar").addClass("fixed-header")
        });
    }

    /*--------------------
        * Menu Close
    ----------------------*/
    LITE.MenuClose = function(){
      $('.navbar-nav .nav-link').on('click', function() {
       var toggle = $('.navbar-toggler').is(':visible');
       if (toggle) {
         $('.navbar-collapse').collapse('hide');
       }
      });
    }


    /*--------------------
        * Smooth Scroll
    ----------------------*/
    LITE.HeaderScroll = function(){
        $('header a[href*="#"]:not([href="#"])').on('click', function(e) {
          var PathName = location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') || location.hostname == this.hostname;
            if (PathName) { 
              var target = $(this.hash);
                  target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                  if (target.length) {
                    e.originalEvent.preventDefault();
                    $('html,body').animate({
                      scrollTop: target.offset().top - 65,
                      }, 1000);
                    location.hash = this.hash;
                  }
            }
        });
    }

    /*--------------------
        * Header Fixed
    ----------------------*/
    LITE.HeaderFixed = function(){
      var varHeaderFix = $(window).scrollTop() >= 60;
        if (varHeaderFix) {
           $('.navbar').addClass('fixed-header');
        }
        else {
           $('.navbar').removeClass('fixed-header');
        }
    }

    /*--------------------
        * Progress Bar 
    ----------------------*/
    LITE.ProgressBar = function(){
        $(".progress .progress-bar").each(function () {
          var bottom_object = $(this).offset().top + $(this).outerHeight();
          var bottom_window = $(window).scrollTop() + $(window).height();
          var progressWidth = $(this).attr('aria-valuenow') + '%';
          if(bottom_window > bottom_object) {
            $(this).css({
              width : progressWidth
            });
          }
        });
    }

    /*--------------------
    * Counter JS
    ----------------------*/
    var a = 0;
    LITE.Counter = function(){
      var oTop = $('.counter-box').offset().top - window.innerHeight;
        if (a == 0 && $(window).scrollTop() > oTop) {
          $('.count').each(function () {
                $(this).prop('Counter',0).animate({
                    Counter: $(this).text()
                }, {
                    duration: 4000,
                    easing: 'swing',
                    step: function (now) {
                        $(this).text(Math.ceil(now));
                    }
                });
            });
          a = 1;
        }
    }

    $(document).on("ready", function(){
        LITE.MenuClose(),
        LITE.HeaderScroll(),
        LITE.Counter(),
        LITE.ProgressBar(),
        LITE.HeaderSticky();
    });

    $(window).on("scroll", function(){
        LITE.Counter(),
        LITE.ProgressBar(),
        LITE.HeaderFixed();
    });

})(jQuery);


