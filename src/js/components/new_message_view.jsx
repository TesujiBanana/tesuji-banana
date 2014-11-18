"use strict";

var React = require("react");

var MessageActions = require("../actions/message_actions");
var CurrentUserBinding = require('./mixins/current_user_binding.jsx');
  
var KEYS = require("../constants/keys");

var ChatView = React.createClass({
  mixins: [CurrentUserBinding],
  getInitialState: function() {
    return { newMessageText: "" };
  },
  componentDidMount: function() {
    this.updateTextAreaHeight();
  },
  componentDidUpdate: function() {
    this.updateTextAreaHeight();
  },
  handleKeyPress: function(e) {
    if (e.which === KEYS.enter && !e.shiftKey) {

      MessageActions.createMessage({
        room: this.props.room,
        text: e.target.value,
        user: this.state.currentUser,
        createdAt: Firebase.ServerValue.TIMESTAMP
      });
      
      this.setState({
        newMessageText: ""
      });
      
      e.preventDefault();
    }
  },
  handleChange: function(e) { 
    this.setState({newMessageText: e.target.value});
  },
  computeTextAreaHeight: function(el) {
    var styles = window.getComputedStyle(el);
        
    var lineHeight = parseInt(styles.lineHeight);
    var minHeight = parseInt(styles.minHeight);
    var maxHeight = parseInt(styles.maxHeight);
    
    el.style.height = '0px';
    el.scrollTop = 0;
    el.scrollTop = 10000;
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
  updateTextAreaHeight: function() {
    var textArea = this.getDOMNode().firstChild.firstChild;
    var textAreaHeight = this.computeTextAreaHeight(textArea);
    textArea.style.height = textAreaHeight + 'px';
  },
  render: function() {
    return(
      <div className="panel-footer">
        <div>
          <textarea className="form-control" value={this.state.newMessageText} onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
        </div>
      </div>
    );
  }
});

module.exports = ChatView;
