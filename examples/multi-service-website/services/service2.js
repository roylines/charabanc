var charabanc = require('../../../index.js');

function reply(action, payload, done) {
  return done(null, { other: 'service2 response' });
}

charabanc.register('default-request', reply); 
