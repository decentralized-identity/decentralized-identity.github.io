/*========================================================================
EXCLUSIVE ON themeforest.net
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Template Name   : AppLite
Author          : mital_04
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Copyright (c) 2018 - mital_04
========================================================================*/
  

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
        $('header a[href*="#"]:not([href="#"])').on('click', function() {
          var PathName = location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') || location.hostname == this.hostname;
            if (PathName) {
              var target = $(this.hash);
                  target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                  if (target.length) {
                    $('html,body').animate({
                      scrollTop: target.offset().top - 65,
                      }, 1000);
                      return false;
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
    * owl Slider
    ----------------------*/

    LITE.ClientSlider = function(){
      var testimonials_slider = $('#client-slider-single');
        testimonials_slider.owlCarousel({
            loop: true,
            margin: 0,
            nav:false,
            dots:true,
            responsive: {
              0: {
                items: 1
              },
              600: {
                items: 1
              },
              768: {
                items: 2
              },
              991: {
                items: 3
              },
              1140: {
                items: 3
              }
            }
        });
    }

    LITE.WorkSlider = function(){
      var work_slider = $('#work-slider-single');
        work_slider.owlCarousel({
            loop: true,
            margin: 0,
            nav:false,
            dots:true,
            responsive: {
              0: {
                items: 1
              },
              600: {
                items: 1
              },
              768: {
                items: 2
              },
              991: {
                items: 3
              },
              1140: {
                items: 3
              }
            }
        });
    }

    LITE.PopupVideo = function(){
      $('.popup-video').magnificPopup({
              disableOn: 700,
              type: 'iframe',
              mainClass: 'mfp-fade',
              removalDelay: 160,
              preloader: false,
              fixedContentPos: false
        });
    }

    LITE.LightboxGallery = function(){
      $('.portfolio-col').magnificPopup({
          delegate: '.lightbox-gallery',
          type: 'image',
          tLoading: '#%curr%',
          mainClass: 'mfp-fade',
          fixedContentPos: true,
          closeBtnInside: true,
          gallery: {
              enabled: true,
              navigateByImgClick: true,
              preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
          }
      });
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
        LITE.WorkSlider(),
        LITE.PopupVideo(),
        LITE.ClientSlider(),
        LITE.LightboxGallery(),
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

    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
    
      ga('create', 'UA-100027201-1', 'auto');
      ga('send', 'pageview');

(function() {

  var route = {};
  var routes = {
    'schemas': function(){
      return {
        path: '/schemas'
      }
    }
  };

  var state = { pathname: location.pathname };

  var routeUpdate = window.routeUpdate = function routeUpdate(pathname, push) {
    console.log('routeUpdate');
    if (!pathname) {
      throw new Error('Must pass a pathname as the first parameter to `routeUpdate`');
    }
    pathname = pathname.replace(/.html$/, '');
    
    try {
      var segments = pathname.split('?')[0].match(/(\w+)/g);
      route = segments[0] ? routes[segments[0]](segments) : route;
    } catch (err) {}

    var title = 'DIF - ' + (route.title || 'Decentralized Identity Foundation')
    document.title = title;

    if (push === true) historyPush(title, pathname);
    else if (push === false) historyReplace(title, pathname);
    document.body.setAttribute('path', location.pathname);
  };

  function historyPush(title, pathname) {
    console.log('historyPush');
    window.scrollTo(0, 0);  // Ignore `history.scrollRestoration`.
    state = {pathname: pathname};
    history.pushState(state, null, pathname);
    gaSendPageview(title, location.pathname);
  }

  function historyReplace(title, pathname) {
    console.log('historyReplace');
    state = {pathname: pathname};
    history.replaceState(state, null, pathname);
    gaSendPageview(title, location.pathname);
  }

  function gaSendPageview(title, pathname) {
    console.log('gaSendPageview', pathname);
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
    redirect = sessionStorage.redirect;
    delete sessionStorage.redirect;
  } catch (err) {}
  if (redirect && redirect !== location.pathname) {
    console.log('redirect:', redirect, location.pathname);
    routeUpdate(redirect, false);
  }
  else {
    routeUpdate(location.pathname, false);
  }

  // window.onpopstate = function(e) {
  //   console.log('test');
  //   if (e.state && e.state.pathname) {
  //     routeUpdate(e.state.pathname);
  //   }
  // };

  
})();


})(jQuery);


