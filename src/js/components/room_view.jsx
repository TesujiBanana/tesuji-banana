"use strict";

var React = require("react");

var MessagesView = require("./messages_view.jsx");
var NewMessageView = require("./new_message_view.jsx");

var RoomView = React.createClass({
  propTypes: {
    room: React.PropTypes.string.isRequired
  },
  _getChannel: function(room) {
    // TODO: determine if we should just pass the full path, since it should be the same
    return "/rooms/" + room;
  },
  render: function() {
    var channel = this._getChannel(this.props.room);
    return(
      <div className="col-md-10 main">
        <MessagesView channel={channel} key={channel}/>
        <NewMessageView channel={channel} />
      </div>
    );
  }
});

module.exports = RoomView;
