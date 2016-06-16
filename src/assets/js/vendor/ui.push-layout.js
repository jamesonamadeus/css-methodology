;(function ( $, w, doc ) {

  'use strict';

  var PushUI = {};

  PushUI.NS = "PushUI";

  // define the plug-in
  $.fn.extend({

    PushUI: function ( e ) {

      // setup all reusable hooks
      var btnOpen   = '.js-push-ui--open',
          btnHide   = '.js-push-ui--hide',
          btnExpand = '.js-push-ui--expand',
          center    = '.js-push-ui--center',
          pushUI    = '.js-push-ui',
          drawers   = '.push-ui__drawer',
          btns      = '[data-push-ui-btn]',
          $win      = $(window);


      // for each push-ui instance, do the following
      return this.each( function () {

        // define self
        var id = this.id,
            $this = $(this),
            $self = $('#'+id),
            // placeholder for the last clicked/focused element
            $lastFocused,

        // setup necessary default values/states
        pushSetup = function () {

          // add default aria attributes to drawers to set them to be
          // hidden by default.
          $self.find(drawers).attr({
            'aria-expanded': 'false',
            'aria-hidden': 'true'
          });

          // add unique IDs to drawers so they can be associated with
          // their appropriate buttons.
          $self.find(drawers).each( function () {
            var $this = $(this);

            // set IDs for the drawers based on the ID
            // for the main UI component, adding the appropriate
            // __left or __right to the end
            if ( $this.hasClass('js-push-ui--left') ) {
              $this.attr('id', id+'__left');
            }
            else if ( $this.hasClass('js-push-ui--right') ) {
              $this.attr('id', id+'__right');
            }
          });

          // setup buttons
          $self.find(btns).each( function () {
            var $this = $(this);

            // set the aria-controls attribute to point to the appropriate
            // drawer for both open and hide buttons
            $this.attr('aria-controls', id + '__' + $this.attr('data-push-ui-btn'));
          });

          pushWideScreen();
        },


        // to show a drawer
        pushShow = function ( e ) {
          var $thisDrawer = $(drawers),
              $trigger = $this.find( e.target ),
              $triggerSide = $trigger.attr('data-push-ui-btn'),
              $isActive = $('#'+$trigger.attr('aria-controls'));

          // save last focused element to return keyboard
          // focus to when closing
          $lastFocused = $trigger;

          // in case a previous drawer was open,
          // remove the is-open class from it's open trigger
          $self.find($(btnOpen)).removeClass('is-open');

          $self.find($thisDrawer).attr({
            'aria-expanded': 'false',
            'aria-hidden': 'false',
            'tabindex': '-1'
          });

          // set active drawer to aria-expanded; true
          $self.find($isActive).attr( 'aria-expanded', 'true' );
          $self.find($trigger).addClass('is-open');

          $self.attr('data-push-state', $triggerSide);

          // allow time for slide animation,
          // then focus for updated keyboard control
          setTimeout(function () {
            $self.find($thisDrawer).focus();
          }, 300);

          // if this is a link with a href="#soemthing",
          // prevetnDefault will keep that # from being added
          // to the browser URI
          e.preventDefault();

          // return the updated lastFocused variable so that on close,
          // focus can be returned to the panel open button
          return $lastFocused;
        },


        // to hide a drawer
        pushHide = function ( e ) {
          var $thisDrawer = $(drawers),
              $trigger = $this.find( e.target ),
              $thisControls = $('#'+$trigger.attr('aria-controls')),
              $mainContent = $(center);

          $self.find($thisDrawer).attr({
            'aria-expanded': 'false',
            'aria-hidden': 'true'
          });

          $self.find($(btnOpen)).removeClass('is-open');

          // if the drawer was expanded, we need to remove
          // the expansion class
          $self.find($thisDrawer).removeClass('is-expanded');
          // and we definitely want the content to be
          // viewable/accessible again. so let's remove that class too
          $self.find($mainContent).removeClass('partial-fade-out');

          $self.removeClass('expanded-right');

          // remove the active push-state attribute to reset
          // the main container's padding
          $self.attr('data-push-state', '');

          // return keyboard focus to the original trigger
          // unless you are clicking on a hide button from a
          // drawer that was open by default.  in that case
          // lastFocused is undefined, so instead return
          // the user's focus to the center panel
          if (typeof $lastFocused === 'undefined') {
            $self.find($mainContent).focus();
          }
          else {
            $lastFocused.focus();
          }


          e.preventDefault();
        },


        // to expand an open drawer
        pushExpand = function ( e ) {
          var $thisDrawer = $(drawers),
              $trigger = $this.find( e.target ),
              $mainContent = $(center);

              // only the right panel can be expanded.
              // if at any point in the future, there is a
              // reason to expand left panels, then
              // then this function would need to be updated
              // to add and remove a expanded-left as well OR
              // an expanded-right class

          $trigger.closest($thisDrawer).toggleClass('is-expanded');

          if ( $self.find($thisDrawer).hasClass('is-expanded') ) {
            $self.addClass('expanded-right');
            $self.find($mainContent).addClass('partial-fade-out');
            $trigger.attr('aria-label', 'decrease width');
          }
          else {
            $self.removeClass('expanded-right');
            $self.find($mainContent).removeClass('partial-fade-out');
            $trigger.attr('aria-label', 'expand width');
          }
        },

        // IF on a 'wide' screen
        pushWideScreen = function () {

          // if the window is larger than 1023px,
          // update the default state of the left panel
          // to be open by default.
          if ( $win.width() >= 1023 ) {
            $('[data-push-ui-btn="left"]').addClass('is-open');
            $('.push-ui__drawer--left').attr({
              'aria-expanded': 'true',
              'aria-hidden': 'false'
            });

            // In instances where a left panel isn't available,
            // then don't update the main container's push state
            // to left, as we don't want a big empty space
            $(pushUI).each( function () {

              var $this = $(this);

              if ( !$this.hasClass('push-ui--right-only') ) {
                $this.attr('data-push-state', 'left');
              }

            }); // end each()
          }

          // if the browser window is below 1024px,
          // then force close the left panel
          // if ( $win.width() <= 1023 ) {
          //   $('.push-ui__drawer--left').attr({
          //     'aria-expanded': 'false',
          //     'aria-hidden': 'true'
          //   });

          //   // make sure no drawers are open and that no padding
          //   // is applied to the main panel for unopened drawers
          //   $(pushUI).each(function () {
          //     var $this = $(this);

          //     $this.attr('data-push-state', '');
          //   });
          // }
        };

        // efficientResize is a function available in the
        // app.js file. It's purpose is to only fire a window
        // resize function after resize has completed, rather
        // than running the function multiple times during
        // a resize event.

        // var efficientResize = debounce(function() {
        //     pushWideScreen();
        // }, 200);

        // $win.on('resize', efficientResize);


        // run setup on load
        pushSetup();

        // Events
        $self.find(btnOpen).on('click', pushShow.bind(this) );
        $self.find(btnHide).on('click', pushHide.bind(this) );
        $self.find(btnExpand).on('click', pushExpand.bind(this) );
      }); // end: return this.each()

    } // end: PushUI: function

  }); // end: $.fn.extend

  $('.js-push-ui').PushUI();

})( jQuery, this, this.document );
