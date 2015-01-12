"use strict";

var React = require("react");
var Firebase = require("firebase");

var MessageView = React.createClass({
  propTypes: {
    fbRef: React.PropTypes.instanceOf(Firebase).isRequired
  },
  getInitialState: function() {
    return { message: {} }
  },
  componentWillMount: function() {
    this.props.fbRef.on("value", this._handleMessage);
  },
  componentWillUnmount: function() {
    this.props.fbRef.off("value", this._handleMessage);
  },
  _handleMessage: function(data) {
    this.setState({ message: data.val() });
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
