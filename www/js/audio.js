
$(document).ready(function(){
	var hash = window.location.hash.substr(1);
	if(hash == ""){
		hash = gdb("audio");
	}else{
		sdb("auido", hash);
	}
	$("#title").html(gdb("folder_"+hash));
	$.ajax({
		type: "GET",
		url: serverUrl,
		data: {"REQUEST_TYPE":"GET_CONTENT_FOLDER", "STATUS": 1, "FID":hash},
		dataType: 'json',
		success: function(data){
			console.log(data);
			if(data.STATUS == "SUCCESS"){
				var html = "";
				for(var i=0; i < data.DATA.length; i++){
					html += '<div class="row" style="margin-bottom:10px;">';
					html += '<div id="aud_'+i+'" class="col-xs-2" style="padding:10px; height:100%;">';
					html += '<img id="play'+i+'" onclick="playAudio('+i+');" src="img/play.png" style="width:40%;"/>';
					html += '<img id="pause'+i+'" onclick="pauseAudio('+i+');" src="img/pause.png" style="width:40%; display:none;"/>';
					html += '</div>';
					html += '<div class="col-xs-9" id="" style="padding:0px;">';
					html += '<h4>'+data.DATA[i].Title+'</h4>';
					html += '<audio id="audio_'+i+'" onended="finishAudio('+i+');" style="visibility:hidden;">';
					html += '<source src="http://sabcapp.com/sabcapp/'+data.DATA[i].URL+'" type="audio/mp3">';
					html += 'Your browser does not support the audio element.';
					html += '</audio>';
					html += '</div>';
					html += '</div>';
				}
				$("#container").html(html);
			}else{
				$("#container").html(queryError('headphones', 'No audios available at the moment.'));
			}
			$("#loader").css({'visibility':'hidden'});
		},
		error: function(a, b, c){
			console.log(a);
			console.log(b);
			console.log(c);
			$("#container").html(serverError('signal','Unable to reach server.'));
			$("#loader").css({'visibility':'hidden'});

		}
	});
});