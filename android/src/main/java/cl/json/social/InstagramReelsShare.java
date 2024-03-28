package cl.json.social;

import android.app.Activity;
import android.content.ActivityNotFoundException;
import android.content.Intent;
import java.io.File;
import android.os.Environment;
import android.net.Uri;

import cl.json.ShareFile;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableMap;

/**
 * Created by Vladimir Stalmakov on 01-06-20.
 */
public class InstagramReelsShare extends SingleShareIntent {

    private static final String PACKAGE = "com.instagram.android";
    private static final String PLAY_STORE_LINK = "https://play.google.com/store/apps/details?id=com.instagram.android";

    public InstagramReelsShare(ReactApplicationContext reactContext) {
        super(reactContext);
        this.setIntent(new Intent("com.instagram.share.ADD_TO_REEL"));
    }

    @Override
    public void open(ReadableMap options) throws ActivityNotFoundException {
        super.open(options);
        this.shareStory(options);
        //  extra params here
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
        if (!this.hasValidKey("backgroundImage", options) && !this.hasValidKey("backgroundVideo", options)
                && !this.hasValidKey("stickerImage", options)) {
            throw new IllegalArgumentException("Invalid background or sticker assets provided.");
        }

        Activity activity = this.reactContext.getCurrentActivity();

        if (activity == null) {
            TargetChosenReceiver.callbackReject("Something went wrong");
            return;
        }
        this.intent.setPackage("com.instagram.android");
        this.intent.putExtra("com.instagram.platform.extra.APPLICATION_ID", options.getString("appId"));

        Boolean hasBackgroundAsset = this.hasValidKey("backgroundImage", options)
                || this.hasValidKey("backgroundVideo", options);

        Boolean useInternalStorage = false;
        if (this.hasValidKey("useInternalStorage", options)) {
            useInternalStorage = options.getBoolean("useInternalStorage");
        }
        if (hasBackgroundAsset) {
            String backgroundFileName = "";
            String backgroundType = "image/jpeg";

            if (this.hasValidKey("backgroundImage", options)) {
                backgroundFileName = options.getString("backgroundImage");
            } else if (this.hasValidKey("backgroundVideo", options)) {
                backgroundFileName = options.getString("backgroundVideo");
                backgroundType = "video/*";
            }
            

            ShareFile backgroundAsset = new ShareFile(backgroundFileName, backgroundType, "background", useInternalStorage, this.reactContext);

            this.intent.setDataAndType(backgroundAsset.getURI(), backgroundAsset.getType());
            this.intent.putExtra(Intent.EXTRA_STREAM, backgroundAsset.getURI());

            // this.intent.setDataAndType(backgroundAsset.getURI(), backgroundAsset.getType());
            this.intent.setFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
            activity.grantUriPermission(InstagramReelsShare.PACKAGE, backgroundAsset.getURI(), Intent.FLAG_GRANT_READ_URI_PERMISSION);
        }

        if (this.hasValidKey("stickerImage", options)) {
            ShareFile stickerAsset = new ShareFile(options.getString("stickerImage"), "image/png", "sticker", useInternalStorage, this.reactContext);

            if (!hasBackgroundAsset) {
                this.intent.setType("image/*");
            }

            this.intent.putExtra("interactive_asset_uri", stickerAsset.getURI());
            activity.grantUriPermission(InstagramReelsShare.PACKAGE, stickerAsset.getURI(),
                    Intent.FLAG_GRANT_READ_URI_PERMISSION);
        }
        // Verify that the activity resolves the intent and start it
        if (activity.getPackageManager().resolveActivity(intent, 0) != null) {
            activity.startActivityForResult(intent, 0);
        }
    }
}
