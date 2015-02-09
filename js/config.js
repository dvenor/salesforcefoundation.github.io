(function() {
  require.config({
    baseUrl: "../",
    wrap: true,
    optimize: 'none',
    paths: {
      'jquery': 'bower_components/jquery/dist/jquery',
      'underscore': 'bower_components/underscore/underscore',
      'backbone': 'bower_components/backbone/backbone',
      'bootstrap': 'bower_components/bootstrap/dist/js/bootstrap',

      'jquery.mousewheel': 'bower_components/jScrollPane/script/jquery.mousewheel',
      'mwheelIntent': 'bower_components/jScrollPane/script/mwheelIntent',
      'jscrollpane': 'bower_components/jScrollPane/script/jquery.jscrollpane'
    },
    shim: {
      'jquery': { exports: 'window.jQuery' },
      'underscore': { exports: 'window._' },
      'backbone': { exports: 'window.Backbone', deps: ['jquery', 'underscore'] },
      'bootstrap': { deps: ['jquery'] },
      'jscrollpane': { deps: ['jquery', 'jquery.mousewheel', 'mwheelIntent']}
    }
  });
})();