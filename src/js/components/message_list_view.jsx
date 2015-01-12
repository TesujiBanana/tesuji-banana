"use strict";

var React = require("react");
var Firebase = require("firebase");
var _ = require('underscore');

var MessageView = require("./message_view.jsx");

var MessageListView = React.createClass({
  propTypes: {
    fbRef: React.PropTypes.instanceOf(Firebase).isRequired
  },
  getInitialState: function() {
    return { messages: [] };
  },
  componentWillMount: function() {
    this.messagesRef = this.props.fbRef.limitToLast(100);
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
  _handleMessages: function(data) {
    this.setState({ messages: _.keys(data.val()) });
  },
  render: function() {
    return(
      <div className="row message-list-container">
        <div className="message-list list-group" id="messages">
          {this.state.messages.map(function(messageId) { 
            var ref = this.props.fbRef.child(messageId);
            return <MessageView fbRef={ref} key={messageId} />
          }.bind(this))}
        </div>
      </div>
    );
  }
});

module.exports = MessageListView;
