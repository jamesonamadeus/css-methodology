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

;(function ( $, w, doc ) {

  'use strict';

  var a11yAccordion = {};

  a11yAccordion.NS = "a11yAccordion";
  a11yAccordion.AUTHOR = "Scott O'Hara";
  a11yAccordion.VERION = "1.0.2";
  a11yAccordion.LICENSE = "https://github.com/scottaohara/accessible-components/blob/master/LICENSE.md";

  // define the plug-in
  var accWidget  = '[data-action="is-accordion"]';

  $.fn.extend({

    a11yAccordion: function ( e ) {

      /*
        OPTIONS:

        add the following data attributes to their respected element
        to extend the accordion setup process

          container
            * data-showall="true"
                show all panels by default

            * data-multi-open="true"
                individual accordion can have multiple tabs
                open at once

          panel
            * data-showbydefault="true"
                show individual panel by default

            * data-tab-label="Your Label Here"
                set the text for the auto generated
                tab/trigger for this panel (only if the panel does not have
                a preceding heading element)

      */

      // setup global class variables
      var accTrigger    = '.accordion__trigger',
          accPanel      = '.accordion__panel';


      return this.each( function () {

        // set up variables specific to the each instance
        var id = this.id,
            $self = $('#' + id),
            // these two variables will be reused in various functions
            setFalse = { 'aria-selected': 'false', 'tabindex': '-1' },
            setTrue = { 'aria-selected': 'true', 'tabindex': '0' },


        genAcc = function () {

          // check to see if there are any accTriggers,
          // if not, they need to be generated
          if ( !$self.find('> ' + accTrigger).length ) {

            // start a counter
            var $panelNum = 1;

            // find the panels within this accordion instance
            $self.find('> ' + accPanel).each( function () {
              var $this = $(this);

              // now create an ID based on the instance ID + _panel_ + a randomly generated #
              $this.attr('id', id + '_panel_' + $panelNum );

              // now grab that ID for later
              var $grabID = $this.attr('id'),

                // The expected mark-up for a no-js accordion should have a heading
                // before each tab panel. So if that exists, then grab the text
                // from that heading to use as the tab trigger label
                // OR if a heading isn't there, check to see if a data-tab-label was
                // set to the tab-panel.
                // IF both of those checks fail, then just call it "tab" + it's
                // # designation in the tab panel set
                $grabLabel = $this.prev(':header').text() || $this.attr('data-tab-label') || 'Tab ' + $panelNum,

                // Put it all together as a new <li>tab</li>
                $createTabItem = '<button type="button" data-href="#'+$grabID+'" class="accordion__trigger">'+$grabLabel+'</button>';

                $this.before($createTabItem);

              return $panelNum = $panelNum + 1;

            });

          }

        }, // end genAcc


        // setup the accordion and it's tabs and panels
        setupAcc = function () {

          // setup the component to have a role of tablist
          $self.attr({ 'role': 'tablist' });

          // if there was a heading set for the no-js solution (there should have been)
          // then it can be removed because we've already grabbed the text from it
          // for use in the auto generated <a>
          $self.find('> :header').remove();

          // if an accordion can have multiple panels opened at a time,
          // then add this aria attribute
          if ( $self.attr('data-multi-open') ) {

            $self.attr('aria-multiselectable', 'true');

          }


          // find the panel triggers within each instance
          // generate the appropriate attributes and values
          $self.find('> ' + accTrigger).each( function () {

            var $this = $(this),
                $getURL = $this.attr('href') || $this.attr('data-href'),
                $thisTarget = $getURL.split('#')[1];

            $this.attr({
              'aria-controls': $thisTarget,
              'aria-expanded': 'false',
              'aria-selected': 'false',
              'id': $thisTarget + '_tab',
              'role': 'tab',
              'tabindex': '-1'
            });

          }); // end $self.find(accTrigger).each


          // setup the panels
          $self.find('> ' + accPanel).each( function () {

            var $this = $(this);

            // setup panel to have appropriate attribute hooks
            $this.attr({
              'aria-hidden': 'true',
              'aria-labelledby': $this.before().attr('id') + '_tab',
              'role': 'tabpanel'
            });

            // if a panel should be shown by default,
            // update the aria-expanded attribute and .show() it.
            // then update the paired trigger's attributes to
            // show it as active/selected
            if ( $this.attr('data-showbydefault') ) {

              // set the appropriate aria attribute values
              $this.attr({ 'aria-hidden': 'false' }).show(); // show this by default

              // and set the corresponding trigger to have
              // the correct attribute values as well
              $this.prev(accTrigger).attr({
                'aria-expanded': 'true',
                'aria-selected': 'true',
                'tabindex': '0'
              }).addClass('is-active');

              // and finally, add a class to the parent
              // to mark it as an accordion that has a
              // default tab
              $this.parent().addClass('has-default');
            }

          }); // end $self.find(accPanel).each


          // if a default tab wasn't set, then the first tab
          // needs to be focusable in the tablist
          if ( !$self.hasClass('has-default') ) {

            $self.find('> ' + accTrigger + ':first-of-type').attr({ 'tabindex': '0' });

          }

        }, // end setupAcc



        // show all panel resetup
        showAllSetup = function () {

          if ( $self.attr('data-showall') === 'true' ) {

            $self.find('> ' + accTrigger).attr('aria-expanded', 'true');
            $self.find('> ' + accPanel).attr('aria-hidden', 'false').show();
            $self.find('> ' + accTrigger).first().attr('aria-selected', 'true').addClass('is-active');

          }

        },




        // on panel click
        panelClick = function ( e ) {

          e.stopPropagation();

          var $e = $(e.target).closest(accPanel),
              $getTarget = $e.attr('aria-labelledby'),
              $target = $('#'+$getTarget);


          $self.find('> ' + accTrigger).attr(setFalse).removeClass('is-active');


          // run the check expanded function
          checkExpanded();


          $target.attr(setTrue).addClass('is-active').removeClass('was-active');

        },


        // check to see if a panel was previously expanded
        // as that means it used to be active, and we'll
        // need this class for later
        checkExpanded = function () {

          $self.find('> ' + accTrigger).each( function () {

            var $this = $(this);

            if ( $this.attr('aria-expanded') === 'true' ) {

              $this.addClass('was-active');

            }

          });

        },


        // trigger logic
        panelReveal = function ( e ) {

          // prevent browser jumping and the URI being
          // added to the browser's address bar
          e.preventDefault();

          var $e = $(e.target),
              $getTarget = $e.attr('aria-controls'),
              $target = $('#'+$getTarget);


          // run a check to see if the multiOpen flag is up
          // if not, then when a new tab is opened, previously
          // opened tags need to close
          if ( !$self.attr('data-multi-open') ) {

            $self.find('> ' + accTrigger).attr({
              'aria-selected': 'false',
              'aria-expanded': 'false',
              'tabindex': '-1'
            });

            $self.find('> ' + accPanel).attr({ 'aria-hidden': 'true' }).slideUp();

          }


          // run the check expanded function
          checkExpanded();


          // if a tab was previously active, if it is clicked again
          // it needs to close, but still become the currently active
          // and tabindexable element
          if ( $e.hasClass('was-active') ) {

            $self.find('> ' + accTrigger).removeClass('is-active').attr(setFalse);

            $e.attr({
              'aria-expanded': 'false',
              'aria-selected': 'true',
              'tabindex': '0'
            }).removeClass('was-active').focus();

            $target.attr('aria-hidden', 'true').slideUp();

            return;

          }


          // regardless of if multiOpen is true or false,
          // if the target trigger has a class of is-active,
          // and a user activates it again, then it should
          // close that panel and deactivate the tab
          if ( $e.hasClass('is-active') ) {

            $e.attr({
              'aria-expanded': 'false',
              'tabindex': '0'
            }).removeClass('is-active');

            $target.attr({ 'aria-hidden': 'true' }).slideUp();

            return;

          }


          else if ( !$e.hasClass('is-active') ) {

            $self.find('> ' + accTrigger).removeClass('is-active').attr(setFalse);

            $e.attr({
              'tabindex': '0',
              'aria-selected': 'true',
              'aria-expanded': 'true'
            }).addClass('is-active').focus();

            $target.attr({ 'aria-hidden': 'false' }).slideDown();

            return;

          }

        },



        // tab/trigger keyboard controls
        keytrolls = function ( e ) {

          var keyCode = e.which,
              $grabThisTrigger,
              $currentTabItem;

          // are we in the tab/headings or inside a panel?
          if ( $(e.target).attr('role') === 'tab' ) {
            $currentTabItem = $(e.target);
          }
          else if ( $(e.target).closest(accPanel) ) {
            $grabThisTrigger = $(e.target).closest(accPanel).attr('aria-labelledby'),
            $currentTabItem = $('#'+$grabThisTrigger);
          }


          // now that we know what our currentTabItem/Accordion are
          // we can set up some more variables
          var $currentAccordion = $currentTabItem.parent(),
              $firstTab = $currentAccordion.find('> ' + accTrigger).first(),
              $lastTab = $currentAccordion.find('> ' + accTrigger).last(),
              $prevTab = $currentTabItem.prev().prev(),
              $nextTab = $currentTabItem.next().next()


          if ( $currentTabItem.is(accTrigger + ':first-of-type') ) {
            $prevTab = $lastTab;
          }
          else if ( $currentTabItem.is(accTrigger + ':last-of-type') ) {
            $nextTab = $firstTab;
          }


          // now there are different keyboard controls for our different situations
          if ( $(e.target).attr('role') === 'tab' ) {

            switch ( keyCode ) {

              // right + down
              case 39: // right
              case 40: // down
                e.preventDefault();
                $currentTabItem.attr(setFalse);
                $nextTab.focus().attr(setTrue);
                break;

              // left + up
              case 37: // left
              case 38: // up
                e.preventDefault();
                $currentTabItem.attr(setFalse);
                $prevTab.focus().attr(setTrue);
                break;

              case 35: // end
                e.stopPropagation();
                $lastTab.focus().attr(setTrue);
                break;

              case 36: // home
                e.stopPropagation();
                $firstTab.focus().attr(setTrue);
                break;

              default:
                break;

            } // end switch


          if ( $(e.target).is('a') ) {
            switch ( keyCode ) {
              case 13: // enter
              case 32: // space bar
                e.stopPropagation();
                panelReveal( e );
                break;
            }
          }
          else if ( $(e.target).is('button') ) {
            switch ( keyCode ) {
              case 13: // enter
                e.stopPropagation();
                panelReveal( e );
                break;
            }
          }


          } // end if

          else if ( $(e.target).closest(accPanel) ) {

            if ( e.ctrlKey ) {

              e.preventDefault(); // prevent default behavior

              switch ( e.keyCode ) {
                case 38: // up
                  $currentTabItem.focus();
                  break;

                case 33: // pg up
                  $self.find('> ' + accTrigger).attr(setFalse);
                  $prevTab.focus().attr(setTrue);
                  break;

                case 34: // pg down
                  $self.find('> ' + accTrigger).attr(setFalse);
                  $nextTab.focus().attr(setTrue);
                  break;

                default:
                  break;
              } // end switch

            } // end if

          } // end else if

        };


        // Run setups on load
        genAcc();
        setupAcc();
        showAllSetup();


        // Events
        $self.find('> ' + accTrigger).on( 'click', panelReveal.bind(this) );
        $self.find('> ' + accPanel).on( 'click', panelClick.bind(this) );
        $self.find('> ' + accTrigger).on( 'keydown', keytrolls.bind(this) );
        $self.find('> ' + accPanel).on( 'keydown', keytrolls.bind(this) );

      }); // end: return this.each()
    }

  });  // end $.fn.extend

  // call it
  $(accWidget).a11yAccordion();

})( jQuery, this, this.document );

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

/**
* @requires _toggle-attr.js
*/

;(function ( $, w, doc ) {

  // Enable strict mode
  "use strict";

  // Local object for method references
  var A11yBurger = {};

  // Namespace
  A11yBurger.NS = "A11yBurger";
  A11yBurger.AUTHOR = "Scott O'Hara";
  A11yBurger.VERSION = "1.0.1";
  A11yBurger.DOCUMENTATION = "";
  A11yBurger.LICENSE = "";

  // set base variables
  var $doc = $(document),
      $html = $('html'),
      $body = $('body'),
      $burgerBtn = $('[data-action="open-menu"]'),
      optionalOverlay = false,
      $menu,
      $burgerLabel,
      $currentBurger,
      overlayEl = 'off-screen-menu-overlay',
      $firstFocus,
      $lastFocus;


  $.fn.extend({

    a11yBurger: function ( e ) {

      return this.each( function () {

        // ************************************
        // PRE-SETUP
        // if no ID was setup on the menu button
        // because we need IDs for this all to work...
        $burgerBtn.each( function () {

          var $this = $(this);

          if ( !$this[0].hasAttribute('id') ) {

            $this.attr('id', $this.attr('href').split('#')[1] +'__trigger' );

          } // if

        });
        // end PRE-SETUP **********************


        // Now we can target all the potential burger buttons by their
        // ID and finish the setup process
        var id = this.id,
            $self = $('#' + id),
            keyCode,


        setupA11yBurger = function () {

          // there's usually a single hamburger menu, but you never know...
          $burgerBtn.each( function () {

            var $this = $(this),
                $burgerTarget = $this.attr('href').split('#')[1];


            if ( !$doc.find('.'+overlayEl).length ){
              $('#'+$burgerTarget).after('<div class="'+overlayEl+'" />');
            }


            // grab the text from the
            $burgerLabel = $this.find('.btn--menu__label').text();

            // check burger to see if it triggers an overlay
            if ( $this.attr('data-has-overlay') ) {
              optionalOverlay = true;
            }

            // set up the button's attributes
            $this.attr({
              'aria-controls': $burgerTarget,
              'aria-expanded': 'false',
              'role': 'button',
              'aria-label': 'Open' + $burgerLabel
            });

            return [optionalOverlay, $burgerLabel];

          }); // end .each()

        },


        // Function to toggle (flipping, ha!) the hamburger menu
        flippingBurgers = function ( e ) {

          var $this = $(this);

          // since these are links with an href starting with '#',
          // the end URI gets updated and could cause some jumping
          // depending on the implementation of the menu.
          // Prevent default makes it so that this does not happen,
          // as long as JavaScript is enabled.
          e.preventDefault();


          // toggle a class to the <html> to allow for menu/button
          // transition/restyling via CSS
          $html.toggleClass('menu-is-open');


          // if triggered, the button should relay that
          // it's target is expanded, and since the
          // label will change from "menu" to 'close'
          // politely inform the user that the change
          // has occurred.
          toggleState( $this, 'aria-expanded', 'true', 'false' );
          toggleState( $this, 'aria-label', 'Open ' + $burgerLabel, 'Close ' + $burgerLabel );
          $this.attr( 'aria-live', 'polite' );


          // define the menu based on the aria-controls
          $menu = $( '#'+$this.attr('aria-controls') );


          // set the menu to have a tabindex of -1 so focus
          // can be shifted to it when the menu is expanded
          $menu.attr('tabindex', '-1');


          // if there is an overlay, then the document should not
          // be able to be interacted with. This not only means
          // that the focus should be trapped within the menu
          // (see Burger.Restrict), but also the normal document
          // should no longer be scrollable
          if ( optionalOverlay ) {

            $html.toggleClass('pause-document-scroll');

            // find the first and last links in the menu, which
            // will be needed to trap focus
            $firstFocus = $menu.find('a:first');
            $lastFocus = $menu.find('a:last');

          }


          // when the menu is opened, move focus to the menu container
          // and if the menu is being closed, then return focus to the
          // trigger
          if ( $html.hasClass('menu-is-open') ) {
            $menu.focus();
          }
          else {
            $this.focus();
          }


          // update the predefined variables with the
          return [$menu, $currentBurger, $firstFocus, $lastFocus];

        },


        // setup general keyboard controls for the burger/menu
        kbdTrigger = function ( e ) {

          keyCode = ( e.keyCode ? e.keyCode : e.which );

          switch ( keyCode ) {

            // allow space bar to work as well
            case 32:
              $(e.target).trigger('click');
              break;

          } // switch

        },


        // Close menu with escape key
        escClose = function ( e ) {

          keyCode = ( e.keyCode ? e.keyCode : e.which );

          if ( $html.hasClass('menu-is-open') ) {

            $currentBurger = $burgerBtn.attr('aria-expanded', 'true');

            switch ( keyCode ) {

              // esc
              case 27:
                $doc.find($currentBurger).trigger('click');
                break;

            } // switch

          }

        },


        // clicking outside the menu, when an overlay is open
        // should close the menu.
        outSideClick = function ( e ) {

          if ( $html.hasClass('menu-is-open') && optionalOverlay ) {

            $currentBurger = $burgerBtn.attr('aria-expanded', 'true');

            $doc.find($currentBurger).trigger('click');

          }

        },


        // Restrict focus to the opened navigation
        trapFocus = function ( e ) {

          if ( $html.hasClass('menu-is-open') ) {

          $currentBurger = $burgerBtn.attr('aria-expanded', 'true');

          keyCode = ( e.keyCode ? e.keyCode : e.which );

            if ( keyCode === 9 && !e.shiftKey && $lastFocus.is(':focus') ) {

              e.preventDefault();
              $currentBurger.focus();

            }
            else if ( keyCode === 9 && e.shiftKey && $currentBurger.is(':focus') ) {

              e.preventDefault();
              $lastFocus.focus();

            } // if

          } // if menu-is-open

        };


        setupA11yBurger();

        $doc.on( 'click', '.'+overlayEl, outSideClick );
        $self.on( 'click', flippingBurgers.bind(this) );
        $self.on( 'keydown', kbdTrigger.bind(this) );
        $doc.on( 'keydown', escClose );

        // restrict tab focus on elements only inside menu window
        if ( optionalOverlay ) {
          $body.bind('keydown', trapFocus );
        }

      }); // end: return this.each()

    } // end a11yBurger

  }); // end: $.fn.extend


  $burgerBtn.a11yBurger();


})( jQuery, this, this.document );

/*! Simple and Accessible Hide/Show toggle behavior
 * Copyright Whatever Year It is Tim Wright
 * Licensed under MIT
 * Repo: https://github.com/timwright12/hideshow/
 * Pen: http://codepen.io/timwright12/pen/yerzqG
 *
 * HTML example usage:

 * <button
 *    type="button"
 *    data-action="hide-show"
 *    data-text="Hide"
 *    data-class="is-hidden"
 *    aria-controls="worms"
 *    aria-live="polite"
 *    aria-expanded="false">
 *    Show
 * </button>
 *
 * <div id="worms"></div>
 */

;(function (w, doc) {

  // Enable strict mode
  "use strict";

  // Local object for method references
  var HideShow = {};

  // Namespace
  HideShow.ns = "Hide/Show Trigger onClick";

  /*
    Check if an element is hidden (display: none OR visibility: hidden)
  */

  HideShow.isHidden = function(el) {
    return (el.offsetParent === null);
  };

  /*
    Cross-browser way to tell if an element has a certain class
  */

  HideShow.hasClass = function(el, cls) {
    if (el.classList) {
      return el.classList.contains(cls);
    } else {
      return !!el.cls.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
    }
  };

  /*
    Cross-browser wat to remove a class
  */

  HideShow.removeClass = function(el, cls) {
    if (el.classList) {
      el.classList.remove(cls);
    } else if (HideShow.hasClass(el, cls)) {
      var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
      el.cls=el.cls.replace(reg, ' ');
    }
  };

  /*
    Cross-browser way to add a class
  */

  HideShow.addClass = function(el, cls) {
    if (el.classList) {
      el.classList.add(cls);
    } else if (!HideShow.hasClass(el, cls)) {
      el.cls += " " + cls;
    }
  };

  /*
    Internal method of bringing a target element into view
  */

  HideShow.displayEl = function( self, el ) {
    self.setAttribute('aria-expanded', true);
    el.setAttribute('tabindex', '-1');
    el.focus();
  };

  /*
    Internal method of removing an element from view
  */

  HideShow.removeEl = function( self, el ) {
    el.removeAttribute('tabindex');
    self.setAttribute('aria-expanded', false);
  };

  /*
    Master toggle method for hiding and showing content
  */

  HideShow.toggle = function(self, target, text, replaceText, expanded, className ) {

    var tgtEl = doc.getElementById(target);
    var elem = doc.getElementById(tgtEl);
    var CSSdisplay = w.getComputedStyle(tgtEl, null).getPropertyValue("display");

    if( replaceText ) {
      self.innerHTML = replaceText;
      self.setAttribute('data-text', text);
    }

    // If a class will be used to hide the element and it's not setting display: none
    if( className && CSSdisplay !== 'none' ) {

      // if the target element already contains the chosen class
      if( this.hasClass( tgtEl, className )) {

        // YES: remove it, and display the elememt
        this.removeClass( tgtEl, className );
        this.displayEl( self, tgtEl );

      } else {

        // NO: Add it, and hide the element
        this.addClass( tgtEl, className);
        this.removeEl( self, tgtEl );

      } // if hasClass

    // classes are being used to hide/show, but it's setting display: none
    } else if( className && CSSdisplay === 'none' ) {

      if( this.hasClass( tgtEl, className )) {

        this.removeClass( tgtEl, className );
        this.displayEl( self, tgtEl );
        tgtEl.setAttribute('aria-hidden', true);

      // no classes being used
      } else {

        this.addClass( tgtEl, className);
        this.removeEl( self, tgtEl );
        tgtEl.removeAttribute('aria-hidden');

      }

    } else {

      // If the target element is being displayed
      if( !this.isHidden( tgtEl ) ) {

        // special additions for this style of hiding
        tgtEl.style.display = 'none';
        tgtEl.setAttribute('aria-hidden', true);

        // YES: hide it
        this.removeEl( self, tgtEl );

      } else {

        // special additions for this style of hiding
        tgtEl.removeAttribute('style');
        tgtEl.removeAttribute('aria-hidden');

        // NO: show it
        this.displayEl( self, tgtEl );

      } // if el is hidden

    } // if className

  }; // HideShow.toggle();

  // Start defining methods here
  HideShow.init = function() {

    var btns = doc.querySelectorAll('[data-action="hide-show"]');
    var btnsCount = btns.length;
    var i, text, replaceText, target, className, expanded;

    if( btnsCount > 0 ) {
      for (i = 0; i < btnsCount; i = i + 1) {

        var obj = btns[i];

        obj.addEventListener('click', function(e) {

          // pulling out some DOM elements
          text = this.innerText || this.textContent;
          replaceText = this.getAttribute('data-text');
          target = this.getAttribute('aria-controls');
          className = this.getAttribute('data-class');
          expanded = this.getAttribute('aria-expanded');

          // just in case it's a link, but it should be a button
          e.preventDefault();

          // calling the toggle
          HideShow.toggle(this, target, text, replaceText, expanded, className);

        }); // click

      } // loop buttons
    } // if buttons

  };

  // Start the application
  HideShow.init();

} )( this, this.document );

// Scoping the $, incase you want to use jQuery, but it's not required
;(function ($, w, doc) {

  // Enable strict mode
  "use strict";

  // Local object for method references
  var Modal = {};

  // Namespace
  Modal.NS = "Modal";
  Modal.AUTHOR = "Scott O'Hara";
  Modal.VERSION = "0.0.4";
  Modal.DOCUMENTATION = "http://www.smashingmagazine.com/2014/09/making-modals-better-for-everyone/";
  Modal.LICENSE = "https://github.com/scottaohara/accessible-components/blob/master/LICENSE.md";

  // set Modal variables
  var $m = $('.modal-overlay'),
      $html = $('html'),
      $body = $('body'),
      $mOpen = $('.js-open-modal'),
      $mTitle = $('.modal__intro__title'),
      $mOpenTarget,
      $mClose = $('.js-modal-close'),
      $modal = $('.modal'),
      $allNodes = $("*"),
      $isModalOpen = false,
      $lastFocus,
      i;

  // initialize the modal(s) on load
  Modal.Init = function() {

    // take all instances of modals
    // and put them at the top of the <body>
    // this allows for backwards tab into the url bar
    this.Swap($m, $body);

    // open modal by btn click/hit
    $(document).on('click', '.js-open-modal', function(){
      $modal = $('.modal', $mOpenTarget);
      $mOpenTarget = $('#'+$(this).attr('data-open'));
      $lastFocus = document.activeElement;
      $isModalOpen = true;

      $html.addClass('modal-is-open');
      $mOpenTarget.attr('aria-hidden', 'false');
      $modal.attr('tabindex', '-1').focus();
    });

    // close modal by btn click/hit
    $mClose.on('click', this.Close);

    $m.on('click touchstart', this.OverlayClose);

    // close modal by keydown, but only if modal is open
    $(document).on('keydown', this.Close);

    // restrict tab focus on elements only inside modal window
    $allNodes.on('focus', this.Restrict );
  };


  /*
    Modal Window Functions
  */
  /* Place modal window(s) as the first child(ren) of the $body node */
  Modal.Swap = function( m, p ) {
    // this if is only here for use in the UI-kit.
    if ( !$body.hasClass('cs-body')) {
      $body.prepend($m);
    }
  };


  /*
    Bind to both the button click and the escape key to
    close the modal window  but only if isModalOpen is set to true
  */
  Modal.Close = function( e ) {
    if ( $isModalOpen && ( !e.keyCode || e.keyCode === 27 ) ) {
      $html.removeClass('modal-is-open');
      $m.attr('aria-hidden', 'true');
      $isModalOpen = false;

      var $vid = $('iframe[src*="youtube"].responsive-video-container__media');

      if ( $vid.length > 0 ){
        var src = $vid.attr('src');
        $vid.attr('src', '');
        $vid.attr('src', src);
      }

      $lastFocus.focus();
    }
  };


  Modal.OverlayClose = function ( e ) {
    if ( e.target === $modal.parent().get(0) ) {
      Modal.Close( e );
    }
  };


  Modal.Restrict = function ( e ) {
    if ( $html.hasClass('modal-is-open') && !$modal.get(0).contains( e.target ) ) {
      e.stopPropagation();
      $modal.focus();
    }
  };


  Modal.Init();

} )( jQuery, this, this.document );

;(function ( $, w, doc ) {

  'use strict';

  var A11yModal = {};

  A11yModal.NS = "A11yModal";
  A11yModal.AUTHOR = "Scott O'Hara";
  A11yModal.VERION = "2.0.0";
  A11yModal.DOCUMENTATION = 'coming soon, yo';
  A11yModal.LICENSE = "https://github.com/scottaohara/accessible-components/blob/master/LICENSE.md";


  // setup global class variables
  var modalTrigger      = '[data-action="modal-open"]',

      modal             = '.a11y-modal',

      modalDoc          = '.modal',
      modalTitle        = '[data-modal-title]',
      modalClose        = '[data-modal-close]',

      genModalClose     = '<button type="button" data-modal-close class="modal__outro__close"><span aria-hidden="true">⨉</span></button>',

      $html             = $('html'),

      bodyElements      = 'a11y-hide-if-modal-open',

      safetyModalTitle  = "Dialog Window";


  $.fn.extend({

    a11yModal: function ( e ) {

      return this.each( function () {

        var id = this.id,
            $self = $('#' + id),

        // setup modals properly
        setupA11yModal = function () {

          // setup each modal instance to have the
          // appropriate attributes. These attributes
          // are applied to what would be considered the
          // modal container, or 'overlay'
          $self.each( function () {

            var $this = $(this),
                $findTitle = $this.find(modalTitle),
                $findHeading = $this.find(':header'),
                $thisLabel;


            // first check to see what sort of dialog this should be
            // if a data-modal-alert attribute is set to true, then
            // this is meant to be an alert dialog, so set the role
            // to 'alertdialog'. If it's not set, it's mean to be
            // a normal dialog. So set the role to just 'dialog'
            if ( $this.attr('data-modal-alert') === 'true' ) {
              $this.attr({
                'role': 'alertdialog'
              });
            }
            else {
              $this.attr({
                'role': 'dialog'
              });
            }


            // we will need to set focus to the modal content
            // container for focus trapping reasons, so we
            // need this to have a tabindex
            $this.attr('tabindex', '-1');
            $this.find(modalDoc).attr('tabindex', '-1');


            // check to see if an aria-label was set on the modal
            // if not, then start running checks to apply an aria-labelledby
            if ( !$self.attr('aria-label') ) {

              // if the modal window has a child modalTitle set,
              // then add an aria-labelledby attribute to the dialog,
              // pointing to that element.
              if ( $findTitle ) {

                $thisLabel = $findTitle.attr('id');

              } //if

              // in the event that a modalTitle wasn't manually set,
              // then we should look to see if there's a heading element
              // present at all, and then make THAT the source for the
              // aria-labelledby
              else if ( $findHeading ) {

                // does the heading we found have an id already?
                // let's check
                if ( $findHeading.first().attr('id') ) {

                  $thisLabel = $findHeading.first().attr('id');

                } //if

                // if it doesn't, then generate one
                else {

                  $thisLabel = $this.attr('id') + '_title';

                  $findHeading.first().attr('id', $thisLabel);

                } //else

              } // else/if

              $this.attr( 'aria-labelledby', $thisLabel );

            } // if


          });


          // setup each modal content area (the component that
          // contains the actual content)
          $self.find(modalDoc).each( function () {
            var $this = $(this);


            // important for older versions of NVDA to accurately
            // understand a modal's content
            $this.attr({
              'role': 'document' // *
            });


            // Modals need a close button, and it should be the last
            // element in the modal.

            // If a modal doesn't have a close button, create it.
            if ( !$this.find(modalClose).length ) {

              if ( $this.find('.modal__outro').length ) {

                $this.find('.modal__outro').append(genModalClose);

              } else {

                $this.append(genModalClose);

              } // if/else

            } // if

            // Set aria-label and control attributes to the
            // close trigger.
            $this.find(modalClose).attr({
              'aria-label': 'Close Modal',
              'aria-controls': $this.parent().attr('id')
            });

          }); // end modalDoc

        },


        // setup modal triggers
        // the following applies needed aria-attributes
        // to the modal triggers, as well as doing a
        // final check to ensure that the modal window
        // has appropriate labeling
        setupA11yModalTriggers = function () {

          $(modalTrigger).each( function () {

            var $this = $(this),
                $grabTarget,
                $modalTarget;

            // if the trigger is a link, we need to give it a
            // button role.
            if ( $this.attr('href') ) {

              $this.attr('role', 'button');

            }


            // The triggers need to point to the modals they control via
            // the aria-controls attribute. So run a check to see if the
            // attribute exists on the button.
            //
            // It's likely that it WON'T exist, as the optimal method for
            // the minimum mark-up is to use a data-modal-open attribute
            // instead. The reason for this is that in situations without
            // JavaScript, we don't want partial ARIA hooks, as that can
            // create confusion for ATs that would expect certain
            // functionality that wouldn't be available due to lack of JS.
            if ( !$this.attr('aria-controls') ) {

              // make sure that the trigger actually triggers something.
              // if it there's no data-modal-open attribute set, then
              // pull the target from the href
              if ( $this.attr('data-modal-open') ) {

                $grabTarget = $this.attr('data-modal-open');
                $this.attr('aria-controls', $grabTarget );

              }
              // if there's no data-modal-open, pull the target from
              // from the href
              else if ( $this.attr('href') ) {

                $grabTarget = $this.attr('href').split('#')[1];
                $this.attr('aria-controls', $grabTarget );

              }
              // if neither of the above are set, then this just
              // won't work and you're clearly expecting this to
              // open by magic.
              else {
                console.log("No target set. A target is set by setting the value of an aria-controls attribute, which if absent, can be generated by the trigger's href URI, or a data-modal-open attribute to the value of the modal window ID you are attempting to open.");
                return false;
              }

            } // end if aria-controls

            // now that the aria-controls is set, point to the modal's target
            // so we can run the next if
            $modalTarget = $('#'+$this.attr('aria-controls') )


            // finally a last check to see if the trigger is meant to launch
            // an alert dialog modal. If the alertdialog role wasn't set during
            // the initial setup function, then look to see if the 'data-modal-alert'
            // attribute is present on the trigger, and if so, apply the alertdialog
            // role to the modal on trigger activation.
            if ( $this.attr('data-modal-alert') === 'true' && $modalTarget.attr('role') !== 'alertdialog' ) {
              $modalTarget.attr('role', 'alertdialog');
            }

          });
        },


        // Place modal window(s) as the first child(ren)
        // of the body element so tabbing backwards can
        // move focus into the browser's address bar
        organizeDOM = function () {

          var $body = $('body'),
              $afterLast = $body.find('.a11y-modal').last().find('~ *:not(script)');


          // place all the modal dialogs at the top of the DOM, as the
          // first children of BODY. This will allow for backwards tabbing
          // into the browser's address bar, where as if the modals were
          // not located at the top of the DOM, keyboard focus would be
          // completely trapped within the modal window.
          $body.prepend($(modal));


          // for all direct children of the BODY element, add a class
          // to target during open/close
          $body.find(' > *:not(.a11y-modal, script)').addClass(bodyElements);


          // TODO: think about this more....
          //$afterLast.addClass(bodyElements);

        },


        openA11yModal = function ( e ) {

          // setup vars
          var $this = $(this),
              $modalTarget = $('#' + $this.attr('aria-controls') );


          // Check to see if the modal has either an aria-label or labelledby attribute
          // if not, that means that the modal didn't have a manually set aria-label,
          // nor does the modal have any sort of heading element to draw a title from.
          // In this instance, pull the safetyModalTitle var in as an aria-label
          if ( !$modalTarget.attr('aria-labelledby') && !$modalTarget.attr('aria-label') ) {

            // Last ditch effort to allow control over what the aria-label will be.
            // If the data-set-modal-title attribute is set to the modal trigger,
            // its value will be set as the modal's aria-label
            if ( $this.attr('data-set-modal-title') ) {
              safetyModalTitle = $this.attr('data-set-modal-title');
            }

            // set an aria-label to the modal
            $modalTarget.attr('aria-label', safetyModalTitle );

          } // if


          // traps focus while the modal is open
          trapFocus();

          // if modal trigger is an <a>, make sure that URI isn't
          // updated and more importantly that the document doesn't
          // auto-jump to the DOM location of the modal window.
          e.preventDefault();


          // set that modal be visible, controlled by the
          // aria-hidden attribute and CSS
          // then shift focus to it
          $modalTarget.attr('aria-hidden', 'false');


          // add a class to the HTML, to allow for a CSS hook
          // to help restrict document scroll while the modal
          // is open
          $html.addClass('modal-is-open');


          // Hide main document content from screen readers by
          // applying an aria-hidden attribute to all direct
          // siblings of the modal windows. (var bodyElements)
          $('.'+bodyElements).attr('aria-hidden', 'true');


          // finally, apply focus to the newly opened modal window
          $modalTarget.find(modalDoc).focus();

        },


        // Bind to both the button click and the escape key to
        // close the modal window  but only if isModalOpen is set to true
        closeA11yModal = function ( e ) {

          var returnFocus = $('[aria-controls="'+$self.attr('id')+'"]');

          e.preventDefault();

          $html.removeClass('modal-is-open');
          $self.attr('aria-hidden', 'true');

          // remove the aria-hidden that was applied during modal open
          $('.'+bodyElements).removeAttr('aria-hidden');

          returnFocus.focus();

        },


        // on click of the modal overlay, close the modal
        overlayA11yModal = function ( e ) {

          if ( e.target === $self.find(modalDoc).parent().get(0) ) {
            closeA11yModal( e );
          }

        },


        // keyboard controls specific to the modal dialog windows
        keytrollsA11yModalTrigger = function ( e ) {

          var keyCode = e.keyCode || e.which;

          switch ( keyCode ) {

            // space & enter
            case 32:
            case 13:
              e.stopPropagation();
              $(this).trigger('click');
              break;

          } // switch

        },


        // keyboard controls for opened modals
        keytrollsA11yModal = function ( e ) {

          var keyCode = e.keyCode || e.which;

          if ( $html.hasClass('modal-is-open') ) {

            switch ( keyCode ) {

              // tab
              case 9:
                if ( !e.shiftKey && $self.find(modalClose).is(':focus') ) {
                  $(modalDoc).focus();
                }
                break;

              // esc
              case 27:
                closeA11yModal( e );
                break;

              // space & enter
              case 32:
              case 13:
                if ( $self.find(modalClose).is(':focus') ) {
                  e.stopPropagation();
                  closeA11yModal( e );
                }
                break;

            } // switch

          }

        },


        // trap focus within the modal window, because otherwise
        // users can tab to obscured elements, and that's just
        // bad UX.
        trapFocus = function () {
          var $trapArea = $self.find(modalDoc),
              $trapAreaClose = $self.find(modalClose);

          $(document).on('focusin.' + $self, function ( e ) {

            if ( $trapArea[0] !== e.target && !$trapArea.has(e.target).length) {
              $trapAreaClose.focus();
            }

          });

        }; // trap focus


        // run setup functions
        organizeDOM();
        setupA11yModal();
        setupA11yModalTriggers();


        // events specific to modal dialogs
        $self.on('keydown', keytrollsA11yModal.bind(this) );
        $self.on('click touchstart', overlayA11yModal.bind(this) );
        $self.find(modalClose).on('click', closeA11yModal.bind(this) );


        // open Modals aren't inside the modal component, hence the $(document)
        $(document).on('click', modalTrigger, openA11yModal );
        $(document).on('keydown', modalTrigger, keytrollsA11yModalTrigger );

      }); // end: return this.each()

    } // end: a11yModal: function

  }); // end: $.fn.extend

  $(modal).a11yModal();

} )( jQuery, this, this.document );

/*
  Numbler.js
*/

;(function ( $, w, doc ) {

  // enable strict mode
  'use strict';

  // Local object for method references
  var Numbler = {};

  // Namespacing
  Numbler.NS = "Numbler";
  Numbler.AUTHOR = "Scott O'Hara";
  Numbler.VERSION = "0.0.1";
  Numbler.LICENSE = "https://github.com/scottaohara/accessible-components/blob/master/LICENSE.md";


  // define the jQuery plug-in
  $.fn.extend({
    // numberTumbler can be called from any jQuery selector.
    Numbler: function () {

      // define the class names used for increasing/decreasing
      // the input's value.
      var btnUp   = '.js-num-up',
          btnDown = '.js-num-down';

      // If there's no JS, these buttons won't function.
      // So the btn-pill-area--numbers class has a default
      // rule of display: none;  .show() will override this.
      $('.btn-pill-area--numbers').show();

      // 'this' refers to the elements that were selected in
      // $(...) that happened just before this call. Resulting
      // in an array of jQuery elements. The each() will let us
      // run our code on each element found and allow us to chain
      // events.
      return this.each( function() {

        // define this for each instance of the numTum
        var id = this.id,
            $this = $(this),
            min = parseInt($this.attr('min'), 10) || 0,
            max = parseInt($this.attr('max'), 10) || 1e8,
            step = parseInt($this.attr('step'), 10) || 1,

        // function to increase the value
        addVal = function( e ) {
          var v = parseInt($this.val(), 10);

          // shorthand for v = v + step
          v += step;

          // if 'v' is higher than max, then
          // instead set the max value to 'v'
          v = Math.min(v, max);

          $this.val(v);
          checkVal();
          e.preventDefault();
        },

        // function to decrease the value
        subVal = function( e ) {
          var v = parseInt($this.val(), 10);

          v -= step;
          v = Math.max(v, min);

          $this.val(v);
          checkVal();
          e.preventDefault();
        },

        // various checks for input value
        checkVal = function ( e ) {
          var v = parseInt($this.val(), 10);

          // if a value is entered that is not a number,
          // reset counter back to the minimum value
          if ( isNaN(v) ) {
            v = 0;
            $this.val(v);
          }

          // if a value is entered is less than
          // the min value, then reset it to the
          // min value
          if ( v < min ) {
            v = min;
            $this.val(v);
          }

          // if a value is entered is more than
          // the max value, then reset it to the
          // max value
          if ( v > max ) {
            v = max;
            $this.val(v);
          }

        };

        checkVal();

        // on blur of input, check the value.
        $this.on( 'blur', checkVal );

        // add the appropriate attributes to each input
        // role and aria-live to announce the updated value
        // as the buttons control an input that they are not
        // actually attached to
        // step, max and min are added in if default values were
        // not set in the mar-kup
        $this.attr({
          'role' : 'alert',
          'aria-live' : 'assertive',
          'max' : max,
          'min' : min,
          'step' : step,
          'pattern' : '[0-9]*'
        })
        .addClass('clean-input-number');
        // .clean-input-number removes the native up/down
        // controls from number inputs so that we don't
        // have double controls going on here.


        $(btnUp + '[aria-controls="' + id + '"]').attr('title', 'Increase by ' + step).on('click', addVal.bind(this));

        $(btnDown + '[aria-controls="' + id + '"]').attr('title', 'Decrease by ' + step).on('click', subVal.bind(this));

        // test
        // console.log(btnUp + '[aria-controls="' + id + '"]', $(btnDown + '[aria-controls="' + id + '"]'));

      });
    }
  });

  $(".js-numbler").Numbler();


})( jQuery, this, this.document );


// Expected minimum Mark-up

// <div class="number-input-area">
//   <label for="unique_id">
//     Label for input:
//   </label>
//   <input type="number" class="js-numbler" name="unique_id" id="unique_id" />

//   <div class="btn-pill-area btn-pill-area--numbers">
//     <button class="js-num-up" type="button">
//       <span class="sr-only">
//         Increase
//       </span>
//       <span aria-hidden="true">+</span>
//     </button>

//     <button class="js-num-down" type="button">
//       <span class="sr-only">
//         Decrease
//       </span>
//       <span aria-hidden="true">-</span>
//     </button>
//   </div> <!-- end .number-controls -->
// </div>

;(function ( $, w, doc ) {

  'use strict';

  var a11yTabs = {};

  a11yTabs.NS = "a11yTabs";
  a11yTabs.AUTHOR = "Scott O'Hara";
  a11yTabs.VERION = "1.0.5";
  a11yTabs.LICENSE = "https://github.com/scottaohara/accessible-components/blob/master/LICENSE.md";

  var tabWidget = '[data-action="a11y-tabs"]';


  // define the plug-in
  $.fn.extend({

    a11yTabs: function ( e ) {

      // setup global class variables
      var noARIA              = 'data-aria',
          tabList             = '.js-tabs__list',
          tabBtn              = '.js-tabs__list__item',
          tabPanelContainer   = '.js-tabs__panel-container',
          tabPanel            = '.js-tabs__panel',
          tabDefault          = '.js-show-by-default',
          tabDEF              = tabDefault.split('.')[1];

      return this.each( function () {

        // set up variables specific to the each instance
        var id = this.id,
            $self = $('#' + id),


        /*

          Generate TabList

          In certain situations, it may be desirable to have a tab widget
          interface, but getting full access to a code base may not
          be possible. (working in a CMS for example)

          This function exists so that the required markup to get
          a tab widget up and running can be reduced to simply the
          tabWidget, tabPanelContainer, and the tabPanels

        */
        genTabList = function () {

          // determine if a tab component needs a generated tablist
          if ( !$self.find(tabList).length ) {

            // start a counter to number the panels in this widget
            var $panelNum = 1;

            // The tablist wasn't there, so let's add it in
            $self.prepend('<ul class="tab-list js-tabs__list" />');


            // now we need to cycle through all the existing panels to pull out
            // the necessary information to populate the tablist with tabs
            $self.find(tabPanel).each( function () {

              var $this = $(this);

              // create unique IDs for the panels, cause we'll need
              // them later when the aria-controls are set up.
              $this.attr('id', id + '_panel_' + $panelNum );

              // Now store the generated ID
              var $grabID = $this.attr('id'),
                  // create the tab label based off from a data
                  // attribute on the panel,
                  // OR the first heading (h1-h6) in the tab
                  // OR just call it Tab + # cause lol naming stuff
                  $grabLabel = $this.attr('data-tab-label') || $this.find(':header').first().text() || 'Tab' + $panelNum,

                  // Put it all together as a new <li>tab</li>
                  $createTabItem = '<li><a href="#'+$grabID+'" class="tab-list__item '+tabBtn.split('.')[1]+'">'+$grabLabel+'</a></li>';

              // Now append it to the tablist and repeat!
              $self.find(tabList).append($createTabItem);

              // add one to the number of panels and
              // start all over again
              return $panelNum = $panelNum + 1;

            }); // end $self.find(tabPanel).each

          } // end if

        }, // end genTabList()


        /**

          Setup Tab List & Tabs

        */
        tabsSetup = function () {

          var $tabItems = $(tabList + ' li'),
              $tabBtns = $self.find(tabBtn);

          // if ARIA is included, set up the appropriate aria-role
          // for the tablist. Also give it a unique ID based on the
          // a11y tabs component ID, whether ARIA is on or off.
          if ( !$self.attr(noARIA) ) {
            $self.find(tabList).attr({
              'role': 'tablist'
            })
          }
          $self.find(tabList).attr({'id': id + '_tablist'})
            // set the <li>s within the tab menu to have a
            // presentation role, to cut down on the verbose
            // audio declarations of list elements when using
            // voice over
            .find($tabItems).attr({
              'role': 'presentation'
            });


          // for each tab item (link/button) within this tab menu,
          // take the href and use it to apply the appropriate
          // aria-attributes
          // set aria-selected
          $tabBtns.each( function () {

            var $this = $(this),
                $getID = $this.attr('href').split('#')[1];

            $this.attr({
              'aria-controls': $getID,
              'id': $getID + '_tab',
              'aria-selected': 'false'
            });

            // if no ARIA, don't include these
            if ( !$self.attr(noARIA) ) {
              $this.attr({
                'tabindex': '-1',
                'role': 'tab'
              });
            }
          });



          // Normally the first item in a tab list should be activated
          // and its panel displayed.  js-show-by-default is how this is
          // set, because this class can also be added manually to a
          // tab, and it will instead be the tab that's shown by default
          if ( $self.find(tabDefault).length === 0 ) {
            $self.find(tabList + ' > li:first-child >').addClass(tabDEF);
          }

          // update the default tab with the appropriate attribute values
          $(tabDefault).attr({
            'aria-selected': 'true',
            'tabindex': '0'
          });

        },


        /**

          Setup Tab Panels

        */
        panelsSetup = function () {

          // check to make sure a tab-panel-container is part of the mark-up.
          // if not, then wrap all the tab panels in it.
          if ( !$self.find(tabPanelContainer).length ) {
            $self.find(tabPanel).wrapAll('<div class="tab-panel-container '+tabPanelContainer.split('.')[1]+ '" />')
          }

          // give the tab panel container a unique ID based off the
          // main ID of the a11y tabs component.
          $self.find(tabPanelContainer).attr({
            'id': id + '_tpc'
          });


          // find all the panels
          $self.find(tabPanel).each( function () {

            var $this = $(this);

            // set their attributes
            $this.attr({
              'aria-labelledby': $this.attr('id')+'_tab',
              'aria-hidden': 'true'
            });

            // Set role tabpanel if ARIA is not set to false
            if ( !$self.attr(noARIA) ) {
              $this.attr({ 'role': 'tabpanel' });
            }

            // check to make sure the correct panel is shown by default,
            // which is determined by the tab with the js-show-by-default class
            if ( $( '#'+ $this.attr('id')+'_tab' ).hasClass(tabDEF) ) {
              $this.attr('aria-hidden', 'false');
            }

          }); // end $self.find(tabPanel).each
        },


        /**

          Show Active Tab

        */
        tabsShow = function ( e ) {

          var $targetTab = $(this).find( e.target ),
              $notTargetTab = $targetTab.closest(tabList).find(tabBtn),
              $targetPanel = $('#' + $targetTab.attr('aria-controls') );

          // stop the uri to be added to the browser address bar,
          // and any browser jumping
          e.preventDefault();

          // hide the tabs again
          $notTargetTab.attr({'aria-selected': 'false'}).removeClass(tabDEF);
          if ( !$self.attr(noARIA) ) {
            $notTargetTab.attr({'tabindex': '-1'});
          }

          // activate the selected tab
          $targetTab.attr({'aria-selected': 'true'});
          if ( !$self.attr(noARIA) ) {
            $targetTab.attr({'tabindex': '0'});
          }

          // reset panels to hidden and reveal the newly selected panel
          $targetPanel.closest(tabPanelContainer).find('> ' + tabPanel).attr('aria-hidden', 'true');

          // reveal the currently targeted panel
          $targetPanel.attr('aria-hidden', 'false');
          if ( $self.attr(noARIA) ) {
            $targetPanel.attr('tabindex', '-1').focus();
          }

        },



        // make sure tabs function as expected by keyboard users
        // this makes sure that navigating through tabs is set to act
        // like navigating through radio buttons with a keyboard,
        // as a keyboard user should not have to keyboard tab through
        // undesired navigation tabs to get to content
        keytrolls = function ( e ) {

          var $eTarget = $(e.target),
              $currentTab,
              $currentTabList,
              $currentPanel,
              $tabListRole = '[role="tablist"]',
              keyCode = e.which;

          if ( $eTarget.attr('role') === 'tab' ) {
            $currentTab = $(e.target).parent();
            $currentTabList = $currentTab.closest($tabListRole);
          }
          else if ( $(e.target).closest(tabPanel) ) {
            $currentPanel = $(e.target).closest(tabPanelContainer);
            $currentTabList = $currentPanel.closest(tabWidget).find('> ' + $tabListRole);
            $currentTab = $currentTabList.find('[aria-selected="true"]').parent();
          }


          //now that we know our current tablist, we can declare these vars
          var $firstTab = $currentTabList.find('li:first-child').children(),
              $lastTab = $currentTabList.find('li:last-child').children(),
              $prevTab = $currentTab.prev().children(),
              $nextTab = $currentTab.next().children();

          // if the current tab is the first or last tab,
          // then update prev and next values
          if ( $currentTab.is(':first-child') ) {
            $prevTab = $lastTab;
          }
          else if ( $currentTab.is(':last-child') ) {
            $nextTab = $firstTab;
          }


          // depending on our e.target, define our keyboard controls
          if ( $(e.target).attr('role') === 'tab' ) {

            switch ( keyCode ) {


                case 39: // right
                case 40: // down
                  if ( !$self.attr(noARIA) ) {
                    e.preventDefault();
                    $nextTab.focus();
                  }
                  break;

                case 37: // left
                case 38: // up
                  if ( !$self.attr(noARIA) ) {
                    e.preventDefault();
                    $prevTab.focus();
                  }
                  break;

              case 13: // enter (return) key
              case 32: // space bar
                e.preventDefault();
                $(e.target).trigger('click');
                break;

              default:
                break;

            } // end switch

          }
          else if ( $(e.target).closest(tabPanel) && !$self.attr(noARIA) ) {

            if ( e.ctrlKey ) {
              e.preventDefault(); // prevent default behavior

              switch ( e.keyCode ) {

                case 38: // up
                  $currentTab.children().eq(0).focus();
                  break;

                case 33: // pg up
                  setTimeout(function () {
                    $prevTab.focus().click();
                  }, 10);

                  break;

                case 34: // pg down
                  setTimeout(function () {
                    $nextTab.focus().click();
                  }, 10);
                  break;

                default:
                  break;

              } // end switch

            } // end e.ctrlKey if

          } // end else if

        }; // end keytrolls


        // run setups on load
        genTabList();
        tabsSetup();
        panelsSetup();


        // Events
        $self.find(tabBtn).on( 'click', tabsShow.bind(this) );
        $self.find(tabBtn).on( 'keydown', keytrolls.bind(this) );
        $self.find(tabPanel).on( 'keydown', keytrolls.bind(this) );

      }); // end: return this.each()

    } // end a11yTabs function

  }); // end $.fn.extend

  // call it

  $(tabWidget).a11yTabs();

})( jQuery, this, this.document );



/*

  Expected Minimum Mark-up


  <!--

    The parent container MUST have:
      data-action="a11y-tabs"
      id="a_unique_id_goes_here"

    These two attributes are absolutely necessary for the plug-in to
    even recognize this as a tab widget.

    All classes without the prefix of 'js-' are for styling purposes,
    while the 'js-' classes are required as plug-in hooks.

    If not hard coded, a tablist will be generated. It will first look
    to see if a tab-panel has a data-tab-label set. If not, it will
    then look to see if there is a immediate heading for the tab panel
    (there should be since these are sections and they require a heading h2-h6).
    If neither of those are available, then a label will be generated based
    on the order of the panel. e.g. Panel number 3 gets a tab titled 'Tab 3'.

  -->


  <div class="tab-container" data-action="a11y-tabs" id="unique_id">

    <div class="tab-panel-container js-tabs-panel-container">
      <section class="tab-panel js-tabs__panel" data-tab-label="Yo">
        <h2>Heading of Panel 1</h2>
        <p>
          ...
        </p>
      </section> <!-- /.tab-panel -->
      <section class="tab-panel js-tabs__panel" data-tab-label="tab 2">
        <h2>Heading of Panel 2</h2>
        <p>
          ...
        </p>
      </section> <!-- /.tab-panel -->
      <section class="tab-panel js-tabs__panel" data-tab-label="tab 3">
        <h2>Heading of Panel 3</h2>
        <p>
          ...
        </p>
      </section> <!-- /.tab-panel -->
    </div> <!-- /.tab-panel-container -->

  </div> <!-- /.tab-container -->

*/

;(function ( $, w, doc ) {

  // enable strict mode
  'use strict';

  var a11yTT = {};

  a11yTT.init = function () {

    var $ttContainer          = $('.a11y-tip'),
        ttToggleClass         = 'a11y-tip--toggle',
        ttToggle              = '.'+ttToggleClass,
        ttTriggerClass        = 'a11y-tip__trigger',
        ttTriggerToggleClass  = 'a11y-tip__trigger--toggle',
        ttTrigger             = '.'+ttTriggerClass,
        ttTheTip              = '.a11y-tip__help';


    var setup = function () {

      // this will be needed for any components that don't have an ID set
      var count = 1;

      $ttContainer.each( function () {
        var $self = $(this),
            $trigger = $self.find(ttTrigger),
            $tip = $self.find(ttTheTip);


        // if a trigger is not an inherently focusable element, it'll need a
        // tabindex. But if it can be inherently focused, then don't set a tabindex
        if ( !$trigger.is('a') && !$trigger.is('button') && !$trigger.is('input') && !$trigger.is('textarea') && !$trigger.is('select') ) {
          $trigger.attr('tabindex', '0');
        }

        // if a tip doesn't have an ID, then we need to generate one
        if ( !$tip.attr('id') ) {
          $tip.attr('id', 'tool_tip_' + count );
        }

        // if a trigger doesn't have an aria-described by, then we need
        // to point it to the tip's ID
        if ( !$trigger.attr('aria-describedby') ) {
          $trigger.attr('aria-describedby', $tip.attr('id') );
        }

        // if the element after a tooltip trigger does not have
        // the role of tooltip set, then set it.
        if ( !$tip.attr('role') ) {
          $tip.attr('role', 'tooltip');
        }


        // if a tip container has ttToggleClass,
        // we need to make sure the trigger is a button
        if ( $self.hasClass(ttToggleClass) ) {

          var $this = $(this),
              $originalTrigger = $this.find(ttTrigger).html().trim(),
              $newButton = '<button type="button" class="'+ttTriggerClass+' '+ttTriggerToggleClass+'"/>',
              $getTipId = $this.find(ttTheTip).attr('id');

          $this.find(ttTrigger).replaceWith($newButton);
          $this.find(ttTrigger).append($originalTrigger).attr({
            'aria-describedby': $getTipId,
            'aria-expanded': 'false'
          });

        }

        // end the loop, increase count by 1
        return count = count + 1;
      });

    }


    setup();

    // if a keyboard user doesn't want/need the tooltip anymore
    // allow them to hide it by pressing the ESC key.
    // once they move focus away from the element that had the
    // the tooltip, remove the hide-tip class so that the
    // tip can be accessed again on re-focus.
    $(ttTrigger).on('keydown', function ( e ) {
      var $self = $(this);

      if ( e.which == 27 ) {
        $self.parent().addClass('a11y-tip--hide');
        e.preventDefault();
        return false;
      }
    })
    .on('blur', function () {
      var $parent = $(this).parent();

      if ( $parent.hasClass('a11y-tip--hide') ) {
        $parent.removeClass('a11y-tip--hide');
      }

    });

    $('.'+ttTriggerToggleClass).on('click', function ( e ) {
      var $this = $(this);

      if ( $this.attr('aria-expanded') === 'true' ) {
        $this.attr('aria-expanded', 'false');
      }
      else if ( $this.attr('aria-expanded') === 'false' ) {
        $this.attr('aria-expanded', 'true');
      }

    });

  }; // end TT.init


  // Get this TT going!
  a11yTT.init();


})( jQuery, this, this.document );

/* ******************************************

  Debounce Function

******************************************* */

function debounce ( func, wait, immediate ) {
  var timeout;

  return function () {
    var context = this,
        args = arguments;

    var later = function () {

      timeout = null;

      if ( !immediate ) {
        func.apply( context, args );
      }

    }; // later

    var callNow = immediate && !timeout;

    clearTimeout ( timeout );

    timeout = setTimeout ( later, wait );

    if ( callNow ) {
      func.apply( context, args );
    }

  };
}

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

/* ******************************************

  Cross browser jump link fix

	Jump link fix for browsers that don't support
  focus change after clicking a jump link

******************************************* */


window.addEventListener( "hashchange", function( e ) {

  var el = document.getElementById( location.hash.substring( 1 ) );

  if ( el ) {

    if ( !/^(?:a|select|input|button|textarea)$/i.test( el.tagName ) ) {
      el.tabIndex = -1;
    }

    el.focus();
  }

}, false );

// toggle attribute value
function toggleState ( el, attrb, onState, offState ) {
  el.attr(attrb, el.attr(attrb) === offState ? onState : offState);
}


/*

  Example usage:

    toggleState( $self, 'aria-expanded', 'true', 'false' );

*/

;(function($, w, doc){

  "use strict";

  // Local object for method references
  var Nav = {};

  // Namespace
  Nav.ns = "Navigation";

  /*
    Grab the screen size psuedo element content
  */

  Nav.isScreenSize = function( sizeString ) {

    var size = w.getComputedStyle(doc.body,':before').getPropertyValue('content');

    if( size && size.indexOf( sizeString ) !==-1 ) {
      return true;
    }

  };

  /*
    Anything you need to create the small screen namvigation
  */

  Nav.createSmallView = function( parentMenu, subMenu ) {

    // don't run this code if it already ran, please
    if( parentMenu.hasClass('responsive-nav') ) {
      return;
    }

    var anchorText = parentMenu.find('a').first().text();
    var idSlug = anchorText.toLowerCase().replace(/ /g,"-");
    var randomNumber= Math.floor( Math.random()*9999 );
    var slug = idSlug + randomNumber;
    var button;
    var buttonText;
    var inverseText;

    subMenu.attr('aria-expanded', 'false').attr('id', slug);
    parentMenu.addClass('is-expandable').addClass('responsive-nav');
    parentMenu.find('> a').first().after('<button type="button" aria-controls="' + slug + '" class="ui-toggle-button" data-text="close">open</button>');

    parentMenu.find('.ui-toggle-button').first().on('click', function() {

      button = $(this);
      buttonText = button.text();
      inverseText = button.attr('data-text');

      if( subMenu.attr('aria-expanded') === 'false' ) {

        subMenu.attr('aria-expanded', 'true');
        subMenu.focus();

      } else {

        subMenu.attr('aria-expanded', 'false');
        button.focus();

      }

      // toggle the button text
      button.attr('data-text', buttonText).text(inverseText);

    });

  }; // Nav.createSmallView

  /*
    Anything you need to do to remove elements that were just for small screen
  */

  Nav.destroySmallView = function( parentMenu, subMenu ) {

    subMenu.removeAttr('aria-expanded');
    parentMenu.removeClass('is-expandable');
    parentMenu.find('.ui-toggle-button').remove();
    parentMenu.removeClass('responsive-nav');

  }; // Nav.destroySmallView

  /*
    Blur event to close the menu when tabbing through
  */

  Nav.blur = function( self, parentContainer ) {

    parentContainer = self.closest('.menu-item.has-children');

    if( parentContainer.find('.sub-menu').find('ul > li').children(':focus').length === 0 ) {
      parentContainer.removeClass('child-has-focus');
    }

  } // Nav.blur

  /*
    Focus event to expose submenus while tabbing
  */

  Nav.focus = function ( self ) {

    self.closest('.menu-item.has-children').addClass('child-has-focus');

  } // Nav.focus

  /*
    Small screen menu toggle
  */

  $('.nav-menu-toggle').on('click', function(e) {

    e.preventDefault();

    var self = $(this);
    var body = $('body');
    var targetId = self.attr('aria-controls');
    var targetZone = $('#' + targetId);

    if( body.hasClass('nav-is-active') ) {

      self.trigger('navclose');
      body.removeClass('nav-is-active');
      targetZone.attr('aria-expanded', 'false');

    } else {

      self.trigger('navopen');
      body.addClass('nav-is-active');
      targetZone.attr('aria-expanded', 'true').focus();

    }

  }); // menu toggle

  /*
    Loop over all the menu items to see if they have child nodes
  */

  $('.menu-item').each(function() {

    var self = $(this);
    var menuChildren = self.children().length;

    // check to see if any menus have children
    if(menuChildren > 1) {

      self.addClass('has-children');

    }

  }); // each menu-item

  /*
    Loop through the sub menus
  */

  if( $('.menu-item.has-children').length > 0 ) {

    $('.menu-item.has-children').each(function() {

      var self = $(this);
      var parentMenu = self;
      var subMenu = self.find('.sub-menu').first();
      var subMenuAnchor = subMenu.find('a');
      var parentContainer;

      // focus
      subMenuAnchor.on('focus', function() {
        Nav.focus( $(this) );
      });

      // blur
      subMenuAnchor.on('blur', function() {
        Nav.blur( $(this), parentContainer );
      }); // blur event

      // create small screen navigation
      if( Nav.isScreenSize( 'mediumscreen' ) || Nav.isScreenSize( 'smallscreen' ) ) {
        Nav.createSmallView(parentMenu, subMenu);
      }

    }); // each()

    /*
      Resize event to create and destory the navigation
    */

    $(w).on('resize', function() {

      var targetTrigger = $('.nav-menu-toggle');
      var targetId = targetTrigger.attr('aria-controls');
      var targetZone = $('#' + targetId);

      if( Nav.isScreenSize( 'mediumscreen' ) || Nav.isScreenSize( 'smallscreen' ) ) {

        var parentMenu;
        var subMenu

        $('.menu-item.has-children').each(function() {

          parentMenu = $(this);
          subMenu = parentMenu.find('.sub-menu');

          Nav.createSmallView( parentMenu, subMenu );

        }); // each menu with children

        if ( $('body').hasClass('nav-is-active') ) {
          targetZone.attr('aria-expanded', 'true');
        }

      } else {

        $('.menu-item.has-children').each(function() {

          parentMenu = $(this);
          subMenu = parentMenu.find('.sub-menu');

          Nav.destroySmallView( parentMenu, subMenu );

        }); // each menu with children

      }

      if ( targetZone.attr('aria-expanded') && Nav.isScreenSize( 'largescreen' ) ) {

        targetZone.removeAttr('aria-expanded');

      }

    }); // resize

  }// if has-children

} ( jQuery, this, this.document ));

/*! SVG Icon Sprite Polyfill for IE9+
 * Copyright 2015 Tim Wright
 * Licensed under MIT
 * https://github.com/timwright12/SVG-Icon-Sprite-Polyfill/
 * 
 * HTML Example Usage:
 * 
 * <svg role="img" aria-label="Golf clubs in a bag" class="icon icon-add-to-my-bag">
 *   <title>Golf clubs in a bag</title>
 *   <use xlink:href="img/svg-defs.svg#icon-add-to-my-bag"></use>
 * </svg>
 */

;(function (doc) {
  
  // Enable strict mode
  "use strict";
  
  // Local object for method references
  var App = {};
  
  // A proper namespace
  App.ns = "SVG Sprite Polyfill";
  
  // Ajax that isn't jquery?!?!
  App.ajax = function(loopObj, callback) {
    
    var request = new XMLHttpRequest();
    var response;
    
    request.open('GET', loopObj, true);
      
      request.onload = function() {
        if (request.status >= 200 && request.status < 400) {

          response = request.responseText;
          
          if (typeof callback === 'function') {
            callback.call(this, response);
          }
          
        } else {
          
          console.log('Error reaching the server');
        
        }
        
      };
      
      request.onerror = function() {
        
        console.log('Connection error');
      
      };
      
      request.send();
    
  }; // Ajax
  
  // Start the application
  App.init = function() {
    
    // Set up and cache variables
    var svgUse = doc.querySelectorAll("svg > use");
    var fragment = App.create('<div id="svg-poly-target" style="position: absolute;height: 0; width: 0;"></div>');
    var svgUrls = [];
    var attrArray = [];
    var url;
    var hash;
    var i;
    var j;
    var obj;
    var loopObj;
    var attr;
    
    // Insert the document fragment catch the contents of the SVG
    doc.body.insertBefore(fragment, doc.body.childNodes[0]);
    
    // Loop through all the svg <use> elements
    for (i = 0; i < svgUse.length; i = i + 1) {
      
      obj = svgUse[i];
      attr = obj.getAttribute('xlink:href');
      attrArray = attr.split('#');
      url = attrArray[0];
      hash = attrArray[1];
      
      if( url ) {
        svgUrls.push( url );
        obj.setAttribute('xlink:href', '#' + hash);
      }
      
    } // for
    
    // Remove duplicate URLs from the array so we're not making double Ajax calls
    svgUrls = svgUrls.filter( function( item, pos ) {
      return svgUrls.indexOf(item) == pos;
    });
    
    // Loop through all the URLs in the Array
    for (j = 0; j < svgUrls.length; j = j + 1) {
      
      loopObj = svgUrls[j];
      
      App.ajax( loopObj, function( response ) {
        doc.getElementById('svg-poly-target').innerHTML += response;
      });

    } // for

  }; // App.init
  
  // Helper function to create a document fragment
  
  App.create = function( htmlStr ) {

    var frag = doc.createDocumentFragment();
    var temp = doc.createElement('div');
    
    temp.innerHTML = htmlStr;
    
    while ( temp.firstChild ) {
      frag.appendChild(temp.firstChild);
    }
    
    return frag;

  };
  
  // Only use it in IE, this should be a feature detect, but... I'm not sure what the feature is to detect.
  
  /MSIE|Trident/.test(navigator.userAgent) && doc.addEventListener('DOMContentLoaded', function () {
  
    App.init();
  
  });

} )( this.document );

$(function () {
  var $loadMoreBtn = $('[data-action="load-more"]');
  var loadMoreArea = '.load-more-area';

  $loadMoreBtn.on('click', function () {

    $(this).closest(loadMoreArea).next('.load-more-next').removeClass('display-none').attr('tabindex', '-1').focus();
    $(this).closest(loadMoreArea).next('.load-more-next').next(loadMoreArea).removeClass('display-none');

    $(this).closest(loadMoreArea).remove();
  });

});

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

;(function ( $, w, doc ) {

  'use strict';

  var customFile = {},
      $html      = $('html'),
      widget     = '[data-action="custom-file"]';

  customFile.NS = "customFile";
  customFile.AUTHOR = "Scott O'Hara";
  customFile.VERSION = "1.0.0";
  customFile.LICENSE = "MIT";


  // define the plug-in
  $.fn.extend({

    customFile: function ( e ) {

      // global vars
      var widgetInputWrap = '.custom-file__input-wrap',
          widgetInput     = '.custom-file__input';

      // run on each instance of the widget
      return this.each( function () {

        var id = this.id,
            $self = $('#' + id),


        // setup the custom file upload widget(s)
        initCustomFile = function () {

          $(widget).addClass('custom-file');

          var defaultText         = 'Select a file...',
              widgetLabel         = document.createElement('span'),
              widgetFalseBtn      = document.createElement('span'),
              widgetLabelTxt      = document.createTextNode(defaultText),
              widgetFalseBtnTxt   = document.createTextNode('Browse');


          // on refresh, make sure the value is empty
          $self.find(widgetInput).val('');

          // Create elements that should only exist if
          // JavaScript is enabled.
          $self.find(widgetInputWrap).each( function () {

            var $this = $(this);

            // as long as a file upload input isn't disabled,
            // be sure to add a title attribute to the widget
            if ( !$this.find(widgetInput).attr('disabled') ) {
              $this.attr('title', 'no file selected');
            }

            // it'd be best to not reset the val to empty,
            // and instead set the title and placeholder text
            // back to what files were last uploaded before refresh
            // if ( $this.find(widgetInput).val() !== '') {
              /* TO DO */
            // }

            widgetLabel.className = 'custom-file__placeholder';
            widgetLabel.setAttribute('aria-hidden', 'true');
            widgetLabel.appendChild(widgetLabelTxt);

            widgetFalseBtn.className = 'btn btn--file-input';
            widgetFalseBtn.setAttribute('aria-hidden', 'true');
            widgetFalseBtn.appendChild(widgetFalseBtnTxt);

            $this.append(widgetLabel);
            $this.append(widgetFalseBtn);

          });

        }, // end initCustomFile

        // manage visual focus states
        tabbing = function ( e ) {

          if ( $(e.target).attr('type') === 'file' ) {
            $self.toggleClass('is-focused');
          }

        };

        // run init on load
        initCustomFile();


        // Events
        $self.find(widgetInput).on( 'blur', tabbing.bind(this) );
        $self.find(widgetInput).on( 'focus', tabbing.bind(this) );

        $self.find(widgetInput).on( 'change', function () {

          var $this = $(this);

          if ( $this[0].files.length > 1 ) {
            $self.find('.custom-file__placeholder').text( parseInt($this[0].files.length) +  ' files');

          }
          else {
            $self.find('.custom-file__placeholder').text( $this.val() ).attr('aria-hidden', 'false').attr('aria-live', 'polite');
          }

          // grab the file(s) that were uploaded and
          var fileNames = $this.prop("files"),
              listNames = $.map( fileNames, function ( val ) {
            return val.name;
          });

          $self.find(widgetInputWrap).attr('title', listNames );

        });

      }); // end return this.each

    } // end customFile function

  }); // end $.fn.extend

  // call it
  $(widget).customFile();


})( jQuery, this, this.document );

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
