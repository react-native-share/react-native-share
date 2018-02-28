package cl.json.social;

import android.content.ActivityNotFoundException;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableMap;

/**
 * Created by disenodosbbcl on 23-07-16.
 */
public class EmailShare extends SingleShareIntent {

    private static final String PACKAGE = "com.google.android.gm";

    public EmailShare(ReactApplicationContext reactContext) {
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
        return null;
    }
}

