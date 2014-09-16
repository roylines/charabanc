var charabanc = require('../index.js'),
  sinon = require('sinon');

describe('charabanc', function() {
  describe('with one service', function() {
    var service = sinon.stub();
    before(function(done) {
      charabanc.register('act', service, done);
    });
    after(function(done) {
      charabanc.unregister('act', service, done);
    });
    it('should', function(done) {
      return done();
    });
  });


});
