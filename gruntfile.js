
module.exports = function(grunt) {
    
    grunt.initConfig({
      uglify: {
        my_target: {
          files: {
                'typewriter.min.js': 'typewriter.js'
          }
        }  
      }
     });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('default', 'uglify'); 
};
