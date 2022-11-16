package cl.json.social;

import android.content.ActivityNotFoundException;
import android.content.ComponentName;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableMap;

/**
 * Created by vijay(vijay@gemsessence.com) on 07-June-2021.
 */
public class WhatsAppBusinessShare extends SingleShareIntent {

    private static final String PACKAGE = "com.whatsapp.w4b";
    private static final String PLAY_STORE_LINK = "market://details?id=com.whatsapp.w4b";
    
    private static final String START_CONVERSATION_CLASS = "com.whatsapp.Conversation";

    // must be small enough so that both activities are triggered while the app is still on foreground
    private static final int START_ACTIVITY_TIME_GAP_MS = 10; 

    public WhatsAppBusinessShare(ReactApplicationContext reactContext) {
        super(reactContext);
    }
    @Override
    public void open(ReadableMap options) throws ActivityNotFoundException {
        super.open(options);
        
        if (options.hasKey("whatsAppNumber")) {
            try {                
                // create an empty conversation in case it's not on contacts
                this.getIntent().setComponent(new ComponentName(PACKAGE, START_CONVERSATION_CLASS)); 
                this.openIntentChooser();

                // leave room for the conversation to be created
                Thread.sleep(START_ACTIVITY_TIME_GAP_MS);   

            } catch (Exception ex) {
                ex.printStackTrace();
            }
        }

        // restore default behavior to share to conversation
        this.getIntent().setComponent(null); 

        //  extra params here
        this.openIntentChooser();
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
