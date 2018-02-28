package cl.json.social;

import android.content.ActivityNotFoundException;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableMap;

/**
 * Created by disenodosbbcl on 23-07-16.
 */
public class GooglePlusShare extends SingleShareIntent {

    private static final String PACKAGE = "com.google.android.apps.plus";
    private static final String PLAY_STORE_LINK = "https://plus.google.com/share?url={url}";

    public GooglePlusShare(ReactApplicationContext reactContext) {
        super(reactContext);
    }
    @Override
    public String open(ReadableMap options) throws ActivityNotFoundException {
        String shareResult = super.open(options);
        //  extra params here
        this.openIntentChooser();

        return shareResult;
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

