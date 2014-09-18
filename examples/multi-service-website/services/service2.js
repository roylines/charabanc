var charabanc = require('../../../index.js');

function process(action, payload, done) {
  return done(null, 'service2 response');
}

charabanc.register('request', process); 
