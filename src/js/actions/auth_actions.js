'use strict';

var AppDispatcher = require('../dispatcher/app_dispatcher');
var firebaseRef = require('../firebase_connection.js');

var AuthActions = {
  authenticate: function() {
    firebaseRef.authWithOAuthPopup("facebook", function(error, authData) {
      if (!error && authData) {
        var ref = firebaseRef.child('users').child(authData.uid);
        ref.update({
          uid: authData.uid,
          email: authData.facebook.email,
          displayName: authData.facebook.displayName
        });
      }
    });
  },
  signOut: function() {
    firebaseRef.unauth();
  }
};

module.exports = AuthActions;
