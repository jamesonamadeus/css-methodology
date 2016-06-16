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
            $self = $('#' +  id),


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
