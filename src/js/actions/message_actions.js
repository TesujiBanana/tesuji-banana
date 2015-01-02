'use strict';

var _ = require('underscore');

var AppDispatcher = require('../dispatcher/app_dispatcher');

var firebaseRef = require('../firebase_connection.js')
var messagesRef = firebaseRef.child('messages');

var MessageTypes = {
  TEXT: 'MESSAGE.TEXT'
};

var FirebaseDispatcher = {
  dispatch: function(message) {
    messagesRef.push(_.extend(message, {
      from: firebaseRef.getAuth().uid,
      createdAt: Firebase.ServerValue.TIMESTAMP
    }));
  }
};

var fields = ['room'];
var indexRef = firebaseRef.child("index/messages").child(fields.join("_"));

indexRef.child("lastUpdated").once("value", function(dataSnapshot) {
  var lastUpdated = dataSnapshot.val();
  var dataRef = lastUpdated === null ? 
    messagesRef : 
    messagesRef.orderByKey().startAt(lastUpdated + "_");
    
  dataRef.on("child_added", function(childSnapshot, prevChildName) {
    var key = childSnapshot.key();
    var value = childSnapshot.val();
    
    if (_.every(fields, function(field) { return typeof value[field] !== "undefined"})) {
      var indexLocationRef = _.reduce(fields, function(ref, field) {
        return ref.child(value[field]);
      }, indexRef);
      
      indexLocationRef.child(key).set(value.createdAt);
    }
    
    indexRef.child("lastUpdated").set(key);
  });
});


module.exports = {
  createMessage: function(room, text) {
    FirebaseDispatcher.dispatch({
      type: MessageTypes.TEXT,
      room: room,
      text: text
    });
  }
};
