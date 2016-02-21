
var geo2country = require("./incountry.js");

geo2country.load(function(cb){
  console.log(cb.countryName([10.05, 49.84]))
});
