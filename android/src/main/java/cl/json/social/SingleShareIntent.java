package cl.json.social;

import android.app.Activity;
import android.content.ActivityNotFoundException;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.IntentSender;
import android.net.Uri;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableMap;

import cl.json.RNShareModule;

/**
 * Created by disenodosbbcl on 23-07-16.
 */
public abstract class SingleShareIntent extends ShareIntent {

    protected String playStoreURL = null;
    protected String appStoreURL = null;

    public SingleShareIntent(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    public void open(ReadableMap options) throws ActivityNotFoundException {
        System.out.println(getPackage());
        //  check if package is installed
        if (getPackage() != null || getDefaultWebLink() != null || getPlayStoreLink() != null) {
            if (this.isPackageInstalled(getPackage(), reactContext)) {
                System.out.println("INSTALLED");
                if (getComponentClass() != null) {
                    ComponentName cn = new ComponentName(getPackage(), getComponentClass());
                    this.getIntent().setComponent(cn);
                } else {
                    this.getIntent().setPackage(getPackage());
                }
                super.open(options);
            } else {
                System.out.println("NOT INSTALLED");
                String url = "";
                if (getDefaultWebLink() != null) {
                    url = getDefaultWebLink()
                            .replace("{url}", this.urlEncode(options.getString("url")))
                            .replace("{message}", this.urlEncode(options.getString("message")));
                } else if (getPlayStoreLink() != null) {
                    url = getPlayStoreLink();
                } else {
                    //  TODO
                }
                //  open web intent
                this.setIntent(new Intent(new Intent("android.intent.action.VIEW", Uri.parse(url))));
            }
        }
        //  configure default
        super.open(options);
    }

    protected void openIntentChooser() throws ActivityNotFoundException {
        this.openIntentChooser(null);
    }

    protected void openIntentChooser(ReadableMap options) throws ActivityNotFoundException {
        if (this.options.hasKey("forceDialog") && this.options.getBoolean("forceDialog")) {
            Activity activity = this.reactContext.getCurrentActivity();
            if (activity == null) {
                TargetChosenReceiver.sendCallback(false, "Something went wrong");
                return;
            }
            if (options != null) {
                if (ShareIntent.hasValidKey("social", options)) {
                    String socialType = options.getString("social");
                    if (socialType.equals("instagramstories")) {
                        if (ShareIntent.hasValidKey("method", options)) {
                            String method = options.getString("method");
                            if (method.equals("shareStickerImage") || method.equals("shareBackgroundAndStickerImage")) {
                                activity.grantUriPermission("com.instagram.android", this.stickerAsset.getURI(), Intent.FLAG_GRANT_READ_URI_PERMISSION);
                            }
                        } else {
                            throw new java.lang.IllegalArgumentException("instagram share mode is empty");
                        }
                    }
                } else {
                    throw new java.lang.IllegalArgumentException("social is empty");
                }
            }
            if (TargetChosenReceiver.isSupported()) {
                IntentSender sender = TargetChosenReceiver.getSharingSenderIntent(this.reactContext);
                Intent chooser = Intent.createChooser(this.getIntent(), this.chooserTitle, sender);
                chooser.setFlags(Intent.FLAG_ACTIVITY_NO_HISTORY);
                activity.startActivityForResult(chooser, RNShareModule.SHARE_REQUEST_CODE);
            } else {
                Intent chooser = Intent.createChooser(this.getIntent(), this.chooserTitle);
                chooser.setFlags(Intent.FLAG_ACTIVITY_NO_HISTORY);
                activity.startActivityForResult(chooser, RNShareModule.SHARE_REQUEST_CODE);
                TargetChosenReceiver.sendCallback(true, true, "OK");
            }
        } else {
            this.getIntent().setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            this.reactContext.startActivity(this.getIntent());
            TargetChosenReceiver.sendCallback(true, true, this.getIntent().getPackage());
        }
    }
}
