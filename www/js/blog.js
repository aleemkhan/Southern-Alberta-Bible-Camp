
$(document).ready(function(){
	var hash = window.location.hash.substr(1);
	if(hash == ""){
		hash = gdb("blog");
	}else{
		sdb("blog", hash);
	}
	$.ajax({
		type: "GET",
		url: serverUrl,
		data: {"REQUEST_TYPE":"GET_BLOG_BY_ID", "ID":hash},
		dataType: 'json',
		success: function(data){
			console.log(data);
			if(data.STATUS == "SUCCESS"){
				var html = "";
				for(var i=0; i < data.DATA.length; i++){
					html += '<div class="row" style="margin-top:0px;">';
					html += '<div class="col-xs-12" style="padding:0px; height:100%;">';
					html += '<img src="http://sabcapp.com/sabcapp/'+data.DATA[i].URL+'" style="width:100%"/>';
					html += '</div></div>';
					html += '<h3 style="margin:0px; padding:5px; padding-top:10px; padding-bottom:10px; border-bottom:2px solid #0D6767;">'+ data.DATA[i].Title +'</h3>';
					html += '<p>'+data.DATA[i].Description+'</p>';
				}
				$("#container").html(html);
			}else{
				$("#container").html(queryError('headphones', 'No blogs available at the moment.'));
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