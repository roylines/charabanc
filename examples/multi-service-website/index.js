var charabanc = require('../../index.js'),
  http = require('http');

function loadServices(done) {
  require('require-all')(__dirname + '/services');
  return done();
}

function process(req, res) {
  return charabanc.send('request', req.body, function(e, results) {
    return res.end(JSON.stringify(results));
  }); 
};

return charabanc.configure({}, function() {
  return loadServices(function() {
    return http.createServer(process).listen(8080, '127.0.0.1');
  });
});
