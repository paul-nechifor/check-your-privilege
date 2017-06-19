module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      main: ['dist'],
      nonmin: ['dist/script.js']
    },
    copy: {
      main: {
        files: [
          {
            expand: true,
            cwd: 'node_modules/reveal.js',
            src: ['js/reveal.min.js', 'css/reveal.min.css', 'lib/js/*'],
            flatten: true,
            dest: 'dist/reveal'
          }, {
            expand: true,
            src: ['icons/**'],
            dest: 'dist'
          }
        ]
      }
    },
    stylus: {
      main: {
        files: {
          'dist/theme.css': ['styles/theme.styl']
        }
      }
    },
    jade: {
      main: {
        files: {
          'dist/index.html': ['views/index.jade']
        }
      }
    },
    browserify: {
      main: {
        options: {
          debug: true
        },
        files: {
          'dist/script.js': 'scripts/script.js'
        }
      }
    },
    uglify: {
      debug: {
        options: {
          sourceMap: true
        },
        files: {
          'dist/script.min.js': ['dist/script.js']
        }
      },
      production: {
        files: {
          'dist/script.min.js': ['dist/script.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('normal', ['clean', 'copy', 'stylus', 'jade',
      'browserify']);
  grunt.registerTask('production', ['normal', 'uglify:production',
      'clean:nonmin']);
  grunt.registerTask('default', ['normal', 'uglify:debug']);
};
