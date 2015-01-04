'use strict';

var React = require('react');
var ReactFire = require('reactfire');

var AuthActions = require('../actions/auth_actions');
var CurrentUserBinding = require('./mixins/current_user_binding.jsx');

var AuthDropdownView = React.createClass({
  mixins: [CurrentUserBinding],
  
  render: function() {
    return (
      <div className="panel pandle-default auth-dropdown">
        <div className="panel-body dropup">
          <a href="#" className="dropdown-toggle" id="authDropdown" data-toggle="dropdown" aria-expanded="false">
            {this.state.currentUser.displayName}
            <span className="caret"></span>
          </a>
          <ul className="dropdown-menu" role="menu" aria-labelledby="authDropdown">
            <li><a href="#" onClick={AuthActions.signOut}>sign out</a></li>
            <li><a href="#/room/new" >join room</a></li>
          </ul>
        </div>
      </div>
    );
  }
});

module.exports = AuthDropdownView;
