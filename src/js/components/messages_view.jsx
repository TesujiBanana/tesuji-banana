"use strict";

var React = require("react");
var ReactFire = require("reactfire");

var MessageView = require("./message_view.jsx");

var firebaseRef = require("../firebase_connection.js");

var MessagesView = React.createClass({
  mixins: [ReactFire],
  getInitialState: function() {
    return { 
      messages: []
    };
  },
  componentWillMount: function() {
    var ref = firebaseRef.child("rooms").child(this.props.room).child("messages")
    this.bindAsArray(ref.limit(10), "messages");
  },
  componentWillUnmount: function() {
    this.unbind("messages");
  },
  componentDidUpdate: function() {
    var messagesDiv = this.getDOMNode().firstChild;
    if (messagesDiv.children.length > 0) {
      messagesDiv.lastChild.scrollIntoView();
    }
  },
  render: function() {  
    return(
      <div className="panel-body">
        <div className="list-group list-unstyled" id="messages">
          {this.state.messages.map(function(val, i) { return(<MessageView message={val} key={i} />) })}
        </div>
      </div>
    );
  }
});

module.exports = MessagesView;
