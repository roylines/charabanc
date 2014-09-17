var _ = require('lodash');

var registry = {}

var registrations = {
};

registry.add = function(action, service, done) {
  if(registrations[action] === undefined) {
    registrations[action] = [service];
  } else {
    registrations[action].push(service);
  }
  return done();
};

registry.remove = function(action, service, done) {
  _.remove(registrations[action], function(s) {
    return s === service; 
  });

  return done();
};

registry.get = function(action, done) {
  var services = registrations[action] || [];
  return done(null, services);
};

module.exports = registry;
