var fs = require('fs');
var path = require('path');
//for setting path to csv file
var filePath = path.join(__dirname, 'Production-Department_of_Agriculture_and_Cooperation_1.csv');
// Read CSV
var f = fs.readFileSync(filePath, {encoding: 'utf-8'},
function(err){console.log(err);});

var fss = f.split('\r\n');
var header=fss[0].split(",");
var arrState =["Karnataka","Kerala","Andhra Pradesh","Tamil Nadu"];
var tmp={};
var json=[];
var flag=0;


for(var i=3;i<header.length;i++)                                          //looping for the number of times as header data
{
  flag=0;
  tmp[header[i]]={};
  var tmp1={};
  for(var z=0;z<arrState.length;z++)
  {
    for(var j=1;j<fss.length;j++)
    {
      //tmp1={};
        if((fss[j].search(arrState[z])) !== -1 && (fss[j].search("Rice")) !== -1 && (fss[j].search("Yield")) !== -1)
        {
          // splitting of each row on basis of commas(,) and patterns like(",")
          row = fss[j].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
          //console.log(row);
          if (row[2] == "kg/ha")
          {
            if (row[i] == "NA") {
              row[i] = "0";
            }
            tmp1[arrState[z]]=row[i];
          }
        }
        //console.log(tmp1);
    }

  }
  tmp[header[i]]=tmp1;
  }
  json.push(tmp);
  // console.log(json.length);
  fs.writeFile('PATH_TO_JSON_STATES', JSON.stringify(json) , function (err)
  {
  if (err) return console.log(err);
});//write funciton closes here
