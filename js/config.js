(function() {
  require.config({
    baseUrl: "../",
    wrap: true,
    optimize: 'none',
    paths: {
      'jquery': 'bower_components/jquery/dist/jquery',
      'underscore': 'bower_components/underscore/underscore',
      'backbone': 'bower_components/backbone/backbone',
      'bootstrap': 'bower_components/bootstrap/dist/js/bootstrap'
    },
    shim: {
      'jquery': { exports: 'window.jQuery' },
      'underscore': { exports: 'window._' },
      'backbone': { exports: 'window.Backbone', deps: ['jquery', 'underscore'] },
      'bootstrap': { deps: ['jquery'] }
    }
  });
})();