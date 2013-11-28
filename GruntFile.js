module.exports = function(grunt){

    grunt.loadNpmTasks('grunt-bumpup');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-nodemon');


    grunt.initConfig({

        indir: 'client',
        outdir: 'public',

        bumpup: ['package.json', 'bower.json'],

        pkg: grunt.file.readJSON('package.json'),

        clean: {
            'public': '<%= outdir %>/**/*'
        },

        concurrent: {
            dev: {
                tasks: ['nodemon', 'watch'],
                options: {
                    logConcurrentOutput: true
                }
            }
        },

        copy: {

            assets: {
                cwd: '<%= indir %>',
                expand: true,
                src: 'assets',
                dest: '<%= outdir %>'
            },

            scripts: {
                cwd: '<%= indir %>',
                expand: true,
                src: 'js/**/*',
                dest: '<%= outdir %>'
            }
        },

        jshint: {
            dev: {
                src: [
                    '<%= indir %>/js/**/*.js'
                ],
                options: {
                    ignores: [
                        '<%= indir %>/js/lib/**/*.js'
                    ]
                }
            }
        },

        less: {
            dev: {
                options: {
                    compress: false,
                    yuicompress: false,
                    dumpLineNumbers: 'all'
                },

                files: {
                    '<%= outdir %>/css/styles.css': '<%= indir %>/styles/styles.less'
                }
            },

            dist: {
                options: {
                    compress: true,
                    yuicompress: true,
                    report: 'min'
                },

                files: {
                    '<%= outdir %>/css/styles.css': '<%= indir %>/styles/styles.less'
                }
            }
        },

        nodemon: {
            dev: {
                options: {
                    args: [],
                    ignoredFiles: ['README.md', 'node_modules/**'],
                    watchedExtensions: ['js'],
                    watchedFolders: ['server', 'server/**'],
                    delayTime: 1,
                    env: {
                        NODE_ENV: 'development',
                        PORT: '8080'
                    }
                }
            }
        },

        requirejs: {

            // default options
            options: {

                baseUrl: 'app',
                // Input
                appDir: '<%= indir %>/js',
                // Output
                dir: '<%= outdir %>/js',
                // Config
                mainConfigFile: '<%= indir %>/js/require.config.js',

                preserveLicenseComments: true,

                // Set nestedDependencies to false otherwise everything will be built in main.js
                findNestedDependencies: false,

                // set skipDirOptimize to true, only the built modules are optimized and not all of the lib code.
                skipDirOptimize: true,

                removeCombined: false, // ! keep this as false, or the source files will be removed from client/vendor.

                optimizeAllPluginResources: true,

                enforceDefine: true,

                stubModules: ['text', 'hbs'],

                paths: {
                    jquery: 'empty:'
                },

                modules: [
                    { name: 'Application' }
                ]
            },

            // Dev compilation, combined but no uglify
            dev: {
                options: {
                    optimize: 'none'
                }
            },

            // production
            dist: {
                options: {
                    optimize: 'uglify2',
                    useStrict: false,
                    quiet: false
                }
            }

        },

        watch: {
            options: {
                spawn: false
            },
            scripts: {
                files: '<%= indir %>/js/**/*.js',
                tasks: ['jshint:dev', 'copy:scripts']
            },
            styles: {
                files: '<%= indir %>/styles/**/*',
                tasks: ['less:dev']
            },
            assets: {
                files: '<%= indir %>/assets/**/*',
                tasks: ['copy:assets']
            }
        }

    });

    grunt.event.on('watch', function(action, filepath) {

        if (grunt.file.isMatch(grunt.config('watch.scripts.files'), filepath)) {

            grunt.config('jshint.dev.src', [filepath]);

            grunt.config('copy.scripts.src', [filepath.replace(grunt.config('copy.scripts.cwd') + '/', '')]);
        }

    });

    // Run a watch server, copying files as they change and restarting the server when server files change.
    grunt.registerTask('default', [
        'clean:public',
        'jshint',
        'copy',
        'less:dev',
        'concurrent:dev'
    ]);

    grunt.registerTask('updatePkg', function(){
        grunt.config.set('pkg', grunt.file.readJSON('package.json'));
    });

    grunt.registerTask('build', [
        'clean:public',
        'jshint',
        'requirejs:dev',
        'less:dev',
        'concurrent:dev',
        'bumpup:prerelease',
        'updatePkg'
    ]);
};