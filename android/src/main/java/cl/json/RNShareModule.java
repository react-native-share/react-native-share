package cl.json;

import android.content.Context;
import android.content.Intent;
import android.content.ActivityNotFoundException;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Environment;
import android.util.Base64;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.Callback;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URI;

public class RNShareModule extends ReactContextBaseJavaModule {

  private final ReactApplicationContext reactContext;

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
    Intent shareIntent = createShareIntent(options);
    Intent intentChooser = createIntentChooser(options, shareIntent);

    try {
      this.reactContext.startActivity(intentChooser);
      callback.invoke("OK");
    } catch (ActivityNotFoundException ex) {
      callback.invoke("not_available");
    }
  }
  private boolean isPackageInstalled(String packagename, Context context) {
    PackageManager pm = context.getPackageManager();
    try {
      pm.getPackageInfo(packagename, PackageManager.GET_ACTIVITIES);
      return true;
    } catch (PackageManager.NameNotFoundException e) {
      return false;
    }
  }
  /**
   * Creates an {@link Intent} to be shared from a set of {@link ReadableMap} options
   * @param {@link ReadableMap} options
   * @return {@link Intent} intent
   */
  private Intent createShareIntent(ReadableMap options) {
    Intent intent = new Intent(android.content.Intent.ACTION_SEND);
    intent.setType("text/plain");

    if (hasValidKey("subject", options) ) {
      intent.putExtra(Intent.EXTRA_SUBJECT, options.getString("subject"));
    }
    //isPackageInstalled("com.whatsapp", this.reactContext);
    if (hasValidKey("message", options) && hasValidKey("url", options)) {
      FileBase64 fileShare = new FileBase64(options.getString("url"));
      if(fileShare.isFile()) {
        Uri uriFile = fileShare.getURI();
        intent.setType(fileShare.getType());
        System.out.println("es base 64 file");
        System.out.printf(options.getString("url"));
        intent.putExtra(Intent.EXTRA_STREAM, uriFile);
        intent.putExtra(Intent.EXTRA_TEXT, options.getString("message"));
      } else {
        System.out.println("no es base 64 file");
        intent.putExtra(Intent.EXTRA_TEXT, options.getString("message") + " " + options.getString("url"));
      }
    } else if (hasValidKey("url", options)) {
      URI uri = URI.create(options.getString("url"));
      if(uri.getScheme().equals("data")) {
        System.out.println("IS DATA FILE L");
      } else {
        intent.putExtra(Intent.EXTRA_TEXT, options.getString("url"));
      }

    } else if (hasValidKey("message", options) ) {
      intent.putExtra(Intent.EXTRA_TEXT, options.getString("message"));
    }
    return intent;
  }

  /**
   * Creates an {@link Intent} representing an intent chooser
   * @param {@link ReadableMap} options
   * @param {@link Intent} intent to share
   * @return {@link Intent} intent
   */
  private Intent createIntentChooser(ReadableMap options, Intent intent) {
    String title = "Share";
    if (hasValidKey("title", options)) {
      title = options.getString("title");
    }

    Intent chooser = Intent.createChooser(intent, title);
    chooser.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);

    return chooser;
  }

  /**
   * Checks if a given key is valid
   * @param @{link String} key
   * @param @{link ReadableMap} options
   * @return boolean representing whether the key exists and has a value
   */
  private boolean hasValidKey(String key, ReadableMap options) {
    return options.hasKey(key) && !options.isNull(key);
  }

}
