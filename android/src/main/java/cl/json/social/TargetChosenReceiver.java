package cl.json.social;

import android.annotation.TargetApi;
import android.app.Activity;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.IntentSender;
import android.os.Build;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;

import java.util.UUID;

/** Owns one share request, its chooser receiver, and its promise. */
public class TargetChosenReceiver extends BroadcastReceiver {
    private static final String EXTRA_RECEIVER_TOKEN = "receiver_token";
    private static final Object LOCK = new Object();
    private static TargetChosenReceiver activeRequest;
    private static int nextRequestCode = 16845;

    private final ReactContext reactContext;
    private final Context applicationContext;
    private final int requestCode;
    private final String token = UUID.randomUUID().toString();
    private Promise callback;
    private PendingIntent pendingIntent;
    private boolean registered;

    private TargetChosenReceiver(Promise callback, ReactContext context, int requestCode) {
        this.callback = callback;
        this.reactContext = context;
        this.applicationContext = context.getApplicationContext();
        this.requestCode = requestCode;
    }

    public static boolean isSupported() {
        return Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP_MR1;
    }

    public static TargetChosenReceiver registerCallbacks(Promise promise, ReactContext context) {
        synchronized (LOCK) {
            if (activeRequest == null) {
                activeRequest = new TargetChosenReceiver(promise, context, nextRequestCode);
                nextRequestCode = nextRequestCode == 65535 ? 16845 : nextRequestCode + 1;
                return activeRequest;
            }
        }
        promise.reject("EINPROGRESS", "A share request is already in progress");
        return null;
    }

    public static TargetChosenReceiver getCurrentRequest(ReactContext context) {
        synchronized (LOCK) {
            if (activeRequest == null || activeRequest.reactContext != context) {
                throw new IllegalStateException("No active share request for this context");
            }
            return activeRequest;
        }
    }

    public int getRequestCode() {
        return requestCode;
    }

    public boolean isActive() {
        synchronized (LOCK) {
            return callback != null;
        }
    }

    @TargetApi(Build.VERSION_CODES.LOLLIPOP_MR1)
    public IntentSender getSharingSenderIntent() {
        synchronized (LOCK) {
            if (callback == null) throw new IllegalStateException("Share request has already completed");
            if (pendingIntent != null) return pendingIntent.getIntentSender();
            String action = reactContext.getPackageName() + "/" + TargetChosenReceiver.class.getName() + "_ACTION";
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
                applicationContext.registerReceiver(this, new IntentFilter(action), Context.RECEIVER_NOT_EXPORTED);
            } else {
                applicationContext.registerReceiver(this, new IntentFilter(action));
            }
            registered = true;
            // A package-scoped broadcast reaches this dynamically registered receiver.
            // It must be mutable so the chooser can fill in EXTRA_CHOSEN_COMPONENT.
            Intent intent = new Intent(action).setPackage(reactContext.getPackageName());
            intent.putExtra(EXTRA_RECEIVER_TOKEN, token);
            int flags = PendingIntent.FLAG_CANCEL_CURRENT | PendingIntent.FLAG_ONE_SHOT;
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) flags |= PendingIntent.FLAG_MUTABLE;
            pendingIntent = PendingIntent.getBroadcast(reactContext, requestCode, intent, flags);
            return pendingIntent.getIntentSender();
        }
    }

    @Override
    public void onReceive(Context context, Intent intent) {
        synchronized (LOCK) {
            if (activeRequest != this || !token.equals(intent.getStringExtra(EXTRA_RECEIVER_TOKEN))) return;
        }
        ComponentName target = intent.getParcelableExtra(Intent.EXTRA_CHOSEN_COMPONENT);
        WritableMap reply = Arguments.createMap();
        reply.putBoolean("success", true);
        reply.putString("message", target == null ? "OK" : target.flattenToString());
        callbackResolve(reply);
    }

    public static void onActivityResult(ReactContext context, int requestCode, int resultCode) {
        TargetChosenReceiver request;
        synchronized (LOCK) {
            request = activeRequest;
            if (request == null || request.reactContext != context || request.requestCode != requestCode) return;
        }
        if (resultCode == Activity.RESULT_CANCELED || resultCode == Activity.RESULT_OK) {
            WritableMap reply = Arguments.createMap();
            reply.putBoolean("success", resultCode == Activity.RESULT_OK);
            reply.putString("message", resultCode == Activity.RESULT_OK ? "OK" : "CANCELED");
            request.callbackResolve(reply);
        }
    }

    public static void invalidate(ReactContext context) {
        TargetChosenReceiver request;
        synchronized (LOCK) {
            request = activeRequest;
            if (request == null || request.reactContext != context) return;
        }
        request.callbackReject("Share module was invalidated");
    }

    private Promise takeCallback() {
        synchronized (LOCK) {
            Promise promise = callback;
            callback = null;
            if (activeRequest == this) activeRequest = null;
            if (registered) {
                registered = false;
                applicationContext.unregisterReceiver(this);
            }
            if (pendingIntent != null) {
                pendingIntent.cancel();
                pendingIntent = null;
            }
            return promise;
        }
    }

    public void callbackResolve(Object reply) {
        Promise promise = takeCallback();
        if (promise != null) promise.resolve(reply);
    }

    public void callbackReject(String error) {
        Promise promise = takeCallback();
        if (promise != null) promise.reject(error);
    }
}
