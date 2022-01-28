package cl.json.social;

import android.content.ActivityNotFoundException;
import android.content.ComponentName;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableMap;

/**
 * Created by disenodosbbcl on 23-07-16.
 */
public class WhatsAppShare extends SingleShareIntent {

    private static final String PACKAGE = "com.whatsapp";
    private static final String PLAY_STORE_LINK = "market://details?id=com.whatsapp";

    public WhatsAppShare(ReactApplicationContext reactContext) {
        super(reactContext);
    }
    @Override
    public void open(ReadableMap options) throws ActivityNotFoundException {
        super.open(options);
        
        if (options.hasKey("whatsAppNumber")) {
            // create an empty conversation in case it's not on contacts
            this.getIntent().setComponent(new ComponentName(PACKAGE, "com.whatsapp.Conversation")); 
            this.openIntentChooser();


            // leave room for the conversation to be created
            try {
                Thread.sleep(300);   
            } catch (InterruptedException ex) {
                ex.printStackTrace();
            }

            // share to conversation
            this.getIntent().setComponent(new ComponentName(PACKAGE, "com.whatsapp.ContactPicker")); 
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
