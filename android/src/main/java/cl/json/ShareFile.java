package cl.json;

import android.net.Uri;
import android.os.Environment;
import android.util.Base64;
import android.webkit.MimeTypeMap;

import com.facebook.react.bridge.ReactApplicationContext;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

/**
 * Created by disenodosbbcl on 22-07-16.
 */
public class ShareFile {

    private final ReactApplicationContext reactContext;
    private String url;
    private Uri uri;
    private String type;

    public ShareFile(String url, String type, ReactApplicationContext reactContext){
        this(url, reactContext);
        this.type = type;
    }

    public ShareFile(String url, ReactApplicationContext reactContext){
        this.url = url;
        this.uri = Uri.parse(this.url);
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
        return this.isBase64File() || this.isLocalFile();
    }
    private boolean isBase64File() {
        String scheme = uri.getScheme();
        if((scheme != null) && uri.getScheme().equals("data")) {
            this.type = this.uri.getSchemeSpecificPart().substring(0, this.uri.getSchemeSpecificPart().indexOf(";"));
            return true;
        }
        return false;
    }
    private boolean isLocalFile() {
        String scheme = uri.getScheme();
        if((scheme != null) && (uri.getScheme().equals("content") || uri.getScheme().equals("file"))) {
            // type is already set
            if (this.type != null) {
                return true;
            }
            // try to get mimetype from uri
            this.type = this.getMimeType(uri.toString());

            // try resolving the file and get the mimetype
            if(this.type == null) {
              String realPath = this.getRealPathFromURI(uri);
              if (realPath != null) {
                  this.type = this.getMimeType(realPath);
              } else {
                  return false;
              }
            }

            if(this.type == null) {
              this.type = "*/*";
            }

            return true;
        }
        return false;
    }
    public String getType() {
        if (this.type == null) {
           return "*/*";
        }
        return this.type;
    }
    private String getRealPathFromURI(Uri contentUri) {
        String result = RNSharePathUtil.getRealPathFromURI(this.reactContext, contentUri);
        return result;
    }
    public Uri getURI() {

        final MimeTypeMap mime = MimeTypeMap.getSingleton();
        String extension = mime.getExtensionFromMimeType(getType());

        if(this.isBase64File()) {
            String encodedImg = this.uri.getSchemeSpecificPart().substring(this.uri.getSchemeSpecificPart().indexOf(";base64,") + 8);
            try {
                File dir = new File(Environment.getExternalStorageDirectory(), Environment.DIRECTORY_DOWNLOADS );
                if (!dir.exists() && !dir.mkdirs()) {
                    throw new IOException("mkdirs failed on " + dir.getAbsolutePath());
                }
                File file = new File(dir, System.nanoTime() + "." + extension);
                final FileOutputStream fos = new FileOutputStream(file);
                fos.write(Base64.decode(encodedImg, Base64.DEFAULT));
                fos.flush();
                fos.close();
                return RNSharePathUtil.compatUriFromFile(reactContext, file);

            } catch (IOException e) {
                e.printStackTrace();
            }
        } else if(this.isLocalFile()) {
            Uri uri = Uri.parse(this.url);
            if (uri.getPath() == null) {
                return null;
            }
            return RNSharePathUtil.compatUriFromFile(reactContext, new File(uri.getPath()));
        }

        return null;
    }
}
