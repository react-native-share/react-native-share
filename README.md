# react-native-share
Share Social , Sending Simple Data to Other Apps

### Installation
```bash
npm i --save react-native-share
```

### Add  to your Android project

* In `android/setting.gradle`

```gradle
...
include ':react-native-share', ':app'
project(':react-native-share').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-share/android')
```

* In `android/app/build.gradle`

```gradle
...
dependencies {
    ...
    compile project(':react-native-share')
}
```

* register module (in MainActivity.java)

```java
import cl.json.RNSharePackage;  // <--- import

public class MainActivity extends Activity implements DefaultHardwareBackBtnHandler {
  ......

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    mReactRootView = new ReactRootView(this);

    mReactInstanceManager = ReactInstanceManager.builder()
      .setApplication(getApplication())
      .setBundleAssetName("index.android.bundle")
      .setJSMainModuleName("index.android")
      .addPackage(new MainReactPackage())
      .addPackage(new RNSharePackage())              // <------ add here
      .setUseDeveloperSupport(BuildConfig.DEBUG)
      .setInitialLifecycleState(LifecycleState.RESUMED)
      .build();

    mReactRootView.startReactApplication(mReactInstanceManager, "ExampleRN", null);

    setContentView(mReactRootView);
  }

  ......

}
```
