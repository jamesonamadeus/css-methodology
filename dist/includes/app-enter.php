<!doctype html>
<html lang="en-us" dir="ltr" class="no-js">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <title><?php if( isset($title) ) { echo $title; } ?></title>
    <meta name="description" content="<?php if( isset($desc) ) { echo $desc; } ?>">

    <link rel="dns-prefetch" href="//ajax.googleapis.com" />
    <link rel="dns-prefetch" href="//fonts.googleapis.com" />

    <meta http-equiv="cleartype" content="on" />

    <script>
      // remove no-js and add 'js' & 'has-js' to the HTML
      document.documentElement.className = document.documentElement.className.replace('no-js', " ");
      document.documentElement.className += ' js has-js ';
    </script>

    <?php
      // load critical & app CSS here
      include 'includes/app-enter__chunks/css.php';

      // font loading
      include 'includes/app-enter__chunks/fonts.php';

      // gotta tackle that IE nonsense
      include 'includes/app-enter__chunks/if-ie9.php';

      // app branding, icons & favicons
      include 'includes/app-enter__chunks/favicons.php';
    ?>

  </head>
  <body id="body">
