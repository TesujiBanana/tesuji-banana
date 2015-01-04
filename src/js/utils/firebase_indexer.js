'use strict';

// WARNING: this is not currently being used ... 

var _ = require('underscore');
var firebaseRef = require('../firebase_connection.js')

// WARNING: this is not currently being used ... 

module.exports = {
  index: function(path, fields) {
    var baseRef = firebaseRef.child(path);
    var indexRef = baseRef.child(fields.join("_"));

    indexRef.child("lastUpdated").once("value", function(dataSnapshot) {
      var lastUpdated = dataSnapshot.val();
      var dataRef = lastUpdated === null ? 
        baseRef : 
        baseRef.orderByKey().startAt(lastUpdated + "_");
        
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
  }
};
