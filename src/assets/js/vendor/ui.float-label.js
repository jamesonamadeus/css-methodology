;(function ( $, w, doc ) {

  // enable strict mode
  'use strict';

  var FL = {};

  FL.init = function () {

    var placeholderTest = document.createElement('input').placeholder,
        $floatLabel = $('[data-action="float-labels"]  .float-label'),
        $inputContainer = $('[data-action="float-labels"] .form-row'),
        $floatLabelInputs = $('.js-has-float-label');

    // if the placeholder attribute is supported
    // we will remove it as we don't want the label
    // that we've placed over the input to overlap
    // with the placeholder text  also since the
    // label will always be visible
    if ( placeholderTest !== undefined ) {
      $floatLabelInputs.removeAttr('placeholder');
    }
    // for browsers that don't support the placeholder attribute,
    // the title attribute will still be available to add some
    // visual context of what's expected in a particular input
    // however, the title attribute is not a reliable source
    // of information for assistive technologies.



    // Name our functions

    // check to see if an input/textarea already has text within it
    // (not including just whitespace), if so, make sure the label
    // doesn't shift back on top if it
    var checkVal = function ( $this ) {

      if ( $.trim( $this.val() ) ) {
        $this.closest($inputContainer).addClass('has-text');
      }
      else {
        $this.closest($inputContainer).removeClass('has-text');
      }
    },


    // FLI = Float Label Input
    focusFLI = function () {
      // add the class 'is-focused' to the container to use
      // as a CSS hook
      $(this).closest($inputContainer).addClass('is-focused');
    },


    blurFLI = function () {
      // remove the 'is-focused' class when no longer focused
      $(this).closest($inputContainer).removeClass('is-focused');

      checkVal($(this));
    };


    // do an initial check on page load to make sure an input
    // or text area doesn't already contain text.
    $floatLabelInputs.each( function (){
      checkVal($(this));
    });


    // Now call those functions
    $floatLabelInputs.on({
      focus: focusFLI,
      blur: blurFLI
    });


    // This gives the page time to render before adding the
    // transitions CSS to the float-label. Without this, there
    // would be a slight transition of the label as the no-js class
    // was being removed from the DOM
    setTimeout( function () {
      $floatLabel.addClass('float-label--transition');
    }, 500);

  }; // end FL.init


  // Start FL
  FL.init();

})( jQuery, this, this.document );
