"use strict";

var React = require("react");
var firebaseRef = require("../firebase_connection.js");

var MessageView = React.createClass({
  propTypes: {
    channel: React.PropTypes.string.isRequired,
    messageId: React.PropTypes.string.isRequired
  },
  getInitialState: function() {
    return { message: '' }
  },
  componentWillMount: function() {
    this.messageRef = this._getMessageRef(this.props.channel, this.props.messageId);
    this.messageRef.on("value", this._handleMessage);
  },
  componentWillUnmount: function() {
    this.messageRef.off("value", this._handleMessage);
  },
  _getMessageRef: function(channel, messageId) {
    return firebaseRef.child("channels").child(channel).child("messages").child(messageId);
  },
  _handleMessage: function(dataSnapshot) {
    this.setState({ message: dataSnapshot.val() });
  },
  render: function() {
    // var formattedTimeStamp = (new Date(this.props.message.createdAt)).toLocaleTimeString();
    return(
      <div className="list-group-item">
        {JSON.stringify(this.state.message)}
      </div>  
    );
    
    // <h5 className="list-group-item-heading">
    //   {this.props.message.displayName} <small>{formattedTimeStamp}</small>
    // </h5>
    // <p className="list-group-item-text">{this.props.message.text}</p>
  }
});

module.exports = MessageView;
