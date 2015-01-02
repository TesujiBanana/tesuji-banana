require('../spec_helper.js');

React = require('react/addons');
TestUtils = React.addons.TestUtils;

var mocha = require('mocha');
var expect = require('chai').expect;

var NavView = require('../../src/js/components/nav_view.jsx');

describe('NavView', function() {
  var el;
  
  var auth_data = { facebook: { email: 'test@example.com' } };
  var fb_ref = { 
    getAuth: function() { return this.auth_data; },
    authWithOAuthPopup: function(provider, callback) { callback(undefined, auth_data) }
  };
  
  beforeEach(function() {
    var container = global.document.createElement('div');
    el = TestUtils.renderIntoDocument(<NavView fbRef={fb_ref}/>, container);
  });
  
})
