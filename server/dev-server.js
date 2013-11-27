var express = require('express'),
    cons    = require('consolidate'),
    path    = require('path'),
    pkg     = require(path.join(__dirname, '../', 'package.json')),
    config  = require(path.join(__dirname, '../', 'config.json'))
    ;

var app     = express(),
    port    = process.env.PORT || 8080
;


// Set the view engine to parse html as hbs
app.engine('html', cons.handlebars);
app.set('view engine', 'html');
// Set the path to templates
app.set('views', path.join(__dirname, '../', 'templates'));



// Mount static directories...
// Mount public as /
app.use( express.static(path.join(__dirname, '../', 'public')) );


app.configure('development', function(){
    app.set('config', config.development);

    // Mount client/vendor as /vendor
    app.use('/vendor', express.static(path.join(__dirname, '../', 'client/vendor')) );

    // Mount templates as /templates
    app.use('/templates', express.static(path.join(__dirname, '../', 'templates')) );

});

app.configure('staging', function(){
    app.set('config', config.staging);
});

app.configure('production', function(){
    app.set('config', config.production);
});





app.get('/', function(req, res){
    res.render('index', {
        pkg: pkg,
        config: app.get('config'),
        title: pkg.name
    });
});


app.listen(port);
console.log('Dev server started on %s', port);

process.on('SIGINT', function() {
    console.warn('Dev server stopped');
    process.exit(0);
});
