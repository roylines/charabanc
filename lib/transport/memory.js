var _ = require('lodash'),
  registry = require('../registry/memory'),
  async = require('async');

var memory = {};

function nil() {};

memory.configure = function(config, done) {
  done = done || nil;
  return done();
};

memory.register = function(action, service, done) {
  done = done || nil;
  return registry.add(action, service, done);
};

memory.unregister = function(action, service, done) {
  done = done || nil;
  return registry.remove(action, service, done);
};

memory.send = function(action, payload, done) {
  done = done || nil;
  return registry.get(action, function(e, services) {
    if (e) {
      return done(e);
    }

    var actions = _.map(services, function(service) {
      return function(cb) {
        return service(action, payload, cb);
      };
    });

    return async.parallel(actions, done);
  });
};

module.exports = memory;
