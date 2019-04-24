package cl.json.social;

import android.app.Activity;
import android.content.ActivityNotFoundException;
import android.content.Context;
import android.content.Intent;
import android.content.IntentSender;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.text.TextUtils;
import android.content.pm.ResolveInfo;
import android.content.ComponentName;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableMap;

import java.io.UnsupportedEncodingException;
import java.util.List;
import java.net.URLEncoder;
import java.util.ArrayList;

import cl.json.RNShareModule;
import cl.json.ShareFile;
import cl.json.ShareFiles;

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

        if (ShareIntent.hasValidKey("subject", options)) {
            this.getIntent().putExtra(Intent.EXTRA_SUBJECT, options.getString("subject"));
        }

        if (ShareIntent.hasValidKey("title", options)) {
            this.chooserTitle = options.getString("title");
        }

        String message = "";
        if (ShareIntent.hasValidKey("message", options)) {
            message = options.getString("message");
        }
        if (ShareIntent.hasValidKey("urls", options)) {

            ShareFiles fileShare = getFileShares(options);
            if (fileShare.isFile()) {
                ArrayList<Uri> uriFile = fileShare.getURI();
                this.getIntent().setAction(Intent.ACTION_SEND_MULTIPLE);
                this.getIntent().setType(fileShare.getType());
                this.getIntent().putParcelableArrayListExtra(Intent.EXTRA_STREAM, uriFile);
                this.getIntent().addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
                if (!TextUtils.isEmpty(message)) {
                    this.getIntent().putExtra(Intent.EXTRA_TEXT, message);
                }
            } else {
                if (!TextUtils.isEmpty(message)) {
                    this.getIntent().putExtra(Intent.EXTRA_TEXT, message + " " + options.getArray("urls").toString());
                } else {
                    this.getIntent().putExtra(Intent.EXTRA_TEXT, options.getArray("urls").toString());
                }
            }
        } else if (ShareIntent.hasValidKey("url", options)) {
            this.fileShare = getFileShare(options);
            if (this.fileShare.isFile()) {
                Uri uriFile = this.fileShare.getURI();
                this.getIntent().setType(this.fileShare.getType());
                this.getIntent().putExtra(Intent.EXTRA_STREAM, uriFile);
                this.getIntent().addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
                if (!TextUtils.isEmpty(message)) {
                    this.getIntent().putExtra(Intent.EXTRA_TEXT, message);
                }
            } else {
                if (!TextUtils.isEmpty(message)) {
                    this.getIntent().putExtra(Intent.EXTRA_TEXT, message + " " + options.getString("url"));
                } else {
                    this.getIntent().putExtra(Intent.EXTRA_TEXT, options.getString("url"));
                }
            }
        } else if (!TextUtils.isEmpty(message)) {
            this.getIntent().putExtra(Intent.EXTRA_TEXT, message);
        }
    }

    protected ShareFile getFileShare(ReadableMap options) {
        if (ShareIntent.hasValidKey("type", options)) {
            return new ShareFile(options.getString("url"), options.getString("type"), this.reactContext);
        } else {
            return new ShareFile(options.getString("url"), this.reactContext);
        }
    }

    protected ShareFiles getFileShares(ReadableMap options) {
        if (ShareIntent.hasValidKey("type", options)) {
            return new ShareFiles(options.getArray("urls"), options.getString("type"), this.reactContext);
        } else {
            return new ShareFiles(options.getArray("urls"), this.reactContext);
        }
    }

    protected static String urlEncode(String param) {
        try {
            return URLEncoder.encode(param, "UTF-8");
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
        Activity activity = this.reactContext.getCurrentActivity();
        if (activity == null) {
            TargetChosenReceiver.sendCallback(false, "Something went wrong");
            return;
        }
        Intent chooser;
        IntentSender intentSender = null;
        if (TargetChosenReceiver.isSupported()) {
            intentSender = TargetChosenReceiver.getSharingSenderIntent(this.reactContext);
            chooser = Intent.createChooser(this.getIntent(), this.chooserTitle, intentSender);
        } else {
            chooser = Intent.createChooser(this.getIntent(), this.chooserTitle);
        }
        chooser.setFlags(Intent.FLAG_ACTIVITY_NO_HISTORY);

        if (ShareIntent.hasValidKey("showAppsToView", options) && ShareIntent.hasValidKey("url", options)) {
            Intent viewIntent = new Intent(Intent.ACTION_VIEW);
            viewIntent.setType(this.fileShare.getType());

            Intent[] viewIntents = this.getIntentsToViewFile(viewIntent, this.fileShare.getURI());

            chooser.putExtra(Intent.EXTRA_INITIAL_INTENTS, viewIntents);
        }

        activity.startActivityForResult(chooser, RNShareModule.SHARE_REQUEST_CODE);
        if (intentSender == null) {
            TargetChosenReceiver.sendCallback(true, true, "OK");
        }
    }

    public static boolean isPackageInstalled(String packagename, Context context) {
        PackageManager pm = context.getPackageManager();
        try {
            pm.getPackageInfo(packagename, PackageManager.GET_ACTIVITIES);
            return true;
        } catch (PackageManager.NameNotFoundException e) {
            return false;
        }
    }

    protected Intent getIntent() {
        return this.intent;
    }

    protected void setIntent(Intent intent) {
        this.intent = intent;
    }

    public static boolean hasValidKey(String key, ReadableMap options) {
        return options != null && options.hasKey(key) && !options.isNull(key);
    }

    protected abstract String getPackage();

    protected abstract String getDefaultWebLink();

    protected abstract String getPlayStoreLink();
}
