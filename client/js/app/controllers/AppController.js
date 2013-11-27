define([
    'marionette',
    'Mediator',
    'views/ExampleView'
],
function(Marionette, Mediator, ExampleView){

    return Marionette.Controller.extend({

        home: function(){
            Mediator.commands.execute('show:content', new ExampleView());
            console.log('home requested');
        }

    });

});