define([
    'marionette',
    'hbs!templates/app/layouts/example-layout-1'
],
function(Marionette, tpl){

    return Marionette.Layout.extend({

        template: tpl,

        regions: {
            content: '> section',
            sidebar: '> aside'
        }

    });

});