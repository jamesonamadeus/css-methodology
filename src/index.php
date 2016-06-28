<?php
  $title = 'CSS Methodology';
  $desc = 'the overview';
  include 'includes/app-enter.php';
?>

<div class="page" id="page">
  <?php
    include 'includes/app-header.php';
  ?>

  <main role="main" aria-label="Main Content">
    <div class="content-area content-area--clear">

    <section class="hero">

      <div class="hero__feature">
        <picture>
          <source srcset="assets/images/lg-hero.jpg, assets/images/hi-res-hero.jpg 2x" media="(min-width: 600px)">
          <source srcset="assets/images/portrait-hero.jpg, assets/images/lg-hero.jpg 2x">
          <img alt="image alt text goes here" src="assets/images/portrait-hero.jpg">
        </picture>
      </div> <!--/.hero__feature -->

      <div class="hero__content hero__content--center-overlay">
        <div class="hero__content__inner">

          <div class="flex-area flex-area--no-gutter flex-area--mt-0">
            <div class="flex-w-100 flex-order-2">
              <h1 class="hero__content__title">
                <!-- Your page specific title goes here. -->
              </h1>
            </div>
            <div class="flex-w-100 flex-order-1">
              <div class="hero__content__title-meta">
                <p>
                  <!-- Meta intro tag goes here -->
                </p>
              </div><!--/.hero__content__lead-bar-->
            </div>
          </div>

          <div class="hero__content__message">
            <p class="txt-p--lg">CSS Methodology is a formal method in writing scalable and maintainable frontend code.</p>
            <p class="txt-p--lg">"Just enough" overview to start writing scalable code right away.</p>
            <p></p>
          </div><!--/.hero-message-->

        </div><!--.hero__content-inner-->
      </div><!--/.hero__content-->

    </section>

    </div>
  </main>

  <?php
    include 'includes/app-footer.php';
  ?>
</div>

<?php
  include 'includes/app-exit.php';
?>
