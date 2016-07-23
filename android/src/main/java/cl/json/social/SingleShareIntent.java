package cl.json.social;

import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.content.pm.ResolveInfo;
import android.net.Uri;

import com.facebook.react.bridge.ReactApplicationContext;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

/**
 * Created by disenodosbbcl on 23-07-16.
 */
public class SingleShareIntent {

    protected static  String DEFAULT_WEB_LINK = null;
    protected static  String PACKAGE;
    protected static  String PLAY_STORE_LINK = null;

    protected final ReactApplicationContext reactContext;
    protected String playStoreURL = null;
    protected String appStoreURL = null;

    public SingleShareIntent(ReactApplicationContext reactContext) {
        this.reactContext = reactContext;
    }

    public void open(String _url , String _message) throws ActivityNotFoundException {

        Intent intent = new Intent("android.intent.action.VIEW", Uri.parse(_url));

        if(this.isPackageInstalled(PACKAGE, intent)) {
            intent.setPackage(PACKAGE);
            intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            this.reactContext.startActivity(intent);
        } else {
            String url = "";
            if(DEFAULT_WEB_LINK != null) {
                url = DEFAULT_WEB_LINK
                        .replace("{url}",       this.urlEncode( _url ) )
                        .replace("{message}",   this.urlEncode( _message ));
            } else if(PLAY_STORE_LINK != null) {
                url = PLAY_STORE_LINK;
            } else{
                //  TODO
            }
            intent = new Intent("android.intent.action.VIEW", Uri.parse(url));
            intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            this.reactContext.startActivity(intent);
        }
    }
    protected static String urlEncode(String param) {
        try {
            return URLEncoder.encode( param , "UTF-8" );
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException("URLEncoder.encode() failed for " + param);
        }
    }
    protected boolean isPackageInstalled(String packageName, Intent shareIntent) {
        boolean foundPackage = false;
        for (ResolveInfo info : this.reactContext.getPackageManager().queryIntentActivities(shareIntent, 0)) {
            System.out.println(info.activityInfo.packageName);
            if (info.activityInfo.packageName.toLowerCase().startsWith(packageName)) {
                foundPackage = true;
            }
        }
        return foundPackage;
    }
}
