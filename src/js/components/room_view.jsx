"use strict";

var React = require("react");

var MessageListView = require("./message_list_view.jsx");
var MessageInputView = require("./message_input_view.jsx");

var firebaseRef = require("../firebase_connection.js");

var RoomView = React.createClass({
  propTypes: {
    roomId: React.PropTypes.string.isRequired
  },
  _getRef: function(roomId) {
    return firebaseRef.child("rooms").child(roomId).child("messages");
  },
  render: function() {
    var ref = this._getRef(this.props.roomId);
    return(
      <div className="col-md-10 main main-viewport">
        <MessageListView fbRef={ref} />
        <MessageInputView fbRef={ref} />
      </div>
    );
  }
});

module.exports = RoomView;
