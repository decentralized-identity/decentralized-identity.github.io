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
      * Pre Load
    ----------------------*/
    LITE.WebLoad = function(){
      document.getElementById("loading").style.display = "none"; 
    }

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

    /*-----------------------
    * Working Contact form
    -------------------------*/
    LITE.ContactForm = function(){
      $(".contactform").on("submit", function() {
          $(".output_message").text("Loading...");

          var form = $(this);
          $.ajax({
              url: form.attr("action"),
              method: form.attr("method"),
              data: form.serialize(),
              success: function(result) {
                  if (result == "success") {
                      $(".contactform").find(".output_message").addClass("success");
                      $(".output_message").text("Message Sent!");
                  } else {
                      $(".contactform").find(".output_message").addClass("error");
                      $(".output_message").text("Error Sending!");
                  }
              }
          });

          return false;
      });
    }

    // Window on Load
    $(window).on("load", function(){
      LITE.WebLoad();
    });

    $(document).on("ready", function(){
        LITE.WorkSlider(),
        LITE.PopupVideo(),
        LITE.ClientSlider(),
        LITE.LightboxGallery(),
        LITE.MenuClose(),
        LITE.HeaderScroll(),
        LITE.Counter(),
        LITE.ProgressBar(),
        LITE.ContactForm(),
        LITE.HeaderSticky();
    });

    $(window).on("scroll", function(){
        LITE.Counter(),
        LITE.ProgressBar(),
        LITE.HeaderFixed();
    });

    fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/decentralized-identity').then(res => res.json()).then(json => {
      blog_posts.innerHTML = json.items.slice(0, 3).map(post => {
        console.log(post);
        return `
          <div class="col-12 col-md-6 col-lg-4">
            <div class="blog-item md-m-15px-tb">
              <a href="${post.link}">
                <img class="blog-thumbnail" src="${post.thumbnail}" title="" alt="">
              </a>
              <div class="blog-content">
                <div class="post-meta">${post.pubDate.split(' ')[0]}</div>
                <h4><a href="${post.link}">${post.title}</a></h4>
                <p>${post.description.split('<p>')[1].split('</p>')[0].slice(0,305)}...</p>
              </div>
            </div>
          </div>
        `;
      }).join('');
    }).catch(e => {
      console.log('Cannot load Medium feed', e);
    });

    document.getElementById('inquiry_form').addEventListener('submit', function(e) {
      try {
        e.preventDefault();
        var request = new XMLHttpRequest();
        request.open('POST', 'https://docs.google.com/forms/d/e/1FAIpQLSe0ZVMdZGGpuSjf7chsXEnh9nISy7eTFDYwEJ41sT4R2KN15Q/formResponse');
        request.send(new FormData(this));
        this.innerHTML = '<div class="inquiry-submitted">Thank you for your interest!<div>';
        //ga('send', 'event', 'Inquiry', 'submit', 'Membership/press form submission');
      }
      catch (e) {
        console.warn('Form submission error:', e);
      }
    });

})(jQuery);


