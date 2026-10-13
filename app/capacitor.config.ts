import type { CapacitorConfig } from '@capacitor/cli';

// Production native builds must point at a public, HTTPS production endpoint.
// The current Higgsfield URL is sign-in-gated for logged-out visitors, so it is
// deliberately not hard-coded here. Set MICROLAB_PUBLIC_URL after public
// hosting is ready, then run `npm run app:sync`.
const publicUrl = process.env.MICROLAB_PUBLIC_URL?.trim();
if (process.env.CAPACITOR_RELEASE === '1' && !publicUrl) {
  throw new Error('Set MICROLAB_PUBLIC_URL to the public MicroLab Studio production URL before creating a release build.');
}
if (publicUrl && !/^https:\/\//i.test(publicUrl)) {
  throw new Error('MICROLAB_PUBLIC_URL must use HTTPS.');
}

const config: CapacitorConfig = {
  appId: 'studio.microlab.app',
  appName: 'MicroLab Studio',
  webDir: 'native-shell',
  ...(publicUrl ? { server: { url: publicUrl, cleartext: false } } : {}),
  android: { allowMixedContent: false },
  ios: { contentInset: 'automatic' },
};

export default config;
