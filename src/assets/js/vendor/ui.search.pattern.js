;(function ( $, w, doc ) {

  // enable strict mode
  'use strict';

  var SearchGroup = {};

  SearchGroup.init = function () {

    var $searchGroup = $('.search-group'),
        $searchInput = $searchGroup.find('[type="search"]');


    // Name our functions

    // check to see if an input already has text within it
    // (not including just whitespace), if so, make sure the label
    // doesn't shift back on top if it
    var checkVal = function ( $this ) {

      if ( $.trim( $this.val() ) ) {
        $this.closest($searchGroup).addClass('has-text');
      }
      else {
        $this.closest($searchGroup).removeClass('has-text');
      }

    },


    blurSearchInput = function () {
      checkVal($(this));
    };


    // do an initial check on page load to make sure an input
    // or text area doesn't already contain text.
    $searchInput.each( function (){
      checkVal($(this));
    });


    // Now call those functions
    $searchInput.on({
      blur: blurSearchInput
    });



  }; // end SearchGroup.init


  // Start FL
  SearchGroup.init();

})( jQuery, this, this.document );
