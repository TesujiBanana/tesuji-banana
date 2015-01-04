'use strict';

var React = require('react');
var ReactFire = require("reactfire");
var Director = require('director');
var _ = require('underscore');

var NavView = require('./nav_view.jsx');
var MainView = require('./main_view.jsx');

var CurrentUserBinding = require('./mixins/current_user_binding.jsx');
var AuthActions = require('../actions/auth_actions');

// var firebaseRef = require("../firebase_connection.js");

var App = React.createClass({
  mixins: [CurrentUserBinding],
  componentWillMount: function() {
    this.router = this._getRouter().init();
  },
  componentWillUnmount: function() {
    this.unbind("currentUser");
    typeof this.router !== 'undefined' && this.router.destroy();
  },
  getInitialState: function() {
    return {
      currentTab: 'lobby',
      openTabs: [
        'lobby'
      ]
    };
  },
  _getRouter: function() {
    return Director.Router({
      '/rooms/:roomName': this._handleRoute.bind(this, 'rooms', ['roomName'])
    });
  },
  _handleRoute: function(view, keys) {
    var values = [].splice.call(arguments, 2);
    var viewArgs = _.object(keys, values);
    
    this.setState({view: view, viewArgs: viewArgs});
  },
  render: function() {
    if (typeof this.state.currentUser === 'undefined') {
      return (
        <div className="container">
          <div className="jumbotron">
            <h1>Welcome to Tesuji Banana!</h1>
            <p>errp derrp some text blah</p>
            <a className="btn btn-primary btn-large" href="#" role="button" onClick={AuthActions.authenticate}>Log In</a>
          </div>
        </div>
      );
    }
    else {
      return (
        <div className="container-fluid main">
          <div className="row main">
            <NavView view={this.state.view} viewArgs={this.state.viewArgs} />
            <MainView view={this.state.view} viewArgs={this.state.viewArgs} />
          </div>
          
        </div>
      );
    }
  }
});

module.exports = App;
