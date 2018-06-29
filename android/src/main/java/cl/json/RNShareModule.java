package cl.json;

import android.content.Intent;
import android.content.ActivityNotFoundException;
import android.net.Uri;
import android.support.annotation.Nullable;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.Callback;

import java.sql.SQLOutput;
import java.util.ArrayList;
import java.util.HashMap;

import cl.json.social.EmailShare;
import cl.json.social.FacebookShare;
import cl.json.social.GenericShare;
import cl.json.social.GooglePlusShare;
import cl.json.social.ShareIntent;
import cl.json.social.TwitterShare;
import cl.json.social.WhatsAppShare;
import cl.json.social.InstagramShare;

public class RNShareModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;
    private HashMap<String, ShareIntent> sharesExtra = new HashMap<String, ShareIntent>();
    public RNShareModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
        sharesExtra.put("generic", new GenericShare(this.reactContext));
        sharesExtra.put("facebook", new FacebookShare(this.reactContext));
        sharesExtra.put("twitter", new TwitterShare(this.reactContext));
        sharesExtra.put("whatsapp",new WhatsAppShare(this.reactContext));
        sharesExtra.put("instagram",new InstagramShare(this.reactContext));
        sharesExtra.put("googleplus",new GooglePlusShare(this.reactContext));
        sharesExtra.put("email",new EmailShare(this.reactContext));
        //  add more customs single intent shares here
    }

    @Override
    public String getName() {
    return "RNShare";
    }

    @ReactMethod
    public void open(ReadableMap options, @Nullable Callback failureCallback, @Nullable Callback successCallback) {
        try{
            GenericShare share = new GenericShare(this.reactContext);
            share.open(options);
            successCallback.invoke("OK");
        }catch(ActivityNotFoundException ex) {
            System.out.println("ERROR");
            System.out.println(ex.getMessage());
            failureCallback.invoke("not_available");
        }catch (Exception e) {
            System.out.println("ERROR");
            System.out.println(e.getMessage());
            failureCallback.invoke(e.getMessage());
        }
    }
    @ReactMethod
    public void shareSingle(ReadableMap options, @Nullable Callback failureCallback, @Nullable Callback successCallback) {
        System.out.println("SHARE SINGLE METHOD");
        if (ShareIntent.hasValidKey("social", options) ) {
            try{
                this.sharesExtra.get(options.getString("social")).open(options);
                successCallback.invoke("OK");
            }catch(ActivityNotFoundException ex) {
                System.out.println("ERROR");
                System.out.println(ex.getMessage());
                failureCallback.invoke(ex.getMessage());
            }catch (Exception e) {
                System.out.println("ERROR");
                System.out.println(e.getMessage());
                failureCallback.invoke(e.getMessage());
            }
        } else {
            failureCallback.invoke("key 'social' missing in options");
        }
    }

    @ReactMethod
    public void isBase64File(String url, @Nullable Callback failureCallback, @Nullable Callback successCallback) {
        try {
            Uri uri = Uri.parse(url);
            String scheme = uri.getScheme();
            if((scheme != null) && scheme.equals("data")) {
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
