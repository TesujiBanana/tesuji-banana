'use strict';

var React = require("react");
var _ = require("underscore");

var firebaseRef = require('../firebase_connection.js');

var RoomListView = React.createClass({
  getInitialState: function() {
    return { rooms: [] };
  },
  componentWillMount: function() {
    this.firebaseRef = this._getFirebaseRef();
    this.firebaseRef.on("value", this._handleRoomData);
  },
  componentWillUnmount: function() {
    if (typeof this.firebaseRef !== "undefined") {
      this.firebaseRef.on("value", this._handleRoomData);
    }
  },
  _getFirebaseRef: function() {
    var uid = firebaseRef.getAuth().uid;
    return firebaseRef.child("users").child(uid).child("rooms");
  },
  _handleRoomData: function(dataSnapshot) {
    var newState = _.keys(dataSnapshot.val());
    this.setState({rooms: newState});
  },
  render: function() {
    var currentRoom = this.props.currentRoom;
    return(
      <ul className="nav nav-pills nav-stacked">
        {this.state.rooms.map(function(roomName, i) {
          var classes = (roomName === currentRoom ? ' active' : '');
          return(<li className={classes} key={i}><a href={"#/rooms/" + roomName}>{roomName}</a></li>);
        })}
      </ul>
    );
  }
});

module.exports = RoomListView;
