package cl.json.social;

import com.facebook.react.bridge.ReactApplicationContext;

/**
 * Created by disenodosbbcl on 23-07-16.
 */
public class TwitterShare extends SingleShareIntent {

    protected static  String PACKAGE = "com.twitter";
    protected static  String DEFAULT_WEB_LINK = "https://twitter.com/intent/tweet?text={message}&url={url}";

    public TwitterShare(ReactApplicationContext reactContext) {
        super(reactContext);
    }
}
