package cl.json.social;

import android.content.ActivityNotFoundException;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableMap;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

import cl.json.ShareFile;

/**
 * Created by disenodosbbcl on 23-07-16.
 */
public abstract class ShareIntent {

    protected final ReactApplicationContext reactContext;
    protected Intent intent;
    protected String chooserTitle = "Share";
    public ShareIntent(ReactApplicationContext reactContext) {
        this.reactContext = reactContext;
        this.setIntent(new Intent(android.content.Intent.ACTION_SEND));
        this.getIntent().setType("text/plain");
    }
    public void open(ReadableMap options) throws ActivityNotFoundException {
        if (ShareIntent.hasValidKey("subject", options) ) {
            this.getIntent().putExtra(Intent.EXTRA_SUBJECT, options.getString("subject"));
        }

        if (ShareIntent.hasValidKey("message", options) && ShareIntent.hasValidKey("url", options)) {
            ShareFile fileShare = new ShareFile(options.getString("url"), this.reactContext);
            if(fileShare.isFile()) {
                Uri uriFile = fileShare.getURI();
                this.getIntent().setType(fileShare.getType());
                this.getIntent().putExtra(Intent.EXTRA_STREAM, uriFile);
                this.getIntent().putExtra(Intent.EXTRA_TEXT, options.getString("message"));
            } else {
                this.getIntent().putExtra(Intent.EXTRA_TEXT, options.getString("message") + " " + options.getString("url"));
            }
        } else if (ShareIntent.hasValidKey("url", options)) {
            ShareFile fileShare = new ShareFile(options.getString("url"), this.reactContext);
            if(fileShare.isFile()) {
                Uri uriFile = fileShare.getURI();
                this.getIntent().setType(fileShare.getType());
                this.getIntent().putExtra(Intent.EXTRA_STREAM, uriFile);
            } else {
                this.getIntent().putExtra(Intent.EXTRA_TEXT, options.getString("url"));
            }
        } else if (ShareIntent.hasValidKey("message", options) ) {
            this.getIntent().putExtra(Intent.EXTRA_TEXT, options.getString("message"));
        }
    }
    protected static String urlEncode(String param) {
        try {
            return URLEncoder.encode( param , "UTF-8" );
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException("URLEncoder.encode() failed for " + param);
        }
    }
    protected void openIntentChooser() throws ActivityNotFoundException {
        System.out.println(this.getIntent());
        System.out.println(this.getIntent().getExtras());
        Intent chooser = Intent.createChooser(this.getIntent(), this.chooserTitle);
        chooser.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        this.reactContext.startActivity(chooser);
    }
    protected boolean isPackageInstalled(String packagename, Context context) {
        PackageManager pm = context.getPackageManager();
        try {
            pm.getPackageInfo(packagename, PackageManager.GET_ACTIVITIES);
            return true;
        } catch (PackageManager.NameNotFoundException e) {
            return false;
        }
    }
    protected Intent getIntent(){
        return this.intent;
    }
    protected void setIntent(Intent intent) {
        this.intent = intent;
    }
    public static boolean hasValidKey(String key, ReadableMap options) {
        return options.hasKey(key) && !options.isNull(key);
    }
    protected abstract String getPackage();
    protected abstract String getDefaultWebLink();
    protected abstract String getPlayStoreLink();
}
