var charabanc = require('../../../index.js');

function process(action, payload, done) {
  return done(null, 'service1 response');
}

charabanc.register('request', process); 
