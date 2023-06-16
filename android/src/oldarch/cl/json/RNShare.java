package cl.json;

import androidx.annotation.Nullable;

import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.Callback;

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
    public void open(ReadableMap options, @Nullable Callback failureCallback, @Nullable Callback successCallback) {
        delegate.open(options,failureCallback,successCallback);
    }

    @ReactMethod
    public void shareSingle(ReadableMap options, @Nullable Callback failureCallback, @Nullable Callback successCallback) {
        delegate.shareSingle(options,failureCallback,successCallback);
    }

    @ReactMethod
    public void isPackageInstalled(String packagename, @Nullable Callback failureCallback, @Nullable Callback successCallback) {
        delegate.isPackageInstalled(packagename,failureCallback,successCallback);
    }

    @ReactMethod
    public void isBase64File(String url, @Nullable Callback failureCallback, @Nullable Callback successCallback) {
        delegate.isBase64File(url,failureCallback,successCallback);
    }
}
