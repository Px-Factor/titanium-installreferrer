// This is a test harness for your module
// You should do something interesting in this harness 
// to test out the module and to provide instructions 
// to users on how to use it by example.

/*
To simulate install referrer broadcast, run the following command in terminal:

./adb shell am broadcast -a com.android.vending.INSTALL_REFERRER --es "referrer" "utm_source%3Dtest_utm_source%26utm_medium%3Dutm_test_medium"
 */

// open a single window
var win = Ti.UI.createWindow({
	backgroundColor:'white'
});
var label = Ti.UI.createLabel();
win.add(label);
win.open();

var InstallReferrer = require('net.pixelfactor.installreferrer');
var utmSource = InstallReferrer.getUtmSource();
if (utmSource != null) {
	var view = Ti.UI.createView({
		height: Ti.UI.SIZE,
		layout: 'vertical',
		width: Ti.UI.SIZE
	});
	win.add(view);
	
	var label = Ti.UI.createLabel({
		text: 'UTM Source Data:'
	});
	view.add(label);

	utmSource = decodeURIComponent(utmSource);
	var utmParts = utmSource.split('&');
	var utmObject = {};
	utmParts.map(function(part) {
		var currPart = part.split('=');
		utmObject[currPart[0]] = currPart[1];
		
		var label = Ti.UI.createLabel({
			left: 10,
			text: currPart[0] + ': ' + currPart[1]
		});
		view.add(label);
	});
	
	Ti.API.info('UTM Object is:');
	Ti.API.info(utmObject);
} else {
	var label = Ti.UI.createLabel({
		text: 'No install referrer was received'
	});
	win.add(label);
}
