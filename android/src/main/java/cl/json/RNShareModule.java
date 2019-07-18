package cl.json;

import android.app.Activity;
import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.net.Uri;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.Callback;

import java.util.HashMap;
import java.util.Map;

import cl.json.social.EmailShare;
import cl.json.social.FacebookShare;
import cl.json.social.FacebookPagesManagerShare;
import cl.json.social.GenericShare;
import cl.json.social.GooglePlusShare;
import cl.json.social.ShareIntent;
import cl.json.social.TargetChosenReceiver;
import cl.json.social.TwitterShare;
import cl.json.social.WhatsAppShare;
import cl.json.social.InstagramShare;
import cl.json.social.PinterestShare;
import cl.json.social.SnapChatShare;
import cl.json.social.SMSShare;
import cl.json.social.MessengerShare;

public class RNShareModule extends ReactContextBaseJavaModule implements ActivityEventListener {

    public static final int SHARE_REQUEST_CODE = 16845;
    private final ReactApplicationContext reactContext;

    // removed @Override temporarily just to get it working on different versions of RN
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (requestCode == SHARE_REQUEST_CODE && resultCode == Activity.RESULT_CANCELED) {
            TargetChosenReceiver.sendCallback(true, false, "CANCELED");
        }
    }

    // removed @Override temporarily just to get it working on different versions of RN
    public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
        onActivityResult(requestCode, resultCode, data);
    }

    @Override
    public void onNewIntent(Intent intent) {

    }

    private enum SHARES {
        facebook,
        generic,
        pagesmanager,
        twitter,
        whatsapp,
        instagram,
        googleplus,
        email,
        pinterest,
        messenger,
        snapchat,
        sms;


        public static ShareIntent getShareClass(String social, ReactApplicationContext reactContext) {
            SHARES share = valueOf(social);
            switch (share) {
                case generic:
                    return new GenericShare(reactContext);
                case facebook:
                    return new FacebookShare(reactContext);
                case pagesmanager:
                    return new FacebookPagesManagerShare(reactContext);
                case twitter:
                    return new TwitterShare(reactContext);
                case whatsapp:
                    return new WhatsAppShare(reactContext);
                case instagram:
                    return new InstagramShare(reactContext);
                case googleplus:
                    return new GooglePlusShare(reactContext);
                case email:
                    return new EmailShare(reactContext);
                case pinterest:
                    return new PinterestShare(reactContext);
                case sms:
                    return new SMSShare(reactContext);
                case snapchat:
                    return new SnapChatShare(reactContext);
                case messenger:
                    return new MessengerShare(reactContext);
                default:
                    return null;
            }
        }
    };

    public RNShareModule(ReactApplicationContext reactContext) {
        super(reactContext);
        reactContext.addActivityEventListener(this);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "RNShare";
    }

    @javax.annotation.Nullable
    @Override
    public Map<String, Object> getConstants() {
        Map<String, Object> constants = new HashMap<>();
        for (SHARES val : SHARES.values()) {
            constants.put(val.toString().toUpperCase(), val.toString());
        }
        return constants;
    }

    @ReactMethod
    public void open(ReadableMap options, @Nullable Callback failureCallback, @Nullable Callback successCallback) {
        TargetChosenReceiver.registerCallbacks(successCallback, failureCallback);
        try {
            GenericShare share = new GenericShare(this.reactContext);
            share.open(options);
        } catch (ActivityNotFoundException ex) {
            System.out.println("ERROR");
            System.out.println(ex.getMessage());
            TargetChosenReceiver.sendCallback(false, "not_available");
        } catch (Exception e) {
            System.out.println("ERROR");
            System.out.println(e.getMessage());
            TargetChosenReceiver.sendCallback(false, e.getMessage());
        }
    }

    @ReactMethod
    public void shareSingle(ReadableMap options, @Nullable Callback failureCallback, @Nullable Callback successCallback) {
        System.out.println("SHARE SINGLE METHOD");
        TargetChosenReceiver.registerCallbacks(successCallback, failureCallback);
        if (ShareIntent.hasValidKey("social", options)) {
            try {
                ShareIntent shareClass = SHARES.getShareClass(options.getString("social"), this.reactContext);
                if (shareClass != null && shareClass instanceof ShareIntent) {
                    shareClass.open(options);
                } else {
                    throw new ActivityNotFoundException("Invalid share activity");
                }
            } catch (ActivityNotFoundException ex) {
                System.out.println("ERROR");
                System.out.println(ex.getMessage());
                TargetChosenReceiver.sendCallback(false, ex.getMessage());
            } catch (Exception e) {
                System.out.println("ERROR");
                System.out.println(e.getMessage());
                TargetChosenReceiver.sendCallback(false, e.getMessage());
            }
        } else {
            TargetChosenReceiver.sendCallback(false, "key 'social' missing in options");
        }
    }

    @ReactMethod
    public void isPackageInstalled(String packagename, @Nullable Callback failureCallback, @Nullable Callback successCallback) {
        try {
            boolean res = ShareIntent.isPackageInstalled(packagename, this.reactContext);
            successCallback.invoke(res);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
            failureCallback.invoke(e.getMessage());
        }
    }

    @ReactMethod
    public void isBase64File(String url, @Nullable Callback failureCallback, @Nullable Callback successCallback) {
        try {
            Uri uri = Uri.parse(url);
            String scheme = uri.getScheme();
            if ((scheme != null) && scheme.equals("data")) {
                successCallback.invoke(true);
            } else {
                successCallback.invoke(false);
            }
        } catch (Exception e) {
            System.out.println("ERROR");
            System.out.println(e.getMessage());
            failureCallback.invoke(e.getMessage());
        }
    }
}
