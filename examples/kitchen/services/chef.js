var charabanc = require('../../../index.js');

function order(action, payload, done) {
  console.log('order received: ', payload);
  return done(null, { food: 'some food' });
}

charabanc.register('order', order); 
