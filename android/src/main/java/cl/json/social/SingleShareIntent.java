package cl.json.social;

import android.app.Activity;
import android.content.ActivityNotFoundException;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.IntentSender;
import android.net.Uri;
import android.os.Handler;
import android.os.Looper;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;


/**
 * Created by disenodosbbcl on 23-07-16.
 */
public abstract class SingleShareIntent extends ShareIntent {

    protected String playStoreURL = null;
    protected String appStoreURL = null;
    protected boolean isFallback;

    public SingleShareIntent(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    public void open(ReadableMap options) throws ActivityNotFoundException {
        isFallback = false;
        //  check if package is installed
        if (getPackage() != null || getDefaultWebLink() != null || getPlayStoreLink() != null) {
            if (this.isPackageInstalled(getPackage(), reactContext)) {
                if (getComponentClass() != null) {
                    ComponentName cn = new ComponentName(getPackage(), getComponentClass());
                    this.getIntent().setComponent(cn);
                } else {
                    this.getIntent().setPackage(getPackage());
                }
                super.open(options);
                return; // once we open we don't need to continue
            } else {
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
                this.setIntent(new Intent(Intent.ACTION_VIEW, Uri.parse(url)));
                this.options = options;
                if (ShareIntent.hasValidKey("title", options)) chooserTitle = options.getString("title");
                isFallback = true;
                return;
            }
        }
        //  configure default
        super.open(options);
    }

    protected void openIntentChooser() throws ActivityNotFoundException {
        this.openIntentChooser(null);
    }

    protected void openIntentChooserWithConversation(String conversationClass) {
        Handler handler = new Handler(Looper.getMainLooper());
        handler.post(() -> {
            if (!shareRequest.isActive()) return;
            Intent conversation = new Intent(getIntent());
            conversation.setComponent(new ComponentName(getPackage(), conversationClass));
            conversation.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            try {
                // Create the recipient's conversation without completing the actual share.
                reactContext.startActivity(conversation);
            } catch (ActivityNotFoundException | SecurityException ignored) {
                // The normal share may still work if this optional activity is unavailable.
            }
            // Preserve the short foreground window without blocking the native module thread.
            handler.postDelayed(() -> {
                if (!shareRequest.isActive()) return;
                try {
                    openIntentChooser();
                } catch (RuntimeException error) {
                    shareRequest.callbackReject(error.getMessage());
                }
            }, 10);
        });
    }

    protected void openIntentChooser(ReadableMap options) throws ActivityNotFoundException {
        if (ShareIntent.hasValidKey("forceDialog", this.options) && this.options.getBoolean("forceDialog")) {
            Activity activity = this.reactContext.getCurrentActivity();
            if (activity == null) {
                shareRequest.callbackReject("Something went wrong");
                return;
            }
            if (options != null) {
                if (!ShareIntent.hasValidKey("social", options)) {
                    throw new IllegalArgumentException("social is empty");
                }
            }
            if (TargetChosenReceiver.isSupported()) {
                IntentSender sender = shareRequest.getSharingSenderIntent();
                Intent chooser = Intent.createChooser(this.getIntent(), this.chooserTitle, sender);
                chooser.addFlags(Intent.FLAG_ACTIVITY_NO_HISTORY);
                activity.startActivityForResult(chooser, shareRequest.getRequestCode());
            } else {
                Intent chooser = Intent.createChooser(this.getIntent(), this.chooserTitle);
                chooser.addFlags(Intent.FLAG_ACTIVITY_NO_HISTORY);
                activity.startActivityForResult(chooser, shareRequest.getRequestCode());

                WritableMap reply = Arguments.createMap();
                reply.putBoolean("success", true);
                reply.putString("message", "OK");
                shareRequest.callbackResolve(reply);
            }
        } else {
            this.getIntent().addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            this.reactContext.startActivity(this.getIntent());
            WritableMap reply = Arguments.createMap();
            reply.putBoolean("success", true);
            reply.putString("message", this.getIntent().getPackage());
            shareRequest.callbackResolve(reply);
        }
    }
}
