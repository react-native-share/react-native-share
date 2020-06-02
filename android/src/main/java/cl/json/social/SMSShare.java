package cl.json.social;

import android.content.ActivityNotFoundException;
import android.content.Intent;
import java.io.File;
import android.os.Environment;
import android.net.Uri;
import android.provider.Telephony;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableMap;

/**
 * Created by Muhzi4u on 14-01-19.
 */
public class SMSShare extends SingleShareIntent {

    private static final String PACKAGE = "com.android.mms";
    private static final String PLAY_STORE_LINK = "market://details?id=com.android.mms";

    private ReactApplicationContext reactContext = null;
    
    public SMSShare(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public void open(ReadableMap options) throws ActivityNotFoundException {
        super.open(options);
        //  extra params here
        this.openIntentChooser();
    }

    @Override
    protected String getPackage() {
        if (android.os.Build.VERSION.SDK_INT >= 19 ) {
            return Telephony.Sms.getDefaultSmsPackage(this.reactContext);
        }
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
