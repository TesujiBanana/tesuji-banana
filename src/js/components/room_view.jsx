"use strict";

var React = require("react");
var ChatView = require("./chat_view.jsx");
var GamesView = require("./games_view.jsx");

var RoomView = React.createClass({

  render: function() {
    return(
      <div className="row">
        <GamesView room={this.props.room} />
        <ChatView room={this.props.room} />
      </div>
    );
  }
});

module.exports = RoomView;
