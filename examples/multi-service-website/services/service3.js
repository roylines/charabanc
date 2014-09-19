var charabanc = require('../../../index.js');

function reply(action, payload, done) {
  return done(null, { utc: new Date().getTime() });
}

charabanc.register('get-time', reply); 
