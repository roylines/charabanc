var transport = require('./lib/transports/memory');

var charabanc = {};

charabanc.register = transport.register;
charabanc.unregister = transport.unregister; 
charabanc.send = transport.send;

module.exports = charabanc;
