/**
 * @providesModule RNShare
 * @flow
 */
'use strict';

import {NativeModules} from 'react-native';
let NativeRNShare = NativeModules.RNShare;
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
