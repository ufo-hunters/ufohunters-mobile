$('#reportPage').live('pageshow', function(event) {
	var id = getUrlVars()["id"];
	$.getJSON(serviceURL + '/reports/' + id + '.json', displayReport);
});

function displayReport(data) {
	var report = data;
	console.log(report);
     
	var sightingDate = formatStringDate(report.sighted_at);
    var reportDate = formatStringDate(report.reported_at);
	 
	$('#location').html(report.location);
	$('#sighted_at').html('<strong>Sighted at: </strong>' + sightingDate);
	$('#reported_at').html('<strong>Reported at: </strong>' + reportDate);
	$('#shape_duration').html('<strong>Shape: </strong>' + report.shape + ' | <strong>Duration:</strong>' + report.duration);
	$('#source').html('<strong>Source: </strong>' + report.source);
	$('#description').html(report.description);
}

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
