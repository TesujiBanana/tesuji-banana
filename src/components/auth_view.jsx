'use strict';

var React = require('react');
var Firebase = require('firebase');

var Auth = React.createClass({
  getInitialState: function() {
    return this.props.fbRef.getAuth() || null;
  },
  authenticate: function() {
    this.props.fbRef.authWithOAuthPopup("facebook", function(error, auth_data) { 
      if(auth_data) {
        this.setState(auth_data);
      }
    }.bind(this));
  },
  render: function() {
    if (this.state) {
      return(<div>logged in as {this.state.facebook.email}</div>);
    } else {
      return(<div><a href='#' onClick={this.authenticate}>log in!</a></div>);
    }
  }
});

module.exports = Auth;
