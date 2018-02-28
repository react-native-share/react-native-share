package cl.json.social;

import android.content.ActivityNotFoundException;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableMap;

/**
 * Created by disenodosbbcl on 23-07-16.
 */
public class FacebookShare extends SingleShareIntent {

    private static final String PACKAGE = "com.facebook.katana";
    private static final String DEFAULT_WEB_LINK = "https://www.facebook.com/sharer/sharer.php?u={url}";

    public FacebookShare(ReactApplicationContext reactContext) {
        super(reactContext);

    }
    @Override
    public String open(ReadableMap options) throws ActivityNotFoundException {
        String shareResult = super.open(options);
        //  MORE DATA
        this.openIntentChooser();

        return shareResult;
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
        return null;
    }
}
