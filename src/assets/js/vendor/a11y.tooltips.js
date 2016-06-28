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
