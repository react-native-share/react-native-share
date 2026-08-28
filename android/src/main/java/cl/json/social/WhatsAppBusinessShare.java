package cl.json.social;

import android.content.ActivityNotFoundException;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableMap;

/**
 * Created by vijay(vijay@gemsessence.com) on 07-June-2021.
 */
public class WhatsAppBusinessShare extends SingleShareIntent {

    private static final String PACKAGE = "com.whatsapp.w4b";
    private static final String PLAY_STORE_LINK = "market://details?id=com.whatsapp.w4b";
    
    private static final String START_CONVERSATION_CLASS = "com.whatsapp.Conversation";


    public WhatsAppBusinessShare(ReactApplicationContext reactContext) {
        super(reactContext);
    }
    @Override
    public void open(ReadableMap options) throws ActivityNotFoundException {
        super.open(options);
        
        if (ShareIntent.hasValidKey("whatsAppNumber", options)
                && !options.getString("whatsAppNumber").isEmpty()
                && PACKAGE.equals(getIntent().getPackage())) {
            openIntentChooserWithConversation(START_CONVERSATION_CLASS);
        } else {
            openIntentChooser();
        }
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
