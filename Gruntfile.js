/*global module:false*/
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({

        simplemocha: {
            options: {
                ui: 'bdd',
                reporter: 'nyan'
            },
            all: {
                src: ['test/*.test.js']
            }
        }

    });

    grunt.loadNpmTasks('grunt-simple-mocha');

    grunt.registerTask('default', ['test']);
    grunt.registerTask('test', ['simplemocha']);

};
