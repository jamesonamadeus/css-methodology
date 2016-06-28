<?php
  $title = 'CSS Methodology 101 | ACSS';
  $desc = 'Atomic CSS';
  include 'includes/app-enter.php';
?>

<div class="page" id="page">
  <?php
    include 'includes/app-header.php';
  ?>

  <main role="main" aria-label="Main Content">
    <div class="content-area">
      <div class="box--underline">
        <h1 class="txt-up-5 mb-0">Atomic CSS <sup class="txt-up-3">[ACSS]</sup></h1>
      </div>

      <section class="content-area content-area--divider-bottom">
        <h2 class="txt-up-4 mb-20">
            The 101
        </h2>
          <blockquote class="txt-up-3">Think of code as irreducible building blocks such as legos.</blockquote>
      </section>

      <section class="content-area content-area--divider-bottom">
        <h2 class="txt-up-4 mb-20">
            3 Points
        </h2>
        <ul>
          <li class="txt-up-1">Each individual code (lego piece) does not pertain to a specific context but rather has the ability and range to be reused through out a project.</li>
          <li class="txt-up-1">Each class for most part is associated to one particular style. Thus, the class names are simple abbreviations of the declaration. (e.g. a class named "M-10" represents margin: 10px) Similar to the syntax of zen coding.</li>
          <li class="txt-up-1">Most importantly, the elements are styled through the markup with classes that are mapped with declarations. Inline styling without the @style.</li>
        </ul>
      </section>

      <section class="content-area content-area--divider-bottom">
        <h2 class="txt-up-4 mb-20">
            Examples
        </h2>
        <div class="accordion" data-action="is-accordion" data-multi-open="true" id="accGen" role="tablist" aria-multiselectable="true">

          <button type="button" data-href="#accGen_panel_1" class="accordion__trigger" aria-controls="accGen_panel_1" aria-expanded="false" aria-selected="false" id="accGen_panel_1_tab" role="tab" tabindex="-1">Tab Label</button>
          <div class="accordion__panel" data-tab-label="Tab Label" id="accGen_panel_1" aria-hidden="true" aria-labelledby="accGen_panel_1_tab" role="tabpanel">
            <p>
              "But I must explain to you how all this mistaken idea of denouncing pleasure
               and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, <a href="#!">because it is pain, but because occasionally</a> circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"
            </p>
          </div>

          <button type="button" data-href="#accGen_panel_2" class="accordion__trigger" aria-controls="accGen_panel_2" aria-expanded="false" aria-selected="false" id="accGen_panel_2_tab" role="tab" tabindex="-1">
          Tab Heading
          </button>
          <div class="accordion__panel" id="accGen_panel_2" aria-hidden="true" aria-labelledby="accGen_panel_2_tab" role="tabpanel">
            <h3>
              Panel Heading
            </h3>
            <p>
              "But I must explain to you how all this mistaken idea of denouncing pleasure
               and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, <a href="#!">because it is pain, but because occasionally</a> circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"
            </p>
          </div>

          <button type="button" data-href="#accGen_panel_3" class="accordion__trigger" aria-controls="accGen_panel_3" aria-expanded="false" aria-selected="true" id="accGen_panel_3_tab" role="tab" tabindex="0">Tab 3</button>
          <div class="accordion__panel" id="accGen_panel_3" aria-hidden="true" aria-labelledby="accGen_panel_3_tab" role="tabpanel">
            <p>
              "But I must explain to you how all this mistaken idea of denouncing pleasure
               and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, <a href="#!">because it is pain, but because occasionally</a> circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"
            </p>
          </div>
        </div>
      </section>

      <section class="content-area content-area--divider-bottom">
        <h2 class="txt-up-4 mb-20">
          Benefits
        </h2>
        <div class="tab-container tab-container--side-tabs" data-action="a11y-tabs" id="another_a11ytabwidget">

          <ul class="tab-list js-tabs__list" role="tablist" id="another_a11ytabwidget_tablist">
            <li role="presentation">
              <a href="#panel1abb" class="tab-list__item js-tabs__list__item" aria-controls="panel1abb" id="panel1abb_tab" aria-selected="false" tabindex="-1" role="tab">
                 Less Bloat
              </a>
            </li>
            <li role="presentation">
              <a href="#panel2abb" class="tab-list__item js-tabs__list__item" aria-controls="panel2abb" id="panel2abb_tab" aria-selected="false" tabindex="-1" role="tab">
                 Faster Development
              </a>
            </li>
            <li role="presentation">
              <a href="#panel3abb" class="tab-list__item js-tabs__list__item" aria-selected="true" tabindex="0" aria-controls="panel3abb" id="panel3abb_tab" role="tab">
                 Better Caching
              </a>
            </li>
            <li role="presentation">
              <a href="#panel4abb" class="tab-list__item js-tabs__list__item" aria-selected="true" tabindex="0" aria-controls="panel3abb" id="panel3abb_tab" role="tab">
                 Less abstraction
              </a>
            </li>
            <li role="presentation">
              <a href="#panel5abb" class="tab-list__item js-tabs__list__item" aria-selected="true" tabindex="0" aria-controls="panel3abb" id="panel3abb_tab" role="tab">
                 Minimal CSS Maintenance
              </a>
            </li>
          </ul>

          <div class="tab-panel-container js-tabs__panel-container" id="another_a11ytabwidget_tpc">
            <section id="panel1abb" class="tab-panel js-tabs__panel" aria-labelledby="panel1abb_tab" aria-hidden="true" role="tabpanel">
              <div class="content-area">
                <h2 class="txt-up-3">Entire modules can be built without adding a single line to the style sheets.</h2>
                <p>As each class is being used and reused, there will not be lines of redundancy throughout the CSS.</p>
              </div>
            </section> <!-- /.tab-panel -->

            <section id="panel2abb" class="tab-panel js-tabs__panel" aria-labelledby="panel2abb_tab" aria-hidden="true" role="tabpanel">
              <div class="content-area">
                <h2 class="txt-up-3">Styles are driven by classes that are not related to content, so we can copy and paste existing modules to get started.</h2>
                <p>Styles are driven by classes that are not related to content, so we can copy and paste existing modules to get started.</p>
              </div>
            </section> <!-- /.tab-panel -->

            <section id="panel3abb" class="tab-panel js-tabs__panel" aria-labelledby="panel3abb_tab" aria-hidden="false" role="tabpanel">
              <div class="content-area">
                <h2>Heading</h2>
                <p>content panel 3</p>
                <p><a href="#!">Text link to allow for focusable item in this panel.</a></p>
              </div>
            </section> <!-- /.tab-panel -->

            <section id="panel4abb" class="tab-panel js-tabs__panel" aria-labelledby="panel4abb_tab" aria-hidden="false" role="tabpanel">
              <div class="content-area">
                <h2>Heading</h2>
                <p>content panel 3</p>
                <p><a href="#!">Text link to allow for focusable item in this panel.</a></p>
              </div>
            </section> <!-- /.tab-panel -->

            <section id="panel5abb" class="tab-panel js-tabs__panel" aria-labelledby="panel5abb_tab" aria-hidden="false" role="tabpanel">
              <div class="content-area">
                <h2>Heading</h2>
                <p>content panel 3</p>
                <p><a href="#!">Text link to allow for focusable item in this panel.</a></p>
              </div>
            </section> <!-- /.tab-panel -->

          </div> <!-- /.tab-panel-container -->

        </div>
      </section>

      <section class="content-area content-area--divider-bottom">
          <h2 class="txt-up-4 mb-20">
              Words From The Authors
          </h2>

          <div class="tab-container" data-action="a11y-tabs" id="no_tabs_by_def">

            <div class="tab-panel-container js-tabs-panel-container">
              <section class="tab-panel js-tabs__panel" data-tab-label="Thierry Koblentz">
                <p class="txt-bold">
                  How did Atomic CSS come to be and what was your path getting there?
                </p>
                <figure class="blockquote-callout">
                  <blockquote class="blockquote-callout__quote">
                    <p>
                      Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                    </p>
                  </blockquote>
                </figure>

                <p class="txt-bold">
                  Could you share any lessons learned during the development of ACSS?
                </p>
                <figure class="blockquote-callout">
                  <blockquote class="blockquote-callout__quote">
                    <p>
                      Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                    </p>
                  </blockquote>
                </figure>
              </section>

              <section class="tab-panel js-tabs__panel" data-tab-label="Dave Carlson">
                <p class="txt-bold">
                  How did Atomic CSS come to be and what was your path getting there?
                </p>
                <figure class="blockquote-callout">
                  <blockquote class="blockquote-callout__quote">
                    <p>
                      Kogi YOLO skateboard banh mi bitters, portland meditation butcher before they sold out pug. Direct trade church-key blog vegan vice, seitan neutra skateboard tousled chillwave gluten-free normcore. Irony kogi PBR&B tilde. Church-key austin forage photo booth messenger bag, cornhole tattooed. Put a bird on it squid pop-up, +1 semiotics keytar vegan small batch. +1 intelligentsia 90's put a bird on it chartreuse, seitan lumbersexual next level twee sustainable kickstarter YOLO aesthetic 3 wolf moon. Occupy blog YOLO normcore chicharrones green juice, shoreditch freegan distillery everyday carry actually semiotics XOXO.
                    </p>
                  </blockquote>
                </figure>

                <p class="txt-bold">
                  Could you share any lessons learned during the development of ACSS?
                </p>
                <figure class="blockquote-callout">
                  <blockquote class="blockquote-callout__quote">
                    <p>
                      Blog intelligentsia chicharrones, helvetica man bun everyday carry tattooed vice. Offal messenger bag mixtape, freegan franzen bitters brooklyn typewriter squid lumbersexual portland kinfolk. PBR&B banh mi chambray put a bird on it cred direct trade. Cornhole paleo readymade, trust fund four loko typewriter butcher drinking vinegar portland offal pinterest sriracha. Banjo locavore farm-to-table ennui celiac. +1 yr tofu kombucha, affogato PBR&B kitsch disrupt fanny pack chicharrones twee sartorial. Vegan next level artisan, taxidermy keffiyeh fixie cred seitan.
                    </p>
                  </blockquote>
                </figure>
              </section>
              <section class="tab-panel js-tabs__panel" data-tab-label="Jon Snow">
                <p class="txt-bold">
                  Could you share any lessons learned during the development of ACSS?
                </p>
                <figure class="blockquote-callout">
                  <blockquote class="blockquote-callout__quote">
                    <p>
                      Six times in last thousand years a King Beyond the Wall has attacked the Kingdoms. Six times they failed... Every boy in the North knows it. We grow up learning it. Where the battles were fought. The names of the heroes. Who died where. Six times you've invaded and six times you've failed. The seventh will be the same.
                    </p>
                  </blockquote>
                </figure>
              </section>
              <section class="tab-panel js-tabs__panel" data-tab-label="Sansa Stark">
                <h2>Sansa Stark</h2>
                <p>
                  Paragraph text goes here and fills up the panel
                  with super useful information that you'll
                  absolutely love to read.
                  <a href="#">this is here to test in panel keyboard controls</a>
                </p>
              </section>
            </div>

          </div>
        </section>

        <section class="content-area content-area--divider-bottom">
          <h2 class="txt-up-4 mb-20">
              Under The Fold
          </h2>
          <p>
            Take a look at the Atomic CSS in action with this entire page
            architectured in ACSS Methodology. <a href="#">View Here</a>
          </p>
        </section>

        <section class="content-area content-area--divider-bottom more-info">
          <h2 class="txt-up-4 mb-20">
              Dive In Deeper
          </h2>
          <ul>
            <li>
              <a href="http://acss.io/" target="_blank">
                Atomic CSS Website
              </a>
            </li>
            <li>
              <a href="https://github.com/acss-io" target="_blank">
                ACSS Github
              </a>
            </li>
            <li>
              <a href="https://www.haikudeck.com/atomic-css-science-and-technology-presentation-dJ0xlFjhBQ" target="_blank">
                Atomic CSS Presentation Deck
              </a>
            </li>
            <li>
              <a href="https://www.smashingmagazine.com/2013/10/challenging-css-best-practices-atomic-approach/" target="_blank">
                CSS Best Practices Article
              </a>
            </li>
            <li>
              <a href="https://www.youtube.com/watch?v=ojj_-6Xiud4" target="_blank">
                Atomic CSS Video
              </a>
            </li>
          </ul>
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
