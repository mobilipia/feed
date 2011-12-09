var FeedSub = require('feedsub');

var subscribe = exports.subscribe = function (options) {
  
  var self = this;

  options.feeds.forEach(function(feed) {

    var reader = new FeedSub(feed.url, feed);

    reader.on('item', function(item) {
      self.emit(feed.name + '::item', item);
    });

    reader.start();
    self._readers.push(reader);
  });

};
