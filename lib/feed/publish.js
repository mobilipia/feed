var publish = exports.publish = function (options) {
  
  var self = this;

  //
  // Remark From @Marak:  I'm not sure if using ** here is safe ( possible rebroadcast bug )
  //
  self.on('**', function(data){
    if(self.feed.length >= 10) {
      self.feed.shift();
    }
    self.feed.push({
      event: this.event,
      data: data
    })
  });

};
