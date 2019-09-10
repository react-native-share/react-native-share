package cl.json.social;

import android.app.Activity;
import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.support.v4.content.FileProvider;
import android.net.Uri;

import java.io.File;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableMap;

import cl.json.ShareFile;

public class InstagramStoriesShare extends SingleShareIntent {

    private static final String PACKAGE = "com.instagram.android";
    private static final String PLAY_STORE_LINK = "market://details?id=com.instagram.android";

    public InstagramStoriesShare(ReactApplicationContext reactContext) {
        super(reactContext);
        this.setIntent(new Intent("com.instagram.share.ADD_TO_STORY"));
    }

    @Override
    public void open(ReadableMap options) throws ActivityNotFoundException {
        super.open(options);

        if (!options.hasKey("stickerImage") && !options.hasKey("backgroundVideo")) {
            throw new Error('stickerImage or backgroundVideo required.');
        }

        String attributionURL = "";
        if (ShareIntent.hasValidKey("attributionURL", options)) {
            attributionURL = options.getString("attributionURL");
        }

        if (options.hasKey("backgroundVideo") {
            ShareFile backgroundVideoFile = new ShareFile(options.getString("backgroundVideo"), "video/mp4", this.reactContext);
            Uri backgroundVideoUri = backgroundVideoFile.getURI();
            this.getIntent().setDataAndType(backgroundVideoUri, "video/mp4");
        }

        if (options.hasKey("stickerImage") {
            ShareFile stickerImageFile = new ShareFile(options.getString("stickerImage"), "image/png", this.reactContext);
            Uri stickerImageUri = stickerImageFile.getURI();
            this.getIntent().putExtra("interactive_asset_uri", stickerImageUri);
        }

        this.getIntent().setFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
        this.getIntent().putExtra("content_url", attributionURL);

        Activity activity = this.reactContext.getCurrentActivity();
        activity.grantUriPermission(getPackage(), stickerImageUri, Intent.FLAG_GRANT_READ_URI_PERMISSION);
        if (activity.getPackageManager().resolveActivity(this.getIntent(), 0) != null) {
            activity.startActivityForResult(this.getIntent(), 0);
            TargetChosenReceiver.sendCallback(true, true, this.getIntent().getPackage());
        }
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
}
