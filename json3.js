var fs = require('fs');
var path = require('path');
//for setting path to csv file
var filePath = path.join(__dirname, 'Production-Department_of_Agriculture_and_Cooperation_1.csv');
// Read CSV
var f = fs.readFileSync(filePath, {encoding: 'utf-8'},
function(err){console.log(err);});
var json = [];
var row = [];
var sum = [];

// Split on row
fss = f.split('\r\n');
var header=fss[0].split(",");

for (var i=3;i<header.length;i++) {
  //Initializing the array
  sum[i] = 0;
}

fss.forEach(function(d){
  if(d.search("Commercial Crops") !== -1){
    // splitting of each row on basis of commas(,) and patterns like(",")
    row = d.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);

    for (var i=3;i<header.length;i++) {
      if (row[i] =="NA") {
        // for adding 0 to each colums value if it is Not Available
        sum[i]=sum[i] + 0 ;
      }
      else {
        // for adding each colums value
        sum[i]=sum[i] +parseFloat(row[i]) ;
      }

    }

  }
});
for(var j = 15; j < header.length; j++){
  var tmp = {};
  tmp["year"]=header[j].replace(" 3-","");
  tmp["Value"]= sum[j];
  // Add object to list
  json.push(tmp);
}
var outPath = path.join(__dirname, 'PATH_TO_JSON_Commercial_Crops.json');
// Convert object to string, write json to file
fs.writeFileSync(outPath, JSON.stringify(json), 'utf8',
function(err){console.log(err);});
