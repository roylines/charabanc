var _ = require('lodash'),
  uuid = require('uuid'),
  registry = require('../registry/memory'),
  async = require('async');

var memory = {};
var trace = false;

memory.configure = function(config, done) {
  done = done || _.noop;
  return done();
};

memory.register = function(action, service, done) {
  done = done || _.noop;
  return registry.add(action, service, done);
};

memory.unregister = function(action, service, done) {
  done = done || _.noop;
  return registry.remove(action, service, done);
};

memory.request = function(action, payload, done) {
  var id = uuid.v4();
  payload.__charabancid = id;
  done = done || _.noop;
  registry.get(action, function(e, services) {
    if (e) {
      return done(e);
    }

    var actions = _.map(services, function(service) {
      return function(cb) {
        return service(action, _.clone(payload, true), cb);
      };
    });

    function complete(e, results) {
      var o = {
        __charabancid: id
      };
      _.each(results, function(r) {
        o = _.merge(o, r);
      });
      return done(e, o);
    };

    return async.parallel(actions, complete);
  });

  return id;
};

memory.reset = function(done) {
  trace = false;
  return registry.reset(done);
};

memory.dump = function(done) {
  return registry.dump(done);
};

memory.trace = function(done) {
  trace = true;
  return done();
}

module.exports = memory;
