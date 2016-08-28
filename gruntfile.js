
module.exports = function(grunt) {
    
    require("load-grunt-tasks")(grunt);
    
    grunt.initConfig({
        babel: {
            options:{
                //sourceMap: true,
                plugins: ['transform-react-jsx'],
                presets: ['es2015', 'react']
            },
            dist:{
                files:[
                    {
                        expand:true,
                        cwd: 'src/Scripts/js/',
                        src:['*.js'],
                        dest: 'dist/Scripts/js/'
                    }
                ]
            },
            jsx:{
                files:[{
                    expand: true,
                    cwd: 'src/Scripts/jsx/',
                    src:['*.jsx'],
                    dest:'dist/Scripts/jsx/',
                    ext: '.js'
                }]
            }
        },
        browserify:{
            dist:{
                files:{
                    'dist/Scripts/js/module.js': ['src/Scripts/js/module.js']
                }
            }
        },
        cssmin: {
            target: {
                files: [{
                expand: true,
                cwd: 'src/Styles/css',
                src: ['*.css', '!*.min.css'],
                dest: 'dist/Styles/css',
                ext: '.min.css'
                }]
            }
        }
    });

    grunt.registerTask('default', ['babel', 'browserify', "cssmin"]);
}