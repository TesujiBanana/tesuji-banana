"use strict";

var _ = require('underscore');

var Stone = function(attributes) {
  var defaults = {
  };
  // TODO: required fields
  
  _.extend(this, _.defaults(attributes, defaults));
};

Stone.BLACK = 0;
Stone.WHITE = 1;

module.exports = Stone;
