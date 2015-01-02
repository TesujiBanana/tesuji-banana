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
    // console.log(firebaseRef.getAuth().uid);
    // console.log(roomName);
    // firebaseRef
    //   .child("rooms")
    //   .orderByChild("name")
    //   .equalTo(roomName)
    //   .limitToFirst(1)
    //   .once("value", function(dataSnapshot) {
    //     console.log(dataSnapshot.val());
    // }, function()
    // );
  }
};

module.exports = RoomActions;
