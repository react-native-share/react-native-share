package cl.json;

import android.net.Uri;
import android.os.Environment;
import android.util.Base64;
import android.webkit.MimeTypeMap;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableArray;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;

/**
 * Created by bhavesh on 11/08/17.
 */

public class ShareFiles
{
    private final ReactApplicationContext reactContext;
    private ArrayList<Uri> uris;
    private String intentType;

    public ShareFiles(ReadableArray urls, String type, ReactApplicationContext reactContext){
        this(urls, reactContext);
        this.intentType = type;
    }

    public ShareFiles(ReadableArray urls, ReactApplicationContext reactContext){
        this.uris = new ArrayList<>();
        for (int i = 0; i < urls.size(); i++) {
            String url = urls.getString(i);
            if (url != null) {
                Uri uri = Uri.parse(url);
                this.uris.add(uri);
            }
        }
        this.reactContext = reactContext;
    }
    /**
     * Obtain mime type from URL
     * @param url {@link String}
     * @return {@link String} mime type
     */
    private String getMimeType(String url) {
        String type = null;
        String extension = MimeTypeMap.getFileExtensionFromUrl(url);
        if (extension != null) {
            type = MimeTypeMap.getSingleton().getMimeTypeFromExtension(extension);
        }
        return type;
    }
    /**
     * Return an if the url is a file (local or base64)l
     * @return {@link boolean}
     */
    public boolean isFile() {
        boolean isFile = true;
        for (Uri uri : this.uris) {
            isFile = this.isBase64File(uri) || this.isLocalFile(uri);
            if (!isFile) {
                break;
            }
        }
        return isFile;
    }

    private boolean isBase64File(Uri uri) {
        String scheme = uri.getScheme();
        if((scheme != null) && uri.getScheme().equals("data")) {
            String type = uri.getSchemeSpecificPart().substring(0, uri.getSchemeSpecificPart().indexOf(";"));
            if (this.intentType == null) {
                this.intentType = type;
            } else if (!this.intentType.equalsIgnoreCase(type) && this.intentType.split("/")[0].equalsIgnoreCase((type.split("/"))[0])) {
                this.intentType = (this.intentType.split("/")[0]).concat("/*");
            } else if (!this.intentType.equalsIgnoreCase(type)) {
                this.intentType = "*/*";
            }
            return true;
        }
        return false;
    }
    private boolean isLocalFile(Uri uri) {
        String scheme = uri.getScheme();
        if((scheme != null) && uri.getScheme().equals("content") || "file".equals(uri.getScheme())) {
//            // type is already set
//            if (this.type != null) {
//                return true;
//            }
            // try to get mimetype from uri
            String type = this.getMimeType(uri.toString());

            // try resolving the file and get the mimetype
            if(type == null) {
                String realPath = this.getRealPathFromURI(uri);
                type = this.getMimeType(realPath);
            }
            if(type == null) {
                type = "*/*";
            }

            if (this.intentType == null) {
                this.intentType = type;
            } else if (!this.intentType.equalsIgnoreCase(type) && this.intentType.split("/")[0].equalsIgnoreCase((type.split("/"))[0])) {
                this.intentType = (this.intentType.split("/")[0]).concat("/*");
            } else if (!this.intentType.equalsIgnoreCase(type)) {
                this.intentType = "*/*";
            }

            return true;
        }
        return false;
    }

    public String getType() {
        if (this.intentType == null) {
            return "*/*";
        }
        return this.intentType;
    }

    private String getRealPathFromURI(Uri contentUri) {
        String result = RNSharePathUtil.getRealPathFromURI(this.reactContext, contentUri);
        return result;
    }

    public ArrayList<Uri> getURI() {
        final MimeTypeMap mime = MimeTypeMap.getSingleton();
        ArrayList<Uri> finalUris = new ArrayList<>();

        for (Uri uri : this.uris) {
            if(this.isBase64File(uri)) {
                String type = uri.getSchemeSpecificPart().substring(0, uri.getSchemeSpecificPart().indexOf(";"));
                String extension = mime.getExtensionFromMimeType(type);
                String encodedImg = uri.getSchemeSpecificPart().substring(uri.getSchemeSpecificPart().indexOf(";base64,") + 8);
                try {
                    File dir = new File(Environment.getExternalStorageDirectory(), Environment.DIRECTORY_DOWNLOADS );
                    if (!dir.exists() && !dir.mkdirs()) {
                        throw new IOException("mkdirs failed on " + dir.getAbsolutePath());
                    }
                    File file = new File(dir, System.currentTimeMillis() + "." + extension);
                    final FileOutputStream fos = new FileOutputStream(file);
                    fos.write(Base64.decode(encodedImg, Base64.DEFAULT));
                    fos.flush();
                    fos.close();
                    finalUris.add(RNSharePathUtil.compatUriFromFile(reactContext, file));
                } catch (IOException e) {
                    e.printStackTrace();
                }
            } else if(this.isLocalFile(uri)) {
                if (uri.getPath() != null) {
                    finalUris.add(RNSharePathUtil.compatUriFromFile(reactContext, new File(uri.getPath())));
                }
            }
        }

        return finalUris;
    }
}
