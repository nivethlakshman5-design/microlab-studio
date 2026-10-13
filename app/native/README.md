# MicroLab Studio — Android, iOS and desktop app targets

This repository keeps the existing React/TypeScript MicroLab Studio UI, including the Three.js/Rapier 3D Build Lab, as the shared product. Native shells are prepared with Capacitor (Android/iOS) and Tauri 2 (Windows/macOS/Linux). The first release requires internet access; offline support is deferred.

## Public hosting requirement

The current `https://microlab-studio.higgsfield.app` deployment returns an authentication response for logged-out visitors. Do not ship a store build that points to it until it is publicly accessible to everyone. A store-ready build needs a stable public HTTPS URL with no login wall. This is separate from the Higgsfield community feed: keep the site unlisted and do not publish it there.

Set the public URL in the build environment:

```sh
export MICROLAB_PUBLIC_URL="https://YOUR-PUBLIC-PRODUCTION-DOMAIN"
```

The URL must serve MicroLab Studio, including the 3D Build Lab and its JavaScript/WASM assets. Test it in a private browser before release.

## Android / Google Play

1. Install dependencies with the repository's Bun toolchain and build the web app.
2. Set `MICROLAB_PUBLIC_URL` to the public production URL.
3. Run `npm run app:sync` (or `npx cap sync`) and open `android/` in Android Studio.
4. In Android Studio, create a signed Android App Bundle (`.aab`) for Google Play; test a release build on physical devices.
5. Complete Play Console app details, privacy/data-safety declarations, content rating, screenshots, and testing requirements before submitting.

Commands: `npm run app:android:add` (only if recreating the native platform), `npm run app:android:open`, `npm run app:sync`.

## iOS / App Store

1. Run `npm run app:sync` with the public URL configured.
2. On a Mac with Xcode, open `ios/App/App.xcworkspace` and configure signing/team and bundle metadata.
3. Test on a physical iPhone/iPad, archive in Xcode, then submit through App Store Connect.

Commands: `npm run app:ios:add` (only if recreating the native platform), `npm run app:ios:open`, `npm run app:sync`. iOS signing requires macOS and Xcode; this Linux build environment cannot create a signed iOS release.

## Desktop / Windows, macOS and Linux

Install Rust and the platform-specific Tauri prerequisites, configure `MICROLAB_PUBLIC_URL`, then run `npm run app:desktop:build` on the target OS. The Tauri shell uses `native/desktop/index.html` and prepares a local launcher at `dist/desktop/index.html`. Development is available through `npm run app:desktop:dev`.

## Release status

- Native project scaffolding and app identifiers are in the repository.
- Existing 3D lab code is preserved.
- Public hosting and the authentication gate must be resolved before store-ready builds.
- Store signing, privacy disclosures, physical-device QA, and store submission remain required.
- Offline mode is not included in the first release.
