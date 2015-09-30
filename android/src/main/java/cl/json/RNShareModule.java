package cl.json;

import android.content.Intent;
import android.content.ActivityNotFoundException;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.Callback;

public class RNShareModule extends ReactContextBaseJavaModule {

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
    Intent share = new Intent(android.content.Intent.ACTION_SEND);
    share.setType("text/plain");
    //share.addFlags(Intent.FLAG_ACTIVITY_CLEAR_WHEN_TASK_RESET);
    if (options.hasKey("share_text") && !options.isNull("share_text")) {
      share.putExtra(Intent.EXTRA_SUBJECT, options.getString("share_text"));
    }
    if (options.hasKey("share_URL") && !options.isNull("share_URL")) {
      share.putExtra(Intent.EXTRA_TEXT, options.getString("share_URL"));
    }
    String title = "Share";
    if (options.hasKey("title") && !options.isNull("title")) {
      title = options.getString("title");
    }
    try {
      Intent chooser = Intent.createChooser(share, title);
      chooser.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
      this.reactContext.startActivity(chooser);
      callback.invoke("OK");
    } catch (ActivityNotFoundException ex) {
      callback.invoke("not_available");
    }
  }
}
