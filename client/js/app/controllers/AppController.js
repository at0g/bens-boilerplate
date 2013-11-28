define([
    'marionette',
    'Mediator',
    'views/ExampleView',
    'layouts/ExampleLayouts'
],
function(Marionette, Mediator, ExampleView, layouts){

    return Marionette.Controller.extend({

        home: function(){
            Mediator.commands.execute('show:content', new ExampleView());
            console.log('home requested');
        },

        layout1: function(){
            var layout = new layouts.Example1().render();

            layout.on('show', function(){
                // Extend the view inline just to append the region text.
                var contentView = new ExampleView(),
                    sidebarView = new ExampleView()
                    ;
                contentView.on('render', function(){
                    this.$el.append(' (in content region)');
                }, contentView);

                sidebarView.on('render', function(){
                    this.$el.append(' (in sidebar region)');
                }, sidebarView);

                layout.content.show(contentView);
                layout.sidebar.show(sidebarView);
            }, this);

            Mediator.commands.execute('show:content', layout);
        },

        layout2: function(){

            var layout = new layouts.Example2().render();

            Mediator.commands.execute('show:content', layout);
        }

    });

});