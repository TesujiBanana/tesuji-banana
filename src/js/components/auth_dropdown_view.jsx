'use strict';

var React = require('react');
var ReactFire = require('reactfire');

var AuthActions = require('../actions/auth_actions');
var CurrentUserBinding = require('./mixins/current_user_binding.jsx');


var AuthDropdownView = React.createClass({
  mixins: [CurrentUserBinding],
  
  render: function() {
    if (this.loggedIn()) {
      return (
        <ul className="nav navbar-nav navbar-right">
          <li className="dropdown">
            <a href="#" className="dropdown-toggle" data-toggle="dropdown">{this.state.currentUser.displayName}</a>
            <ul className="dropdown-menu" role="menu">
              <li><a href="#" onClick={AuthActions.signOut}>sign out</a></li>
              <li><a href="#/room/new" >join room</a></li>
            </ul>
          </li>
        </ul>
      );
    } else {
      return(
        <ul className="nav navbar-nav navbar-right">
          <li>
            <a href='#' onClick={AuthActions.authenticate}>log in!</a>
          </li>
        </ul>
      );
    }
  }
});

module.exports = AuthDropdownView;
