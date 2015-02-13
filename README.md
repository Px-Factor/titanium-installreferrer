titanium-installreferrer
========================

This module receives and stores the INSTALL_REFERRER sent by Google Play (where exists), which can then be returned when you need it.

# INSTALL
The module (net.pixelfactor.installreferrer-android-1.zip) is located under the dist folder. Add it to your Titanium project using your preferred method. If you are not sure how to do this, check [Using Titanium Modules](http://docs.appcelerator.com/titanium/3.0/#!/guide/Using_Titanium_Modules).

There is no need to add anything else to your tiapp.xml file, however, you must make sure that you don’t already have a receiver for the INSTALLL_REFERRER action. If your tiapp.xml already contains 

	<action android:name="com.android.vending.INSTALL_REFERRER" />

somewhere in it, delete its receiver.

# USAGE
In your application, where you need to retrieve the INSTALL_REFERRER, add the following:

	var installReferrer = require('net.pixelfactor.installreferrer');
	var utmSource = decodeURIComponent(installReferrer.getUtmSource());

This will return the INSTALL_REFERRER string in the following format:

	utm_source=Source&utm_medium=Medium&utm_term=Term&utm_content=Content&utm_campaign=Name

or NULL if no INSTALL_REFERRER was received from Google Play.

Since the INSTALL_REFERRER string is saved with the application, it will be returned (if sent) every time you call getUtmSource() method, so if you want to track this only after the application has been launched for the first time, you will have to implement it yourself.

# TESTING
You can test this module by running the following command in Terminal

    ./adb shell am broadcast -a com.android.vending.INSTALL_REFERRER --es "referrer" "utm_source%3Dtest_utm_source%26utm_medium%3Dutm_test_medium"

quit your application and starts it again.

You can use the [Referral Tester](https://play.google.com/store/apps/details?id=com.giago.referraltester) app (NOT FREE) which will simulate a market broadcast.

Please check example/app.js for sample code.