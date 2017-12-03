package cl.json;

import android.content.CursorLoader;
import android.content.Intent;
import android.database.Cursor;
import android.media.MediaScannerConnection;
import android.net.Uri;
import android.os.Environment;
import android.provider.MediaStore;
import android.util.Base64;
import android.webkit.MimeTypeMap;

import com.facebook.react.bridge.ReactApplicationContext;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.StringReader;
import java.net.URI;

/**
 * Created by disenodosbbcl on 22-07-16.
 */
public class ShareFile {

    private final ReactApplicationContext reactContext;
    private String url;
    private Uri uri;
    private String type;
    private String extension = "";

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
     * @param {@link String} url
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
    public boolean isBase64File() {
        String scheme = uri.getScheme();
        if((scheme != null) && uri.getScheme().equals("data")) {
            this.type = this.uri.getSchemeSpecificPart().substring(0, this.uri.getSchemeSpecificPart().indexOf(";"));
            return true;
        }
        return false;
    }
    public boolean isLocalFile() {
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
        String[] proj = { MediaStore.Images.Media.DATA };
        CursorLoader loader = new CursorLoader(this.reactContext, contentUri, proj, null, null, null);
        Cursor cursor = loader.loadInBackground();
        String result = null;
        if (cursor != null && cursor.moveToFirst()) {
            int column_index = cursor.getColumnIndexOrThrow(MediaStore.Images.Media.DATA);
            result = cursor.getString(column_index);
            cursor.close();
        }
        return result;
    }
    public Uri getURI() {

        final MimeTypeMap mime = MimeTypeMap.getSingleton();
        this.extension = mime.getExtensionFromMimeType(getType());
        if(this.isBase64File()) {
            String encodedImg = this.uri.getSchemeSpecificPart().substring(this.uri.getSchemeSpecificPart().indexOf(";base64,") + 8);
            try {
                File dir = new File(Environment.getExternalStorageDirectory(), Environment.DIRECTORY_DOWNLOADS );
                if (!dir.exists()) {
                    dir.mkdirs();
                }
                File file = new File(dir, System.currentTimeMillis() + "." + this.extension);
                final FileOutputStream fos = new FileOutputStream(file);
                fos.write(Base64.decode(encodedImg, Base64.DEFAULT));
                fos.flush();
                fos.close();
                return Uri.fromFile(file);

            } catch (IOException e) {
                e.printStackTrace();
            }
        } else if(this.isLocalFile()) {
            Uri uri = Uri.parse(this.url);

            return uri;
        }

        return null;
    }
}
