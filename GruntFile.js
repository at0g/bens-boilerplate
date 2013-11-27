module.exports = function(grunt){

    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-nodemon');


    grunt.initConfig({

        clean: {
            'public': 'public/**/*'
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
                cwd: 'client',
                expand: true,
                src: 'assets',
                dest: 'public'
            },

            scripts: {
                cwd: 'client',
                expand: true,
                src: 'js/**/*',
                dest: 'public'
            }
        },

        jshint: {
            dev: {
                src: [
                    'client/js/**/*.js'
                ],
                options: {
                    ignores: [
                        'client/js/lib/**/*.js'
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
                    'public/css/styles.css': 'client/styles/styles.less'
                }
            },

            dist: {
                options: {
                    compress: true,
                    yuicompress: true,
                    report: 'min'
                },

                files: {
                    'public/css/styles.css': 'client/styles/styles.less'
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
                appDir: 'client/js',
                // Output
                dir: 'public/js',
                // Config
                mainConfigFile: 'client/js/require.config.js',

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
                files: 'client/js/**/*.js',
                tasks: ['jshint:dev', 'copy:scripts']
            },
            styles: {
                files: 'client/styles/**/*',
                tasks: ['less:dev']
            },
            assets: {
                files: 'client/assets/**/*',
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

    grunt.registerTask('test', ['jshint', 'jasmine']);

    grunt.registerTask('build', [
        'clean:public',
        'jshint',
        'requirejs:dev',
        'less:dev',
        'concurrent:dev'
    ]);
};