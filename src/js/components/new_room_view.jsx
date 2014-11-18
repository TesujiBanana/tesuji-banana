'use strict';

var React = require('react');

var NewRoomView = React.createClass({
  getInitialState: function() {
    return { roomName: 'Room Name' };
  },
  handleInput: function(field, event) {
    var newState = {};
    newState[field] = event.target.value;
    this.setState(newState);
  },
  render: function() {
    return(
      <div className="row">
        <form className="form-horizontal" role="form">
          <div className="form-group">
            <label htmlFor="roomName" className="control-label col-sm-2">Room Name: </label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="roomName" name="roomName" value={this.state.roomName} onChange={this.handleInput.bind(this, 'roomName')} />
            </div>
          </div>
        </form>
      </div>
    );
  }
});

module.exports = NewRoomView;
