
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
					if(i%3 == 0){
						html +='<div class="row" style="padding:5px; padding-bottom:0px; padding-top:0px;">';
					}

					html +='<a href="image.html#'+data.DATA[i].ID+'">';
					html +='<div class="col-xs-4" style="padding:5px;">';
					html +='<img src="http://sabcapp.com/sabcapp/'+ data.DATA[i].URL +'" style="width:100%;"/>';
					html +='</div>';
					html +='</a>';

					if(i>0 && i%3==0){
						html +='</div>';
					}	
					count ++;			
				}
				if(count%3!=0){
					html +='</div>';
				}
				$("#container").html(html);
			}else{
				$("#container").html('<div class="text-center" style="padding:30px"><p style="font-size:60px;"><span class="glyphicon glyphicon-briefcase"></span></p> No image folders available at the moment.');
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