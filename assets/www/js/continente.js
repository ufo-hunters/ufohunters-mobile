

$('#sightingsPageContinente').live('pageshow', function(event) {

		var cont = getUrlVars()["id"];	
		var nameCont = "";
		var urlCont = "";

		switch (cont)
		{
			case "na":
			  nameCont = "North America";
			  urlCont = "sightings/northamerica.json";
			  break;
			case "sa":
			  nameCont = "South America";
			  urlCont = "sightings/southamerica.json";
			  break;
			case "af":
			  nameCont = "Africa";
			  urlCont = "sightings/africa.json";
			  break;
			case "as":
			  nameCont = "Asia";
			  urlCont = "sightings/asia.json";
			  break;
			case "eu":
			  nameCont = "Europe";
			  urlCont = "sightings/europe.json";
			  break;
			case "oc":
			  nameCont = "Oceania";
			  urlCont = "sightings/oceania.json";
			  break;
			case "wd":
			  nameCont = "World";
			  urlCont = "reports.json";
			  break;
			default:
			  nameCont = "World";
			  urlCont = "reports.json";
			  break;
		}

		getSightingsMenu(cont);
		getSightingsDatosContinent(cont,nameCont);
		getSightingsContinenteList(cont,urlCont);
});

function getSightingsMenu(cont) {

		var codeContinents = ['wd','na','sa','af','as','eu'];
        var nameContinents = ['World','North America','South America','Africa','Asia','Europe'];

        $('#sightingsMenu li').remove();
        var select = "";
        for (i=0;i<codeContinents.length;i++){
        	select = "";
			if(cont==codeContinents[i]){select = ' class="active"';}
			$('#sightingsMenu').append('<li' + select + '><a href="continente.html?id=' + codeContinents[i] + '"><img src="images/' + codeContinents[i] + '.png"  alt="' + nameContinents[i] + '"/></a></li>');

        }
        $('#sightingsMenu').append('<li><a href="map.html"><img src="images/gps.png"  alt="Near Sightings" /></a></li>');
		/*
		$('#sightingsMenu').append('<li'); 
		if(nameCont=="wd"){$('#sightingsMenu').append(' class="active"');}
		$('#sightingsMenu').append('><a href="continente - copia.html?cont=wd"><img src="images/world40.png"  alt="World" /></a></li>');
		$('#sightingsMenu').append('<li'); 
		if(nameCont==""){$('#sightingsMenu').append(' class="active"');}
		$('#sightingsMenu').append('><a href="continente - copia.html?cont=na"><img src="images/north-america40.png"  alt="North America" /></a></li>');
		$('#sightingsMenu').append('<li'); 
		if(nameCont==""){$('#sightingsMenu').append(' class="active"');}
		$('#sightingsMenu').append('><a href="continente - copia.html?cont=sa"><img src="images/south-america40.png"  alt="South America" /></a></li>');
		$('#sightingsMenu').append('<li'); 
		if(nameCont==""){$('#sightingsMenu').append(' class="active"');}
		$('#sightingsMenu').append('><a href="continente - copia.html?cont=af"><img src="images/africa40.png"  alt="Africa" /></a></li>');
		$('#sightingsMenu').append('<li'); 
		if(nameCont==""){$('#sightingsMenu').append(' class="active"');}
		$('#sightingsMenu').append('><a href="continente - copia.html?cont=as"><img src="images/asia40.png"  alt="Asia" /></a></li>');
		$('#sightingsMenu').append('<li'); 
		if(nameCont==""){$('#sightingsMenu').append(' class="active"');}
		$('#sightingsMenu').append('><a href="continente - copia.html?cont=eu"><img src="images/europa40.png"  alt="Europe" /></a></li>');
		$('#sightingsMenu').append('<li'); 
		if(nameCont==""){$('#sightingsMenu').append(' class="active"');}
		$('#sightingsMenu').append('><a href="continente - copia.html?cont=oc"><img src="images/oceania40.png"  alt="Ocenia" /></a></li>');
		*/
		
}

function getSightingsDatosContinent(cont,nameCont){

		
		$('#sightingsDatosContinent').append('<h1>' + nameCont + '</h1>').append('<p><img src="images/' + cont + '_big.png"  alt="' + nameCont + '" /></p>').append('<div class="clear"></div>');  
						  
}						  

function getSightingsContinenteList(cont, urlCont) {

   $.ajax({
	  dataType: "json",
	  url: serviceURL + urlCont,
	  type: "GET",
	  success: function(data){
			showInfo(data);
	  },
		error: function(dato){
			alert("You don't have internet connection, try it more later, sorry!");
	  }
	});


    //$.getJSON(serviceURL + 'reports.json', function(data) {
    function showInfo(data) {	
	     $('#sightingsListCont li').remove();
	     $.each(data, function(key, val) {
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
		    	 sightingDate = "N/A";
		     }
		     var sightingShape = val.shape;
		     var sightingSource = val.source;
		     $('#sightingsListCont').append('<li><a href="report.html?id=' + val._id + '"><strong><em>' + sightingDay + '</em><i class="' + sightingMonth + '">' + sightingMonth + '</i><b class="' + sightingMonth + '">' + sightingYear + '</b></strong><b>' + val.location + '</b><p><u>Reported on:</u>' + reportedDate + '</p><p><u>Shape:</u>' + sightingShape + ' | <u>Source:</u>' + sightingSource + '</p></a></li>');
			 
		  });		
		$('#sightingsListCont').listview('refresh');
	}		
	//});
}