define([
    'marionette',
    'hbs!templates/app/views/example-view'
],
function(Marionette, tpl){

    return Marionette.ItemView.extend({
        template: tpl
    });

});