
var videos = new Array();
$(document).ready(function(){
	var hash = window.location.hash.substr(1);
	if(hash == ""){
		hash = gdb("vlog");
	}else{
		sdb("vlog", hash);
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
					videos[i] = "http://sabcapp.com/sabcapp/" + data.DATA[i].URL; 
					if( i == 0 ){
						html += '<div class="list-group">';
					}

					html+='<a href="#" onclick="playThisVideo('+i+')" class="list-group-item" style="padding-left:10px;">'+ data.DATA[i].Title +'</a>';

					if( i == data.DATA.length-1 ){
						html += "</div>" 
					}
				}
				$("#content").html(html);
				if(videos.length>0){
					playThisVideo(0);
				}
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

function playThisVideo(e){
	var extention = videos[e].split(".");
	console.log(extention[extention.length-1]);
	$("#video").html('<source src="'+ videos[e] +'" type="video/'+extention[extention.length-1]+'">');
	$("#video").load();
}