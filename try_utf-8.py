# -*- coding: utf-8 -*-
import json

with open('2006/townGeoHash-2006.json') as json_data:
  d = json.load(json_data)
  output = {}
  for key in d.keys():
    
    print key
    if key.encode("utf-8") == "新北市":
      print "= ="
      output["臺北縣"] = d[key];    else:
      output[key.encode("utf-8")] = d[key];
  print json.dumps(output.keys())

#with open('test-utf8.json', 'w') as outfile:
  #json.dump(output, outfile, indent=4, encoding="utf8")