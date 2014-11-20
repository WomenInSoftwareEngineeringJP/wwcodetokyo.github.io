// Main Js Women Who Code

$.getJSON("https://api.meetup.com/2/events?&sign=true&photo-host=public&group_urlname=women-who-code-tokyo&page=4&key=412ff3568274d2345f6c2d13562626&callback=?", function (data){
	var eventList = "";
    $.each(data.results, function (i, item) {
				var dat1 = new Date(item.time);
				var weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
				var year = dat1.getFullYear()%100;
				var month = dat1.getMonth();
				var date = ("0"+dat1.getDate()).slice(-2); 
				var day = dat1.getDay();
				var hours = ("0"+dat1.getHours()).slice(-2); 
				var minutes = ("0"+dat1.getMinutes()).slice(-2);
				
				var dat2=new Date(item.duration + item.time);
				var duraHours = ("0"+dat2.getHours()).slice(-2); 
				var duraMinutes = ("0"+dat2.getMinutes()).slice(-2); 
				
        eventList += '<li class="grid"><div class="event_date col-3-12">'+year+'/'+(dat1.getMonth() + 1)+'/'+date+'&nbsp;'+weekdays[dat1.getDay()]+'&nbsp;'+hours+':'+minutes+'-'+duraHours+':'+duraMinutes+'</div></div><div class="event_link col-7-12"><a href="' + item.event_url + '" target="_blank">' + item.name  + '</a></div><div class="event_rvsp"><a href="' + item.event_url + '" target="_blank" class="button button_grey">詳細・申し込み</a></div></li>';
    });
    $('#upcoming').html(eventList)});

