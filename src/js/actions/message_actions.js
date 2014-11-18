'use strict';

var AppDispatcher = require('../dispatcher/app_dispatcher');
var firebaseRef = require('../firebase_connection.js');

var MessageActions = {
  createMessage: function(args) {
    var ref = firebaseRef.child("rooms").child(args.room).child("messages");
    ref.push({
      text: args.text,
      uid: args.user.uid,
      displayName: args.user.displayName,
      createdAt: Firebase.ServerValue.TIMESTAMP
    });
  }
};

module.exports = MessageActions;
