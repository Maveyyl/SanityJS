module.exports = function(grunt) {

	var src_files = [
		"src/conf.js",
		"src/utils.js",
		"src/error.js",
		"src/object_check.js",
		"src/arguments_check.js"
	];
	var concat_files = [].concat(
		"src/concat/header.js",
		src_files,
		"src/concat/footer.js"
		);

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			options: {
				separator: '\n\n',
				banner: '/*! <%= pkg.name %> <%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
				process: function(src, filepath) {
					if( src_files.indexOf(filepath) != -1 )
						return src.replace(/^/gm, '\t');
					else
						return src;
				},
			},
			dist: {
				src: concat_files,
				dest: '<%= pkg.name %>.js',
			},
		},
		jshint: {
			beforeconcat: src_files,
			afterconcat: '<%= pkg.name %>.js'
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build: {
				src: '<%= pkg.name %>.js',
				dest: '<%= pkg.name %>.min.js'
			}
		}
	});

	// load plugins
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');


	// Default task(s).
	grunt.registerTask('default', [
		"jshint:beforeconcat",
		"concat",
		"jshint:afterconcat",
		"uglify"
	]);
};