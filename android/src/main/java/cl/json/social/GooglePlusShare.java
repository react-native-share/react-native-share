package cl.json.social;

import com.facebook.react.bridge.ReactApplicationContext;

/**
 * Created by disenodosbbcl on 23-07-16.
 */
public class GooglePlusShare extends SingleShareIntent {

    protected static  String PACKAGE = "com.google.android.apps.plus";
    protected static  String PLAY_STORE_LINK = "https://plus.google.com/share?url={url}";

    public GooglePlusShare(ReactApplicationContext reactContext) {
        super(reactContext);
    }
}

