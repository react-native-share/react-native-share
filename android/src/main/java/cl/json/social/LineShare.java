package cl.json.social;

import android.content.ActivityNotFoundException;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableMap;

public class LineShare extends SingleShareIntent {

    private static final String PACKAGE = "jp.naver.line.android";
    private static final String DEFAULT_WEB_LINK = "https://line.me/R/msg/text/?{message}";
    private static final String PLAY_STORE_LINK = "market://details?id=jp.naver.line.android";

    public LineShare(ReactApplicationContext reactContext) {
        super(reactContext);
    }
    @Override
    public void open(ReadableMap options) throws ActivityNotFoundException {
        super.open(options);
        //  extra params here
        this.openIntentChooser();
    }
    @Override
    protected String getPackage() {
        return PACKAGE;
    }

    @Override
    protected String getDefaultWebLink() {
        return DEFAULT_WEB_LINK;
    }

    @Override
    protected String getPlayStoreLink() {
        return PLAY_STORE_LINK;
    }
}
