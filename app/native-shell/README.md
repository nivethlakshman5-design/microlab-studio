# Native shell bootstrap

This small local page is used only as the Capacitor/Tauri packaging entry point. `app-config.js` is generated from `MICROLAB_PUBLIC_URL` by `scripts/configure-native-endpoint.mjs`. The actual MicroLab Studio UI, including the Three.js/Rapier 3D Build Lab, remains in the shared web application.

Do not commit private endpoints or credentials. The configured URL must be a public HTTPS origin that can be opened without Higgsfield sign-in.
