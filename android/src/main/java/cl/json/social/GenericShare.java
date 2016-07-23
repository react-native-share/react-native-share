package cl.json.social;

import android.content.ActivityNotFoundException;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableMap;

/**
 * Created by disenodosbbcl on 23-07-16.
 */
public class GenericShare extends ShareIntent {
    public GenericShare(ReactApplicationContext reactContext) {
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
        return null;
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
