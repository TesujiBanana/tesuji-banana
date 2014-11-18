'use strict';

var React = require('react');
var ReactFire = require("reactfire");
var Director = require('director');

var NavView = require('./nav_view.jsx');
// var NewRoomView = require('./new_room_view.jsx');
var RoomView = require('./room_view.jsx');

var firebaseRef = require("../firebase_connection.js");

var App = React.createClass({
  mixins: [ReactFire],
  getRoutes: function() {
    return {
      '/game': function() {
      },
      '/room/new': function() {
        
      }
    };
  },
  componentWillMount: function() {
    this.router = Director.Router(this.getRoutes());
    this.router.init();
  },
  componentWillUnmount: function() {
    this.unbind("currentUser");
  },
  getInitialState: function() {
    return {
      currentTab: 'lobby',
      openTabs: [
        'lobby'
      ]
    };
  },
  render: function() {
    return (
      <div className="container">
        <NavView />
        <RoomView room='lobby' />
      </div>
    );
  }
});

module.exports = App;
