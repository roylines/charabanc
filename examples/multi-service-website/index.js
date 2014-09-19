var charabanc = require('../../index.js'),
  http = require('http');

function loadServices(done) {
  require('require-all')(__dirname + '/services');
  return done();
}

function handleRequests(req, res) {
  return charabanc.request('default-request', req.body, function(e, results) {
    return res.end(JSON.stringify(results));
  }); 
};

return charabanc.configure({}, function() {
  return loadServices(function() {
    return http.createServer(handleRequests).listen(8080, '127.0.0.1');
  });
});
