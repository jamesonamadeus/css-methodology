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
          <blockquote class="txt-up-3">Think of your code as irreducible building blocks such as legos.</blockquote>
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

          <button type="button" data-href="#accGen_panel_1" class="accordion__trigger" aria-controls="accGen_panel_1" aria-expanded="false" aria-selected="false" id="accGen_panel_1_tab" role="tab" tabindex="-1">Example 1</button>
          <div class="accordion__panel" data-tab-label="Example 1" id="accGen_panel_1" aria-hidden="true" aria-labelledby="accGen_panel_1_tab" role="tabpanel">
            <h4>Semantic HTML</h4>
            <pre class=" language-markup"><code class=" language-markup"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>rightRail<span class="token punctuation">"</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>media<span class="token punctuation">"</span></span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>http://twitter.com/johndoe<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>img<span class="token punctuation">"</span></span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>johndoe.jpg<span class="token punctuation">"</span></span> <span class="token attr-name">alt</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>me<span class="token punctuation">"</span></span> <span class="token attr-name">width</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>40<span class="token punctuation">"</span></span> <span class="token punctuation">/&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>bd<span class="token punctuation">"</span></span><span class="token punctuation">&gt;</span></span>
            @johndoe 14 minutes ago
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
</code></pre>

          <h4>Non-ACSS</h4>

          <pre class=" language-css"><code class=" language-css"><span class="token selector"><span class="token class">.media</span> </span><span class="token punctuation">{</span>
    <span class="token property">margin</span><span class="token punctuation">:</span> <span class="token number">10</span>px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector"><span class="token class">.media</span>,
<span class="token class">.bd</span> </span><span class="token punctuation">{</span>
    <span class="token property">overflow</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span>
    <span class="token property">_overflow</span><span class="token punctuation">:</span> visible<span class="token punctuation">;</span>
    <span class="token property">zoom</span><span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector"><span class="token class">.media</span> <span class="token class">.img</span> </span><span class="token punctuation">{</span>
    <span class="token property">float</span><span class="token punctuation">:</span> left<span class="token punctuation">;</span>
    <span class="token property">margin-right</span><span class="token punctuation">:</span> <span class="token number">10</span>px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector"><span class="token class">.media</span> <span class="token class">.img</span> img </span><span class="token punctuation">{</span>
    <span class="token property">display</span><span class="token punctuation">:</span> block<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector"><span class="token class">.media</span> <span class="token class">.imgExt</span> </span><span class="token punctuation">{</span>
    <span class="token property">float</span><span class="token punctuation">:</span> right<span class="token punctuation">;</span>
    <span class="token property">margin-left</span><span class="token punctuation">:</span> <span class="token number">10</span>px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector"><span class="token id">#rightRail</span> <span class="token class">.bd</span> </span><span class="token punctuation">{</span>
    <span class="token property">font-size</span><span class="token punctuation">:</span> smaller<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre>

        <h4>What's wrong with this Model?</h4>
        <ul>
          <li>Simple changes to the style of our module have resulted in new rules in the style sheet.There must be a way to style things without always having to write more CSS rules.</li>
          <li>We are grouping selectors for common styles (.media,.bd {}).
          Grouping selectors, rather than using a class associated with these styles, will lead to more CSS.</li>
          <li>Of our six rules, four are context-based.
          Rules that are context-specific are hard to maintain. Styles related to such rules are not very reusable.</li>
        </ul>


        <h4>ACSS Markup</h4>
        <pre class=" language-markup"><code class=" language-markup"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>Bfc M-10<span class="token punctuation">"</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>http://twitter.com/johndoe<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>Fl-start Mend-10<span class="token punctuation">"</span></span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>johndoe.jpg<span class="token punctuation">"</span></span> <span class="token attr-name">alt</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>me<span class="token punctuation">"</span></span> <span class="token attr-name">width</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>40<span class="token punctuation">"</span></span> <span class="token punctuation">/&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>Bfc Fz-s<span class="token punctuation">"</span></span><span class="token punctuation">&gt;</span></span>
        @johndoe 14 minutes ago
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
</code></pre>

<h4>ACSS</h4>
<pre class=" language-css"><code class=" language-css"><span class="token selector"><span class="token class">.Bfc</span> </span><span class="token punctuation">{</span>
    <span class="token property">overflow</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span>
    <span class="token property">zoom</span><span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector"><span class="token class">.M-10</span> </span><span class="token punctuation">{</span>
    <span class="token property">margin</span><span class="token punctuation">:</span> <span class="token number">10</span>px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector"><span class="token class">.Fl-start</span> </span><span class="token punctuation">{</span>
    <span class="token property">float</span><span class="token punctuation">:</span> left<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector"><span class="token class">.Mend-10</span> </span><span class="token punctuation">{</span>
    <span class="token property">margin-right</span><span class="token punctuation">:</span> <span class="token number">10</span>px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector"><span class="token class">.Fz-s</span> </span><span class="token punctuation">{</span>
    <span class="token property">font-size</span><span class="token punctuation">:</span> smaller<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre>



          </div>

          <button type="button" data-href="#accGen_panel_2" class="accordion__trigger" aria-controls="accGen_panel_2" aria-expanded="false" aria-selected="false" id="accGen_panel_2_tab" role="tab" tabindex="-1">
          Example 2
          </button>
          <div class="accordion__panel" id="accGen_panel_2" aria-hidden="true" aria-labelledby="accGen_panel_2_tab" role="tabpanel">
            <h3>
              Example 2
            </h3>
            <p>
              "But I must explain to you how all this mistaken idea of denouncing pleasure
               and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, <a href="#!">because it is pain, but because occasionally</a> circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"
            </p>
          </div>

          <button type="button" data-href="#accGen_panel_3" class="accordion__trigger" aria-controls="accGen_panel_3" aria-expanded="false" aria-selected="true" id="accGen_panel_3_tab" role="tab" tabindex="0">Example 3</button>
          <div class="accordion__panel" id="accGen_panel_3" aria-hidden="true" aria-labelledby="accGen_panel_3_tab" role="tabpanel">
            <p>"But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, <a href="#!">because it is pain, but because occasionally</a> circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"
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
              <section class="tab-panel js-tabs__panel" data-tab-label="Thierry Koblentz">
                <p class="txt-bold">
                  How did Atomic CSS come to be and what was your path getting there?
                </p>
                <div class="auth-response">
                  <p>I was working for Yahoo! Small Business in 2010 when Yahoo! decided to "move the engineering effort” from Sunnyvale (California) to Bangalore (India). At the time, we were in the process of redesigning yahoosmallbusiness.com and my manager (Michael Montesano), asked me if there was a way to minimize how much CSS would be written after the hand-off. To address his concern, we came up with a bunch of what we called “helper” classes which were meant to help devs implement more design changes/tweaks without bloating the styles sheets too much.</p>
                  <p>2 years later we were tasked to re-do my.yahoo.com. We had the rare opportunity to start something from scratch and Michael (then director of engineering) gave us "carte blanche” to achieve goals like:</p>
                  <ul>
                    <li>Creating as little CSS as possible</li>
                    <li>Preventing styles sheets from ballooning</li>
                    <li>Reducing module dependancies</li>
                    <li>Facilitating team collaboration</li>
                  </ul>
                  <p>To achieve those goals, we created a style sheet that was roughly 90% "Atomic CSS" and 10% classic CSS (“semantic” selectors). We called that core styles sheet “Stencil” (it is Steve Carlson who came up with the name “Stencil”)</p>
                  <p>We were lucky to work with an awesome team who didn’t complain while we're changing things over and over again, sometimes pulling the rug under their feet. Thanks to them, we were able to iterate a lot and learned tremendously during that process.</p>
                  <p>Following the release of my.yahoo, I wrote “Challenging Best Practice” which was published by Smashing Magazine.</p>
                  <p>After that, we decided to switch to a more complex syntax to give authors complete freedom of the styles they used and to make sure every rule in our styles sheets was relevant. Instead of on-boarding many opinionated styles, authors were able to create their own styles by using properties/values of their choice. The tool that made this possible is Atomizer (built by Renato Iwashima). Atomizer is Atomic CSS on steroids (ACSS), it does not only add new rules to a styles sheet, it also removes obsolete ones, which prevents bloat from building up.</p>
                  <p>We then released http://acss.io, which is a solution that addresses problems many said were not possible to solve using a “Atomic CSS" approach (RWD, pseudo-classes, descendant selectors, etc.)</p>
                </div>
              </section>

              <section class="tab-panel js-tabs__panel" data-tab-label="Steve Carlson">
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
              <section class="tab-panel js-tabs__panel" data-tab-label="Renato Iwashima">
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
