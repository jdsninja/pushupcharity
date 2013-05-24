/*global module:false*/
module.exports = function(grunt) {
	// Project configuration.
	grunt.initConfig({
		pkg: '<json:package.json>',
		meta: {
			banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
				'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
				'<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
				'* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
				' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
		},
		uglify: {
			my_target: {
				files: {
					'js/global.min.js': [
						'libs/jquery.min.js',
						'libs/bootstrap/js/bootstrap-modal.js',
						'libs/jquery.gridrotator.js',
						'libs/fancyBox/source/jquery.fancybox.js',
						'libs/fancyBox/lib/jquery.mousewheel-3.0.6.pack.js',
						'libs/ss-social/ss-social.js'
					],
					'js/custom.min.js': [
						'js/custom.js'
					]
				}
			}
		},
		watch: {
			scripts: {
				files: 'dist/js/custom.js',
				tasks: ['default'],
				options: {
					interrupt: true
				}
			}
		}
	});
	grunt.loadNpmTasks('grunt-contrib-uglify');
	// Default task.
	grunt.registerTask('default', 'uglify');
};
