# GlowTorch — Capacitor Android flashlight

A minimal flashlight app using the native torch through `@capgo/capacitor-flash`.

## Build on a computer

Requirements: Node.js 22+, Android Studio, Android SDK, and Java 21 (for current Capacitor 8 Android builds).

```bash
npm install
npm run build
npx cap add android
npx cap sync android
npx cap open android
```

In Android Studio, wait for Gradle sync, then choose **Build → Build Bundle(s) / APK(s) → Build APK(s)**.

The debug APK is normally created at:
`android/app/build/outputs/apk/debug/app-debug.apk`

## Build updates

After changing files in `src/` or `index.html`:

```bash
npm run build
npx cap sync android
```

## Notes

- The app uses the phone's actual LED torch, not a white-screen imitation.
- Brightness/intensity adjustment is not included in this first version.
- The torch plugin's Android implementation uses native flashlight control. See https://capgo.app/docs/plugins/flash/
