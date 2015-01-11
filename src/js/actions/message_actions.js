'use strict';

var _ = require('underscore');

var AppDispatcher = require('../dispatcher/app_dispatcher');

var firebaseRef = require('../firebase_connection.js');

var MessageTypes = require('../constants/message_types');

// TODO: move the dispatcher to its own file
var MessageDispatcher = {
  dispatch: function(channel, message) {
    var ref = firebaseRef.child("channels").child(channel).child("messages");
    ref.push(_.extend(message, {
      from: firebaseRef.getAuth().uid,
      createdAt: Firebase.ServerValue.TIMESTAMP
    }));
  }
};

module.exports = {
  createTextMessage: function(channel, text) {
    MessageDispatcher.dispatch(channel, {
      type: MessageTypes.TEXT,
      text: text
    });
  },
  createMoveMessage: function(channel, gameId, x, y) {
    MessageDispatcher.dispatch(channel, {
      type: MessageTypes.MOVE,
      gameId: gameId,
      x: x,
      y: y
    });
  }
  
};
