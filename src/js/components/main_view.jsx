'use strict';

var React = require('react');

var RoomView = require('./room_view.jsx');

var MainView = React.createClass({
  render: function() {
    if (this.props.view === 'rooms') {
      return <RoomView room={this.props.viewArgs.roomName} />
    }
    else {
      return (<div className="col-md-10">errp</div>)
    }
    // return (
    //   <div className="col-md-2 main-nav">
    //     <h4>Rooms</h4>
    //     <RoomListView currentRoom={this.props.view === 'rooms' && this.props.viewArgs.roomName} />
    //   </div>
    // );
    // <div className="panel-body">
    //   <JoinRoomView />
    // </div>
    // <RoomListView currentRoom={this.props.currentRoom} />
    // <JoinRoomView />
    // <AuthDropdownView />
  }
});

module.exports = MainView;
