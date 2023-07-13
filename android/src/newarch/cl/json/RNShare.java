package cl.json;

import android.os.Build;

import androidx.annotation.Nullable;
import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.Promise;

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
    public Map<String, Object> getTypedExportedConstants() {
        return delegate.getConstants();
    }
    
    @Override
    public void open(ReadableMap options, Promise promise) {
        delegate.open(options,promise);
    }

    @Override
    public void shareSingle(ReadableMap options, Promise promise) {
        delegate.shareSingle(options,promise);
    }

    @Override
    public void isPackageInstalled(String packagename, Promise promise) {
        delegate.isPackageInstalled(packagename,promise);
    }

    @Override
    public void isBase64File(String url, Promise promise) {
        delegate.isBase64File(url,promise);
    }
}