module['exports'] = {
  "**::feed::subscribe" : function (data, callback) {
    this.subscribe(data, callback);
  },
  "**::feed::publish" : function (data, callback) {
    this.publish(data, callback);
  }
};
