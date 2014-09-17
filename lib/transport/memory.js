var _ = require('lodash'),
  registry = require('../registry/memory'),
  async = require('async');

var memory = {};

memory.register = function(action, service, done) {
  return registry.add(action, service, done);
};

memory.unregister = function(action, service, done) {
  return registry.remove(action, service, done);
};

memory.send = function(action, payload, done) {
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
