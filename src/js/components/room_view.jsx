"use strict";

var React = require("react");

var MessagesView = require("./messages_view.jsx");
var NewMessageView = require("./new_message_view.jsx");

var RoomView = React.createClass({

  render: function() {
    return(
      <div className="col-md-10">
        <div className="row chat-panel">
          <MessagesView room={this.props.room} key={this.props.room}/>
          <NewMessageView room={this.props.room} />
        </div>
      </div>
    );
  }
});

module.exports = RoomView;
