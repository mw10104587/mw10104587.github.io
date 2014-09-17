# -*- coding: utf-8 -*-
import json

with open('2010/twCounty2010.topo.json') as json_data:
  d = json.load(json_data)
  outputdic = {}
  #print d["objects"]["layer1"]["geometries"]
  for geo in d["objects"]["layer1"]["geometries"]:
    outputdic[ str(geo["properties"]["COUNTYSN"]) ] = geo["properties"]["COUNTYNAME"]

  print json.dumps(outputdic, encoding="utf-8")
  with open("topo-countyname-2010.json", "w") as outFile:
    json.dump(outputdic, outFile, indent=4, encoding="utf8")