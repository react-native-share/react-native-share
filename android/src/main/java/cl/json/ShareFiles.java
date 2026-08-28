package cl.json;

import android.net.Uri;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableArray;

import java.util.ArrayList;

/**
 * Created by bhavesh on 11/08/17.
 */
public class ShareFiles {
    private final ArrayList<ShareFile> files = new ArrayList<>();
    private String intentType;

    public ShareFiles(ReadableArray urls, ArrayList<String> filenames, String type, Boolean useInternalStorage, ReactApplicationContext reactContext) {
        for (int i = 0; i < urls.size(); i++) {
            String url = urls.getString(i);
            if (url != null) {
                String filename = i < filenames.size() ? filenames.get(i) : null;
                files.add(new ShareFile(url, type, filename, useInternalStorage, reactContext, true));
            }
        }
        this.intentType = type;
    }

    public ShareFiles(ReadableArray urls, ArrayList<String> filenames, Boolean useInternalStorage, ReactApplicationContext reactContext) {
        this(urls, filenames, null, useInternalStorage, reactContext);
    }

    public boolean isFile() {
        if (files.isEmpty()) return false;

        for (ShareFile file : files) {
            if (!file.isFile()) return false;

            String type = file.getType();
            if (intentType == null) {
                intentType = type;
            } else if (!intentType.equalsIgnoreCase(type)) {
                int separator = intentType.indexOf('/');
                int typeSeparator = type.indexOf('/');
                if (separator > 0 && typeSeparator > 0 && intentType.substring(0, separator).equalsIgnoreCase(type.substring(0, typeSeparator))) {
                    intentType = intentType.substring(0, separator) + "/*";
                } else {
                    intentType = "*/*";
                }
            }
        }
        return true;
    }

    public String getType() {
        return intentType == null ? "*/*" : intentType;
    }

    public ArrayList<Uri> getURI() {
        ArrayList<Uri> uris = new ArrayList<>(files.size());
        for (ShareFile file : files) {
            Uri uri = file.getURI();
            if (uri == null) {
                throw new IllegalStateException("Unable to prepare a shared file URI");
            }
            uris.add(uri);
        }
        return uris;
    }
}
