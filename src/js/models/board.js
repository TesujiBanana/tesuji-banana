"use strict";

var _ = require('underscore');

var Board = function(attributes) {
  if (typeof attributes === 'undefined') { attributes = {}; }
    
  var defaults = {
    boardSize: 19,
    currentTurn: 0,
    stones: []
  };
  
  _.extend(this, _.defaults(attributes, defaults));
};

module.exports = Board;
