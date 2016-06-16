// Corkscrew configuration
var Corkscrew = {
  name : "Pattern Library",
  logo: "corkscrew/assets/images/soil.png",
  partials : "lib/partials/",
  // repo: "https://github.com/freshtilledsoil/corkscrew",
  css: ["../dist/assets/css/app.min.css"],
  js: ["../dist/assets/js/vendor.min.js"],
  htmlViewer: true,
  sections : [

    // Base Elements
    // "TITLE: Base Elements:",
      "color-and-type",
      "links",
      "lists",
      "buttons",


    // Base Element Patterns
    "TITLE: Base Element Patterns:",
      "article-header-patterns",
      "tables",
      "navigations",
      "search-results",
      "callouts",
      "misc-content-patterns",


    // Media Elements
    "TITLE: Media Elements:",
      "images",
      "audio-video",


    // Forms Elements
    "TITLE: Form Elements:",
      "text-inputs",
      "checkboxes-radios",
      "select-boxes",
      "special-inputs",
      "form-patterns",


    // Grids
    "TITLE: Grids:",
      "flexbox",
      "float-layout",


    // Container Elements & UI Patterns
    "TITLE: Containers:",
      "base-containers",
      "heros",
      "cards",
      "tabs",
      "accordions",
      "modals",
      "tooltips",

    // "layout-components",


    "TITLE: Helper Classes:",
      "modifiers",
      "helpers"
  ],




  templates : [
    {
      name: "...",
      location: "#!"
    },
  ],

  examples : [
    {
      name: "Two a11y Accordion Examples",
      location: "../dist/examples/accordion.html"
    },{
      name: "Fade Header Example",
      location: "../dist/examples/fade-header.html"
    },{
      name: "a11y Hamburger Nav Example",
      location: "../dist/examples/hamburger.html"
    },
    // {
    //   name: "Tool Tips",
    //   location: "../dist/examples/tool-tips.html"
    // },
    {
      name: "Wide Layout (rough)",
      location: "../dist/examples/wide-layout.html"
    },
    // {
    //   name: "Flex Image Grid",
    //   location: "../dist/examples/image-grid.html"
    // },
    // {
    //   name: "List Counter (timeline)",
    //   location: "../dist/examples/timeline.html"
    // },
    {
      name: "On Load - Content Fade In",
      location: "../dist/examples/page-load-fade-in.html"
    },
  ],





  colors : [
    {
      hex: "#7ace6a",
      label: "$c-light-green"
    },{
      hex: "#31b517",
      label: "$c-green"
    },{
      hex: "#20810d",
      label: "$c-dark-green"
    },

    {
      hex: "#fbe672",
      label: "$c-light-gold"
    },{
      hex: "#FAB914",
      label: "$c-gold"
    },{
      hex: "#d0ac1d",
      label: "$c-dark-gold"
    },

    {
      hex: "#e33d3d",
      label: "$c-light-red"
    },{
      hex: "#b63232",
      label: "$c-red"
    },{
      hex: "#881c1c",
      label: "$c-dark-red"
    },

    {
      hex: "#6589f2",
      label: "$c-light-blue"
    },{
      hex: "#4464c2",
      label: "$c-blue"
    },{
      hex: "#304c9d",
      label: "$c-dark-blue"
    },

    {
      hex: "#000",
      label: "$c-black"
    },{
      hex: "#111",
      label: "$c-almost-black"
    },{
      hex: "#2a2a2a",
      label: "$c-off-black"
    },



    {
      hex: "#444",
      label: "$c-darkest-grey/gray"
    },{
      hex: "#666",
      label: "$c-darker-grey/gray"
    },{
      hex: "#979797",
      label: "$c-dark-grey/gray"
    },

    {
      hex: "#ccc",
      label: "$c-grey/gray"
    },

    {
      hex: "#d5d5d5",
      label: "$c-light-grey/gray"
    },{
      hex: "#e7e9ed",
      label: "$c-lighter-grey/gray"
    },{
      hex: "#f2f2f2",
      label: "$c-lightest-grey/gray"
    },

    {
      hex: "#f8f8f8",
      label: "$c-off-white"
    },{
      hex: "#fcfcfc",
      label: "$c-almost-white"
    },{
      hex: "#fff",
      label: "$c-white"
    }
  ]
};
