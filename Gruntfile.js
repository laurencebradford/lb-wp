'use strict';
module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      options: {livereload: true},
      coffee: {
          files: ['assets/coffee/**/*.coffee'],
          tasks: ['coffee:dev']
      },
      sass: {
          files: 'assets/scss/**/*.scss',
          tasks: ['sass:dev']
      }
    },
    sass: {
      dev: {
        options: {
          includePaths: ['bower_components/bootstrap/scss']
        },
        files: {
          'assets/css/screen.css': 'assets/scss/screen.scss'
        }
      },
      deploy: {
        options: {
          includePaths: ['bower_components/bootstrap-sass-official/assets/stylesheets'],
          outputStyle: 'compressed'
        },
        files: {
          'assets/css/screen.min.css': 'assets/scss/screen.scss'
        }
      }
    },
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['assets/js/*.js'],
        dest: 'assets/js/main.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'assets/js/main.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    coffee: {
      dev: {
        expand: true,
        flatten: true,
        cwd: 'assets/coffee/',
        src: ['assets/coffee/**/*.coffee'],
        dest: 'assets/js/',
        ext: '.js'
      }
    },
  });
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-concat');

  // Register tasks here.
  grunt.registerTask('default', ['coffee', 'sass', 'watch']);
  grunt.registerTask('build', ['concat', 'uglify']);
};