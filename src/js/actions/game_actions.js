'use strict';

var AppDispatcher = require('../dispatcher/app_dispatcher');
var firebaseRef = require('../firebase_connection.js');

var _ = require('underscore');

var MessageActions = {
  createGame: function(args) {
    var ref = firebaseRef.child("rooms")
      .child(args.room)
      .child("games");
      
    ref.push(_.extend(args, {
      gameState: 'pregame',
      createdAt: Firebase.ServerValue.TIMESTAMP
    }));
  },
  createChallenge: function(args) {
    var challenge = _.extend(args, {
      createdAt: Firebase.ServerValue.TIMESTAMP
    });
    
    var challengeId = firebaseRef
      .child("challenges")
      .push(challenge)
      .key();
          
    // firebaseRef.child("users")
    //   .child(challenge.challengerUid)
    //   .child("challenges")
    //   .child(challengeId)
    //   .set({createdAt: Firebase.ServerValue.TIMESTAMP});
    //   
    // firebaseRef.child("users")
    //   .child(challenge.challengedUid)
    //   .child("inboundChallenges")
    //   .child(challengeId)
    //   .set({createdAt: Firebase.ServerValue.TIMESTAMP});
  }
};

module.exports = MessageActions;
