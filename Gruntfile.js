module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			options: {
				seperator: ';'
			},
			dist: {
				src: ['./app/bower_components/angular/angular.js'],
				dest: ['./build/built.js']
			}
		}
	});

	// Load plugins
	grunt.loadNpmTasks('grunt-contrib-concat');

	// Register Tasks
	grunt.registerTask('build', ['concat']);

	

}