'use strict';

var React = require('react');

var RoomListView = require('./room_list_view.jsx');
var JoinRoomView = require('./join_room_view.jsx');
var AuthDropdownView = require('./auth_dropdown_view.jsx');

var NavView = React.createClass({
  render: function() {
    return (
      <div className="col-md-2 main nav">
        <h4>Rooms</h4>
        <RoomListView currentRoom={this.props.view === 'rooms' && this.props.viewArgs.roomName} />
        <AuthDropdownView />
      </div>
    );
  }
});

module.exports = NavView;
