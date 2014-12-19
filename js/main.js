// Main Js Women Who Code

function meetupAPIGet(){

	(function() {
		var meetupAPI = "https://api.meetup.com/2/events?&sign=true&photo-host=public&group_urlname=women-who-code-tokyo&page=4&key=412ff3568274d2345f6c2d13562626&callback=?";
		$.getJSON( meetupAPI)
			.done(function( data ) {
				var eventList="";
				$.each( data.results, function( i, item ) {
				if(item.venue){
					var place = item.venue.name;
				}else{
					var place = '未定';
				}
				//インスタンス化
				var dat1 = new Date(item.time);								//イベント開始時間でDataオブジェクト生成

				//年の情報を取得
				var year = dat1.getFullYear()%100;								//西暦取得(%100で下２桁のみ表示)

				//曜日の情報取得
				var day = dat1.getDay();														//曜日取得(0~6の数字で帰ってくる)。
				var weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];//曜日表示形式

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
				eventPlace='<div class="event_place"><i class="fa fa-map-marker map_pin"></i>'+place+'</div></div>'
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

// Meetup APIでPast Meetupsの画像などを取得
/* Event情報を取得 */
	(function() {
		var meetupPic = "https://api.meetup.com/2/events?&sign=true&photo-host=public&desc=true&status=past&group_urlname=women-who-code-tokyo&page=20&key=412ff3568274d2345f6c2d13562626&callback=?";
		$.getJSON(meetupPic)
			.done(function(data){
				var eventList = [];
				$.each(data.results, function(i, item){
					var eventInfo = {};
					eventInfo.id = item.id;
					eventInfo.name = item.name;
					eventList.push(eventInfo);
				});
				meetupAlbum(eventList);
			})
			.fail(function(jqxhr, textStatus, error){
				var errorEvent="イベント情報を取得できませんでした。"
				$('#past_meetups_list').html(errorEvent);
			});
		
	})();

/* Event情報からアルバム情報を取得 */
function meetupAlbum(eventData){
	var idArray = [];
	for(i = 0; i < eventData.length; i++){
		idArray.push(eventData[i].id);
	}
	var apiCall = "https://api.meetup.com/2/photo_albums?&sign=true&photo-host=public&page=10&key=412ff3568274d2345f6c2d13562626&callback=?&event_id=";
	var ids = idArray.toString();
	var query = apiCall + ids;
	$.getJSON(query, function(data){
		var meetupPic = [];
		var pic_html = '';
		$.each(data.results, function(j, item){
			if(idArray.indexOf(item.event_id) >= 0){
				var albumInfo = {};
				albumInfo.id = item.event_id;
				albumInfo.img = item.album_photo.photo_link;
				meetupPic.push(albumInfo);
			}
		});
		for(i = 0; i < 3; i++){
			var picId = meetupPic[i].id;
			var picImg = meetupPic[i].img;
			var j = idArray.indexOf(picId);
			var eventName = eventData[j].name;
			pic_html += '<div class="col-1-3"><div class="past_pic">';
			pic_html += '<a href="http://www.meetup.com/Women-Who-Code-Tokyo/events/' + picId + '/" target="_blank"><img src="' + picImg + '" alt="' + eventName + '"><span>' + eventName + '</span></a>';
			pic_html += '</div></div>';
		}
		$('#past_meetups_list').append(pic_html);
	});
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

