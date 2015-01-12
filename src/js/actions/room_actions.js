'use strict';

var AppDispatcher = require('../dispatcher/app_dispatcher');
var firebaseRef = require('../firebase_connection.js');

var _ = require('underscore');

var RoomActions = {
  joinRoom: function(roomName, user) {
    var uid = firebaseRef.getAuth().uid;
    
    firebaseRef
      .child("rooms")
      .child(roomName)
      .child("messages")
      .child("incoming")
      .push(
        {
          type: "JOIN_ROOM",
          from: uid
        }, function(error) {
          if (error === null) {
            firebaseRef
              .child("users")
              .child(uid)
              .child("rooms")
              .child(roomName)
              .set(true);
          }
        }
      );
  }
};

module.exports = RoomActions;
