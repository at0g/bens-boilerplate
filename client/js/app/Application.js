define([
    'backbone',
    'marionette',
    'Mediator',
    'routers/AppRouter'
],
function(Backbone, Marionette, Mediator, AppRouter){

    var app     = new Marionette.Application(),
        router  = new AppRouter()
    ;

    app.commmands   = Mediator.commmands;
    app.reqres      = Mediator.reqres;
    app.vent        = Mediator.vent;

    app.addRegions({
       content: '#content'
    });

    Mediator.commands.setHandler('show:content', function(view){
        this.content.show(view);
    }, app);

    app.on('start', function(){
        console.log('Application started');
        Backbone.history.start({ pushState: false });
    }, app);

    return app;

});