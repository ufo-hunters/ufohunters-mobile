$('#mapPage').live('pageshow', function(event) {
  displaySightings(myPosition.coords.latitude, myPosition.coords.longitude);
});

var youAreHereIcon = L.icon({
	iconUrl: './img/you-are-here-2.png',
	iconSize: [32, 37]
});

var ufoIcon = L.icon({
	iconUrl: './img/ufo.png',
	iconSize: [32, 37]
});

function displaySightings(lat, lon) {

	// Show my current position

	console.log("geo: " + lat + "," + lon);

    var map = L.map('map-nearest-sightings').setView([lat, lon], 8); 
    L.tileLayer(' http://tile.openstreetmap.org/{z}/{x}/{y}.png', { 
      maxZoom: 18 
    }).addTo(map); 
      
    L.marker([lat, lon], {icon: youAreHereIcon}).addTo(map);

    // Display sightings area
    var circle = L.circle([lat, lon], 100000).addTo(map);

    getNearestSightings(lat, lon, map);

}

function getNearestSightings(lat, lon, map) {
    var serviceURL = "http://www.ufo-hunters.com/";
	$.getJSON(serviceURL + 'reports/nearof/' + lon + '/' + lat + '/nearest.json', function(data) {
	     $.each(data, function(key, val) {
		 	var sightingDate = formatStringDate(val.sighted_at);
		    var location = val.location;
		    var id = val._id;
		    var coord = val.coord;
		    if (coord) {
		    	console.log('near coord: ' + coord[1] + ' ' + coord[0]);
		    	var marker = L.marker([coord[1], coord[0]], {icon: ufoIcon}).addTo(map);
		    	marker.bindPopup('<strong><a href="report.html?id=' + id + '">' + location + '</a></strong><br/>' + sightingDate);
		    }
		  });
	});
}