var charabanc = require('../index.js'),
    chai = require('chai'),
  sinon = require('sinon');
  
chai.should();

describe('charabanc', function() {
  describe('with one service', function() {
    var service;
    before(function(done) {
      service = sinon.stub();
      service.yields();
      charabanc.register('act', service, done);
    });
    after(function(done) {
      charabanc.unregister('act', service, done);
    });
    it('should call service on send', function(done) {
      charabanc.request('act', { data: 'DATA'}, function(e) {
        service.calledOnce.should.be.true;
        return done(e);
      });      
    });
  });
  describe('with two services', function() {
    var service1, service2;
    before(function(done) {
      service1 = sinon.stub();
      service1.yields();
      service2 = sinon.stub();
      service2.yields();
      charabanc.register('act', service1, done);
      charabanc.register('act', service2, done);
    });
    after(function(done) {
      charabanc.unregister('act', service1, done);
      charabanc.unregister('act', service2, done);
    });
    it('should call each service on send', function(done) {
      charabanc.request('act', { data: 'DATA'}, function(e) {
        service1.calledOnce.should.be.true;
        service2.calledOnce.should.be.true;
        return done(e);
      });      
    });
  });
});
