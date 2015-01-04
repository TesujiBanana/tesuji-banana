"use strict";

var React = require("react");

var MessageActions = require("../actions/message_actions");
  
var KEYS = require("../constants/keys");

var ChatView = React.createClass({
  propTypes: {
    channel: React.PropTypes.string.isRequired
  },
  getInitialState: function() {
    return { newMessageText: "" };
  },
  componentDidMount: function() {
    this._updateTextAreaHeight();
  },
  componentDidUpdate: function() {
    this._updateTextAreaHeight();
  },
  _handleKeyPress: function(e) {
    if (e.which === KEYS.enter && !e.shiftKey) {
      MessageActions.createTextMessage(this.props.channel, e.target.value);
      this.setState({ newMessageText: "" });
      e.preventDefault();
    }
  },
  _handleChange: function(e) { 
    this.setState({newMessageText: e.target.value});
  },
  _computeTextAreaHeight: function(el) {
    var styles = window.getComputedStyle(el);
        
    var lineHeight = parseInt(styles.lineHeight);
    var minHeight = parseInt(styles.minHeight);
    var maxHeight = parseInt(styles.maxHeight);
    
    el.style.height = '0px';
    el.scrollTop = 0;
    el.scrollTop = 9999;
    var scrollHeight = parseInt(el.scrollTop);
  
    var calculatedHeight = lineHeight + scrollHeight + 14;

    if (calculatedHeight < minHeight) {
      return minHeight;
    } else if (calculatedHeight > maxHeight) {
      return maxHeight;
    } else {
      return calculatedHeight;
    }
  },
  _updateTextAreaHeight: function() {
    var textArea = this.getDOMNode().firstChild.firstChild;
    var textAreaHeight = this._computeTextAreaHeight(textArea);
    textArea.style.height = textAreaHeight + 'px';
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

module.exports = ChatView;
