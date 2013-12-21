var express = require('express');
var app = express();

var Environment = require("./util/Environment");


//mca params too the request
app.param('module', function(req, res, next, module){
    req.module = module;
    next();
});

app.param('controller', function(req, res, next, controller){
    req.controller = controller;
    next();
});

app.param('action', function(req, res, next, action){
    req.action = action;
    next();
});

app.use('/static', express.static(__dirname + '/public'));

app.use(express.logger());

app.all("/app/:module/:controller/:action", function(req, res) {

    try {
        var Package = require(Environment.ModulePath + "modules/" + req.module + "/" + req.controller);
        var PackageName = require.resolve(Environment.ModulePath + "modules/" + req.module + "/" + req.controller);

        var Controller = new Package();
        var action = Controller[req.action];
    } catch(e) {
        //in here we didn't find our file
        res.status(404);
        res.send("The requested module wasn't found. " + e.message);
        return;
    }

    var body = "";

    try {
        body = action.call(Controller, req, res);
        body.environment = Environment;
            res.send(JSON.stringify(body));
    } catch (e) {
        res.status(500);

            body += "An unhandled exception occurred during the request: " + e.message;

        if(Environment.Target !== Environment.TARGET_PRODUCTION) {
            body += "\n\n" + e.stack;
        }

        res.send(body);
    }

    //unload the module when we're done
    delete Controller;
    delete action;
    delete require.cache[PackageName];

});

app.listen(3000);
console.log('Listening on port 3000');