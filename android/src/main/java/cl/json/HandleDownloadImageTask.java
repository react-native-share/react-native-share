package cl.json;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReadableMap;


/**
 * Created by Mani on 3/21/2016.
 */
public interface HandleDownloadImageTask {
    void downloaded(android.net.Uri uri,ReadableMap options, Callback callback);
}