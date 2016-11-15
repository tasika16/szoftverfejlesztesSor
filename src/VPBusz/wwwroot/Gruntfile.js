module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  var pkg = grunt.file.readJSON('package.json');

  grunt.initConfig({

    appConfig: {
      path: 'app/',
      assets: 'app/assets/',
      dist: 'app/dist/',
      distAssets: 'app/dist/assets/',
      index: 'app/dist/index.html',
      indexDev: 'app/index.dev.html'
    },

    // version update
    bump: {
      options: {
        files: ['package.json', 'bower.json']
      }
    },

    // application constants
    ngconstant: {
      options: {
        dest: 'app/assets/js/app.constants.js',
        name: 'app.constants',
      },
      dist: {
        constants: {
          APP: {
            version: pkg.version
          }
        }
      }
    },

    // clean generated files
    clean: {
      release: [
        '<%= appConfig.dist %>'
      ]
    },

    // copy development file as distribution
    copy:{
      fonts: {
        expand: true,
        src: [
          'app/bower_components/font-awesome/fonts/*',
          'app/bower_components/material-design-iconic-font/fonts/*',
          'app/bower_components/roboto-fontface/fonts/*',
          'app/bower_components/weather-icons/font/*',
          'app/bower_components/bootstrap-sass/assets/fonts/bootstrap/*'
        ],
        dest: '<%= appConfig.assets %>fonts/',
        filter: 'isFile',
        flatten: true
      },
      html: {
        src: '<%= appConfig.indexDev %>',
        dest: '<%= appConfig.index %>'
      },
      pages: {
        expand: true,
        cwd: 'app/pages',
        src: ['**/*'],
        dest: '<%= appConfig.dist %>/pages'
      },
      fontsdist: {
        expand: true,
        cwd: 'app/assets/fonts',
        src: ['**/*'],
        dest: '<%= appConfig.distAssets %>/fonts'
      },
      tpldist: {
        expand: true,
        cwd: 'app/assets/tpl',
        src: ['**/*'],
        dest: '<%= appConfig.distAssets %>/tpl'
      },
    },

    // set usemin working file
    useminPrepare: {
      html: '<%= appConfig.index %>',
      options: {
        dest: '<%= appConfig.dist %>',
        root: '<%= appConfig.path %>'
      }
    },

    // sass our development files into 1 stylesheet
    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: {
          '<%= appConfig.assets %>css/materialism.css': '<%= appConfig.assets %>css/sass/materialism.scss'
        }
      }
    },

    // remove all bs from css
    cssmin: {
      options: {
        keepSpecialComments: 0
      }
    },

    // optimize images
    imagemin : {
      dynamic : {
        files : [{
          expand : true,
          cwd : '<%= appConfig.assets %>img/', // source images (not compressed)
          src : ['**/*.{png,jpg,gif,svg,xml,json,ico}'], // Actual patterns to match
          dest : '<%= appConfig.distAssets %>img/' // Destination of compressed files
        }]
      }
    },

    // add rev to bust cache
    filerev: {
      options: {
        encoding: 'utf8',
        algorithm: 'md5',
        length: 20
      },
      release: {
        src: [
          '<%= appConfig.distAssets %>**/*.js',
          '<%= appConfig.distAssets %>**/*.css',
        ]
      }
    },

    // replace tags
    usemin:{
      html: ['<%= appConfig.index %>', '<%= appConfig.dist %>pages/*.html'],
      options: {
        assetsDirs: ['<%= appConfig.dist %>', '<%= appConfig.dist %>pages/'],
        patterns: {
          html: [
            [
              /(<!-- reusebuild:css .+? -->[\s\S\r\n]*?<!-- endreusebuild -->)/gm,
              'Re-use css build',
              function (m) {
                return m.match(/[\/.a-z]*?\.css/gm)[0];
              },
              function (m) {
                return '<link href="'+m+'" rel="stylesheet" />';
              }
            ],
            [
              /(<!-- reusebuild:js .+? -->[\s\S\r\n]*?<!-- endreusebuild -->)/gm,
              'Re-use js build',
              function (m) {
                return m.match(/[\/.a-z]*?\.js/gm)[0];
              },
              function (m) {
                return '<script charset="utf-8" src="'+m+'"></script>';
              }
            ]
          ]
        }
      }
    },


    // development
    watch: {
      js: {
        files: ['Gruntfile.js', '<%= appConfig.assets %>js/**/*.js'],
        tasks: ['jshint'],
        options: {
          livereload: true
        }
      },
      css: {
        files: [
          '<%= appConfig.assets %>css/**/*.scss'
        ],
        tasks: ['sass'],
        options: {
          livereload: true
        }
      }
    },

    // debug while developing
    jshint: {
      all: ['Gruntfile.js', '<%= appConfig.assets %>js/**/*.js']
    },

    // tag generated filenames for reference
    usebanner: {
      taskName: {
        options: {
          position: 'top',
          banner: '/*! <%=  grunt.template.today("dd-mm-yyyy hh:MM:ss")  %> */',
          linebreak: true
        },
        files: {
          src: [ '<%= appConfig.distAssets %>*.css', '<%= appConfig.distAssets %>*.js' ]
        }
      }
    }
  });

  grunt.registerTask('version', ['bump-only']);
  grunt.registerTask('css', ['sass']);
  grunt.registerTask('dev', ['sass', 'copy', 'watch']);

  grunt.registerTask('default',[
    'clean',
    'sass',
    'ngconstant',
    'copy',
    'useminPrepare',
    'concat',
    'cssmin',
    'uglify',
    'filerev',
    'usemin',
    'imagemin',
    'usebanner'
  ]);

};






