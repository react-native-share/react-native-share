package cl.json;

import android.content.Intent;
import android.net.Uri;
import android.os.Environment;
import android.util.Base64;
import android.webkit.MimeTypeMap;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.StringReader;
import java.net.URI;

/**
 * Created by disenodosbbcl on 22-07-16.
 */
public class FileBase64 {
    private String url;
    private URI uri;
    private String type = "*/*";
    private String extension = "";

    public FileBase64(String url){
        this.url = url;
        this.uri = URI.create(this.url);
    }
    private static String getMimeType(String url) {
        String type = "*/*";
        String extension = MimeTypeMap.getFileExtensionFromUrl(url);
        if (extension != null) {
            type = MimeTypeMap.getSingleton().getMimeTypeFromExtension(extension);
        }
        return type;
    }
    public boolean isFile() {
        return this.isBase64File();
    }
    public boolean isBase64File() {
        if(uri.getScheme().equals("data")) {
            this.type = this.uri.getSchemeSpecificPart().substring(0, this.uri.getSchemeSpecificPart().indexOf(";"));
            final MimeTypeMap mime = MimeTypeMap.getSingleton();
            this.extension = mime.getExtensionFromMimeType(this.type);
            return true;
        }
        return false;
    }
    public String getType() {
        return this.type;
    }
    public Uri getURI() {
        if(this.isBase64File()) {
            String encodedImg = this.uri.getSchemeSpecificPart().substring(this.uri.getSchemeSpecificPart().indexOf(";base64,") + 8);
            try {
                File dir = new File(Environment.getExternalStorageDirectory(), Environment.DIRECTORY_DOWNLOADS );
                if (!dir.exists())
                {
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
        }

        return null;
    }
}
