package cl.json;

import android.content.Context;
import android.content.Intent;
import android.content.ActivityNotFoundException;
import android.content.pm.PackageManager;
import android.content.pm.ResolveInfo;
import android.net.Uri;
import android.support.annotation.Nullable;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.Callback;

import java.io.IOException;
import java.net.URI;
import java.net.URLEncoder;

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
  public void open(ReadableMap options, @Nullable Callback failureCallback, @Nullable Callback successCallback) {
    Intent shareIntent = createShareIntent(options);
    Intent intentChooser = createIntentChooser(options, shareIntent);
    boolean foundPackage = true;
    if (hasValidKey("package", options)) {
      foundPackage = false;
      for (ResolveInfo info : this.reactContext.getPackageManager().queryIntentActivities(shareIntent, 0)) {
        System.out.println(info.activityInfo.packageName);
        if (info.activityInfo.packageName.toLowerCase().startsWith(options.getString("package"))) {
          foundPackage = true;
          shareIntent.setPackage(info.activityInfo.packageName);
        }
      }
    }
    if(!foundPackage) {
      String url = "";
      if (hasValidKey("notFoundPackage", options)) {
        try{
          url = options.getString("notFoundPackage")
                .replace("{url}", URLEncoder.encode( options.getString("url") , "UTF-8" ) )
                .replace("{message}", URLEncoder.encode( options.getString("message") , "UTF-8" ));
        } catch(IOException ioe) {
          failureCallback.invoke("encoding error");
        }
      } else if (hasValidKey("notFoundPackagePlaystore", options)) {
        url = options.getString("notFoundPackagePlaystore");
      }
      try {
        Intent intent = new Intent("android.intent.action.VIEW", Uri.parse(url));
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        this.reactContext.startActivity(intent);
        successCallback.invoke("OK");
      } catch (ActivityNotFoundException ex) {
        failureCallback.invoke("not_available");
      }

    } else {
      try {
        this.reactContext.startActivity(intentChooser);
        successCallback.invoke("OK");
      } catch (ActivityNotFoundException ex) {
        failureCallback.invoke("not_available");
      }
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
      ShareFile fileShare = new ShareFile(options.getString("url"), this.reactContext);
      if(fileShare.isFile()) {
        Uri uriFile = fileShare.getURI();
        intent.setType(fileShare.getType());
        intent.putExtra(Intent.EXTRA_STREAM, uriFile);
        intent.putExtra(Intent.EXTRA_TEXT, options.getString("message"));
      } else {
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
