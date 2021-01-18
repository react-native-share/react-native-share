package cl.json.social;

import android.content.ActivityNotFoundException;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableMap;

/*
 *  Created by OOM on 01-18-2021
 */
public class WeChatTimelineShare extends SingleShareIntent {

    private static final String PACKAGE = "com.tencent.mm";
    private static final String CLASS = "com.tencent.mm.ui.tools.ShareToTimeLineUI";

    public WeChatTimelineShare(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    protected String getComponentClass() {
        return CLASS;
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
        return null;
    }

    @Override
    public void open(ReadableMap options) throws ActivityNotFoundException {
        super.open(options);
        //  MORE DATA
        this.openIntentChooser();
    }
}
