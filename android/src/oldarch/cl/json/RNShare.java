package cl.json;

import androidx.annotation.Nullable;

import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.Promise;

import java.util.Map;

public class RNShare extends ReactContextBaseJavaModule {

    private final RNShareImpl delegate;

    public RNShare(ReactApplicationContext reactContext) {
        super(reactContext);
        delegate = new RNShareImpl(reactContext);
    }

    @Override
    public String getName() {
        return RNShareImpl.NAME;
    }

    @javax.annotation.Nullable
    @Override
    public Map<String, Object> getConstants() {
        return delegate.getConstants();
    }

    @ReactMethod
    public void open(ReadableMap options, Promise promise) {
        delegate.open(options,promise);
    }

    @ReactMethod
    public void shareSingle(ReadableMap options, Promise promise) {
        delegate.shareSingle(options,promise);
    }

    @ReactMethod
    public void isPackageInstalled(String packagename, Promise promise) {
        delegate.isPackageInstalled(packagename,promise);
    }

    @ReactMethod
    public void isBase64File(String url, Promise promise) {
        delegate.isBase64File(url,promise);
    }
}
