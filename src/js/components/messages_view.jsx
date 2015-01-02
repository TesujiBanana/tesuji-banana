"use strict";

var React = require("react");
var _ = require('underscore');

var MessageView = require("./message_view.jsx");

var firebaseRef = require("../firebase_connection.js");

var MessagesView = React.createClass({
  getInitialState: function() {
    return { messages: [] };
  },
  componentWillMount: function() {
    this.messagesIndexRef = this._getIndexRef(this.props.room);
    this.messagesIndexRef.on("value", this._handleMessages);
  },
  componentWillUnmount: function() {
    this.messagesIndexRef.off("value", this._handleMessages);
  },
  // componentWillReceiveProps: function(nextProps) { 
  //   if (this.props.room !== nextProps.room) {
  //     this.setState({messages: []});
  //     this.messagesIndexRef.off("value", this._handleMessages);
  //     this.messagesIndexRef = this._getIndexRef(nextProps.room);
  //     this.messagesIndexRef.on("value", this._handleMessages);
  //   }
  // },
  componentDidUpdate: function() {
    var messagesDiv = this.getDOMNode().firstChild;
    if (messagesDiv.children.length > 0) {
      messagesDiv.lastChild.scrollIntoView();
    }
  },
  _getIndexRef: function(room) {
    return firebaseRef.child("index/messages/room").child(room).limitToLast(10);
  },
  _handleMessages: function(dataSnapshot) {
    this.setState({ messages: _.keys(dataSnapshot.val()) });
  },

  render: function() {
    return(
      <div className="panel-body">
        <div className="list-group list-unstyled" id="messages">
          {this.state.messages.map(function(messageId, i) { return(<MessageView key={messageId} messageId={messageId} />) })}
        </div>
      </div>
    );
  }
});

module.exports = MessagesView;
