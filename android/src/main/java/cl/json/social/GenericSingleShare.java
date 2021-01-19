package cl.json.social;

import android.content.ActivityNotFoundException;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableMap;

/*
 *  Created by OOM on 01-19-2021
 */
public class GenericSingleShare extends SingleShareIntent{
    private String packageName = null;
    private String componentClass = null;
    private String defaultWebLink = null;

    public GenericSingleShare(ReactApplicationContext reactContext, ReadableMap options) {
        super(reactContext);
        if (ShareIntent.hasValidKey("packageName", options)) packageName = options.getString("packageName");
        if (ShareIntent.hasValidKey("componentClass", options)) componentClass = options.getString("componentClass");
        if (ShareIntent.hasValidKey("defaultWebLink", options)) defaultWebLink = options.getString("defaultWebLink");
        if (ShareIntent.hasValidKey("playStoreURL", options)) playStoreURL = options.getString("playStoreURL");
    }

    @Override
    protected String getPackage() {
        return packageName;
    }

    @Override
    protected String getComponentClass() {
        return componentClass;
    }

    @Override
    protected String getDefaultWebLink() {
        return defaultWebLink;
    }

    @Override
    protected String getPlayStoreLink() {
        return playStoreURL;
    }

    @Override
    public void open(ReadableMap options) throws ActivityNotFoundException {
        super.open(options);
        //  MORE DATA
        this.openIntentChooser();
    }
}
