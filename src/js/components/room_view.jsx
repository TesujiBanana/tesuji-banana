"use strict";

var React = require("react");

var MessageListView = require("./message_list_view.jsx");
var MessageInputView = require("./message_input_view.jsx");

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
      <div className="col-md-10 main main-viewport">
        <MessageListView channel={channel} key={channel}/>
        <MessageInputView channel={channel} />
      </div>
    );
  }
});

module.exports = RoomView;
