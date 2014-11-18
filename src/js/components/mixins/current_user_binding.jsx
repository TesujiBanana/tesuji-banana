'use strict';

var ReactFire = require('reactfire');
var firebaseRef = require('../../firebase_connection');

var CurrentUserBinding = {
  mixins: [ReactFire],
  componentWillMount: function() {  
    firebaseRef.onAuth(this.onAuth, this);
  },
  componentWillUnmount: function() {
    firebaseRef.offAuth(this.onAuth, this);
    
    if (typeof this.firebaseRefs["currentUser"] !== "undefined") {
      this.unbind("currentUser");
    }
  },
  onAuth: function(authData) {
    this.setState({auth: authData});
    
    if (typeof this.firebaseRefs["currentUser"] !== "undefined") {
      this.unbind("currentUser");
    }
    
    if (authData !== null) {
      var currentUserRef = firebaseRef.child('users').child(authData.uid);
      this.bindAsObject(currentUserRef, "currentUser");
    } else {
      this.setState({currentUser: undefined});
    }
  },
  loggedIn: function() {
    return !!this.state.currentUser;
  }
};

module.exports = CurrentUserBinding;
