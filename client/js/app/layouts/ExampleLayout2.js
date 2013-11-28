define([
    'marionette',
    'hbs!templates/app/layouts/example-layout-2'
],
    function(Marionette, tpl){

        return Marionette.Layout.extend({

            template: tpl,

            regions: {
                header: '> header',
                content: '> section',
                sidebar: '> aside',
                footer: '> footer'
            }

        });

    });