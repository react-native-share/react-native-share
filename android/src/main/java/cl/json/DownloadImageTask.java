package cl.json;

import android.content.Context;
import android.media.MediaScannerConnection;
import android.net.Uri;
import android.os.AsyncTask;
import android.os.Environment;
import android.util.Log;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReadableMap;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URL;
import java.net.URLConnection;
import java.util.concurrent.ExecutionException;

/**
 * Created by Mani on 3/21/2016.
 */
public class DownloadImageTask extends AsyncTask<String,Integer,android.net.Uri> {
    public static File file;
    InputStream is;
    HandleDownloadImageTask handle;
    Context ctx=null;
    ReadableMap options;
    Callback callback;
    public DownloadImageTask(ReadableMap o, Callback c,HandleDownloadImageTask h,Context context)
    {
        options=o;
        callback=c;
        this.handle=h;
        ctx=context;
    }

    protected android.net.Uri doInBackground(String fileUrl) throws IOException {
        Log.d("MX", "download start");
        File path = ctx.getExternalFilesDir(null);
        file = new File(path, "shareImage.jpg");
        try {
            // Make sure the Pictures directory exists.
            path.mkdirs();

            URL url = new URL(fileUrl);
            /* Open a connection to that URL. */
            URLConnection ucon = url.openConnection();

            /*
             * Define InputStreams to read from the URLConnection.
             */
            InputStream is = url.openStream();
            OutputStream os = new FileOutputStream(file);

            byte[] b = new byte[2048];
            int length;

            while ((length = is.read(b)) != -1) {
                os.write(b, 0, length);
            }

            is.close();
            os.close();

            Log.d("MX", "downloaded");
            return Uri.fromFile(file);

        } catch (IOException e) {
            Log.d("MX", "Error: " + e);
        }
        return  null;
    }


    @Override
    protected android.net.Uri doInBackground(String... params) {
        // TODO Auto-generated method stub
        try {
           return doInBackground(params[0]);
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        return null;
    }

    protected void onPostExecute(android.net.Uri fileUri) {
        try {
            // Tell the media scanner about the new file so that it is
            // immediately available to the user.
            Log.d("MX", file.toURI().toString());
            Log.d("MX", "onPostExecute start");
            this.handle.downloaded(fileUri, options,callback);

        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

    }
}