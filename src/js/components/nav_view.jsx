'use strict';

var React = require('react');

var AuthDropdownView = require('./auth_dropdown_view.jsx');

var Nav = React.createClass({

  render: function() {
    return (
      <nav className="navbar navbar-default" role="navigation">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">
              <img src="img/budha-icon.jpg" />
            </a>
          </div>
          <ul className="nav navbar-nav navbar-left">
            <li><a href="#">Lobby</a></li>
          </ul>
          <AuthDropdownView />
        </div>
      </nav>
    );
  }
});

module.exports = Nav;
