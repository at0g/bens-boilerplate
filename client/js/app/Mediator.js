define([
    'backbone.wreqr'
],
function(Wreqr){

    return {
        commands: new Wreqr.Commands(),
        reqres: new Wreqr.RequestResponse(),
        vent: new Wreqr.EventAggregator()
    };

});