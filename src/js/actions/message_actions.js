'use strict';

var _ = require('underscore');

var AppDispatcher = require('../dispatcher/app_dispatcher');

var firebaseRef = require('../firebase_connection.js');

var MessageTypes = require('../constants/message_types');

// TODO: move the dispatcher to its own file
var MessageDispatcher = {
  dispatch: function(ref, message) {
    ref.push(_.extend(message, {
      from: firebaseRef.getAuth().uid,
      createdAt: Firebase.ServerValue.TIMESTAMP
    }));
  }
};

module.exports = {
  createTextMessage: function(ref, text) {
    MessageDispatcher.dispatch(ref, {
      type: MessageTypes.TEXT,
      text: text
    });
  },
  createNewMove: function(ref, move) {
    MessageDispatcher.dispatch(ref, _.extend(move, {
      type: MessageTypes.MOVE
    }));
  }
  
};
