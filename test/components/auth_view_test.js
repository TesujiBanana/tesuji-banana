require('../spec_helper.js');

React = require('react/addons');
TestUtils = React.addons.TestUtils;

var mocha = require('mocha');
var expect = require('chai').expect;

var AuthView = require('../../src/components/auth_view.jsx');

describe('test our tests', function() {
  it('should display the window objects', function () {
    expect(global.window).to.exist;
    expect(global.document).to.exist;
    expect(global.navigator).to.exist;
  });
});

describe('AuthView', function() {
  var el;
  
  var auth_data = { facebook: { email: 'test@example.com' } };
  var fb_ref = { 
    getAuth: function() { return this.auth_data; },
    authWithOAuthPopup: function(provider, callback) { callback(undefined, auth_data) }
  };
  
  beforeEach(function() {
    var container = global.document.createElement('div');
    el = TestUtils.renderIntoDocument(<AuthView fbRef={fb_ref}/>, container);
  });
  
  it('should provide facebook login link', function() {
    expect(el.getDOMNode().textContent).to.equal('log in!');
  });
  
  it('after logging in, it should show email', function() {
    var link = TestUtils.findRenderedDOMComponentWithTag(el, 'a');
    TestUtils.Simulate.click(link);
    expect(el.getDOMNode().textContent).to.include('test@example.com');
  });
})
