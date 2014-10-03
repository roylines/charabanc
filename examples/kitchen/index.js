var charabanc = require('../../index.js'),
  router = require('router'),
  route = router(),
  http = require('http');

function loadServices(done) {
  require('require-all')(__dirname + '/services');
  return done();
}

route.get('/order/{item}', function(req, res) {
  return charabanc.request('order', { order: req.params.item }, function(e, results) {
    return res.end(JSON.stringify(results));
  }); 
});

return charabanc.configure({}, function() {
  return loadServices(function() {
    return http.createServer(route).listen(8080); // start the server on port 8080
  });
});
