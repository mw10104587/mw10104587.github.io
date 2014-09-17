function updateMapData(button){
  if (button.target.text == "'01+'02") { console.log("in 2002"); currentDisplayYear = 2002; };
  if (button.target.text == "'05+'06") { console.log("in 2006"); currentDisplayYear = 2006; };
  if (button.target.text == "'09+'10") { console.log("in 2010"); currentDisplayYear = 2010; };
  var year = currentDisplayYear.toString();
  updateActiveButtonColorWithYearClicked(year);
  updateTitleWithYear(year);
  
  //update the county name for d.data
  
  var currentYearText = currentDisplayYear.toString();
  var topoPropertiesFilePath = currentYearText + "/topo-countyname-" + currentYearText + ".json"; 
  d3.json(topoPropertiesFilePath, function(data){
    var propertiesArr = d3.select("#map-g").selectAll("path")[0];
    for (var i = 0; i < propertiesArr.length; i++) {
      propertiesArr[i].__data__.properties.COUNTYNAME = data[propertiesArr[i].__data__.properties.COUNTYSN];
    };
  });

  //update data
  var fileName =  "Taiwan-election-county-" + year + ".csv";
  console.log(fileName); 
  d3.csv(fileName,function(error,data){
    var countyDic = {};
      for (var i = data.length - 1; i >= 0; i--) {
        countyDic[data[i]["縣市別"]] = {};
        countyDic[data[i]["縣市別"]]["KMT-votes"] = data[i]["KMT-votes"];
        countyDic[data[i]["縣市別"]]["DPP-votes"] = data[i]["DPP-votes"];
        countyDic[data[i]["縣市別"]]["KMT-ratio"] = data[i]["KMT-ratio"];
        countyDic[data[i]["縣市別"]]["DPP-ratio"] = data[i]["DPP-ratio"];
        countyDic[data[i]["縣市別"]]["KMT-can"] = data[i]["KMT-candidate"];
        countyDic[data[i]["縣市別"]]["DPP-can"] = data[i]["DPP-candidate"];
        countyDic[data[i]["縣市別"]]["Other-votes"] = data[i]["Other-votes"];
        countyDic[data[i]["縣市別"]]["Other-ratio"] = data[i]["Other-ratio"];
        countyDic[data[i]["縣市別"]]["Sum-votes"] = data[i]["Sum-votes"];
      }

  referenceCountyDic = countyDic;

  //if zoomed in 
  var delayTime = 0;
  if (zoomedInCounty) {
    zoomOut();
    delayTime = 500;
  };

  //update special color zone.
  //special fill colors for 2002 and 2006.
  blocks.transition().duration(800).delay(delayTime).attr("fill",function(d){
    
        if (d.properties.COUNTYNAME == "花蓮縣"&&currentDisplayYear==2010) {
          return "#D3D3D3";
        };
        if (d.properties.COUNTYNAME == "臺東縣"&&currentDisplayYear==2006) {
          return "#D3D3D3";
        };
        if (d.properties.COUNTYNAME == "金門縣"&&currentDisplayYear==2002) {
          return "#D3D3D3";
        };
        if (d.properties.COUNTYNAME == "金門縣"&&currentDisplayYear==2006) {
          return "#D3D3D3";
        };
        return partyMapFourGradient(referenceCountyDic, d.properties.COUNTYNAME);
      });
  });
}

$( document ).ready(function() {
    //set onclick listener for pagination
    document.getElementById("pg-2002").onclick = updateMapData;
    document.getElementById("pg-2006").onclick = updateMapData;
    document.getElementById("pg-2010").onclick = updateMapData;
});

function updateActiveButtonColorWithYearClicked(year){
  console.log(year);
  var arrayToModify = ["2002", "2006", "2010"];
  var removeIdx = arrayToModify.indexOf(year);
  arrayToModify.splice(removeIdx,1);

  var bgColor = "#ffffff";
  var textColor = "#428bca";

  document.getElementById("pg-"+ year).style.color = bgColor;
  document.getElementById("pg-"+year).style.background = textColor;

  for (var i = 0; i < arrayToModify.length; i++){
    document.getElementById("pg-"+ arrayToModify[i]).style.color = textColor;
    document.getElementById("pg-"+ arrayToModify[i]).style.background = bgColor;
  }

}

function updateTitleWithYear(year){

  if (year == 2010) {
    document.getElementById("map-title").innerHTML = "2009縣市長選舉 + 2010五都市長選舉";
  };
  if (year == 2006) {
    document.getElementById("map-title").innerHTML = "2005縣市長選舉 + 2006北高市長選舉";
  };
  if (year == 2002) {
    document.getElementById("map-title").innerHTML = "2001縣市長選舉 + 2002北高市長選舉";
  };

}