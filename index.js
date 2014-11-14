var transport = require('./lib/transport/memory');

var charabanc = {};

charabanc.configure = transport.configure;
charabanc.register = transport.register;
charabanc.unregister = transport.unregister; 
charabanc.request = transport.request;
charabanc.reset = transport.reset;
charabanc.dump = transport.dump;
charabanc.trace = transport.trace;

module.exports = charabanc;
