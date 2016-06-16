;(function ( $ ) {

  'use strict';

  // function to demonstrate how a message block could work,
  // when tied into app logic to save / show notifications
  // when certain actions have been performed

  var $messageBlock = $('.message-block'),
      $messageBlockTrigger = $('.js-trigger-message');


  // when an element with the js-prototype-message class is
  // clicked, show the message block.
  $messageBlockTrigger.on('click', function () {
    $('.message-block').addClass('is-active');
    $messageBlock.attr('aria-live', 'polite');
  });


  // remove is-active class when dismiss button is activated
  $('.js-message-dismiss-btn').on('click', function () {
    $(this).closest('.message-block').removeClass('is-active').removeAttr('aria-live');
  });

})( jQuery );

/*


<div class="message-block message-block--has-dismiss is-active">
  <p>
    Message goes here.
  </p>
  <button class="js-message-dismiss-btn message-block__dismiss-btn" type="button">
    <span class="sr-only">
      Dismiss this message
    </span>
    <span aria-hidden="true">⨉</span>
  </button>
</div>

*/
