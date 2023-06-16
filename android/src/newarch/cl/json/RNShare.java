package cl.json;

import android.os.Build;

import androidx.annotation.Nullable;
import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.Callback;

import java.util.Map;

import cl.json.NativeRNShareSpec;

public class RNShare extends NativeRNShareSpec {

    private final RNShareImpl delegate;

    public RNShare(ReactApplicationContext reactContext) {
        super(reactContext);
        delegate = new RNShareImpl(reactContext);
    }

    @NonNull
    @Override
    public String getName() {
        return RNShareImpl.NAME;
    }
    
    @Override
    public Map<String, Object> getConstants() {
        return delegate.getConstants();
    }
    
    @Override
    public void open(ReadableMap options, @Nullable Callback failureCallback, @Nullable Callback successCallback) {
        delegate.open(options,failureCallback,successCallback);
    }

    @Override
    public void shareSingle(ReadableMap options, @Nullable Callback failureCallback, @Nullable Callback successCallback) {
        delegate.shareSingle(options,failureCallback,successCallback);
    }

    @Override
    public void isPackageInstalled(String packagename, @Nullable Callback failureCallback, @Nullable Callback successCallback) {
        delegate.isPackageInstalled(packagename,failureCallback,successCallback);
    }

    @Override
    public void isBase64File(String url, @Nullable Callback failureCallback, @Nullable Callback successCallback) {
        delegate.isBase64File(url,failureCallback,successCallback);
    }
}