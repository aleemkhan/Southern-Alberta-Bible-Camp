var pushNotification;
        
function onDeviceReady() {
    console.log('deviceready event received');
    
    document.addEventListener("backbutton", function(e)
    {
       	console.log('backbutton event received');
    }, false);

    try 
    {
        pushNotification = window.plugins.pushNotification;
  		console.log('registering ' + device.platform + '');
        if (device.platform == 'android' || device.platform == 'Android' || device.platform == 'amazon-fireos' ) {
			pushNotification.register(successHandler, errorHandler, {"senderID":"590040242608","ecb":"onNotification"});        // required!
        } else {
            pushNotification.register(tokenHandler, errorHandler, {"badge":"true","sound":"true","alert":"true","ecb":"onNotificationAPN"});    // required!
        }
    }
    catch(err) 
    {
        console.error("Error registering device: "+err.message); 
    } 
}

// handle APNS notifications for iOS
function onNotificationAPN(e) {
    if (e.alert) {
         console.log('push notification: ' + e.alert + '');
         // showing an alert also requires the org.apache.cordova.dialogs plugin
         navigator.notification.alert(e.alert);
    }
        
    if (e.sound) {
        // playing a sound also requires the org.apache.cordova.media plugin
        var snd = new Media(e.sound);
        snd.play();
    }
    
    if (e.badge) {
        pushNotification.setApplicationIconBadgeNumber(successHandler, e.badge);
    }
}

// handle GCM notifications for Android
function onNotification(e) {
    console.log('EVENT RECEIVED:' + e.event + '');
    
    switch( e.event )
    {
        case 'registered':
        if ( e.regid.length > 0 )
        {
            console.log('Device Registered REGID:' + e.regid + "");
            // Your GCM push server needs to know the regID before it can push to this device
            // here is where you might want to send it the regID for later use.
            console.log("regID = " + e.regid);
            sdb('regid', e.regid);
            sdb('registered', 'true');
            window.top.location = "home.html";
        }
        break;
        
        case 'message':
            // if this flag is set, this notification happened while we were in the foreground.
            // you might want to play a sound to get the user's attention, throw up a dialog, etc.
            if (e.foreground)
            {
                console.log('INLINE NOTIFICATION');
                // on Android soundname is outside the payload. 
                // On Amazon FireOS all custom attributes are contained within payload
                var soundfile = e.soundname || e.payload.sound;
                // if the notification contains a soundname, play it.
                // playing a sound also requires the org.apache.cordova.media plugin
                var my_media = new Media("/android_asset/www/"+ soundfile);
                my_media.play();
            }
            else
            {   // otherwise we were launched because the user touched a notification in the notification tray.
                if (e.coldstart)
                    console.log('COLDSTART NOTIFICATION');
                else
                	console.log('BACKGROUND NOTIFICATION');
            }
                
            console.log('MESSAGE -> MSG: ' + e.payload.message + '');
            //android only
            console.log('MESSAGE -> MSGCNT: ' + e.payload.msgcnt + '');
            //amazon-fireos only
            console.log('MESSAGE -> TIMESTAMP: ' + e.payload.timeStamp + '');
            window.top.location = "home.html";
        break;
        
        case 'error':
            console.error('ERROR -> MSG:' + e.msg + '');
            window.top.location = "home.html";
        break;
        
        default:
            console.error('EVENT -> Unknown, an event was received and we do not know what it is.');
            window.top.location = "home.html";
        break;
    }
}
            
function tokenHandler (result) {
    console.log('token: '+ result +'');
    sdb('iostoken',result);
	sdb('registered', 'true');

    // Your iOS push server needs to know the token before it can push to this device
    // here is where you might want to send it the token for later use.
}
            
function successHandler (result) {
    console.log('success:'+ result +'');
}

function errorHandler (error) {
    console.error('error:'+ error +'');
}

$(document).ready(function(){
	if(gdb('registered') != 'true'){
		document.addEventListener('deviceready', onDeviceReady, true);
	}else{

	}
});



