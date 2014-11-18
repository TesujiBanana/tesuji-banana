"use strict";

var React = require("react");

var MessagesView = require("./messages_view.jsx");
var NewMessageView = require("./new_message_view.jsx");

var MessageActions = require("../actions/message_actions");
var CurrentUserBinding = require('./mixins/current_user_binding.jsx');
  
var KEYS = require("../constants/keys");

var ChatView = React.createClass({
  render: function() {  
    return(
      <div className="panel panel-default chat-panel">
        <MessagesView room={this.props.room} />
        <NewMessageView room={this.props.room} />
      </div>
    );
  }
});

module.exports = ChatView;
