//
// hook.io-feed - Provide a feed of hook events
//
var Hook = require('hook.io').Hook,
    http = require('http'),
    util = require('util'),
    url = require('url'),
    json2xml  = require('./json2xml').json2xml;

var Feed = exports.Feed = function(options){
  Hook.call(this, options);
  var self = this;

  self.feed = [];

  self.mapEvents(require('./feed/eventMap'));

  self.on('hook::ready', function(){

    self.findPort({ port: self.port }, function(err, port){
      self.port = port;
      self.createServer();
    })

  });

};

// Feed inherits from Hook
util.inherits(Feed, Hook);

Feed.prototype.publish = require('./feed/publish').publish;
Feed.prototype.subscribe = require('./feed/subscribe').subscribe;

//
// Sugar syntax for pub / sub
//
Feed.prototype.pub = Feed.prototype.publish;
Feed.prototype.sub = Feed.prototype.subscribe;

Feed.prototype.createServer = function(options, callback){
 
 var self = this;
 
 http.createServer(function(req, res){
   
   var body = '';
   var uri = url.parse(req.url);

   //
   //  / - root
   //  A list of all available feeds
   if(uri.pathname == '/') {
     body = JSON.stringify(self.feed, true, 2);
   }
   
   //
   //  /all
   //  All available events
   if(uri.pathname == '/all') {
     body = '';
   }
   
   //
   //  /all.json
   //  All available events as json
   if(uri.pathname == '/all.json') {
     body = JSON.stringify(self.feed);
   }
   
   //
   //  /all.xml
   //  All available events as xml
   if(uri.pathname == '/all.xml') {
     body = json2xml(self.feed);
   }

   res.write(body);
   res.end();

 }).listen(self.port, function(err, result){
   self.emit('feed::server::started', self.port);
 });

};
