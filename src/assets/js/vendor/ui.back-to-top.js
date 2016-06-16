;(function ( $, w, doc ) {

  'use strict';

  var $win = $(window),
      $html = $('html'),
      $scrollTrigger = $('.js-back-to-top'),
      triggerRevealClass = 'show-back-to-top',
      scrollTimeout;  // global for any pending scrollTimeout

  // on window scroll
  $win.scroll( function () {

    if ( scrollTimeout ) {
      // clear the timeout, if one is pending
      clearTimeout( scrollTimeout );

      scrollTimeout = null;
    }

    scrollTimeout = setTimeout( scrollHandler, 200 );

  });


  var scrollHandler = function () {

    if ( $win.scrollTop() >= 200 && !$html.hasClass(triggerRevealClass) ) {
      $html.addClass(triggerRevealClass);
    }
    else if ( $win.scrollTop() <= 200 ) {
      $html.removeClass(triggerRevealClass);
    }

  };

  // if the distance to the top of the window is greater than
  // or equal to 200, then add the back to top trigger reveal class
  if ( $win.scrollTop() >= 200 ) {
    $html.addClass(triggerRevealClass);
  }

  // run the function
  scrollHandler();


  // on click of the back to top button,
  // animate back to the top of the page
  // and remove the show-back-to-top class,
  // hiding the button.
  $scrollTrigger.on('click', function () {

    $("html, body").animate({ 
      scrollTop: 0 
    }, "slow");

    $html.removeClass(triggerRevealClass);

    return false;

  });

})( jQuery, this, this.document );
