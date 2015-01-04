"use strict";

var React = require("react");
var _ = require('underscore');

// var PropTypes = require("../prop_types.js");
var firebaseRef = require("../firebase_connection.js");

var MessageView = require("./message_view.jsx");

var MessagesView = React.createClass({
  propTypes: {
    channel: React.PropTypes.string
  },
  getInitialState: function() {
    return { messages: [] };
  },
  componentWillMount: function() {
    this.messagesRef = this._getMessagesRef(this.props.channel).limitToLast(100);
    this.messagesRef.on("value", this._handleMessages);
  },
  componentWillUnmount: function() {
    this.messagesRef.off("value", this._handleMessages);
  },
  componentDidUpdate: function() {
    var messagesDiv = this.getDOMNode().firstChild;
    if (messagesDiv.children.length > 0) {
      messagesDiv.lastChild.scrollIntoView();
    }
  },
  _getMessagesRef: function(channel) {
    return firebaseRef.child("channels").child(channel).child("messages");
  },
  _handleMessages: function(dataSnapshot) {
    this.setState({ messages: _.keys(dataSnapshot.val()) });
  },

  render: function() {
    var channel = this.props.channel;
    return(
      <div className="row message-list-container">
        <div className="message-list list-group" id="messages">
          {this.state.messages.map(function(messageId, i) { return(<MessageView channel={channel} key={messageId} messageId={messageId} />) })}
        </div>
      </div>
    );
  }
});

module.exports = MessagesView;
