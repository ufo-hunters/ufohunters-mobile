
var serviceURL = "http://www.ufo-hunters.com/";

$('#sightingsPage').bind('pageinit', function(event) {	
		getSightingsList();
});

function getSightingsList() {


	$.ajax({
	  dataType: "json",
	  url: serviceURL + 'reports.json',
	  beforeSend : function() {$.mobile.loading('show')},
      complete   : function() {$.mobile.loading('hide')},
	  type: "GET",
	  success: function(data){
			showInfo(data);
	  },
		error: function(dato){
			alert("You don't have internet connection, try more later");
	  }
	});


    //$.getJSON(serviceURL + 'reports.json', function(data) {
    function showInfo(data) {	
	     $('#sightingsList li').remove();
	     var count = 1;
	     $.each(data, function(key, val) {

	     		if(count<11){
				     var sightingDate = val.sighted_at;
					 var sightingDay;
					 var sightingMonth; 
					 var sightingYear; 
				     if (sightingDate.length >= 8) {
				    	 var year = sightingDate.substring(0,4);
				    	 var month = sightingDate.substring(4,6);
				    	 var day = sightingDate.substring(6,8);
				    	 var date = new Date(year, month-1, day);					
				    	 sightingDate = $.datepicker.formatDate("DD d. MM yy", date);	
						 sightingDay = $.datepicker.formatDate("d", date);
						 sightingMonth = $.datepicker.formatDate("M", date).toUpperCase();	
						 sightingYear = $.datepicker.formatDate("yy", date);					 
				     } else {
				    	 sightingDate = "N/A";
				     }
				     var reportedDate = val.reported_at;
				     if (reportedDate.length >= 8) {
				    	 var yearR = reportedDate.substring(0,4);
				    	 var monthR = reportedDate.substring(4,6);
				    	 var dayR = reportedDate.substring(6,8);
				    	 var dateR = new Date(yearR, monthR-1, dayR);					
				    	 reportedDate = $.datepicker.formatDate("DD d. MM yy", dateR);		 
				     } else {
				    	 reportedDate = "N/A";
				     }
				     var sightingShape = val.shape;
				     var sightingSource = val.source;
				     $('#sightingsList').append('<li><a href="report.html?id=' + val._id + '"><strong><em>' + sightingDay + '</em><i class="' + sightingMonth + '">' + sightingMonth + '</i><b class="' + sightingMonth + '">' + sightingYear + '</b></strong><b>' + val.location + '</b><p><u>Reported on:</u>' + reportedDate + '</p><p><u>Shape:</u>' + sightingShape + ' | <u>Source:</u>' + sightingSource + '</p></li>');
				     count++;
			    }

		  });		
		$('#sightingsList').listview('refresh');
	}		
	//});
}
