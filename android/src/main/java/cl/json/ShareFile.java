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
import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;

import java.io.*;
import java.net.URI;

/**
 * Created by disenodosbbcl on 22-07-16.
 */
public class ShareFile {
    private static final String TAG = "ShareFile";

    private final ReactApplicationContext reactContext;
    private String url;
    private Uri uri;
    private String type = "*/*";
    private String extension = "";

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
        String type = "*/*";
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
        if(uri.getScheme().equals("data")) {
            this.type = this.uri.getSchemeSpecificPart().substring(0, this.uri.getSchemeSpecificPart().indexOf(";"));
            return true;
        }
        return false;
    }
    public boolean isLocalFile() {
        if(uri.getScheme().equals("content") || uri.getScheme().equals("file")) {
            String realPath = this.getRealPathFromURI(uri);
            this.type = this.getMimeType(realPath);

            return true;
        }
        return false;
    }
    public String getType() {
        return this.type;
    }
    private String getRealPathFromURI(Uri contentUri) {
        /*String[] proj = { MediaStore.Images.Media.DATA };
        CursorLoader loader = new CursorLoader(this.reactContext, contentUri, proj, null, null, null);
        Cursor cursor = loader.loadInBackground();
        int column_index = cursor.getColumnIndexOrThrow(MediaStore.Images.Media.DATA);
        cursor.moveToFirst();
        String result = cursor.getString(column_index);
        cursor.close();*/

        String result = contentUri.getPath();
        return result;
    }
    public Uri getURI() {

        final MimeTypeMap mime = MimeTypeMap.getSingleton();
        this.extension = mime.getExtensionFromMimeType(this.type);
        if(!this.isBase64File()) {
            Log.w(TAG, "not base64");
            Uri uri = Uri.parse(this.url);
            byte[] bytes;
            byte[] buffer = new byte[8192];
            int bytesRead;
            String encodedString = null;
            try{
                InputStream inputStream = new FileInputStream(uri.getPath());//You can get an inputStream using any IO API
                ByteArrayOutputStream output = new ByteArrayOutputStream();

                while ((bytesRead = inputStream.read(buffer)) != -1) {
                    output.write(buffer, 0, bytesRead);
                }
                bytes = output.toByteArray();
                StringBuilder sb = new StringBuilder();
                sb.append("data:image/png;base64,");
                sb.append(Base64.encodeToString(bytes, Base64.DEFAULT));
                encodedString = sb.toString();
            } catch (IOException e) {
                Log.w(TAG, "FileNotFoundException");
                e.printStackTrace();
            }
            Log.w(TAG, "base64 string: " + encodedString);
            this.uri = Uri.parse(encodedString);
        }
        if(this.isBase64File()) {
            Log.w(TAG, "IS base64");
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
