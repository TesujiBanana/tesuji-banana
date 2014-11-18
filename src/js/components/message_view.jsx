"use strict";

var React = require("react");

var MessageView = require("./message_view.jsx");

var MessagesView = React.createClass({
  render: function() {
    var formattedTimeStamp = (new Date(this.props.message.createdAt)).toLocaleTimeString();
    return(
      <div className="list-group-item">
        <h5 className="list-group-item-heading">
          {this.props.message.displayName} <small>({formattedTimeStamp})</small>
        </h5>
        <p className="list-group-item-text">{this.props.message.text}</p>
      </div>  
    );
  }
});

module.exports = MessagesView;
