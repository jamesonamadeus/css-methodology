;(function ( $ ) {

  'use strict';

  $.Drop = function( el, options ) {

    var self         = this,
        $doc         = $(document),
        $trigger     = $('.dd-area__trigger'),
        $html        = $('html');

    this.$el         = $(el);
    this.$target     = $(el).find('.js-dropdown__reveal');

    self.init = function () {

      function setup() {
        self.$target.attr({
          'aria-expanded': 'false',
          'aria-hidden': 'true'
        });

        $trigger.attr({
          'aria-expanded': 'false',
          'aria-haspopup': 'true'
        });
      }

      // run setup
      setup();

      // click events
      self.$el.on('click', function ( e ) {
        e.preventDefault();

        var $this = $(this);

        if ( self.$target.attr('aria-expanded') === 'false' ) {
          $this.children('.dd-area__trigger').attr('aria-expanded', 'true');

          self.$target.attr({
            'aria-expanded': 'true',
            'aria-hidden': 'false'
          });

          $html.addClass('js-drop-open');

          $(el).find('.js-dropdown__reveal ul:first-of-type li:first-of-type a').focus();
        }
        else {
          $this.children('.dd-area__trigger').attr('aria-expanded', 'false');

          self.$target.attr({
            'aria-expanded': 'false',
            'aria-hidden': 'true'
          });

          $html.removeClass('js-drop-open');
        }
      });

      function closeDD ( e ) {
        var keyCode = e.which;

        $trigger.attr('aria-expanded', 'false');

        self.$target.attr({
          'aria-expanded': 'false',
          'aria-hidden': 'true'
        });

        if ( keyCode === 27 ) {
          self.$target.parent().find($trigger).focus();
        }

        $html.removeClass('js-drop-open');
      }


      // mouse up and lose focus
      $doc.on('mouseup', function ( e ) {

        if ( $html.hasClass('js-drop-open') && ! self.$el.is(e.target) && self.$el.has(e.target).length === 0 ) {
          closeDD(e);
        }

      });

      $doc.on('keyup', function ( e ) {

        if ( $html.hasClass('js-drop-open') && self.$el.has(e.target).length === 0 ) {
          closeDD(e);
        }

      });

      $doc.on('keydown', function ( e ) {

        var keyCode = e.which;

        if ( keyCode === 27 ) {

          closeDD(e);

        }

      });

    };

    self.init();
  };

  $.fn.drop = function ( options ) {
    return this.each( function () {
      ( new $.Drop(this, options) );
    });
  };

})(jQuery);

$('.js-dropdown').drop();
