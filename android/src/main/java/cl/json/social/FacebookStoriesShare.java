package cl.json.social;

import android.app.Activity;
import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.os.Environment;
import android.net.Uri;
import java.io.File;

import cl.json.ShareFile;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableMap;

/**
 * Created by Kaio Duarte on 23-12-20.
 */
public class FacebookStoriesShare extends SingleShareIntent {

    private static final String PACKAGE = "com.facebook.katana";
    private static final String PLAY_STORE_LINK = "market://details?id=com.facebook.katana";

    public FacebookStoriesShare(ReactApplicationContext reactContext) {
        super(reactContext);
        this.setIntent(new Intent("com.facebook.stories.ADD_TO_STORY"));
    }

    @Override
    public void open(ReadableMap options) throws ActivityNotFoundException, IllegalArgumentException {
        super.open(options);
        this.shareStory(options);
        // extra params here
        this.openIntentChooser(options);
    }

    @Override
    protected String getPackage() {
        return PACKAGE;
    }

    @Override
    protected String getDefaultWebLink() {
        return null;
    }

    @Override
    protected String getPlayStoreLink() {
        return PLAY_STORE_LINK;
    }

    private void shareStory(ReadableMap options) {
        if (!this.hasValidKey("appId", options)) {
            throw new IllegalArgumentException("appId was not provided.");
        }

        if (!this.hasValidKey("backgroundImage", options) && !this.hasValidKey("backgroundVideo", options)
                && !this.hasValidKey("stickerImage", options)) {
            throw new IllegalArgumentException("Invalid background or sticker assets provided.");
        }

        Activity activity = this.reactContext.getCurrentActivity();

        if (activity == null) {
            TargetChosenReceiver.sendCallback(false, "Something went wrong");
            return;
        }

        this.intent.putExtra("com.facebook.platform.extra.APPLICATION_ID", options.getString("appId"));
        this.intent.putExtra("bottom_background_color", "#906df4");
        this.intent.putExtra("top_background_color", "#837DF4");

        if (this.hasValidKey("attributionURL", options)) {
            this.intent.putExtra("content_url", options.getString("attributionURL"));
        }

        if (this.hasValidKey("backgroundTopColor", options)) {
            this.intent.putExtra("top_background_color", options.getString("backgroundTopColor"));
        }

        if (this.hasValidKey("backgroundBottomColor", options)) {
            this.intent.putExtra("bottom_background_color", options.getString("backgroundBottomColor"));
        }

        Boolean useInternalStorage = false;
        if (this.hasValidKey("useInternalStorage", options)) {
            useInternalStorage = options.getBoolean("useInternalStorage");
        }

        Boolean hasBackgroundAsset = this.hasValidKey("backgroundImage", options)
                || this.hasValidKey("backgroundVideo", options);

        if (hasBackgroundAsset) {
            String backgroundFileName = "";

            if (this.hasValidKey("backgroundImage", options)) {
                backgroundFileName = options.getString("backgroundImage");
            } else if (this.hasValidKey("backgroundVideo", options)) {
                backgroundFileName = options.getString("backgroundVideo");
            }

            ShareFile backgroundAsset = new ShareFile(backgroundFileName, "background", useInternalStorage, this.reactContext);

            this.intent.setDataAndType(backgroundAsset.getURI(), backgroundAsset.getType());
            this.intent.setFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
        }

        if (this.hasValidKey("stickerImage", options)) {
            ShareFile stickerAsset = new ShareFile(options.getString("stickerImage"), "sticker", useInternalStorage, this.reactContext);

            if (!hasBackgroundAsset) {
                this.intent.setType("image/*");
            }

            this.intent.putExtra("interactive_asset_uri", stickerAsset.getURI());
            activity.grantUriPermission("com.facebook.katana", stickerAsset.getURI(),
                    Intent.FLAG_GRANT_READ_URI_PERMISSION);
        }
    }
}
