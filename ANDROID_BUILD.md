# Building Lifer as an Android App Bundle (.aab)

This guide takes you from zero to a signed .aab file ready for Google Play.

---

## What you need installed on your computer

| Tool | Download |
|---|---|
| Android Studio (Ladybug or newer) | https://developer.android.com/studio |
| JDK 17 | Bundled with Android Studio — no separate install needed |
| Node.js 18+ | https://nodejs.org |

---

## Step 1 — Install dependencies and build the web app

Open a terminal in the `lifer-app` folder:

```bash
npm install
npm run build:android
```

This builds the React app with relative paths (`./`) and syncs it into the Android project.

---

## Step 2 — Open the Android project in Android Studio

```bash
npm run open:android
```

Or manually: open Android Studio → File → Open → select the `android/` folder inside `lifer-app`.

Wait for Gradle sync to finish (bottom status bar shows "Gradle sync finished").

---

## Step 3 — Create a signing keystore (first time only)

You need a keystore to sign your app. **Keep this file safe — you can never change it once the app is on the Play Store.**

In your terminal (not Android Studio):

```bash
keytool -genkey -v \
  -keystore android/app/lifer-release.keystore \
  -alias lifer \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000
```

It will ask for:
- A keystore password (make it strong, write it down)
- Your name, organisation, city, country (can be anything)
- A key password (can be same as keystore password)

---

## Step 4 — Add signing config to build.gradle

Open `android/app/build.gradle` and uncomment + fill in the signing block:

```gradle
signingConfigs {
    release {
        storeFile file('lifer-release.keystore')
        storePassword 'YOUR_STORE_PASSWORD'
        keyAlias 'lifer'
        keyPassword 'YOUR_KEY_PASSWORD'
    }
}

buildTypes {
    release {
        minifyEnabled false
        proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        signingConfig signingConfigs.release   // ← uncomment this line too
    }
}
```

---

## Step 5 — Generate the .aab file

In Android Studio:

1. Menu → **Build → Generate Signed Bundle / APK**
2. Choose **Android App Bundle** → Next
3. Point to your keystore file (`android/app/lifer-release.keystore`)
4. Enter your passwords and alias
5. Choose **release** build variant → Finish

The `.aab` file will be at:
```
android/app/release/app-release.aab
```

---

## Step 6 — Upload to Google Play

1. Go to https://play.google.com/console
2. Create your app (you need a $25 developer account)
3. Go to **Release → Production → Create new release**
4. Upload `app-release.aab`
5. Fill in release notes → Review and publish

Google's review takes 1–7 days for a new app.

---

## Updating the app after code changes

Every time you update the React code:

```bash
npm run build:android   # rebuilds + syncs to Android
```

Then in Android Studio, bump `versionCode` by 1 in `android/app/build.gradle`:
```gradle
versionCode 2   // increment each release
versionName "1.1"
```

Then repeat Step 5 to generate a new .aab and upload it.

---

## Android 16 (API 36) specifics

This project is already configured for Android 16:

| Setting | Value |
|---|---|
| `compileSdkVersion` | 36 (Android 16) |
| `targetSdkVersion` | 36 (Android 16) |
| `minSdkVersion` | 24 (Android 7.0 — covers ~98% of devices) |
| Java version | 17 (required for API 36) |
| Bundle splits | Language, density, ABI (smaller downloads) |

---

## Troubleshooting

**Gradle sync fails** — Go to File → Invalidate Caches → Restart

**"SDK not found"** — Open SDK Manager (Tools → SDK Manager) and install Android 16 (API 36)

**keytool not found** — Run it from Android Studio's terminal (it has JDK in its PATH)

**App shows blank screen** — Make sure you ran `npm run build:android` (not `npm run build`) before syncing
