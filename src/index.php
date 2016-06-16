<?php
  $title = 'Page Title | Site Title';
  $desc = 'Page description here';
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

      <div class="hero__content hero__content--bottom-overlay">
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
            <p>CSS Methodology is a formal way to structure for architecting CSS in a way that grants us to develop, upkeep, and scale the front-end in a strategic route with minimal, isolated modules. As opposed to as one immense piece of insoluble code.</p>
            <p>Familiarizing oneself with various CSS Methodologies is influential as it gives the opportunity to produce ascendable code for share to the open-source and community.</p>
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
