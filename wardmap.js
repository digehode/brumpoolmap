var map;
var pooldata;
function pooldata_callback(data){
    pooldata=data;
}
//DONE: Add key to colour codes
//TODO: Style stuff properly
//TODO: Add links to team profiles, scraperwiki, @andbwell's articles etc.
//DONE: Add pins for pool locations
//TODO: Add pool info
function RGB2HTML(red, green, blue)
{
    var decColor = parseInt(red) + 256 * parseInt(green) + 65536 * parseInt(blue);
    return decColor.toString(16);
}

function calculatValue(item){
    return item.people/item["size(hectares)"];
}

function calcIntensity(val,min,max){
    return 255-255*(val-min)/(max-min);
}

function tryme2(data){

    var info="";
    var key="";
    var latlng = new google.maps.LatLng(52.4781, -1.89542);
    var myOptions = {
        zoom: 11,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById("map_canvas"),
                                  myOptions);
 
    var infodiv=document.getElementById("tableDiv");

    var min=10000000;
    var max=0;
    for(var i in data){
	if(calculatValue(data[i])<min) min=calculatValue(data[i]);
	if(calculatValue(data[i])>max) max=calculatValue(data[i]);
    }
    key="<table><tr><td>Intensity</td><td>Residents/hectare</td></tr>"
    for(var i=min;i<=max; i+=(max-min)/10){
	var intensity=calcIntensity(i,min,max);
	var col=RGB2HTML(intensity,intensity, intensity);
	if(col.length<6) 
	    col="0"+col;
	col="#"+col;

	key+="<tr><td style=\"color:"+col+"; background-color:"+col+";\">"+col+"</td><td>"+i.toFixed(2)+"</td></tr>";
    }
    key+="</table>";
    document.getElementById("keyDiv").innerHTML=key;
    info="<table><tr><td>Ward</td><td>Residents per hectare</td></tr>";
    for(var i in data){


	//     //document.getElementById("tableDiv").innerHTML+=data[i].boundary+"<br><hr>";
     	var b = eval(data[i].boundary);
	var b_coords=new Array();
 	for(j in b){
 	    //infodiv.innerHTML+="Adding vertex: ("+b[j][0]+","+b[j][1]+")<hr>";
	    b_coords.push(new google.maps.LatLng(b[j][0],b[j][1]));
 	}
	var val=calculatValue(data[i]);
	var intensity = calcIntensity(val,min,max);
	var colour=RGB2HTML(intensity,intensity, intensity)
	info+="<tr><td>"+data[i].ward+"</td><td>"+val.toFixed(2)+"</td></tr>";
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
    //TODO: Get this data from scraperwiki, include the extra data
    //    map_points = [['52.5116964294', '-1.93609621829', 'Laurel Road,Handsworth,Birmingham,B21 9PB.', 1], ['52.4682049326', '-1.78991402761', 'Cockshut Hill,Sheldon,Birmingham,B26 2HX.', 2], ['52.4621241581', '-1.88590527622', '1 Belgrave Middleway,Highgate,Birmingham,B12 9FF.', 3], ['52.5192599937', '-1.78060748125', 'Farnborough Road,Castle Vale,Birmingham,B35 7NL.', 4], ['52.5144177858', '-1.79765121708', 'Farnborough Road,Castle Vale,Birmingham,B35 7ED.', 5], ['52.5130251786', '-1.89557266748', 'The Broadway,Perry Barr,Birmingham,B20 3DP.', 6], ['52.4301656965', '-1.8779279166', 'Wheelers Lane,Billesley,Birmingham,B13 0ST.', 7], ['52.5374292852', '-1.91364919278', 'Beeches Road,Great Barr,Birmingham,B42 2HQ.', 8], ['52.4363596144', '-1.99795549363', 'Adams Hill,Bartley Green,Birmingham,B32 3QJ.', 9], ['52.5889681551', '-1.83682262604', 'Kittoe Road,Four Oaks,Birmingham,B74 4RZ.', 10], ['52.4172404012', '-1.88953494803', 'Alcester Road South,Kings Heath,Birmingham,UK,B14 6ER.', 11], ['52.396281935', '-2.00199856744', 'Bristol Road South,Longbridge,Birmingham,B45 9NY.', 12], ['52.5251829242', '-1.83520157213', 'Mason Road,Erdington,Birmingham,B24 9EJ.', 13], ['52.5406588741', '-1.87564657878', 'Dulwich Road,Kingstanding,Birmingham,B44 0EW.', 14], ['52.3981052569', '-1.93154207314', 'Shannon Road,Kings Norton,Birmingham,B38 9DE.', 15], ['52.5144980792', '-1.83821808331', 'Kingsbury Road,Erdington,Birmingham,B24 8RE.', 16], ['52.5008129391', '-1.90149395524', 'Wheeler Street,Lozells,Birmingham,B19 2EP.', 17], ['52.5063517625', '-1.92795664082', 'Holly Road,Handsworth,Birmingham,B20 2BY.', 18], ['52.5460333798', '-1.903029849', 'Aldridge Road,Great Barr,Birmingham,B44 8NU.', 19], ['52.4048842595', '-2.01660989164', 'New Street,Rubery,Birmingham,B45 0EU.', 20], ['52.4371637986', '-1.829998707', 'Shirley Road, Acocks Green, Birmingham, B27 7NS.', 21], ['52.4557330588', '-2.00289928968', 'Dwellings Lane,Quinton,Birmingham,B32 1RJ.', 22], ['52.52989905', '-1.90613137594', 'Walsall Road,Perry Barr,B42 2LR.', 23]];
    for(i in pooldata){
	var myLatLng = new google.maps.LatLng(pooldata[i].lat,pooldata[i].lng);
	var beachMarker = new google.maps.Marker({
    	    position: myLatLng,
    	    map: map//,
	    //    	    icon: image
	});
	
    }
};

function drawPools(){


        
    
    function Point(lat,long,html,icon) {
        this.gpoint = new GMarker(new GLatLng(lat,long),icon);
        this.html = html;
        
    }               
    
               
    function Map(id,points,lat,long,zoom) {
        this.id = id;
        this.points = points;
        this.gmap = map;//new GMap2(document.getElementById(this.id));
        //this.gmap.setCenter(new GLatLng(lat, long), zoom);
        this.markerlist = markerlist;
        this.addmarker = addmarker;
        this.array2points = array2points;
        
        function markerlist(array) {
            for (var i in array) {
                this.addmarker(array[i]);
            }
        }
        
        function array2points(map_points) {            
            for (var i in map_points) {  
                points[i] = new Point(map_points[i][0],map_points[i][1],map_points[i][2],map_points[i][3]);         }
            return points;   
        }                  
        
        function addmarker(point) {
            if (point.html) {
                GEvent.addListener(point.gpoint, "click", function() { // change click to mouseover or other mouse action
                    point.gpoint.openInfoWindowHtml(point.html);
                    
                });
                
            }
            this.gmap.addOverlay(point.gpoint);  
        }
        this.points = array2points(this.points);
        this.markerlist(this.points);
        
        
        var icon = new GIcon(); 
        icon.image = "";
        icon.shadow = "";
        icon.iconSize = new GSize(12, 20);
        icon.shadowSize = new GSize(22, 20);
        icon.iconAnchor = new GPoint(6, 20);
        icon.infoWindowAnchor = new GPoint(5, 1);
        
        map_points = [['52.5116964294', '-1.93609621829', 'Laurel Road,Handsworth,Birmingham,B21 9PB.', 1], ['52.4682049326', '-1.78991402761', 'Cockshut Hill,Sheldon,Birmingham,B26 2HX.', 2], ['52.4621241581', '-1.88590527622', '1 Belgrave Middleway,Highgate,Birmingham,B12 9FF.', 3], ['52.5192599937', '-1.78060748125', 'Farnborough Road,Castle Vale,Birmingham,B35 7NL.', 4], ['52.5144177858', '-1.79765121708', 'Farnborough Road,Castle Vale,Birmingham,B35 7ED.', 5], ['52.5130251786', '-1.89557266748', 'The Broadway,Perry Barr,Birmingham,B20 3DP.', 6], ['52.4301656965', '-1.8779279166', 'Wheelers Lane,Billesley,Birmingham,B13 0ST.', 7], ['52.5374292852', '-1.91364919278', 'Beeches Road,Great Barr,Birmingham,B42 2HQ.', 8], ['52.4363596144', '-1.99795549363', 'Adams Hill,Bartley Green,Birmingham,B32 3QJ.', 9], ['52.5889681551', '-1.83682262604', 'Kittoe Road,Four Oaks,Birmingham,B74 4RZ.', 10], ['52.4172404012', '-1.88953494803', 'Alcester Road South,Kings Heath,Birmingham,UK,B14 6ER.', 11], ['52.396281935', '-2.00199856744', 'Bristol Road South,Longbridge,Birmingham,B45 9NY.', 12], ['52.5251829242', '-1.83520157213', 'Mason Road,Erdington,Birmingham,B24 9EJ.', 13], ['52.5406588741', '-1.87564657878', 'Dulwich Road,Kingstanding,Birmingham,B44 0EW.', 14], ['52.3981052569', '-1.93154207314', 'Shannon Road,Kings Norton,Birmingham,B38 9DE.', 15], ['52.5144980792', '-1.83821808331', 'Kingsbury Road,Erdington,Birmingham,B24 8RE.', 16], ['52.5008129391', '-1.90149395524', 'Wheeler Street,Lozells,Birmingham,B19 2EP.', 17], ['52.5063517625', '-1.92795664082', 'Holly Road,Handsworth,Birmingham,B20 2BY.', 18], ['52.5460333798', '-1.903029849', 'Aldridge Road,Great Barr,Birmingham,B44 8NU.', 19], ['52.4048842595', '-2.01660989164', 'New Street,Rubery,Birmingham,B45 0EU.', 20], ['52.4371637986', '-1.829998707', 'Shirley Road, Acocks Green, Birmingham, B27 7NS.', 21], ['52.4557330588', '-2.00289928968', 'Dwellings Lane,Quinton,Birmingham,B32 1RJ.', 22], ['52.52989905', '-1.90613137594', 'Walsall Road,Perry Barr,B42 2LR.', 23]];
	var map = new Map('map',map_points,0,0,3);
        
	
	    //map.gmap.addControl(new GMapTypeControl());
	
	    //map.gmap.addControl(new GSmallMapControl());
	    
	    
    }}



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

