$('#mapPage').live('pageshow', function(event) {
  displaySightings(myPosition.coords.latitude, myPosition.coords.longitude);
});

function displaySightings(lat, lon) {

	console.log("geo: " + lat + "," + lon);

    var map = L.map('map-nearest-sightings').setView([lat, lon], 14); 
    L.tileLayer(' http://tile.openstreetmap.org/{z}/{x}/{y}.png', { 
      maxZoom: 18 
    }).addTo(map); 
      
    L.marker([lat, lon]).addTo(map); 
}