var maps = require('./maps/maps.json')
var request = require("request");
var unzip = require("unzip");
var fs = require('fs');
var rmdir = require('rimraf');

function getItemFromArgV(argv){
  try{
    var name = process.argv[3]
  }
  catch(err){
    console.log("No map name provided for install")
  }
  console.log(name)
  var item = maps.availables.find(function(element, index, array){
    return element.name == name
  });
  if(item == undefined)
    console.log("invalid map name, check 'npm maps ls'.")
  return item;
}

function storeConfig(callback){
  fs.writeFile('./maps/maps.json', JSON.stringify(maps, null, 4), function (err) {
    if (err) return console.log(err);
    callback()
  });
}

var command = process.argv[2];
if(command == "ls"){
  maps.availables.forEach(function (val, index, array){
    var res = val.installed ? "installed" : "uninstalled"
    res = res + "\t" + val.name + "\t" + val.description
    console.log(res)
  });
  console.log("\nCurrently use: " + maps.use + "\n")
}
else if(command == "install"){
  var item = getItemFromArgV(process.argv)
  var name = item.name
  var extractor = unzip.Extract({path: "./maps/"+name});
  extractor.on('finish', function(){
    item.installed = true
    storeConfig(function(){
      console.log('Installed map: ' + name + '\n')
    })
  })
  request(item.url).pipe(extractor)
}
else if(command == "remove"){
  var item = getItemFromArgV(process.argv)
  if(item.name == maps.use){
    console.log("Cannot remove the map in use")
    return
  }
  item.installed = false
  rmdir("./maps/"+item.name, (error)=>{
    if(error) return console.log(error)
    storeConfig( ()=>{
      console.log("Removed map: " + item.name)
    })
  })
}
else if(command == "use"){
  var item = getItemFromArgV(process.argv)
  if(item)  
    maps.use = item.name
    var longname = fs.readdirSync("./maps/"+item.name).find( (filename)=>{
      return filename.endsWith(".shp")
    })
    maps.usepath = "./maps/" + maps.use + "/" + longname
    storeConfig(function (){
      console.log('Use map: ' + item.name);
    });
}
