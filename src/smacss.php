<?php
  $title = 'CSS Methodology 101 | SMACSS';
  $desc = 'Scalable and Modular Architecture for CSS';
  include 'includes/app-enter.php';
?>

<div class="page" id="page">
  <?php
    include 'includes/app-header.php';
  ?>

  <main role="main" aria-label="Main Content">
    <div class="content-area">
      <div class="box--underline">
        <h1 class="txt-up-5 mb-0">Scalable &amp; Modular Architecture for CSS<sup class="txt-up-3">[SMACSS]</sup></h1>
      </div>

      <section class="content-area content-area--divider-bottom">
        <h2 class="txt-up-4 mb-20">
            The 101
        </h2>
          <blockquote class="txt-up-3"></blockquote>
      </section>

      <section class="content-area content-area--divider-bottom">
        <h2 class="txt-up-4 mb-20">
            Points To Know
        </h2>
        <ul>
          <li class="txt-up-1">A method that utilizes one declaration (single property &amp; value) per selector (class).</li>
          <li class="txt-up-1">The elements are styled through the markup with classes that are mapped with declarations. Inline styling without the @style, (almost).</li>
          <li class="txt-up-1">Atomic CSS is (almost) like inline styling except that it is real CSS, thus cacheable. In addition, ACSS can do media queries and psuedo classes unlike inline styling.</li>
          <li class="txt-up-1">Each individual code (lego piece) does not pertain to a specific context but rather has the ability and range to be reused through out a project. Maxmize on re-use.</li>
          <li class="txt-up-1">It is not for every project. Yes, it is a fantastic approach for large sites, but not as beneficial for the smaller sites.</li>
        </ul>
      </section>

      <section class="content-area content-area--divider-bottom">
        <h2 class="txt-up-4 mb-20">
          Development
        </h2>

        <table>
          <thead>
            <tr>
              <th scope="col" class="C(#fff) Bgc(#449ab3)">
                Advantage
              </th>
              <th scope="col" class="C(#fff) Bgc(#2f6a7c)">
                Disadvantage
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                Less Bloat
              </td>
              <td>
                Bloat CSS If Not Maintained
              </td>
            </tr>
            <tr>
              <td>
                Quick Prototyping
              </td>
              <td>
                "Clutters" the HTML
              </td>
            </tr><tr>
              <td>
                Better Caching
              </td>
              <td>
                Not ideal for Smaller Projects
              </td>
            </tr>
            <tr>
              <td>
                Less Class Name Abstractions
              </td>
              <td>
              </td>
            </tr>
            <tr>
              <td>
                Minimal CSS Maintenance
              </td>
              <td>
              </td>
            </tr>
          </tbody>
        </table>
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
              Words From The Authors
          </h2>

          <div class="tab-container" data-action="a11y-tabs" id="no_tabs_by_def">

            <div class="tab-panel-container js-tabs-panel-container">
              <section class="tab-panel js-tabs__panel" data-tab-label="Jon Snook">
                <p class="txt-bold">
                  Could you share any lessons learned during the development of SMACSS?
                </p>
                <div class="auth-response">
                  <p>I think the biggest lessons learned was realizing that the way I used to build web sites wouldn’t work at scale. It didn’t work with larger teams and it didn’t work across multiple projects. There were also performance issues that we were trying to address that we couldn’t do with the way I used to build web sites.</p>
                  <p>Working at Yahoo! exposed me to different problems and I needed to come up with a better way to solve those problems. Thankfully, many people before me had done the work. My job was then to take that knowledge (along with my own twist on things) and bring it together in one place.</p>
                </div>
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
