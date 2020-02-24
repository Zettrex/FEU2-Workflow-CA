module.exports = function(grunt) {
    const mozjpeg = require('imagemin-mozjpeg');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        sass: {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    'src/style/style.css' : 'src/style/style.scss'
                }
            }
        },

        imagemin: {
            dynamic: {
                options: {
                    optimizationLevel: 3,
                    svgoPlugins: [{removeViewBox: false}],
                    use: [mozjpeg()]
                },
                files: [{
                    expand: true,
                    cwd: 'src/media/images/',
                    src: ['*.{png,jpg,gif}'],
                    dest: 'dist/media/images/'
                }]
            }
        },

        uglify: {
            options: {
                mangle: {
                    reserved: ['jQuery', 'Backbone']
                }
            },
            my_target: {
                options: {
                  sourceMap: true,
                  sourceMapName: 'src/script/sourcemap.map'
                },
                files: [{
                    expand: true,
                    cwd: 'src/script/',
                    src: ['*.js', '**/*.js'],
                    dest: 'dist/script/',
                    ext: '.min.js',
                }]
            }
        },


        htmlmin: {
            dev: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: ['*.html'],
                    dest: 'dist/'
                }]
            }
        },

        cssmin: {
            options: {
                mergeIntoShorthands: false,
                roundingPrecision: -1
            },
            target: {
                files: [{
                    expand: true,
                    cwd: 'src/style',
                    src: ['*.css', '!*.min.css'],
                    dest: 'dist/style',
                    ext: '.css'
                }]
            }
        },

        browserSync: {
            dev: {
                bsFiles: {
                    src : [
                        './dist/script/*.js',
                        './dist/style/*.css',
                        './dist/*.html'
                    ]
                },
                options: {
                    watchTask: true,
                    server: {
                        baseDir: "./dist"
                    }
                }
            }
        },

        watch: {
            script: {
                files: ['src/script/*.js'],
                tasks: ['uglify'],
            },
            sass: {
                files: ['src/style/*.scss'],
                tasks: ['sass', 'cssmin']
            },
            css: {
              files: ['src/styles/*.css'],
              tasks: ['cssmin']
            },
            html: {
              files: ['src/*.html'],
              tasks: ['htmlmin']
            },
            images: {
                files: ['src/media/images/*'],
                tasks: ['imageMin']
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.registerTask('default', ['browserSync', 'watch']);
};