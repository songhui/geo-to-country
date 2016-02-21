var express = require('express');
var geo2country = require('./incountry.js');
var maps = require('./maps/maps.json');
// Constants
var PORT = 8080;

const app = express();

var countryboarder = geo2country.load( () => {
  app.listen(PORT)
});

app.get('/:long([-+]?[0-9]*\.?[0-9]+),:lat([-+]?[0-9]*\.?[0-9]+)', function (req, res) {
  var result = {}
  result.longitute = +(req.params.long)
  result.latitute = +(req.params.lat)
  result.country = countryboarder.countryName([result.longitute, result.latitute])
  res.send(result)
  //res.send(countryboarder.countries)
});

console.log('Running on http://localhost:' + PORT);
