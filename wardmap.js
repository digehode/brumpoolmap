var map;
//TODO: Add key to colour codes
//TODO: Style stuff properly
//TODO: Add links to team profiles, scraperwiki, @andbwell's articles etc.

function RGB2HTML(red, green, blue)
{
    var decColor = parseInt(red) + 256 * parseInt(green) + 65536 * parseInt(blue);
    return decColor.toString(16);
}

function calculatValue(item){
    return item.people/item["size(hectares)"];
}

function tryme2(data){
    var info="";
    var latlng = new google.maps.LatLng(52.4781, -1.89542);
    var myOptions = {
        zoom: 11,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById("map_canvas"),
                                  myOptions);
 
    var infodiv=document.getElementById("myDiv");

    var min=10000000;
    var max=0;
    for(var i in data){
	if(calculatValue(data[i])<min) min=calculatValue(data[i]);
	if(calculatValue(data[i])>max) max=calculatValue(data[i]);
    }
    info="<table><tr><td>Ward</td><td>Residents per hectare</td></tr>";
    for(var i in data){


	//     //document.getElementById("myDiv").innerHTML+=data[i].boundary+"<br><hr>";
     	var b = eval(data[i].boundary);
	var b_coords=new Array();
 	for(j in b){
 	    //infodiv.innerHTML+="Adding vertex: ("+b[j][0]+","+b[j][1]+")<hr>";
	    b_coords.push(new google.maps.LatLng(b[j][0],b[j][1]));
 	}
	var val=calculatValue(data[i]);
	var intensity = 255-255*(val-min)/(max-min);
	var colour=RGB2HTML(intensity,intensity, intensity)
	info+="<tr><td>"+data[i].ward+"</td><td>"+val+"</td></tr>";
	var boundary = new google.maps.Polygon({
            paths: b_coords,
            strokeColor: "#000000",
            strokeOpacity: 1,
            strokeWeight: 1,
            fillColor: colour,
            fillOpacity: 0.7
	});
	boundary.setMap(map);
	attach_info(boundary,"<h3>"+data[i].ward+"</h3><p>"+val.toFixed(2)+" residents per hectare</p>");

    }
    info+="</table>";
    infodiv.innerHTML=info;
};

function attach_info(b,info){
    var infowindow = new google.maps.InfoWindow(
	{content:info}
    );
    google.maps.event.addListener(b, 'click', function (event) {
	//infowindow.setContent(data[i].ward);
	infowindow.setPosition(event.latLng);
	infowindow.open(map);
    });
}

