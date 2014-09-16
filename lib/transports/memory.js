var _ = require('lodash'),
    async = require('async');

var memory = {};

var registry = {
};

memory.register = function(action, service, done) {
  if(registry[action] === undefined) {
    registry[action] = [service];
  } else {
    registry[action].push(service);
  }

  return done();
};

memory.unregister = function(action, service, done) {
  _.remove(registry[action], function(s) {
    return s === service; 
  });

  return done();
};

memory.send = function(action, payload, done) {
  var actions = _.map(registry[action], function(service) {
    return function(cb) {
      return service(payload, cb);
    };
  });

  return async.parallel(actions, done);
};

module.exports = memory;
