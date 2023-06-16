package cl.json;

import android.app.Activity;
import android.content.Intent;
import android.content.ActivityNotFoundException;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import android.net.Uri;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.Callback;

import cl.json.social.EmailShare;
import cl.json.social.FacebookShare;
import cl.json.social.FacebookStoriesShare;
import cl.json.social.FacebookPagesManagerShare;
import cl.json.social.GenericShare;
import cl.json.social.GooglePlusShare;
import cl.json.social.ShareIntent;
import cl.json.social.TargetChosenReceiver;
import cl.json.social.TelegramShare;
import cl.json.social.TwitterShare;
import cl.json.social.WhatsAppShare;
import cl.json.social.WhatsAppBusinessShare;
import cl.json.social.InstagramShare;
import cl.json.social.InstagramStoriesShare;
import cl.json.social.PinterestShare;
import cl.json.social.SnapChatShare;
import cl.json.social.SMSShare;
import cl.json.social.MessengerShare;
import cl.json.social.LinkedinShare;
import cl.json.social.ViberShare;

import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

import android.util.Log;

public class RNShareImpl implements ActivityEventListener {

    public static final String NAME = "RNShare";

    static ReactApplicationContext RCTContext = null;

    public static final int SHARE_REQUEST_CODE = 16845;

    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (requestCode == SHARE_REQUEST_CODE) {
            if (resultCode == Activity.RESULT_CANCELED) {
                TargetChosenReceiver.sendCallback(true, false, "CANCELED");
            } else if (resultCode == Activity.RESULT_OK) {
                TargetChosenReceiver.sendCallback(true, true);
            }
        }
    }

    public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
        onActivityResult(requestCode, resultCode, data);
    }

    @Override
    public void onNewIntent(Intent intent) { }

    private enum SHARES {
        facebook,
        facebookstories,
        generic,
        pagesmanager,
        twitter,
        whatsapp,
        whatsappbusiness,
        instagram,
        instagramstories,
        googleplus,
        email,
        pinterest,
        messenger,
        snapchat,
        sms,
        linkedin,
        telegram,
        viber;


        public static ShareIntent getShareClass(String social, ReactApplicationContext reactContext) {
            SHARES share = valueOf(social);
            switch (share) {
                case generic:
                    return new GenericShare(reactContext);
                case facebook:
                    return new FacebookShare(reactContext);
                case facebookstories:
                    return new FacebookStoriesShare(reactContext);
                case pagesmanager:
                    return new FacebookPagesManagerShare(reactContext);
                case twitter:
                    return new TwitterShare(reactContext);
                case whatsapp:
                    return new WhatsAppShare(reactContext);
                case whatsappbusiness:
                    return new WhatsAppBusinessShare(reactContext);
                case instagram:
                    return new InstagramShare(reactContext);
                case instagramstories:
                    return new InstagramStoriesShare(reactContext);
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
                case linkedin:
                    return new LinkedinShare(reactContext);
                case telegram:
                    return new TelegramShare(reactContext);
                case viber:
                    return new ViberShare(reactContext);
                default:
                    return null;
            }
        }
    };

    public RNShareImpl(ReactApplicationContext reactContext) {
        RCTContext = reactContext;
        RCTContext.addActivityEventListener(this);
    }

    public Map<String, Object> getConstants() {
        Map<String, Object> constants = new HashMap<>();
        for (SHARES val : SHARES.values()) {
            constants.put(val.toString().toUpperCase(Locale.ROOT), val.toString());
        }
        return constants;
    }

    public void open(ReadableMap options, @Nullable Callback failureCallback, @Nullable Callback successCallback) {
        TargetChosenReceiver.registerCallbacks(successCallback, failureCallback);
        try {
            GenericShare share = new GenericShare(RCTContext);
            share.open(options);
        } catch (ActivityNotFoundException ex) {
            Log.e(NAME,ex.getMessage());
            ex.printStackTrace(System.out);
            TargetChosenReceiver.sendCallback(false, "not_available");
        } catch (Exception e) {
            Log.e(NAME,e.getMessage());
            e.printStackTrace(System.out);
            TargetChosenReceiver.sendCallback(false, e.getMessage());
        }
    }

    public void shareSingle(ReadableMap options, @Nullable Callback failureCallback, @Nullable Callback successCallback) {
        // System.out.println("SHARE SINGLE METHOD");
        TargetChosenReceiver.registerCallbacks(successCallback, failureCallback);
        if (ShareIntent.hasValidKey("social", options)) {
            try {
                ShareIntent shareClass = SHARES.getShareClass(options.getString("social"), RCTContext);
                if (shareClass != null && shareClass instanceof ShareIntent) {
                    shareClass.open(options);
                } else {
                    throw new ActivityNotFoundException("Invalid share activity");
                }
            } catch (ActivityNotFoundException ex) {
                Log.e(NAME,ex.getMessage());
                ex.printStackTrace(System.out);
                TargetChosenReceiver.sendCallback(false, ex.getMessage());
            } catch (Exception e) {
                Log.e(NAME,e.getMessage());
                e.printStackTrace(System.out);
                TargetChosenReceiver.sendCallback(false, e.getMessage());
            }
        } else {
            TargetChosenReceiver.sendCallback(false, "key 'social' missing in options");
        }
    }

    public void isPackageInstalled(String packagename, @Nullable Callback failureCallback, @Nullable Callback successCallback) {
        try {
            boolean res = ShareIntent.isPackageInstalled(packagename, RCTContext);
            successCallback.invoke(res);
        } catch (Exception e) {
            Log.e(NAME,e.getMessage());
            failureCallback.invoke(e.getMessage());
        }
    }

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
            Log.e(NAME,e.getMessage());
            e.printStackTrace(System.out);
            failureCallback.invoke(e.getMessage());
        }
    }
}
