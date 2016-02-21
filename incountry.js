var shapefile = require("shapefile")
var inside = require("point-in-polygon")
var maps = require("./maps/maps.json")

function load(callback){
  var name = maps.use
  console.log("Use map: " + name + "\n");
  var path = maps.usepath
  load_shapefile(path, callback)
}

function load_shapefile(filename, callback){
  var boarder = new CountryBorders(filename)
  boarder.afterload(callback)
  return boarder
}

function CountryBorders(filename){
  this.filename = filename;
  this.countries = null;
}

CountryBorders.prototype.afterload = function (callback){
  var cb = this;
  shapefile.read(this.filename, function (error, collection){
    if(error) return console.log(error);
    cb.countries = collection.features;
    callback(cb);
  } );
  return;
}

CountryBorders.prototype.inPolygon = function (point, polygon){
  for(var i = 0; i < polygon.length; i++){
    if(inside(point, polygon[i])){
      return true
    }
  }
  return false
}

CountryBorders.prototype.inMultiPolygon = function(point, multi){
  for(var i = 0; i < multi.length; i++){
    if(this.inPolygon(point, multi[i])){
      return true;
    }
  }
  return false;
}

CountryBorders.prototype.countryIndex = function (point){
  for(var i = 0; i < this.countries.length; i++){
    var geometry = this.countries[i].geometry;
    var inside = ( geometry.type == "MultiPolygon" ? this.inMultiPolygon(point, geometry.coordinates) : this.inPolygon(point, geometry.coordinates));
    if(inside)
      return i
  }
  return -1
}

CountryBorders.prototype.countryName = function (point){
  var index = this.countryIndex(point);
  //console.log(index)
  if(index < 0){
    return "Undefined"
  }
  else{
    return this.countries[index].properties.name
  } 
}

var geo2country = {}
geo2country.load = load
module.exports = geo2country


