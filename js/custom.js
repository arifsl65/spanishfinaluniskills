(function ($) {

  "use strict";

    // PRE LOADER
    $(window).load(function(){
      $('.preloader').fadeOut(1000); // set duration in brackets    
    });


    // MENU
    $('.navbar-collapse a').on('click',function(){
      $(".navbar-collapse").collapse('hide');
    });

    $(window).scroll(function() {
      if ($(".navbar").offset().top > 50) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
          } else {
            $(".navbar-fixed-top").removeClass("top-nav-collapse");
          }
    });


    // HOME SLIDER & COURSES & CLIENTS
    $('.home-slider').owlCarousel({
      animateOut: 'fadeOut',
      items:1,
      loop:true,
      dots:false,
      autoplayHoverPause: false,
      autoplay: true,
      smartSpeed: 1000,
    })

    $('.owl-courses').owlCarousel({
      animateOut: 'fadeOut',
      loop: true,
      autoplayHoverPause: false,
      autoplay: true,
      smartSpeed: 1000,
      dots: false,
      nav:true,
      navText: [
          '<i class="fa fa-angle-left"></i>',
          '<i class="fa fa-angle-right"></i>'
      ],
      responsiveClass: true,
      responsive: {
        0: {
          items: 1,
        },
        1000: {
          items: 3,
        }
      }
    });

    $('.owl-client').owlCarousel({
      animateOut: 'fadeOut',
      loop: true,
      autoplayHoverPause: false,
      autoplay: true,
      smartSpeed: 1000,
      responsiveClass: true,
      responsive: {
        0: {
          items: 1,
        },
        1000: {
          items: 3,
        }
      }
    });


    // SMOOTHSCROLL - MODIFIED FOR MULTI-PAGE SITE
    $(function() {
      // This will only apply smooth scrolling to anchors within the same page
      $('a[href^="#"]').on('click', function(event) {
        // Only proceed if the hash is not empty (not just "#")
        if(this.hash !== "") {
          var $anchor = $(this);
          var hash = this.hash;
          
          $('html, body').stop().animate({
            scrollTop: $(hash).offset().top - 49
          }, 1000, function() {
            // Add hash to URL after scroll (optional)
            // window.location.hash = hash;
          });
          event.preventDefault();
        }
      });
    });

    // Highlight active navigation based on current page
    $(function() {
      // Get current page URL
      var url = window.location.href;
      
      // Remove active class from all links
      $('.navbar-nav li a').removeClass('active');
      
      // Loop through menu items
      $('.navbar-nav li a').each(function() {
        // If the current path is like this link, make it active
        if (this.href === url) {
          $(this).addClass('active');
        }
      });
    });

})(jQuery);