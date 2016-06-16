;(function ( $, w, doc ) {

  'use strict';

  var a11yGenerate = {};

  a11yGenerate.NS = "a11yGenerate";
  a11yGenerate.AUTHOR = "Scott O'Hara";
  a11yGenerate.VERION = "1.0.0";
  a11yGenerate.LICENSE = "https://github.com/scottaohara/accessible-components/blob/master/LICENSE.md";

  // define the plug-in
  var a11yWidget = '[data-generate]';

  $.fn.extend({

    a11yGenerate: function ( e ) {

      return this.each( function () {

        // set up variables specific to the each instance
        var id = this.id,
            $self = $('#' + id),


        // on load, check
        genCheck = function () {
          if ( parseInt($self.attr('data-generate'), 0) <= $(window).width() ) {

            // add classes and data-action for tabs
            $self.attr({
              'class': 'tab-container',
              'data-action': 'a11y-tabs'
            });

            // add appropriate classes to children of tab widget
            $self.find('> [data-tab-label]').attr({
              'class': 'tab-panel js-tabs__panel'
            });

          }
          else {

            // add classes and data-action for accordion
            $self.attr({
              'class': 'accordion',
              'data-action': 'is-accordion',
            });

            // add appropriate classes to children of accordion widget
            $self.children().attr({
              'class': 'accordion__panel'
            });
          }

        };

        // run the function
        genCheck();


      }); // end: return this.each()
    }

  });  // end $.fn.extend

  // call it
  $(a11yWidget).a11yGenerate();

})( jQuery, this, this.document );
