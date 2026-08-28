package cl.json.social;

import android.app.Activity;
import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.net.Uri;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;

import cl.json.ShareFile;

/**
 * Created by Ralf Nieuwenhuizen on 10-04-17.
 */
public class InstagramShare extends SingleShareIntent {

    private static final String PACKAGE = "com.instagram.android";
    private static final String PLAY_STORE_LINK = "https://play.google.com/store/apps/details?id=com.instagram.android";

    public InstagramShare(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public void open(ReadableMap options) throws ActivityNotFoundException {
            super.open(options);
            if (isFallback) {
                super.openIntentChooser();
                return;
            }

            if (ShareIntent.hasValidKey("url", options) && options.getString("url").startsWith("instagram://")) {
                openInstagramUrlScheme(options.getString("url"));
                return;
            }

            if (!ShareIntent.hasValidKey("type", options)) {
                throw new IllegalArgumentException("No type provided");
            }
            String type = options.getString("type");

            if (type.startsWith("text")) {
               this.openInstagramIntentChooserForText(chooserTitle);
                return;
            }

            if (!ShareIntent.hasValidKey("url", options)) {
                throw new IllegalArgumentException("No url provided");
            }
            String url = options.getString("url");

            String extension = this.getExtension(type);
            Boolean isImage = type.startsWith("image");

            this.openInstagramIntentChooserForMedia(url, chooserTitle, isImage, extension);
    }

    protected void openInstagramUrlScheme(String url) {
            Uri uri = Uri.parse(url);
            this.getIntent().setAction(Intent.ACTION_VIEW);
            this.getIntent().setData(uri);
            super.openIntentChooser();
    }

    private String getExtension(String url) {
            String[] ext = url.split("/");
            return ext[ext.length -1];
    }

    protected void openInstagramIntentChooserForText(String chooserTitle) {
            this.getIntent().setPackage(PACKAGE);
            this.getIntent().setType("text/plain");
            this.getIntent().setAction(Intent.ACTION_SEND);
            super.openIntentChooser();
    }

    protected void openInstagramIntentChooserForMedia(String url, String chooserTitle, Boolean isImage, String extension) {
        Activity activity = this.reactContext.getCurrentActivity();
        if (activity == null) {
            throw new ActivityNotFoundException("No activity available to share Instagram media");
        }
        Boolean shouldUseInternalStorage = ShareIntent.hasValidKey("useInternalStorage", options) && options.getBoolean("useInternalStorage");
        ShareFile shareFile = isImage 
            ? new ShareFile(url, "image/" + extension, "image", shouldUseInternalStorage, this.reactContext) 
            : new ShareFile(url, "video/" + extension, "video", shouldUseInternalStorage, this.reactContext);
        Uri uri = fileUri != null ? fileUri : shareFile.getURI();
        if (uri == null) {
            throw new IllegalArgumentException("Unable to prepare Instagram media");
        }

        Intent feedIntent = new Intent(Intent.ACTION_SEND);

        if (isImage) {
            feedIntent.setType("image/*");
        } else {
            feedIntent.setType("video/*");
        }

        feedIntent.putExtra(Intent.EXTRA_STREAM, uri);
        feedIntent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
        feedIntent.setPackage(PACKAGE);

        Intent storiesIntent = new Intent("com.instagram.share.ADD_TO_STORY");

        storiesIntent.setDataAndType(uri, isImage ? "image/*" : "video/*");

        storiesIntent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
        storiesIntent.setPackage(PACKAGE);

        Intent chooserIntent = Intent.createChooser(feedIntent, chooserTitle);
        chooserIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        chooserIntent.putExtra(Intent.EXTRA_INITIAL_INTENTS, new Intent[] {storiesIntent});

        activity.grantUriPermission(PACKAGE, uri, Intent.FLAG_GRANT_READ_URI_PERMISSION);
        this.reactContext.startActivity(chooserIntent);

        WritableMap reply = Arguments.createMap();
        reply.putBoolean("success", true);
        reply.putString("message", this.getIntent().getPackage());
        shareRequest.callbackResolve(reply);
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
