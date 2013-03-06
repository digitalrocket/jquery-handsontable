/**
 * This file is used to build Handsontable from `src/*`
 *
 * Installation:
 * 1. Install Grunt (`npm install -g grunt`)
 * 2. Install NPM packages from `devDependencies` section in package.json (`npm install`)
 *
 * Build:
 * Execute `grunt` from root directory of this directory (where grunt.js is)
 * To execute automatically after each change, execute `grunt --force default watch`
 *
 * Result:
 * building Handsontable will create files:
 *  - jquery.handsontable.js
 *  - jquery.handsontable.css
 *  - dist/jquery.handsontable.full.js
 *  - dist/jquery.handsontable.full.css
 *
 * See https://github.com/cowboy/grunt for more information
 */
module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      src: [
        'tmp/core.js',
        'src/tableView.js',
        'src/helpers.js',
        'src/fillHandle.js',
        'src/undoRedo.js',
        'src/selectionPoint.js',

        'src/renderers/textRenderer.js',
        'src/renderers/autocompleteRenderer.js',
        'src/renderers/checkboxRenderer.js',
        'src/renderers/numericRenderer.js',

        'src/editors/textEditor.js',
        'src/editors/autocompleteEditor.js',
        'src/editors/checkboxEditor.js',
        'src/editors/dateEditor.js',
        
        'src/cellTypes.js',

        'src/pluginHooks.js',
        'src/plugins/autoColumnSize.js',
        'src/plugins/columnSorting.js',
        'src/plugins/contextMenu.js',
        'src/plugins/legacy.js',
        'src/plugins/manualColumnMove.js',
        'src/plugins/manualColumnResize.js',

        'src/3rdparty/jquery.autoresize.js',
        'src/3rdparty/sheetclip.js',
        'src/3rdparty/walkontable.js',
        'src/3rdparty/copypaste.js',
      ],
      vendor: [
        'lib/bootstrap-typeahead.js',
        'lib/numeral.js',
        'lib/jQuery-contextMenu/jquery.contextMenu.js'
        // seems to have no effect when turned off on contextmenu.html
        //'lib/jQuery-contextMenu/jquery.ui.position.js' 
      ]
    },
    
    concat: {
      dist: {
        files: {
          'jquery.handsontable.js': [
            'tmp/intro.js',
            '<%= meta.src %>',
            'src/outro.js'
          ]
        }
      },
      full_js: {
        files: {
          'dist/jquery.handsontable.full.js': [
            'jquery.handsontable.js',
            '<%= meta.vendor %>'
          ]
        }
      },
      full_css: {
        files: {
          'dist/jquery.handsontable.full.css': [
            'jquery.handsontable.css',
            'lib/jQuery-contextMenu/jquery.contextMenu.css'
          ] 
        } 
      }
    },
    
    watch: {
      files: [
        'src/*',
        'src/editors/*',
        'src/plugins/*',
        'src/renderers/*',
        'src/3rdparty/*',
        'src/css/*',
        'lib/*'
      ],
      tasks: ['replace', 'concat', 'clean']
    },
    
    clean: {
      dist: ['tmp']
    },
    
    replace: {
      dist: {
        options: {
          variables: {
            version: '<%= pkg.version %>',
            timestamp: '<%= (new Date()).toString() %>'
          }
        },
        files: {
          'tmp/intro.js': 'src/intro.js',
          'tmp/core.js': 'src/core.js',
          'jquery.handsontable.css': 'src/css/jquery.handsontable.css'
        }
      }
    },
    
    jasmine: {
      src: [
        'lib/jquery.min.js',
        // '<%= meta.src %>',
        'jquery.handsontable.js',
        'lib/bootstrap-typeahead.js',
        'lib/numeral.js',
        'lib/jQuery-contextMenu/jquery.contextMenu.js',
        'test/jasmine/spec/SpecHelper.js'
      ],
      options: {
        specs: [
          'test/jasmine/spec/*Spec.js',
          'test/jasmine/spec/*/*Spec.js'
        ],
        template: 'test/JqueryHandsontableRunner.tmpl',
        templateOptions: {
          css: [
            'lib/jQuery-contextMenu/jquery.contextMenu.css',
            'jquery.handsontable.css',
          ]
        }
      }
    }
  });

  // Default task.
  grunt.registerTask('default', ['replace', 'concat', 'clean']);
  grunt.registerTask('test', ['default', 'jasmine']);

  grunt.loadNpmTasks('grunt-replace');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
};