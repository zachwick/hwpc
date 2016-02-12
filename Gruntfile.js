module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),

		concat: {
			js: {
				src: ['src/js/lib/underscore.js',
				      'src/js/lib/jquery-2.1.4.js',
				      'src/js/lib/backbone.js',
				      'src/js/config.js',
				      'src/js/models/*.js',
				      'src/js/views/*.js',
				      'src/js/bootstrap.js'],
				dest: 'static/<%= pkg.name %>.js'
			},
			css: {
				src: ['static/bootstrap.css',
				      'static/app.css',
				      'static/ltmenu.css'],
				dest: 'static/hwpc-app.css'
			}
		},
		min: {
			dist: {
				src:  'static/<%= pkg.name %>.js',
				dest: 'static/<%= pkg.name %>.min.js'
			}
		},
		cssmin: {
			dist: {
				src:  ['static/hwpc-app.css'],
				dest: ['static/hwpc-app.min.css']
			}
		},
		compress: {
			zlib: {
				files: {
					'static/hwpc-app.css.gz': 'static/hwpc-app.css',
					'static/<%= pkg.name %>.js': 'static/<%= pkg.name %>.js',
					'static/hwpc-app.min.css.gz': 'static/hwpc-app.min.css',
					'static/<%= pkg.name %>.min.js': 'static/<%= pkg.name %>.min.js.gz'
				}
			}
		},
		docco: {
			models: {
				src: ['src/js/models/*.js'],
				options: {
					output: 'docs/models/'
				}
			},
			views: {
				src: ['src/js/views/*.js'],
				options: {
					output: 'docs/views/'
				}
			}
		},
		less: {
			dist: {
				options: {
					paths: ['src/less']
				},
				files: {
					'static/app.css': 'src/less/bootstrap.less'
				}
			}
		},
		qunit: {
			all: ['tests/models/*.html','tests/views/*.html']
		},
		qunit_junit: {
			options: {
				dest: 'tests/reports/'
			}
		}
	});

	grunt.loadNpmTasks('grunt-docco');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-yui-compressor');
	grunt.loadNpmTasks('grunt-contrib-compress');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-qunit-junit');

	grunt.registerTask("default",['less', 'concat']);
	grunt.registerTask("test",['less', 'concat', 'qunit_junit', 'qunit']);
	grunt.registerTask("docs", ['docco']);
	grunt.registerTask("build", ['less','concat','qunit_junit','qunit','min','cssmin','compress']);
};
