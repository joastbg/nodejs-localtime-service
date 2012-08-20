
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , moment = require('moment')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express['static'](__dirname + '/views'));
  //app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/time', function(req, res){
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end(moment().format('h:mm:ss'));
});

app.get('/date', function(req, res){
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end(moment().format('dddd, MMMM Do YYYY'));
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
