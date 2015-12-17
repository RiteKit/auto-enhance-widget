/**
 * Created by RiteTag on 16.12.15.
 */
module.exports = function (grunt) {
    // Grunt project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                compress: {
                    drop_console: true
                }
            },
            build: {
                files: {
                    'dist/ritetag.widget.min.js': ['src/ritetag.widget.js']
                }
            }
        },
        jshint:{
            all: ['src/**'],
            options:{
                jshintrc: '.jshintrc'
            }
        },
        watch: {
            js: {
                files: [
                    'src/*.js',
                    '!build/**/*.js',
                    '!Gruntfile.js'
                ],
                tasks: [
                    'jshint'
                ]
            }
        }


    });

    // Load plugins that provide the tasks.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    // By default, run the following tasks
    grunt.registerTask('build', ['uglify']);
    grunt.registerTask('default', ['jshint', 'watch']);
};