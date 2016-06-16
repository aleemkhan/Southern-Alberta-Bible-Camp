var documents = new Array();

$(document).ready(function(){
	var hash = window.location.hash.substr(1);
	if(hash == ""){
		hash = gdb("gallery");
	}else{
		sdb("gallery", hash);
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
				var count = 0;
				for(var i=0; i < data.DATA.length; i++){
					documents[i] = "http://sabcapp.com/sabcapp/"+data.DATA[i].URL;
					html += '<div onclick="openPDF('+i+')" class="row" style="margin-bottom:10px; border-bottom: 1px solid #0D6767;">';
					html += '<div class="col-xs-2" style="padding:5px; height:100%; color:#0D6767; font-size: 24px;">';
					html += '<span class="glyphicon glyphicon-eye-open"></span></div><div class="col-xs-9" id="" style="padding:0px;">';
					html += '<h4>'+data.DATA[i].Title+'</h4></div></div>';
				}
				$("#container").html(html);
			}else{
				$("#container").html(queryError('file', data.MESSAGE));
			}
			$("#loader").css({'visibility':'hidden'});
		},
		error: function(a, b, c){
			console.log(a);
			console.log(b);
			console.log(c);
			$("#container").html(serverError('signal', 'unable to reach server.'));
			$("#loader").css({'visibility':'hidden'});

		}
	});
});