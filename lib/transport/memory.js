var _ = require('lodash'),
  registry = require('../registry/memory'),
  async = require('async');

var memory = {};

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
  done = done || _.noop;
  return registry.get(action, function(e, services) {
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
      };
      _.each(results, function(r) {
        o = _.merge(o, r);
      });
      return done(e, o);
    };

    return async.parallel(actions, complete);
  });
};

memory.reset = function(done) {
  return registry.reset(done);
};

memory.dump = function(done) {
  return registry.dump(done); 
};

module.exports = memory;
