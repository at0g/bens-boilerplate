define([
    'marionette',
    'controllers/AppController',
    'GA'
],
function(Marionette, Controller, GA){

    var router = Marionette.AppRouter.extend({
        controller: new Controller(),
        appRoutes: {
            ''      : 'home'
        },
        initialize: function(){
            this.on('route', function(fragment){
                GA.view(Backbone.history.fragment);
            }, this);
        }
    });

    return router;

});