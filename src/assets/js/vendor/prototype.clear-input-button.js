;(function ( $ ) {

  // Clear text from input button

  'use strict';

  var $clearInputBtn = $('[data-action="clear"]'),
      $hasClearBtn = $('.has-clear-btn'),
      $prevVal = $hasClearBtn.val(),
      $currentVal;

  $clearInputBtn.on('click', function () {
    var $this = $(this);
    $this.parent().children($hasClearBtn).val('');
    $this.removeClass('is-visible');
    $this.parent().children($hasClearBtn).focus();
  });

  $hasClearBtn.on('keyup', function () {
    $currentVal = $(this).val();

    if ($currentVal !== $prevVal ) {
      $(this).next($clearInputBtn).addClass('is-visible');
    }
  });

  $hasClearBtn.on('blur', function () {

    if ( $(this).val().length === 0 ) {
      $(this).next($clearInputBtn).removeClass('is-visible');
    }
  });

})( jQuery );
