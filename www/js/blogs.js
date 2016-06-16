
$(document).ready(function(){
	$.ajax({
		type: "GET",
		url: serverUrl,
		data: {"REQUEST_TYPE":"GET_BLOG", "STATUS":1},
		dataType: 'json',
		success: function(data){
			console.log(data);
			if(data.STATUS == "SUCCESS"){
				var html = "";
				for(var i=0; i < data.DATA.length; i++){
					html += '<a href="blog.html#'+data.DATA[i].ID+'" style="text-decoration:none; color:black;">';
					html += '<div class="row" style="margin-top:10px;">';
					html += '<div class="col-xs-12" style="padding:0px; height:100%;">';
					html += '<img src="http://sabcapp.com/sabcapp/'+data.DATA[i].URL+'" style="width:100%; min-height:100px;"/>';
					html += '</div>';
					html += '<div class="col-xs-12" style="padding:0px; margin:0px; margin-top:-50px; background-color: rgba(0,0,0, 0.5)">';
					html += '<h3 class="ellipsis" style="margin:0px; padding:5px; padding-top:10px; padding-bottom:10px; color: white;">'+ data.DATA[i].Title +'</h3>';
					html += '</div></div></a>';
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