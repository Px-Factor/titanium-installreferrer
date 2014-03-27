package net.pixelfactor.installreferrer;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.util.Log;

public class ReferrerBroadcastReceiver extends BroadcastReceiver {
	private static final String TAG = "net.pixelfactor.installreferrer";
	
	@Override
	public void onReceive(Context context, Intent intent) {
		String uri = intent.toURI();
		if (uri != null && uri.length() > 0) {
			int index = uri.indexOf("referrer=");
			if (index > -1) {
				uri = uri.substring(index + 9, uri.length() - 4);
				Log.i(TAG, "Received INSTALL_REFERRER URI: " + uri);

				SharedPreferences settings = context.getSharedPreferences("installPreferences", 0);
				SharedPreferences.Editor editor = settings.edit();
				editor.putString("INSTALL_REFERRER", uri);
				editor.commit();
			}
		}
	}
}
