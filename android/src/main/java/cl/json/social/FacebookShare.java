package cl.json.social;

import com.facebook.react.bridge.ReactApplicationContext;

/**
 * Created by disenodosbbcl on 23-07-16.
 */
public class FacebookShare extends SingleShareIntent {

    protected static  String PACKAGE = "com.facebook.katana";
    protected static  String DEFAULT_WEB_LINK = "https://www.facebook.com/sharer/sharer.php?u={url}";

    public FacebookShare(ReactApplicationContext reactContext) {
        super(reactContext);
    }
}
