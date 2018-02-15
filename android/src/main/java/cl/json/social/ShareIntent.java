package cl.json.social;

import android.content.ActivityNotFoundException;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.content.pm.ResolveInfo;
import android.content.ComponentName;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableMap;

import java.io.UnsupportedEncodingException;
import java.util.List;
import java.net.URLEncoder;

import cl.json.ShareFile;

/**
 * Created by disenodosbbcl on 23-07-16.
 */
public abstract class ShareIntent {

    protected final ReactApplicationContext reactContext;
    protected Intent intent;
    protected String chooserTitle = "Share";
    protected ShareFile fileShare;
    protected ReadableMap options;
    public ShareIntent(ReactApplicationContext reactContext) {
        this.reactContext = reactContext;
        this.setIntent(new Intent(android.content.Intent.ACTION_SEND));
        this.getIntent().setType("text/plain");
    }
    public void open(ReadableMap options) throws ActivityNotFoundException {
        this.options = options;
        this.fileShare = getFileShare(options);

        if (ShareIntent.hasValidKey("subject", options) ) {
            this.getIntent().putExtra(Intent.EXTRA_SUBJECT, options.getString("subject"));
        }
        
        if (ShareIntent.hasValidKey("title", options) ) {
            this.chooserTitle = options.getString("title");
        }

        if (ShareIntent.hasValidKey("message", options) && ShareIntent.hasValidKey("url", options)) {
            if(this.fileShare.isFile()) {
                Uri uriFile = this.fileShare.getURI();
                this.getIntent().setType(this.fileShare.getType());
                this.getIntent().putExtra(Intent.EXTRA_STREAM, uriFile);
                this.getIntent().putExtra(Intent.EXTRA_TEXT, options.getString("message"));
                this.getIntent().addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
            } else {
                this.getIntent().putExtra(Intent.EXTRA_TEXT, options.getString("message") + " " + options.getString("url"));
            }
        } else if (ShareIntent.hasValidKey("url", options)) {
            if(this.fileShare.isFile()) {
                Uri uriFile = this.fileShare.getURI();
                this.getIntent().setType(this.fileShare.getType());
                this.getIntent().putExtra(Intent.EXTRA_STREAM, uriFile);
                this.getIntent().addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
            } else {
                this.getIntent().putExtra(Intent.EXTRA_TEXT, options.getString("url"));
            }
        } else if (ShareIntent.hasValidKey("message", options) ) {
            this.getIntent().putExtra(Intent.EXTRA_TEXT, options.getString("message"));
        }
    }
    protected ShareFile getFileShare(ReadableMap options) {
        if (ShareIntent.hasValidKey("type", options)) {
            return new ShareFile(options.getString("url"), options.getString("type"), this.reactContext);
        } else {
            return new ShareFile(options.getString("url"), this.reactContext);
        }
    }
    protected static String urlEncode(String param) {
        try {
            return URLEncoder.encode( param , "UTF-8" );
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException("URLEncoder.encode() failed for " + param);
        }
    }
    protected Intent[] getIntentsToViewFile(Intent intent, Uri uri) {
        PackageManager pm = this.reactContext.getPackageManager();

        List<ResolveInfo> resInfo = pm.queryIntentActivities(intent, 0);
        Intent[] extraIntents = new Intent[resInfo.size()];
        for (int i = 0; i < resInfo.size(); i++) {
            ResolveInfo ri = resInfo.get(i);
            String packageName = ri.activityInfo.packageName;

            Intent newIntent = new Intent();
            newIntent.setComponent(new ComponentName(packageName, ri.activityInfo.name));
            newIntent.setAction(Intent.ACTION_VIEW);
            newIntent.setDataAndType(uri, intent.getType());
            newIntent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
            extraIntents[i] = new Intent(newIntent);
        }

        return extraIntents;
    }
    protected void openIntentChooser() throws ActivityNotFoundException {
        Intent chooser = Intent.createChooser(this.getIntent(), this.chooserTitle);
        chooser.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);

        if (ShareIntent.hasValidKey("showAppsToView", options)) {
            Intent viewIntent = new Intent(Intent.ACTION_VIEW);
            viewIntent.setType(this.fileShare.getType());

            Intent[] viewIntents = this.getIntentsToViewFile(viewIntent, this.fileShare.getURI());

            chooser.putExtra(Intent.EXTRA_INITIAL_INTENTS, viewIntents);
        }

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
