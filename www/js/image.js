
$(document).ready(function(){
	var hash = window.location.hash.substr(1);
	if(hash == ""){
		hash = gdb("image");
	}else{
		sdb("image", hash);
	}
	$.ajax({
		type: "GET",
		url: serverUrl,
		data: {"REQUEST_TYPE":"GET_CONTENT_BY_ID", "ID":hash},
		dataType: 'json',
		success: function(data){
			console.log(data);
			if(data.STATUS == "SUCCESS"){
				var html = "";
				$("#title").html(data.DATA[0].Title);
				html += '<div class="row"><img class="vcenter" src="http://sabcapp.com/sabcapp/'+ data.DATA[0].URL +'" style="width:100%;"/></div>';
				$("#container").html(html);
			}else{
				$("#container").html(queryError('picture','This image is not available at the moment.'));
			}
			$("#loader").css({'visibility':'hidden'});
		},
		error: function(a, b, c){
			console.log(a);
			console.log(b);
			console.log(c);
			$("#container").html(serverError);
			$("#loader").css({'visibility':'hidden'});

		}
	});
});