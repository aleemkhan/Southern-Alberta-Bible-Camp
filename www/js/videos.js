
$(document).ready(function(){
	$.ajax({
		type: "GET",
		url: serverUrl,
		data: {"REQUEST_TYPE":"GET_FOLDER", "STATUS": 1, "TYPE":"VIDEOS"},
		dataType: 'json',
		success: function(data){
			console.log(data);
			if(data.STATUS == "SUCCESS"){
				var html = "";
				for(var i=0; i < data.DATA.length; i++){
					html +='<a href="vlog.html#'+data.DATA[i].ID+'" style="text-decoration:none; color:black;">';
					html +='<div class="row">';
					html +='<div class="col-xs-8" style="padding:0px; height:100%;">';
					html +='<h3>'+ data.DATA[i].Title +'</h3>';
					html +='</div>';
					html +='<div class="col-xs-4" style="padding:0px;">';
					html +='<img src="http://sabcapp.com/sabcapp/'+ data.DATA[i].IMAGE +'" style="width:100%;"/>';
					html +='</div>';
					html +='</div>';
					html +='</a><hr>';
					sdb("folder_"+data.DATA[i].ID, data.DATA[i].Title);
				}
				$("#container").html(html);
			}else{
				$("#container").html(queryError('facetime-video', data.MESSAGE));
			}
			$("#loader").css({'visibility':'hidden'});
		},
		error: function(a, b, c){
			console.log(a);
			console.log(b);
			console.log(c);
			$("#container").html(serverError('signal', 'Could not reach server.'));
			$("#loader").css({'visibility':'hidden'});

		}
	});
});