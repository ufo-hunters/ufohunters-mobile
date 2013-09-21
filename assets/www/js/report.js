$('#reportPage').live('pageshow', function(event) {
	 
  var id = getUrlVars()["id"];
 
  $.getJSON(serviceURL + '/reports/' + id + '.json', displayReport);
  	  
});

function getUrlVars() {
  var vars = [], hash;
  var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
  
  for(var i = 0; i < hashes.length; i++) {
    hash = hashes[i].split('=');
    vars.push(hash[0]);
    vars[hash[0]] = hash[1];
  }
  return vars;
}

function displayReport(report) {
  console.log(report);
     
  var sightingDate = formatStringDate(report.sighted_at);
  var reportDate = formatStringDate(report.reported_at);
	 
  $('#location').html(report.location);
  $('#sighted_at').html('<strong>Sighted at: </strong>' + sightingDate);
  $('#reported_at').html('<strong>Reported at: </strong>' + reportDate);
  $('#shape_duration').html('<strong>Shape: </strong>' + report.shape + ' | <strong>Duration:</strong>' + report.duration);
  $('#source').html('<strong>Source: </strong>' + report.source);
  $('#description').html(report.description);

  if (report.coord) {
    showLocation(report.coord[1], report.coord[0]);
  }

}

function formatStringDate(strDate) {
  var formattedDate = "N/A";
 
  if (strDate.length >= 8) {
    var year = strDate.substring(0,4);
    var month = strDate.substring(4,6);
	 var day = strDate.substring(6,8);
	 var date = new Date(year, month-1, day);					
    formattedDate = $.datepicker.formatDate("DD d. MM yy", date);
  }

  return formattedDate;
	
}

function showLocation(lat, lon) {
  console.log("geo: " + lat + "," + lon);
  
  var map = L.map('map').setView([lat, lon], 14); 
  L.tileLayer('http://tile.openstreetmap.org/{z}/{x}/{y}.png', { 
    maxZoom: 18 
  }).addTo(map); 
  
  L.marker([lat, lon]).addTo(map); 
} 

