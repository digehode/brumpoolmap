#!/usr/bin/python
part1="""<!DOCTYPE html> 
<html> 
<head> 
<meta name="viewport" content="initial-scale=1.0, user-scalable=no" /> 
<meta http-equiv="content-type" content="text/html; charset=UTF-8"/> 
<title>Google Maps JavaScript API v3 Example: Polygon Simple</title> 
<link href="default.css" rel="stylesheet" type="text/css" /> 
<script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=false"></script> 
<script type="text/javascript"> 
 
  function initialize() {
    var myLatLng = new google.maps.LatLng(24.886436490787712, -70.2685546875);
    var myOptions = {
      zoom: 5,
      center: myLatLng,
      mapTypeId: google.maps.MapTypeId.TERRAIN
    };
 
    var bermudaTriangle;
 
    var map = new google.maps.Map(document.getElementById("map_canvas"),
        myOptions);
 """
  #   var triangleCoords = [
  #       new google.maps.LatLng(25.774252, -80.190262),
  #       new google.maps.LatLng(18.466465, -66.118292),
  #       new google.maps.LatLng(32.321384, -64.75737),
  #       new google.maps.LatLng(25.774252, -80.190262)
  #   ];
 
  #   // Construct the polygon
  #   bermudaTriangle = new google.maps.Polygon({
  #     paths: triangleCoords,
  #     strokeColor: "#FF0000",
  #     strokeOpacity: 0.8,
  #     strokeWeight: 2,
  #     fillColor: "#FF0000",
  #     fillOpacity: 0.35
  #   });
 
  #  bermudaTriangle.setMap(map);
  # }

part2="""
</script> 
</head> 
<body onload="initialize()"> 
  <div id="map_canvas"></div> 
</body> 
</html> """


