serverUrl = "http://sabcapp.com/sabcapp/server.php";

function serverError(icon, text){
	return '<div class="text-center" style="padding:30px"><p style="font-size:60px;"><span class="glyphicon glyphicon-'+icon+'"></span></p> '+text+' </div>';
}
function queryError(icon, text){
	return '<div class="text-center" style="padding:30px"><p style="font-size:60px;"><span class="glyphicon glyphicon-'+icon+'"></span></p> '+text+'</div>';
}

function sdb(k,v){
    if(typeof(Storage) !== "undefined") {
        localStorage.setItem(k,v);
    } else {
        console.log("No Local Database Support");
    }
}
function gdb(k){
    if(typeof(Storage) !== "undefined") {
        return localStorage.getItem(k);
    } else {
        console.log("No Local Database Support");
    }
}

function fbClick(){
	console.log("Call fb functions.");
}

function instaClick(){
	console.log("Call insta functions.");
}

function twitterClick(){
	console.log("Call twitter functions.");
}

function registeredDevice(){
    if(gdb('registered')=='true' && gdb('registeredDevice')=='false'){
        $.ajax({
            type: 'GET',
            url: serverUrl,
            data: {'REQUEST_TYPE':'REGISTER_PUSH_NOTIFICATION', 'REGID': gdb('regid'), 'PHONE':'Android'},
            dataType: 'json',
            success:function(data){
                console.log(data);
                sdb('registeredDevice', 'true');
            },
            error:function(a, b, c){
                console.error(a);
                console.error(b);
                console.error(c);
            }
        });
    }
}

if(gdb('registered')!='true'){
    sdb('registered', 'false');
}

if(gdb('registeredDevice')!='true'){
    sdb('registeredDevice', 'false');
}

registeredDevice();

