package cl.json;

import android.net.Uri;
import android.os.Environment;
import android.util.Base64;
import android.webkit.MimeTypeMap;

import com.facebook.react.bridge.ReactApplicationContext;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.UUID;

/**
 * Created by disenodosbbcl on 22-07-16.
 */
public class ShareFile {

    public static final int BASE_64_DATA_LENGTH = 5; // `data:`
    public static final int BASE_64_DATA_OFFSET = 8; // `;base64,`
    private final ReactApplicationContext reactContext;
    private final Uri uri;
    private String type;
    private final String filename;
    private final Boolean useInternalStorage;
    private boolean filenameIncludesExtension;
    private Uri sharedUri;

    public ShareFile(String url, String type, String filename, Boolean useInternalStorage, ReactApplicationContext reactContext) {
        this(url, filename, useInternalStorage, reactContext);
        this.type = type;
    }

    public ShareFile(String url, String filename, Boolean useInternalStorage, ReactApplicationContext reactContext) {
        this.uri = Uri.parse(url);
        this.filename = filename;
        this.useInternalStorage = useInternalStorage;
        this.reactContext = reactContext;
    }

    ShareFile(String url, String type, String filename, Boolean useInternalStorage, ReactApplicationContext reactContext, boolean filenameIncludesExtension) {
        this(url, type, filename, useInternalStorage, reactContext);
        this.filenameIncludesExtension = filenameIncludesExtension;
    }

    public boolean isFile() {
        return this.isBase64File() || this.isLocalFile();
    }

    private boolean isBase64File() {
        if ("data".equals(uri.getScheme())) {
            String value = uri.toString();
            int separator = value.indexOf(';', BASE_64_DATA_LENGTH);
            if (separator < 0 || value.indexOf(";base64,", separator) < 0) {
                throw new IllegalArgumentException("Invalid base64 data URI");
            }
            this.type = separator == BASE_64_DATA_LENGTH ? "text/plain" : value.substring(BASE_64_DATA_LENGTH, separator);
            return true;
        }
        return false;
    }

    private boolean isLocalFile() {
        String scheme = uri.getScheme();
        if (!"content".equals(scheme) && !"file".equals(scheme)) {
            return false;
        }
        if (this.type == null && "content".equals(scheme)) {
            this.type = reactContext.getContentResolver().getType(uri);
        }
        if (this.type == null) {
            String extension = MimeTypeMap.getFileExtensionFromUrl(uri.toString());
            this.type = MimeTypeMap.getSingleton().getMimeTypeFromExtension(extension);
        }
        if (this.type == null) {
            this.type = "*/*";
        }
        return true;
    }

    public String getType() {
        return this.type == null ? "*/*" : this.type;
    }

    public Uri getURI() {
        if (sharedUri != null) return sharedUri;

        if (this.isBase64File()) {
            String value = uri.toString();
            String encoded = value.substring(value.indexOf(";base64,") + BASE_64_DATA_OFFSET);
            // Decode before opening a file, so invalid data cannot leak a stream.
            byte[] data = Base64.decode(encoded, Base64.DEFAULT);
            String name = filename == null ? "file" : filename;
            if (name.isEmpty() || name.equals(".") || name.equals("..") || name.contains("/") || name.contains("\\")) {
                throw new IllegalArgumentException("Filename must be a non-empty file name without directory separators");
            }
            if (filename == null || !filenameIncludesExtension) {
                String extension = MimeTypeMap.getSingleton().getExtensionFromMimeType(getType());
                if (extension != null) name += "." + extension;
            }

            File cacheDir = Boolean.TRUE.equals(useInternalStorage) ? reactContext.getCacheDir() : reactContext.getExternalCacheDir();
            if (cacheDir == null) cacheDir = reactContext.getCacheDir();
            File downloads = new File(cacheDir, Environment.DIRECTORY_DOWNLOADS);
            // Each attachment owns its directory, even when display names are identical.
            File dir = new File(downloads, UUID.randomUUID().toString());
            File file = new File(dir, name);
            try {
                if (!dir.mkdirs()) {
                    throw new IOException("Unable to create the share cache directory");
                }
                try (FileOutputStream stream = new FileOutputStream(file)) {
                    stream.write(data);
                }
                sharedUri = RNSharePathUtil.compatUriFromFile(reactContext, file);
                if (sharedUri == null) {
                    throw new IOException("Unable to create a content URI for the shared file");
                }
            } catch (IOException e) {
                file.delete();
                dir.delete();
                throw new IllegalStateException("Unable to prepare the shared file", e);
            }
        } else if (this.isLocalFile()) {
            if ("content".equals(uri.getScheme())) {
                sharedUri = uri;
            } else if (uri.getPath() != null) {
                sharedUri = RNSharePathUtil.compatUriFromFile(reactContext, new File(uri.getPath()));
            }
        }
        return sharedUri;
    }
}
