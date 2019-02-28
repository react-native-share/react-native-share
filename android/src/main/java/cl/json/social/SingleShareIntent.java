package cl.json.social;

import android.content.ActivityNotFoundException;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.content.pm.ResolveInfo;
import android.net.Uri;
import android.provider.Telephony;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableMap;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

import cl.json.ShareFile;

/**
 * Created by disenodosbbcl on 23-07-16.
 */
public abstract class SingleShareIntent extends ShareIntent {

    protected String playStoreURL = null;
    protected String appStoreURL = null;
    protected String defaultApplication = "DEFAULT";

    public SingleShareIntent(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    public void open(ReadableMap options) throws ActivityNotFoundException {
        System.out.println(getPackage());
        //  check if package is installed
        if(getPackage() != null || getDefaultWebLink() != null || getPlayStoreLink() != null) {

            String packageName = getPackage();

            if(packageName == defaultApplication) {
                packageName = Telephony.Sms.getDefaultSmsPackage(reactContext);
            }

            if(this.isPackageInstalled(packageName, reactContext)) {
                System.out.println("INSTALLED");
                this.getIntent().setPackage(packageName);
                super.open(options);
            } else {
                System.out.println("NOT INSTALLED");
                String url = "";
                if(getDefaultWebLink() != null) {
                    url = getDefaultWebLink()
                            .replace("{url}",       this.urlEncode( options.getString("url") ) )
                            .replace("{message}",   this.urlEncode( options.getString("message") ));
                } else if(getPlayStoreLink() != null) {
                    url = getPlayStoreLink();
                } else {
                    //  TODO
                }
                //  open web intent
                this.setIntent(new Intent(new Intent("android.intent.action.VIEW", Uri.parse(url))));
            }
        }
        //  configure default
        super.open(options);
    }
    protected void openIntentChooser() throws ActivityNotFoundException {
        if(this.options.hasKey("forceDialog") && this.options.getBoolean("forceDialog")){
             Intent chooser = Intent.createChooser(this.getIntent(), this.chooserTitle);
             chooser.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
             this.reactContext.startActivity(chooser);
        }else{
             this.getIntent().setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
             this.reactContext.startActivity(this.getIntent());
        }
    }
}
