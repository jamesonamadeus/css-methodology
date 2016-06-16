/* ******************************************

  Basic Touch Device Check

******************************************* */

var supportsTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints,
    $html = $('html');

// run on page load
;(function ( $ ) { 

  // add appropriate classes for touch support
  if ( supportsTouch ) {
    $html.addClass('is-touch-device');
  }
  else {
    $html.addClass('not-touch-device');
  }

})( jQuery );
