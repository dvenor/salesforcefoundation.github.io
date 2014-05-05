'use strict';
module.exports = function(grunt) {
  // project configuration.
  grunt.initConfig({
    less: {
      options: {
        compress: false,
        paths: ['less', 'tmp', '<%= bowerDirectory %>/bootstrap/less']
      },
      main: {
        files: {
          'assets/css/main.css': ['less/main.less']
        }
      }
    },
    copy: {
      bootstrap: {
        files: [
          {
            expand: true,
            cwd: 'bower_components/bootstrap-theme-foundation/dist',
            src: ['**/*'],
            dest: 'assets/'
          }
        ]
      },
      fontawesome: {
        files: [
          {
            expand: true,
            cwd: 'bower_components/fontawesome',
            src: ['fonts/*'],
            dest: 'assets/'
          }
        ]
      }
    },
    watch: {
      less: {
        files: ['less/*.less'],
        tasks: ['less'],
        options: {
          livereload: true
        }
      },
      js: {
        files: ['js/*.js'],
        tasks: ['requirejs'],
        options: {
          livereload: true
        }
      }
    },
    requirejs: {
      compile: {
        options: {
          mainConfigFile: 'js/config.js',
          name: 'node_modules/almond/almond.js',
          include: 'js/main',
          insertRequire: ['js/main'],
          out: 'assets/main.js'
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', ['copy', 'less']);
};