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
    private static final String SHARE_TO_CONVERSATION_CLASS = "com.whatsapp.ContactPicker";
    
    private static final int START_ACTIVITY_TIME_GAP_MS = 300;

    public WhatsAppBusinessShare(ReactApplicationContext reactContext) {
        super(reactContext);
    }
    @Override
    public void open(ReadableMap options) throws ActivityNotFoundException {
        super.open(options);
        
        if (options.hasKey("whatsAppNumber")) {
            // create an empty conversation in case it's not on contacts
            this.getIntent().setComponent(new ComponentName(PACKAGE, START_CONVERSATION_CLASS)); 
            this.openIntentChooser();


            // leave room for the conversation to be created
            try {
                Thread.sleep(START_ACTIVITY_TIME_GAP_MS);   
            } catch (InterruptedException ex) {
                ex.printStackTrace();
            }

            // share to conversation
            this.getIntent().setComponent(new ComponentName(PACKAGE, SHARE_TO_CONVERSATION_CLASS)); 
        }

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
