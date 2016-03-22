package cl.json;

import android.content.Intent;
import android.content.ActivityNotFoundException;
import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.Callback;

import java.net.URI;

public class RNShareModule extends ReactContextBaseJavaModule implements HandleDownloadImageTask {

  ReactApplicationContext reactContext;

  public RNShareModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;
  }

  @Override
  public String getName() {
    return "RNShare";
  }
  @ReactMethod
  public void open(ReadableMap options, Callback callback) {
    Log.d("MX", "open");

    if (options.hasKey("share_image_URL") && !options.isNull("share_image_URL")) {
      new DownloadImageTask(options,callback,this,this.reactContext.getApplicationContext()).execute(options.getString("share_image_URL"));
    }
    else
    {
      downloaded(null,options,callback);
    }
  }

  @Override
  public void downloaded(android.net.Uri fileUri, ReadableMap options, Callback callback) {
    Log.d("MX", "call backed");

    Intent share = new Intent(android.content.Intent.ACTION_SEND);
    share.setType("text/plain");
    share.addFlags(Intent.FLAG_ACTIVITY_NEW_DOCUMENT);
    share.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
    share.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
    if (options.hasKey("share_text") && !options.isNull("share_text")) {
      share.putExtra(Intent.EXTRA_SUBJECT, options.getString("share_text"));
    }
    if (options.hasKey("share_extra_text") && !options.isNull("share_extra_text")) {
      share.putExtra(Intent.EXTRA_TEXT, options.getString("share_extra_text"));
    }

    if(fileUri!=null)
    {
      share.setType("image/jpeg");
       share.putExtra(Intent.EXTRA_STREAM,  fileUri);
    }


    String title = "Share";
    if (options.hasKey("title") && !options.isNull("title")) {
      title = options.getString("title");
    }
    try {
      Intent chooser = Intent.createChooser(share, title);
      chooser.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
      this.reactContext.startActivity(chooser);
      //callback.invoke("OK");
    } catch (ActivityNotFoundException ex) {
      //callback.invoke("not_available");
    }
  }
}