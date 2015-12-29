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

for(var i=3;i<header.length;i++)
//looping for the number of times as header data
{
  flag=0;
  var tmp={};var tmp1={};
  for(var z=0;z<arrState.length;z++)
  {
    for(var j=1;j<fss.length;j++)
    {
      if((fss[j].search(arrState[z])) !== -1 && (fss[j].search("Rice")) !== -1 && (fss[j].search("Yield")) !== -1)
      {
        // splitting of each row on basis of commas(,) and patterns like(",")
        row = fss[j].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
        //console.log(row);
        if (row[2] == "kg/ha")
        {
          tmp1[arrState[z]]=(row[i]=='NA')?0:parseInt(row[i]);
          //console.log(tmp1);
        }
      }
    }
  }
  tmp["year"]=header[i].replace(" 3-","");
  tmp["state"]=tmp1;
  // to remove the zero values
  if((tmp["state"]["Karnataka"]!=0)&&(tmp["state"]["Kerala"]!=0)&&(tmp["state"]["Andhra Pradesh"]!=0)&&(tmp["state"]["Tamil Nadu"]!=0))
  {json.push(tmp);}
}
fs.writeFile('PATH_TO_JSON_STATES.json', JSON.stringify(json) , function (err)
{
  if (err) return console.log(err);
});
