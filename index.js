#!/usr/bin/env node
var program = require("commander");
var co = require("co");
var prompt = require('co-prompt');
var R = require("ramda");
var mapIndexed = R.addIndex(R.map)

var XOR = R.curry(function(str, secret, char, i){
  var converted = str.charCodeAt(i)^secret
  return String.fromCharCode(converted)
})

program
  .arguments('<strToEncode>')
  .option('--secret <secret>', 'The secret used for the XOR')
  .action(function(strToEncode) {
    co(function *() {
      var secret = yield prompt('secret: ');
      console.log(
        'secretToUse: %s strToEncode: %s encodedTo: %s',
        secret,
        strToEncode,
        mapIndexed(XOR(strToEncode, secret), strToEncode).join("")
      )
      process.exit(1);
    })
  })
 .parse(process.argv);
