var charabanc = require('../../../index.js');

function reply(action, payload, done) {
  return charabanc.request('get-time', null, function(e, results) {
    return done(null, { src: 'service1', utc: results.utc });
  }); 
}

charabanc.register('default-request', reply); 
