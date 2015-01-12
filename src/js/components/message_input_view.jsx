"use strict";

var React = require("react");
var Firebase = require("firebase");

var MessageActions = require("../actions/message_actions");
var AutoresizeTextarea = require("./mixins/autoresize_textarea");
var KEYS = require("../constants/keys");


var MessageInputView = React.createClass({
  mixins: [AutoresizeTextarea],
  propTypes: {
    fbRef: React.PropTypes.instanceOf(Firebase).isRequired
  },
  getInitialState: function() {
    return { newMessageText: "" };
  },
  componentDidMount: function() {
    var textarea = this.getDOMNode().firstChild.firstChild;
    this._updateTextAreaHeight(textarea);
  },
  componentDidUpdate: function() {
    var textarea = this.getDOMNode().firstChild.firstChild;
    this._updateTextAreaHeight(textarea);
  },
  _handleKeyPress: function(e) {
    if (e.which === KEYS.enter && !e.shiftKey) {
      MessageActions.createTextMessage(this.props.fbRef, e.target.value);
      this.setState({ newMessageText: "" });
      e.preventDefault();
    }
  },
  _handleChange: function(e) { 
    this.setState({newMessageText: e.target.value});
  },
  render: function() {
    return(
      <div className="row message-input">
        <div className="message-input-holder">
          <textarea className="form-control" value={this.state.newMessageText} onChange={this._handleChange} onKeyPress={this._handleKeyPress} />
        </div>
      </div>
    );
  }
});

module.exports = MessageInputView;
