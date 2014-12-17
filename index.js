var charabanc = {};

charabanc.setTransport = function(transport) {
  charabanc.configure = transport.configure;
  charabanc.register = transport.register;
  charabanc.unregister = transport.unregister;
  charabanc.request = transport.request;
  charabanc.reset = transport.reset;
  charabanc.dump = transport.dump;
};

charabanc.setTransport(require('./lib/transport/memory'));

module.exports = charabanc;
