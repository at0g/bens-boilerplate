require.config({

    baseUrl: '/js/app',

    paths: {
        backbone: '../../vendor/backbone-amd/backbone',
        'backbone.wreqr': '../../vendor/backbone.wreqr/lib/amd/backbone.wreqr',
        'backbone.babysitter': '../../vendor/backbone.babysitter/lib/amd/backbone.babysitter',

        domReady: '../../vendor/requirejs-domready/domReady',

        EventEmitter: '../../vendor/event-emitter/dist/EventEmitter',
        GA: '../../vendor/requirejs-google-analytics/dist/GoogleAnalytics',

        Handlebars: '../../vendor/handlebars/handlebars',
        hbs: '../../vendor/requirejs-handlebars/hbars',

        jquery: '//ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min',
        marionette: '../../vendor/backbone.marionette/lib/core/amd/backbone.marionette',

        text: '../../vendor/requirejs-text/text',

        underscore: '../../vendor/underscore-amd/underscore',

        // path aliases to save typing...
        'templates': '../../../templates'
    },

    shim: {
        Handlebars: {
            exports: 'Handlebars'
        }
    }

});