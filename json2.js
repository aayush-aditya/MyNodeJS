// Node packages for file system
var fs = require('fs');
var path = require('path');

var filePath = path.join(__dirname, 'Production-Department_of_Agriculture_and_Cooperation_1.csv');
// Read CSV
var f = fs.readFileSync(filePath, {encoding: 'utf-8'},
function(err){console.log(err);});

var row = [];
var flag1 = 0;
var json = [];
// Split on row
fss = f.split('\r\n');

fss.forEach(function(d){
  // console.log(d);
  if((d.search("Area")) == -1 && (d.search("Yield")) == -1 && (d.search("Volume")) == -1){

    row = d.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
    for(var i = 0; i<(row.length); i++){
      flag1 = 0;
      val = row[i].split(" ");
      if ((row[(row.length)-2]) == "NA") {
        row[(row.length)-2] = "0";
      }
      for(var j = 0; j < val.length; j++){

        if ((flag1 == 0) && (val[0] == "Agricultural") && (val[1] == "Production") && (val[2] == "Foodgrains")){
          flag1 = 1;
          var residue = row[0].replace("Agricultural Production Foodgrains", "");
          if(residue =="")
          {residue = "Foodgrains";}
          var tmp = {};
          tmp["croptype"]=residue;
          tmp["Value"]= row[(row.length)-2];
          // Add object to list
          json.push(tmp);
        }
      }
    }

  }
});
var outPath = path.join(__dirname, 'PATH_TO_JSON_FOODGRAINS.json');

// function to sort the values
json.sort(function(a,b) {return b.Value - a.Value});
// Convert object to string, write json to file
fs.writeFileSync(outPath, JSON.stringify(json), 'utf8',
function(err){console.log(err);});
