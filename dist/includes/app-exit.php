    <script>
      /*!
      Modified for brevity from https://github.com/filamentgroup/loadCSS
      loadCSS: load a CSS file asynchronously.
      [c]2014 @scottjehl, Filament Group, Inc.
      Licensed MIT
      */
      function loadCSS (href) {
        var ss  = window.document.createElement('link'),
            ref = window.document.getElementsByTagName('head')[0];

        ss.rel = 'stylesheet';
        ss.href = href;

        // temporarily, set media to something non-matching to ensure it'll
        // fetch without blocking render
        ss.media = 'only x';

        ref.parentNode.insertBefore(ss, ref);

        setTimeout( function () {
          // set media back to `all` so that the stylesheet applies once it loads
          ss.media = 'all';
        },0);
      }
      loadCSS('assets/css/app.css');
    </script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
    <script src="assets/js/vendor.concat.js"></script>
    <script src="assets/js/app.js"></script>
  </body>
</html>
