/**
 * @providesModule RNShare
 * @flow
 */
'use strict';

var NativeRNShare = require('NativeModules').RNShare;
var invariant = require('invariant');

/**
 * High-level docs for the RNShare iOS API can be written here.
 */

var RNShare = {
  test: function() {
    NativeRNShare.test();
  },
  open: function(options) {
  	NativeRNShare.open(options);
  }
};

module.exports = RNShare;
