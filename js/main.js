// Main Js Women Who Code

function meetupAPIGet(){
	
	(function() {
		var meetupAPI = "https://api.meetup.com/2/events?&sign=true&photo-host=public&group_urlname=women-who-code-tokyo&page=4&key=412ff3568274d2345f6c2d13562626&callback=?";
		$.getJSON( meetupAPI)
			.done(function( data ) {
				var eventList="";							
				$.each( data.results, function( i, item ) {
					var place =item.venue.name;
				//インスタンス化
				var dat1 = new Date(item.time);　　								//イベント開始時間でDataオブジェクト生成
				
				//年の情報を取得
				var year = dat1.getFullYear()%100;　								//西暦取得(%100で下２桁のみ表示)
				
				//曜日の情報取得
				var day = dat1.getDay();														//曜日取得(0~6の数字で帰ってくる)。
				var weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];　//曜日表示形式
				
				//イベント開始時間
				var month =("0"+dat1.getMonth()).slice(-2);				//月取得.slice(-2)で一桁の時0詰め
				var date = ("0"+dat1.getDate()).slice(-2); 				//日にち取得.slice(-2)で一桁の時0詰め
				var hours = ("0"+dat1.getHours()).slice(-2); 			//時間取得.slice(-2)で一桁の時0詰め
				var minutes = ("0"+dat1.getMinutes()).slice(-2);		//分取得.slice(-2)で一桁の時0詰め
				
				//イベント終了時間
				var endtime=item.duration+item.time;								//開始時間とイベント時間を足して終了時間。
				var dat2=new Date(endtime);												//終了時間インスタンス化
				var duraHours = ("0"+dat2.getHours()).slice(-2); 	//終了時間取得.slice(-2)で一桁の時0詰め
				var duraMinutes = ("0"+dat2.getMinutes()).slice(-2); //分時間取得.slice(-2)で一桁の時0詰め
				
				//HTML生成
				
				var eventDate;
				var eventPlace;
				var eventLink;
				var eventRsvp;				
				
				eventDate ='<li class="grid"><div class="event_date col-3-12">'+year+'/'+(dat1.getMonth() + 1)+'/'+date+'&nbsp;'+weekdays[dat1.getDay()]+'&nbsp;'+hours+':'+minutes+'-'+duraHours+':'+duraMinutes+'</div>';
				eventPlace='<div class="event_place"><i class="fa fa-map-marker map_pin"></i>'+item.venue.name+'</div></div>'
				eventLink='<div class="event_link col-7-12"><a href="' + item.event_url + '" target="_blank">' + item.name +'</a>'
				eventRsvp='<div class="event_rvsp"><a href="' + item.event_url + '" target="_blank" class="button button_grey mp button_full">詳細・申し込み</a></div></li>'
				eventList+=eventDate+eventLink+eventPlace+eventRsvp;
				$('#upcoming').html(eventList);
				
				//画像取得
				eventPhoto='<div class="col-1-3"><img src='+item.photo_url+'</div>'
				$('#past-wrap').html(eventPhoto);
				});
			})
			
			.fail(function(jqxhr, textStatus, error){
				var errorEvent="イベント情報を取得できませんでした。"
				$('#upcoming').html(errorEvent);
				});	
	
	})();
}

//スムーズスクロール
$(function(){
	$('a[href^=#]').click(function(){
		var speed = 600;
		var href= $(this).attr("href");
		var target = $(href == "#" || href == "" ? 'html' : href);
		var position = target.offset().top;
		$("html, body").animate({scrollTop:position}, speed, "swing");
		return false;
	});
});


// "Past Meetups" - The width & the position of the labels on the imgs
$(function(){
    $('#past_meetups_list .col-1-3').each(function(){
        var img = $('#past_meetups_list .col-1-3 img');
        var img_width = img.width();
        var img_height = img.height();
        $('#past_meetups_list a span').css({
            width: img_width,
            top: img_height * 0.75
        });
    });
});

// Pagetop button
$(function(){
    var topBtn = $('#btn_pagetop');
    topBtn.hide();
    $(window).scroll(function(){
        if($(this).scrollTop() > 100){
            topBtn.fadeIn();
        }else{
            topBtn.fadeOut();
        }
    });
    topBtn.click(function(){
        $('body,html').animate({
            scrollTop: 0
        }, 500);
        return false;
    });
});

// bxSlider
$(document).ready(function(){
  $('.bxslider').bxSlider({
    auto: true,
    controls: true,
    mode: 'fade',
    speed: 1000,
    autoHover: true
  });
});

