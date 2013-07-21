package com.ufohunters;

import android.os.Bundle; 
import android.view.Menu; 
import org.apache.cordova.*; 

import com.ufohunters.R;

public class UfoHuntersActivity extends DroidGap { 

	@Override 
	public void onCreate(Bundle savedInstanceState) { 
		super.onCreate(savedInstanceState); 
		super.loadUrl("file:///android_asset/www/index_android.html"); 
	} 
	
	@Override 
	public boolean onCreateOptionsMenu(Menu menu) { 
		// Inflate the menu; this adds items to the action bar if it is present. 
		getMenuInflater().inflate(R.menu.main, menu); 
		return true; 
	} 

}