module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      styles: ['dist']
    },

    sass: {
      options: {
        sourceMap: true,
        outputStyle: 'expanded'
      },

      styles: {
        files: [{
          expand: true,
          cwd: 'src',
          src: ['*.scss', '**/*.scss'],
          dest: 'dist',
          ext: '.css',
          extDot: 'last'
        }]
      },

      docs: {
        files: [{
          expand: true,
          cwd: 'docs',
          src: ['*.scss', '**/*.scss'],
          dest: 'docs',
          ext: '.css',
          extDot: 'last'
        }]
      }
    },

    cssmin: {
      styles: {
        files: [{
          expand: true,
          cwd: 'dist',
          src: ['*.css', '**/*.css', '!*.min.css', '!**/*.min.css'],
          dest: 'dist',
          ext: '.min.css',
          extDot: 'last'
        }]
      },

      docs: {
        files: [{
          expand: true,
          cwd: 'docs/css',
          src: ['*.css', '**/*.css', '!*.min.css', '!**/*.min.css'],
          dest: 'docs/css',
          ext: '.min.css',
          extDot: 'last'
        }]
      }
    },

    uglify: {
      docs: {
        files: [{
          expand: true,
          cwd: 'docs/js',
          src: ['*.js', '**/*.js', '!*.min.js', '!**/*.min.js'],
          dest: 'docs/js',
          ext: '.min.js',
          extDot: 'last'
        }]
      }
    },

    watch: {
      styles: {
        files: ['src/*.scss', 'src/**/*.scss'],
        tasks: ['build'],
        options: {
          spawn: false
        }
      },

      docsCSS: {
        files: ['docs/css/*.scss', 'docs/css/**/*.scss'],
        tasks: ['sass:docs', 'cssmin:docs', 'notify:complete'],
        options: {
          spawn: false
        }
      },

      docsJS: {
        files: ['docs/js/*.js', 'docs/js/**/*.js'],
        tasks: ['uglify:docs', 'notify:complete'],
        options: {
          spawn: false
        }
      }
    },

    notify: {
      complete: {
        options: {
          enabled: true,
          success: true,
          duration: 1,
          message: 'Compiled successfully'
        },
      }
    }
  });

  grunt.registerTask('build', [
    'clean:styles',
    'sass:styles',
    'cssmin:styles',
    'notify'
  ]);
};
