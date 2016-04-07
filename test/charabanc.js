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
      return charabanc.register('act', service, done);
    });
    after(function(done) {
      return charabanc.reset(done);
    });
    it('should call service on send', function(done) {
      charabanc.request('act', {
        data: 'DATA'
      }, function(e) {
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

      return charabanc.register('act', service1, function() {
        return charabanc.register('act', service2, done);
      });
    });

    after(function(done) {
      return charabanc.reset(done);
    });

    it('should call each service on send', function(done) {
      charabanc.request('act', {
        data: 'DATA'
      }, function(e) {
        service1.calledOnce.should.be.true;
        service2.calledOnce.should.be.true;
        return done(e);
      });
    });
  });

  describe('results merge', function() {
    var service1, service2, service3, service4, result;
    result = {test: "hello"};

    before(function(done) {
      service1 = sinon.stub();
      service1.yields(null, {});
      service2 = sinon.stub();
      service2.yields(null, null);
      service3 = sinon.stub();
      service3.yields(null);
      service4 = sinon.stub();
      service4.yields(null, result);

      return charabanc.register('act', service1, function() {
        return charabanc.register('act', service2, function() {
          return charabanc.register('act', service3, function() {
            return charabanc.register('act', service4, done);
          });
        });
      });
    });

    after(function(done) {
      return charabanc.reset(done);
    });

    it('should not merge and return results as is if only one service returns result', function(done) {
      charabanc.request('act', {}, function(e, results) {
        results.should.equal(result);
        return done(e);
      });
    });
  });

  describe('with named services', function() {
    function service1(a, p, d) {
      return d();
    }

    function service2(a, p, d) {
      return d();
    }

    function service3(a, p, d) {
      return d();
    }

    before(function(done) {
      return charabanc.register('act1', service1, function() {
        return charabanc.register('act1', service2, function() {
          return charabanc.register('act2', service3, done);
        });
      });
    });

    after(function(done) {
      return charabanc.reset(done);
    });

    it('should dump names', function(done) {
      return charabanc.dump(function(e, dump) {
        var expected = [{
          action: 'act1',
          services: ['service1', 'service2']
        }, {
          action: 'act2',
          services: ['service3']
        }];
        dump.should.deep.equal(expected);
        return done(e);
      });
    });
  });
  it('can set transports', function() {
    charabanc.setTransport(require('../lib/transport/memory'));
  });
});
