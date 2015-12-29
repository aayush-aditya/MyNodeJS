// Node packages for file system
var fs = require('fs');
var path = require('path');

var filePath = path.join(__dirname, 'Production-Department_of_Agriculture_and_Cooperation_1.csv');
// Read CSV
var f = fs.readFileSync(filePath, {encoding: 'utf-8'},
function(err){console.log(err);});
var json = [];
var row = [];
var flag = 0;
var flag1 = 0;
// Split on row
fss = f.split('\r\n');

fss.forEach(function(d){

  // splitting of each row on basis of commas(,) and patterns like(",")
  row = d.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
  for(var i = 0; i<(row.length); i++){
    flag = 0;
    val = row[i].split(" ");
    for(var j = 0; j < val.length; j++){
      if( (flag == 0) && (val[0] == "Agricultural") && (val[1] == "Production") && (val[2] == "Oilseeds") ){

        flag = 1;
        var residue = row[0].replace("Agricultural Production Oilseeds", "");
        if(residue =="")
        {residue = "Oilseeds";}
        var tmp = {};
        tmp["OilseedType"]=residue;
        tmp["Value"]= row[(row.length)-2];
        // Add object to list
        json.push(tmp);
      }
    }
  }
});
var outPath = path.join(__dirname, 'PATH_TO_JSON_OILSEEDS.json');

json.sort(function(a,b) {return b.Value - a.Value});
// Convert object to string, write json to file
fs.writeFileSync(outPath, JSON.stringify(json), 'utf8',
function(err){console.log(err);});
