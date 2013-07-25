$('#mapPage').live('pageshow', function(event) {
  displaySightings(myPosition.coords.latitude, myPosition.coords.longitude);
});

function displaySightings(lat, lon) {
	/*
	$.getJSON(serviceURL + 'reports.json', function(data) {
	     $('#sightingsList li').remove();
	     $.each(data, function(key, val) {
		     var sightingDate = val.sighted_at;
		     if (sightingDate.length >= 8) {
		    	 var year = sightingDate.substring(0,4);
		    	 var month = sightingDate.substring(4,6);
		    	 var day = sightingDate.substring(6,8);
		    	 var date = new Date(year, month-1, day);					
		    	 sightingDate = $.datepicker.formatDate("DD d. MM yy", date);		     
		     } else {
		    	 sightingDate = "N/A";
		     }
		     
		     $('#sightingsList').append('<li><a href="report.html?id=' + 
		      val._id + '"><h4>' + val.location + 
		      '</h4><p>' + sightingDate + '</p></a>' + 
		      '</li>' 
		     );
		  });		
		$('#sightingsList').listview('refresh');
	});*/

	console.log("geo: " + lat + "," + lon);
      
      var map = L.map('map-nearest-sightings').setView([lat, lon], 14); 
      L.tileLayer(' http://tile.openstreetmap.org/{z}/{x}/{y}.png', { 
        maxZoom: 18 
      }).addTo(map); 
      
      L.marker([lat, lon]).addTo(map); 
}