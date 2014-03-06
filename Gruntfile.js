module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      main: ['build'],
      nonmin: ['build/script.js']
    },
    copy: {
      main: {
        files: [
          {
            expand: true,
            cwd: 'bower_components/reveal.js',
            src: ['js/reveal.min.js', 'css/reveal.min.css', 'lib/js/*'],
            flatten: true,
            dest: 'build/reveal'
          }, {
            expand: true,
            src: ['icons/**'],
            dest: 'build'
          }
        ]
      }
    },
    stylus: {
      main: {
        files: {
          'build/theme.css': ['styles/theme.styl']
        }
      }
    },
    jade: {
      main: {
        files: {
          'build/index.html': ['views/index.jade']
        }
      }
    },
    browserify: {
      main: {
        options: {
          debug: true
        },
        files: {
          'build/script.js': 'scripts/script.js'
        }
      }
    },
    uglify: {
      debug: {
        options: {
          sourceMap: true
        },
        files: {
          'build/script.min.js': ['build/script.js']
        }
      },
      production: {
        files: {
          'build/script.min.js': ['build/script.js']
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
