/**
 * @providesModule RNShare
 * @flow
 */
'use strict';

var { NativeModules } = require('react-native');
var NativeRNShare = NativeModules.RNShare;

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
