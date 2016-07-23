package cl.json.social;

import com.facebook.react.bridge.ReactApplicationContext;

/**
 * Created by disenodosbbcl on 23-07-16.
 */
public class WhatsAppShare extends SingleShareIntent {

    protected static  String PACKAGE = "com.whatsapp";
    protected static  String PLAY_STORE_LINK = "market://details?id=com.whatsapp";

    public WhatsAppShare(ReactApplicationContext reactContext) {
        super(reactContext);
    }
}
